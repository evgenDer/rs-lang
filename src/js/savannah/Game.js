/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { createElement } from '../utils/create';
import { GAME_MODES, GAME_DATA_URL, ERR_MSG, DATA_ERR_MSG } from '../games/constants';
import { getFullDataWords, getWordById } from '../api/words';
import { showElement, hideElement } from '../helpers/html-helper';
import { getRandomInt, shuffleArray } from '../helpers/math-hepler';
import { selectNextRound, getCurrentRound, getCurrentLevel } from '../games/dropdown';
import { Statistics } from '../statistics/components/statistics';
// import { addStatisticsRound, createStaticticsRound } from './statistics';
import { increaseWordErrorCount, increaseWordReferenceCount } from '../words/updateWordState';
import { getAllUserWords, updateUserWord } from '../api/userWords';
import { AUDIO_B64, IMG_B64, WORD_STATE } from '../utils/constants';
import { saveCustomConfiguration } from '../configuration/index';
import playAudio from '../helpers/audio';
import createHeader from "./game-page/header";
import createMain from "./game-page/main";
import createFooter from "./game-page/footer";


export default class Game {
  constructor(mode = GAME_MODES.all, level = 0, round = 0) {
    this.name = 'Саванна';

    this.mode = mode;
    this.level = level;
    this.round = round;
    this.answersAmnt = 5;

    this.currentElement = '';

    this.isAudioPlay = true;
    this.errors = 0;
    this.answers = [];

    this.gameField = document.querySelector('.process');
    this.answersContainer = document.querySelector('.process__answers');
    this.crystal = document.querySelector('.crystal');
    this.btnAudio = document.querySelector('.game-container_audio');

    this.wordsAmntInRound = 20;
    this.data = [];
    this.userData = [];
    this.words = [];
    this.answers = [];
    this.allRoundTranslations = [];
    this.rightAnswer = 0;
    this.currentAnswer = 0;

    this.statistics = new Statistics(this.name);
  }

  moveElement() {
    const elem = this.currentElement;
    const {clientHeight} = document.documentElement;
    let pos = 0;
    // eslint-disable-next-line no-use-before-define
    const id = setInterval(frame, 4);
    function frame() {
      if (pos === clientHeight * 0.8) {
        clearInterval(id);
      } else {
        pos+=1;
        elem.style.top = `${pos}px`;
        // elem.style.left = pos + 'px';
      }
    }
  }

  startGame() {
    this.getRoundData().then(() => {
      this.generateAnswers();

      this.addAnswersClickHandler();
      this.addKeyboardEventsHandler();
      this.addAudioButtonClickHandler();
      // this.prepareGameField();

      this.startTask();
    }).catch((err) => {
      // eslint-disable-next-line no-undef

      console.log(err);
      UIkit.notification({
        message: `<span uk-icon='icon: warning'></span> ${err}`,
        status: 'warning',
        pos: 'top-center',
      });

    });
  }

  startTask() {
    //this.prepareGameField();

    this.getRightAnswer();
    this.getWords();

    this.fillAnswers();

    // this.playTask();
  }

  startGameField(){
    const { main, generalWord } = createMain();
    const header = createHeader(generalWord);
    const footer = createFooter();
    const process = createElement({ tagName: 'section', classNames: 'process', children: [header, main, footer] });

    document.body.append(process);
      setTimeout(() => {
        process.classList.add('show-after-click');
      }, 1000);
  }


  prepareGameField() {
    this.clearAnswers();

    this.hideRightAnswer();
    this.enableAnswers();
    this.setContolButtonIdnkMode();
    this.removeAudioButtonsClickHandler();
  }

  getRightAnswer() {
    this.rightAnswer = getRandomInt(this.answersAmnt);
  }

  async getRoundData() {
    console.log(this.mode);
    if (this.mode === GAME_MODES.all) {
      this.data = await getFullDataWords(this.level, this.round, this.wordsAmntInRound);
      shuffleArray(this.data);
    } else {
      const userData = await getAllUserWords();
      if (userData.length < 5) {
        throw ERR_MSG;
      }

      this.userData = userData
        .filter((data) => data !== undefined)
        .filter((word) => word.optional.mode !== WORD_STATE.deleted)
        .sort((a, b) => a.optional.successPoint - b.optional.successPoint)
        .slice(0, this.wordsAmntInRound);
      shuffleArray(this.userData);

      const promises = [];
      this.userData.forEach(({ wordId }) => promises.push(getWordById(wordId)));

      this.data = await Promise.all(promises);

    }

    this.data = this.data.filter((data) => data !== undefined);
    console.log(this.data);
    if (this.data.length !== this.wordsAmntInRound) {
      throw DATA_ERR_MSG;
    }

    this.allRoundTranslations = await this.getAllGroupWordTranslatons();
  }

  async getAllGroupWordTranslatons() {
    const dataWords = this.data.map(({ wordTranslate }) => wordTranslate);

    const allData = await getFullDataWords(this.level, 0, 1000);

    const allWords = allData
      .filter((data) => data !== undefined)
      .map(({ wordTranslate }) => wordTranslate)
      .filter((word) => word !== '' && !dataWords.includes(word));

    return allWords;
  }

  getSimilarWords(sample, words) {
    const significantPartLength = 2;

    const ending = sample.slice(-significantPartLength);
    const begining = sample.slice(0, significantPartLength);

    let similarWords = words
      .filter((word) => word.slice(-significantPartLength) === ending || word.slice(0, significantPartLength) === begining);
    similarWords = [...new Set(similarWords)];
    shuffleArray(similarWords);
    similarWords = similarWords.slice(0, this.answersAmnt);

    while (similarWords.length < this.answersAmnt) {
      const availableWords = words.filter((word) => !similarWords.includes(word));
      similarWords.push(availableWords[getRandomInt(words.length - 1)]);
    }

    return similarWords;
  }

  getWords() {
    const currentWord = this.data[this.currentAnswer].wordTranslate;

    this.words = this.getSimilarWords(currentWord, this.allRoundTranslations);
    this.words[this.rightAnswer] = currentWord;
  }

  fillAnswers() {
    this.answers.forEach((answer, index) => {
        answer.textContent = `${index+1}. ${this.words[index]}`;
    });
  }

  generateAnswers() {
    const answersContainer = document.querySelector('.process__answers');
    for (let i = 0; i < this.answersAmnt; i += 1) {
      const answer= createElement('li', 'process__answer', [], [['data-number', i]]);
      this.answers.push(answer);
      answersContainer.appendChild(answer);
    }
  }

  clearGameField() {
    const gameContainer = document.querySelector('.process');
    gameContainer.remove();
  }

  getAnswerIndex(element) {
    return Number(element.dataset.number);
  }

  addAnswersClickHandler() {
    this.answers.forEach((answer) => {
      answer.onclick = ({ target }) => {
        let answerIndex = this.getAnswerIndex(target);
        if (answerIndex === -1) {
          answerIndex = this.getAnswerIndex(target.nextSibling);
        }
        if (answerIndex === this.rightAnswer) {
          this.data[this.currentAnswer].isCorrect = true;
          alert('Correct');

        } else {
          this.data[this.currentAnswer].isError = false;
          const life = document.querySelector('.process__heart');
          life.src = 'assets/img/icons/heart-minus.svg';
          const answerCorrect = document.querySelector(`li[data-number='${this.rightAnswer}']`);
          console.log(this.rightAnswer);
          answerCorrect.classList.add('answer_correct');
          answer.classList.add('answer_wrong');
        }
      };
    });
  };

  addResultsFromCurrentAnswer() {
    const currentAnswer = this.data[this.currentAnswer];
      if (this.mode === GAME_MODES.learned) {
          const currentUserData = this.userData[this.currentAnswer];
          if (currentAnswer.isCorrect) {
            increaseWordReferenceCount(currentUserData);
          } else {
            increaseWordErrorCount(currentUserData);
          }
          updateUserWord(currentUserData.wordId, currentUserData);
        }
        this.currentAnswer += 1;
        if (this.currentAnswer < this.wordsAmntInRound) {
          this.startTask();
        } else {
          selectNextRound();
          saveCustomConfiguration('savannah', { level: getCurrentLevel(), round: getCurrentRound() });
          this.statistics.updateGameStatistics(this.wordsAmntInRound - this.errors, this.errors, 0);
          this.showStatistics();
      }
  }

  addKeyboardEventsHandler() {
    document.onkeydown = (event) => {
      let answer = -1;
      switch (event.code) {
        case 'Digit1':
          answer = 0;
          break;

        case 'Digit2':
          answer = 1;
          break;

        case 'Digit3':
          answer = 2;
          break;

        case 'Digit4':
          answer = 3;
          break;

        default:
          break;
      }

      if (answer !== -1) {
        this.answers[answer].click();
      }
    };
  }

  addAudioButtonClickHandler() {
    this.btnAudio.addEventListener('click', () => {
      if(this.btnAudio.classList.contains('off')){
        this.btnAudio.classList.remove('off');
        this.btnAudio.src = 'assets/img/icons/sound-on.svg';
        this.isAudioPlay = true;
      } else {
        this.isAudioPlay = false;
        this.btnAudio.classList.add('off');
        this.btnAudio.src = 'assets/img/icons/sound-off.svg';
      }
    });
  }

  showStatistics() {
   // createStaticticsRound();
   // addStatisticsRound(this.data, this.mode === GAME_MODES.learned);
    // eslint-disable-next-line no-undef
    UIkit.modal('.modal-round').show();
  }
}
