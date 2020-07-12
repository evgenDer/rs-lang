import {  getFullDataWords  } from '../api/words';
import { getRandomInt, shuffleArray } from '../helpers/math-hepler';
import { addAnswerField } from './html';
import { createElement } from '../utils/create';
import { removeChild } from '../helpers/html-helper';
import { addStatisticRound, createStaticticRound} from './result';

export default class Determinate {
  constructor() {
    this.level = 0;

    this.words = [];
    this.data = [];
    this.resultDataPage = [];

    this.correct = [];
    this.errors = [];

    this.totalCorrect = 0;
    this.totalErrors = 0;

    this.elements = {
      card: document.querySelector('.main-card__body'),
    }

    this.wordsAmntInRound = 5;
  }

  async getData() {
    const countRounds = 30;
    const round = getRandomInt(countRounds);
    this.data = [];
    this.data = await getFullDataWords(this.level, round, this.wordsAmntInRound);
    shuffleArray(this.data);
    this.words = [];
    this.words = await this.getAllGroupWord();
  }

  async getAllGroupWord() {
    const dataWords = this.data.map(({ word }) => word);

    const allData = await getFullDataWords(this.level, 0, 100);

    const allWords = allData
      .map(({ word }) => word)
      .filter((word) => word !== '' && !dataWords.includes(word));

    return allWords;
  }

  start() {
    removeChild(this.elements.card);
    const spinner = `<div style="height: 80px; width: 80px; margin-top: 5vh" uk-spinner="ratio: 4.5"></span>`;
    this.elements.card.insertAdjacentHTML('beforeend', spinner);
    this.getData().then(() => {
      removeChild(this.elements.card);
      const answerField = createElement('div', 'answers-field');
      this.elements.card.append(answerField);
      addAnswerField(this.data, this.words, this.level);
      this.addEventLestenersOnButtons();
    });
  }

  checkAnswers() {
    this.correct.push(0);
    this.errors.push(0);
    for (let i = 0; i < this.wordsAmntInRound; i += 1) {
      const answers = document.getElementsByName(`${i}`);
      answers.forEach((element) => {
        if (element.checked) {
          const textElememnt = element.parentElement;
          const wordString = textElememnt.innerText;
          const word = wordString.trim();
          if (word === this.data[i].word) {
            this.data[i].result = true;
            this.totalCorrect += 1;
            this.correct[this.level] += 1;
          } else {
            this.data[i].result = false;
            this.totalErrors += 1;
            this.errors[this.level] += 1;
          }
        }
      });
    }
    this.resultDataPage.push(this.data);
  }

  addResults() {
    const dataPage = this.resultDataPage.flat(Infinity);
    createStaticticRound(this.totalCorrect, this.totalErrors, this.errors).then(() => {
      addStatisticRound(dataPage);
    });
  }

  addEventLestenersOnButtons() {
    document.querySelector('.main-card__body_btn-next').addEventListener('click', () => {
      this.checkAnswers();
      if (this.level === this.wordsAmntInRound) {
        this.addResults();
      } else {
        this.level += 1;
        this.start();
      }
    });
  }
}
