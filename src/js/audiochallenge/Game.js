/* eslint-disable no-param-reassign */

import { createElement } from '../utils/create';


export const GAME_MODES = {
  learned: 'Изученные',
  all: 'Все',
};


export class Game {
  constructor(mode = GAME_MODES.all, level = 1, round = 1) {
    this.mode = mode;
    this.level = level;
    this.round = round;
    this.answersAmnt = 5;

    this.task = {
      img: document.querySelector('.task__img'),
      audio: document.querySelector('.task__audio'),
      desc: document.querySelector('.task__desc'),
    };

    this.errors = 0;
    this.answers = [];

    this.answersContainer = document.querySelector('.game-field__answers');
    this.controlBtn = document.querySelector('.game-field__control');

    this.words = ['машина', 'очень-очень-длинное-слово', 'компьютер', 'телевизор', 'стол'];
    this.rightAnswer = 3;

    this.generateAnswers();
    this.addAnswersClickHandler();
    this.addKeyboardEventsHandler();
    this.addControlClickHandler();

    this.startGame();
  }

  startGame() {
    this.clearAnswers();

    this.hideRightAnswer();
    this.fillAnswers();
    this.setContolButtonIdnkMode();
    // words
  }

  fillAnswers() {
    this.answers.forEach((answer, index) => {
      [...answer.children].forEach((child, ind) => {
        child.textContent = ind ? this.words[index] : index + 1;
      });
    });
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
    this.task.audio.classList.add('hidden');
    this.task.img.classList.remove('hidden');
    this.task.desc.classList.remove('hidden');

    this.answers[this.rightAnswer].click();
  }

  hideRightAnswer() {
    this.task.img.classList.add('hidden');
    this.task.desc.classList.add('hidden');
    this.task.audio.classList.remove('hidden');
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
        
        if (answerIndex === this.rightAnswer) {
          this.showRightAnswer();
          answer.classList.add('answer_correct');

          this.setContolButtonNextMode();
        } else {
          answer.classList.add('answer_wrong');
          answer.classList.add('uk-animation-shake');

          this.errors += 1;
        }
      });
    });
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
        // next
        this.startGame();
        //
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
}
