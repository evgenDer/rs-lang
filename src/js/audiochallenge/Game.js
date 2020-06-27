/* eslint-disable no-param-reassign */

import { createElement } from '../utils/create';
import { GAME_MODES, GAME_DATA_URL } from '../games/constants';
import { getFullDataWords } from '../api/words';
import { showElement, hideElement } from '../helpers/html-helper';
import { getRandomInt } from '../helpers/math-hepler';


// eslint-disable-next-line import/prefer-default-export
export class Game {
  constructor(mode = GAME_MODES.all, level = 1, round = 1) {
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
    };

    this.errors = 0;
    this.answers = [];

    this.answersContainer = document.querySelector('.game-field__answers');
    this.controlBtn = document.querySelector('.game-field__control');

    this.speakers = {
      main: document.getElementById('main-speaker'),
      word: document.getElementById('word-speaker'),
      example: document.getElementById('example-speaker'),
    }

    this.wordsAmntInRound = 20;
    this.data = [];
    this.words = [];
    this.rightAnswer = 0;
    this.currentAnswer = 0;

    this.generateAnswers();
    this.addAnswersClickHandler();
    this.addKeyboardEventsHandler();
    this.addControlClickHandler();
  }

  startGame() {
    this.prepareGameField();

    this.getRoundData().then(() => this.startTask());
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
  }

  getRightAnswer() {
    this.rightAnswer = getRandomInt(this.answersAmnt);
  }

  async getRoundData() {
    this.data = await getFullDataWords(this.level - 1, this.round - 1, this.wordsAmntInRound);
  }

  getWords() {
    this.words = ['машина', 'стол', 'стул', 'вилка', 'ложка'];
    this.words[this.rightAnswer] = this.data[this.currentAnswer].wordTranslate;
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

    this.task.img.src = `${GAME_DATA_URL}${currentData.image}`;
    this.task.word.textContent = currentData.word;
    this.task.transcription.textContent = currentData.transcription;
    this.task.exampleSentence.innerHTML = currentData.textExample;
    this.task.exampleSentenceRus.textContent = currentData.textExampleTranslate;

    this.task.wordSpeakerSrc = `${GAME_DATA_URL}${currentData.audio}`;
    this.task.exampleSpeakerSrc = `${GAME_DATA_URL}${currentData.audioExample}`;

    this.task.id = currentData.id;
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
  
  addAnswersClickHandler() {
    this.answers.forEach((answer) => {
      answer.addEventListener('click', ({ target }) => {
        const word = target.textContent
          .trim()
          .split(' ')
          .pop()
          .split('')
          .filter((element) => element !== '' && !Number.isInteger(+element))
          .join('');
        const answerIndex = this.words.indexOf(word);
        
        if (answer.classList.contains('answer_disabled')) {
          // do nothing
        } else if (answerIndex === this.rightAnswer) {
          this.showRightAnswer();
          answer.classList.add('answer_correct');

          this.disableAnswers();
          this.setContolButtonNextMode();
        } else {
          answer.classList.add('answer_wrong');
          answer.classList.add('uk-animation-shake');

          this.errors += 1;
        }
      });
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
    this.controlBtn.addEventListener('click', ({ path }) => {
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
        this.currentAnswer += 1;
        if (this.currentAnswer < this.wordsAmntInRound) {
          this.startTask();
        } else {
          // results
        }
      } else if (target.classList.contains('game-field__control_idnk')) {
        this.errors += 1;
        this.showRightAnswer();
        this.setContolButtonNextMode();
      }
    });
  }

  addKeyboardEventsHandler() {
    document.addEventListener('keydown', (event) => {
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
    });
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
}
