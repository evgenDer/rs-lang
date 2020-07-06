/* eslint-disable no-param-reassign */

import { createElement } from '../utils/create';
import { GAME_MODES, GAME_DATA_URL, ERR_MSG } from '../games/constants';
import { getFullDataWords, getWordById } from '../api/words';
import { showElement, hideElement } from '../helpers/html-helper';
import { getRandomInt, shuffleArray } from '../helpers/math-hepler';
import * as ProgressBar from '../games/progress-bar';
import { selectNextRound, getCurrentRound, getCurrentLevel } from '../games/dropdown';
import { Statistics } from '../statistics/components/statistics';
import { addStatisticsRound, createStaticticsRound } from './statistics';
import { increaseWordErrorCount, increaseWordReferenceCount } from '../words/updateWordState';
import { getAllUserWords, updateUserWord } from '../api/userWords';
import { AUDIO_B64, IMG_B64, WORD_STATE } from '../utils/constants';
import { saveCustomConfiguration } from '../configuration/index';


const loader = document.querySelector('.audiochallenge__load-page');
const startLoading = () => showElement(loader);
const stopLoading = () => hideElement(loader);

const backGameBtn = document.querySelector('.audiochallenge__exit > .exit__back');


// eslint-disable-next-line import/prefer-default-export
export class Game {
  constructor(mode = GAME_MODES.all, level = 0, round = 0) {
    this.name = 'Аудиовызов';

    this.mode = mode;
    this.level = level;
    this.round = round;
    this.answersAmnt = 5;

    this.task = {
      desc: document.querySelector('.task__desc'),
      audio: document.querySelector('.task__audio'),
      imgContainer: document.querySelector('.task__img'),
      img: document.querySelector('.task__img img'),
      word: document.querySelector('.word__eng'),
      transcription: document.querySelector('.word__transcr'),
      exampleSentence: document.querySelector('.example__eng'),
      exampleSentenceRus: document.querySelector('.example__rus'),
      wordSpeakerSrc: '',
      exampleSpeakerSrc: '',
      id: '',
      progress: {
        bar: document.querySelector('.game-progress'),
        points: [],
      },
    };

    this.errors = 0;
    this.answers = [];

    this.gameField = document.querySelector('.audiochallenge__game-field');
    this.answersContainer = document.querySelector('.game-field__answers');
    this.controlBtn = document.querySelector('.game-field__control');

    this.speakers = {
      main: document.getElementById('main-speaker'),
      word: document.getElementById('word-speaker'),
      example: document.getElementById('example-speaker'),
    }

    this.wordsAmntInRound = 20;
    this.data = [];
    this.userData = [];
    this.words = [];
    this.allRoundTranslations = [];
    this.rightAnswer = 0;
    this.currentAnswer = 0;

    this.statistics = new Statistics(this.name);
  }

  startGame() {
    hideElement(backGameBtn);
    startLoading();

    this.getRoundData().then(() => {
      stopLoading();
      showElement(backGameBtn);

      showElement(this.gameField);

      this.generateAnswers();
      this.addAnswersClickHandler();
      this.addKeyboardEventsHandler();
      this.addControlClickHandler();

      this.generateProgressBar();
      this.prepareGameField();

      this.startTask();
    }).catch((err) => {
      // eslint-disable-next-line no-undef
      UIkit.notification({
        message: `<span uk-icon='icon: warning'></span> ${err}`,
        status: 'warning',
        pos: 'top-center',
      });

      stopLoading();
      backGameBtn.click();
    });
  }

  startTask() {
    this.prepareGameField();

    this.getRightAnswer();
    this.getWords();

    this.fillAnswers();
    this.fillTask();

    this.addAudioButtonsClickHandler();

    this.playTask();
  }

  prepareGameField() {
    this.clearAnswers();
    this.hideRightAnswer();
    this.enableAnswers();
    this.setContolButtonIdnkMode();
    this.removeAudioButtonsClickHandler();

    ProgressBar.setCurrentProgressPoint(this.task.progress.points[this.currentAnswer]);
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
        .filter((word) => word.optional.mode !== WORD_STATE.deleted)
        .sort((a, b) => a.optional.successPoint - b.optional.successPoint)
        .slice(0, this.wordsAmntInRound);
      shuffleArray(this.userData);

      const promises = [];
      this.userData.forEach(({ wordId }) => promises.push(getWordById(wordId)));

      this.data = await Promise.all(promises);
    }

    this.allRoundTranslations = await this.getAllGroupWordTranslatons();
  }

  async getAllGroupWordTranslatons() {
    const dataWords = this.data.map(({ wordTranslate }) => wordTranslate);

    const allData = await getFullDataWords(this.level, 0, 1000);

    const allWords = allData
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
      [...answer.children].forEach((child, ind) => {
        child.textContent = ind ? this.words[index] : index + 1;
      });
    });
  }

  fillTask() {
    const currentData = this.data[this.currentAnswer];

    const audioHelper = this.mode === GAME_MODES.all ? GAME_DATA_URL : AUDIO_B64;
    const imgHelper = this.mode === GAME_MODES.all ? GAME_DATA_URL : IMG_B64;

    this.task.id = currentData.id;
    this.task.word.textContent = currentData.word;
    this.task.transcription.textContent = currentData.transcription;
    this.task.exampleSentence.innerHTML = currentData.textExample;
    this.task.exampleSentenceRus.textContent = currentData.textExampleTranslate;

    this.task.img.src = `${imgHelper}${currentData.image}`;
    this.task.wordSpeakerSrc = `${audioHelper}${currentData.audio}`;
    this.task.exampleSpeakerSrc = `${audioHelper}${currentData.audioExample}`;
  }

  clearAnswers() {
    this.answers.forEach((answer) => {
      [...answer.children].forEach((child) => {
        child.textContent = '';
      });
      answer.classList.remove('answer_wrong');
      answer.classList.remove('uk-animation-shake');
      answer.classList.remove('answer_correct');
    });
  }

  showRightAnswer() {
    hideElement(this.task.audio);
    showElement(this.task.imgContainer);
    showElement(this.task.desc);

    this.answers[this.rightAnswer].click();
  }

  hideRightAnswer() {
    hideElement(this.task.imgContainer);
    hideElement(this.task.desc);
    showElement(this.task.audio);
  }

  generateAnswers() {
    this.clearGameField();
    for (let i = 0; i < this.answersAmnt; i += 1) {
      const number = createElement('p', 'answer__number');
      const word = createElement('p', 'answer__word');
      const answer = createElement('div', 'game-field__answer', [number, word]);

      this.answers.push(answer);
      this.answersContainer.appendChild(answer);
    }
  }

  clearGameField() {
    this.answersContainer.innerHTML = '';
  }

  getAnswerIndex(text) {
    const word = text
      .trim()
      .split('')
      .filter((element) => element !== '' && !Number.isInteger(parseFloat(element)))
      .join('');
    return this.words.indexOf(word);
  }
  
  addAnswersClickHandler() {
    this.answers.forEach((answer) => {
      answer.onclick = ({ target }) => {
        let answerIndex = this.getAnswerIndex(target.textContent);
        if (answerIndex === -1) {
          answerIndex = this.getAnswerIndex(target.nextSibling.textContent);
        }
        
        if (answer.classList.contains('answer_disabled')) {
          // do nothing
        } else if (answerIndex === this.rightAnswer) {
          this.showRightAnswer();
          answer.classList.add('answer_correct');
          ProgressBar.setRightProgressPoint(this.task.progress.points[this.currentAnswer]);

          this.disableAnswers();
          this.setContolButtonNextMode();
        } else {
          answer.classList.add('answer_wrong');
          answer.classList.add('uk-animation-shake');

          this.errors += 1;
          ProgressBar.setWrongProgressPoint(this.task.progress.points[this.currentAnswer]);
        }
      };
    });
  }

  disableAnswers() {
    this.answers.forEach((answer) => {
      answer.classList.add('answer_disabled');
    })
  }

  enableAnswers() {
    this.answers.forEach((answer) => {
      answer.classList.remove('answer_disabled');
    })
  }

  setContolButtonNextMode() {
    this.controlBtn.classList.remove('game-field__control_idnk');
    this.controlBtn.classList.add('game-field__control_next');
  }

  setContolButtonIdnkMode() {
    this.controlBtn.classList.remove('game-field__control_next');
    this.controlBtn.classList.add('game-field__control_idnk');
  }

  addControlClickHandler() {
    this.controlBtn.onclick = ({ path }) => {
      let target;

      path = path.reverse();
      for (let i = 0; i < path.length; i += 1) {
        const { classList } = path[i];
        if (classList && classList.contains('game-field__control')) {
          target = path[i];
          break;
        }
      }
      
      if (target.classList.contains('game-field__control_next')) {
        const currentAnswer = this.data[this.currentAnswer];
        const isRight = ProgressBar.isRightProgressPoint(this.task.progress.points[this.currentAnswer]);

        this.statistics.updateStatistics(currentAnswer.word, isRight, this.level);
        currentAnswer.isCorrect = isRight;
        currentAnswer.isError = !isRight;

        if (this.mode === GAME_MODES.learned) {
          const currentUserData = this.userData[this.currentAnswer];
          if (isRight) {
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
          backGameBtn.click();

          saveCustomConfiguration('audioCall', { level: getCurrentLevel(), round: getCurrentRound() });

          createStaticticsRound();
          addStatisticsRound(this.data, this.mode === GAME_MODES.learned);
          // eslint-disable-next-line no-undef
          UIkit.modal('.modal-round').show();
        }
      } else if (target.classList.contains('game-field__control_idnk')) {
        this.errors += 1;
        ProgressBar.setWrongProgressPoint(this.task.progress.points[this.currentAnswer]);

        this.showRightAnswer();
        this.setContolButtonNextMode();
      }
    };
  }

  addKeyboardEventsHandler() {
    document.onkeydown = (event) => {
      event.preventDefault();
      
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

        case 'Digit5':
          answer = 4;
          break;

        case 'Enter':
          this.controlBtn.click();
          break;
      
        default:
          break;
      }

      if (answer !== -1) {
        this.answers[answer].click();
      }
    };
  }

  addAudioButtonsClickHandler() {
    const playAudio = (src) => {
      const audio = new Audio(src);
      audio.play();
    }
    const playWordAudio = () => playAudio(this.task.wordSpeakerSrc);
    const playExampleAudio = () => playAudio(this.task.exampleSpeakerSrc);

    this.speakers.main.onclick = playWordAudio;
    this.speakers.word.onclick = playWordAudio;
    this.speakers.example.onclick = playExampleAudio;
  }

  removeAudioButtonsClickHandler() {
    this.speakers.main.onclick = null;
    this.speakers.word.onclick = null;
    this.speakers.example.onclick = null;
  }

  playTask() {
    this.speakers.main.click();
  }

  generateProgressBar() {
    this.task.progress.bar.innerHTML = '';
    for (let i = 0; i < this.wordsAmntInRound; i += 1) {
      this.task.progress.bar.append(createElement('span', 'game-progress__point'));
    }
    this.task.progress.points = document.querySelectorAll('.game-progress__point');
  }

  stopGame() {
    document.onkeydown = null;
    this.answers.forEach((answer) => {
      answer.onclick = null;
    });
    this.controlBtn.onclick = null;

    hideElement(this.gameField);
  }
}
