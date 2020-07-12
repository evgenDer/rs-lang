/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { createElement } from '../utils/create';
import { GAME_MODES,  ERR_MSG, DATA_ERR_MSG } from '../games/constants';
import { getFullDataWords , getWordById } from '../api/words';
import { getRandomInt, shuffleArray } from '../helpers/math-hepler';
import { selectNextRound, getCurrentRound, getCurrentLevel } from '../games/dropdown';
import { Statistics } from '../statistics/components/statistics';
import { addStatisticsRound, createStaticticsRound } from './statistic';
import { increaseWordErrorCount, increaseWordReferenceCount } from '../words/updateWordState';
import { updateUserWord, getAllUserWords} from '../api/userWords';
import { saveCustomConfiguration } from '../configuration/index';
import { playAudio, stopAudio } from '../helpers/audio';
import { removeChild } from '../helpers/html-helper';
import { WORD_STATE } from '../utils/constants';


export default class Game {
  constructor(mode = GAME_MODES.all, level = 0, round = 0) {
    this.name = 'Саванна';

    this.mode = mode;
    this.level = level;
    this.round = round;
    this.answersAmnt = 5;

    this.currentElement = null;

    this.isAudioPlay = true;
    this.correct = false;
    this.answers = [];

    this.gameField = document.querySelector('.process');
    this.answersContainer = document.querySelector('.process__answers');
    this.btnAudio = document.querySelector('.game-container_audio');

    this.wordsAmntInRound = 20;
    this.data = [];
    this.userData = [];
    this.words = [];
    this.answers = [];
    this.allRoundTranslations = [];
    this.rightAnswer = 0;
    this.currentAnswer = 0;
    this.pos = 0;
    this.errors = 0;
    this.endPosition = document.documentElement.clientHeight * 0.65;

    this.posIncrease = 1;
    this.statistics = new Statistics(this.name);
  }

  generateWord(){
    this.currentElement = createElement('div', 'process__fall');
    const {word} = this.data[this.currentAnswer];
    const wordArray = word.split('');
    wordArray.forEach((letter) =>  {
      const element = createElement('span', '', [], [], `${letter}`);
      this.currentElement.append(element);
    });
    document.body.prepend(this.currentElement);
  }

  moveElement() {
    const elem = this.currentElement;
      this.timer = setInterval(() => {
      if(this.correct){
        this.currentElement.innerHTMl = '|';
        this.pos += 6;
        elem.style.top = `${this.pos}px`;
        this.crystal = document.querySelector('.process__footer');
        this.posCrystal = this.crystal.getBoundingClientRect();
        if(this.pos + 10 > this.posCrystal.y + 5) {
          this.addResultsFromCurrentAnswer();
        }
      }
      else if (this.pos > this.endPosition ) {
        clearInterval(this.timer);
        this.increaseWrongWord();

      } else {
        this.pos += 1;
        elem.style.top = `${this.pos}px`;
        }
      }, 20);
  }

  increaseWrongWord(){
    this.currentElement.classList.add('process__fall_wrong');
    const life = document.querySelector('.process__heart');
    life.classList.remove('process__heart');
    life.src = 'assets/img/icons/heart-minus.svg';
    this.playAudio('assets/audio/error.mp3');
    setTimeout(() =>{
      this.data[this.currentAnswer].isError = false;
      this.errors += 1;
      this.addResultsFromCurrentAnswer();
    }, 1000);
  }

  startGame() {
    this.getRoundData().then(() => {
      this.generateAnswers();
      this.addAnswersClickHandler();
      this.addKeyboardEventsHandler();
      this.addAudioButtonClickHandler();
      this.startTask();
    }).catch((err) => {
      // eslint-disable-next-line no-undef
      UIkit.notification({
        message: `<span uk-icon='icon: warning'></span> ${err} Будет выполнен автоматический переход на стартовую страницу через несколько секунд`,
        status: 'warning',
        pos: 'top-center',
      });
      setTimeout(()=>{
        document.querySelector('.btn_return').click();
      }, 3000);
    });
  }

  startTask() {
    this.getRightAnswer();
    this.getWords();
    this.pos = 0;
    this.correct = false;
    this.clearClassesFromElements();
    this.fillAnswers();
    this.generateWord();
    this.moveElement();
  }

  getRightAnswer() {
    this.rightAnswer = getRandomInt(this.answersAmnt);
  }

  async getRoundData() {
    if (this.mode === GAME_MODES.all) {
      this.data = await getFullDataWords(this.level, this.round, this.wordsAmntInRound);
      shuffleArray(this.data);
    } else {
      const userData = await getAllUserWords();
      if (userData.length < this.wordsAmntInRound) {
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
      console.log(this.data);
    }

    this.data = this.data.filter((data) => data !== undefined);
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
      const answer = createElement('li', 'process__answer', [], [['data-number', i]]);
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
          this.correct = true;
          removeChild(this.currentElement);
          this.currentElement.innerText = '|';
          this.playAudio('assets/audio/correctAnswer.mp3');
        } else {
          this.increaseWrongWord();
          const answerCorrect = document.querySelector(`li[data-number='${this.rightAnswer}']`);
          answerCorrect.classList.add('answer_correct');
          answer.classList.add('answer_wrong');
        }
      };
    });
  };

  clearClassesFromElements(){
    this.answers.forEach((element)=>{
      element.className = 'process__answer';
    });
  }

  playAudio(audioSrc){
    if(this.isAudioPlay){
      stopAudio();
      playAudio(audioSrc);
    }
  }

  addResultsFromCurrentAnswer() {
    const countLifes = 5;
    this.currentElement.remove();
    clearInterval(this.timer);
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
        if (this.currentAnswer < this.wordsAmntInRound  && this.errors < countLifes) {
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
      switch (event.key) {
        case '1':
          answer = 0;
          break;
        case '2':
          answer = 1;
          break;
        case '3':
          answer = 2;
          break;
        case '4':
          answer = 3;
          break;
        case '5':
          answer = 4;
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
        this.btnAudio.src = 'assets/img/icons/sound-off.svg';      }
        stopAudio();
    });
  }

  showStatistics() {
   createStaticticsRound();
   addStatisticsRound(this.data, this.mode === GAME_MODES.learned);
    // eslint-disable-next-line no-undef
    UIkit.modal('.modal-round').show();
  }
}
