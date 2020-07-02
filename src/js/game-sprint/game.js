import { GAME_MODES, SPRINT_MODES } from '../games/constants';
import { showElement, hideElement, removeChild } from '../helpers/html-helper';
import { getFullDataWords } from '../api/words';
import timer from './timer';
import { shuffleArray, getRandomInt } from '../helpers/math-helper';
import playAudio from '../helpers/audio';
import Card from './card';

const playPage = document.querySelector('.game-sprint__play');
const loadPage = document.querySelector('.game-sprint__load');

export default class Game {
  constructor(mode = GAME_MODES.all, level = 1, round = 1) {
    this.mode = mode;
    this.level = level;
    this.round = round;

    this.data = [];
    this.translateWords = [];
    this.words = [];

    this.wordsAmntInRound = 100;
    this.answersAmnt = 2;
    this.rightAnswer = 0;
    this.currentAnswer = 0;

    this.card = new Card();

    this.playElements = {
      points: document.querySelector('.game-sprint__play_mark p'),
      images: document.querySelector('.body__images'),
      enhasment: document.querySelector('.card__result p'),
      cardAnswers: document.querySelector('.card__answers'),
      word: document.querySelector('.word_learn'),
      translation: document.querySelector('.word_translate'),
    };

    this.numberEnhasment = 0;
    this.currentPoint = SPRINT_MODES[this.numberEnhasment].points;
    this.seriesOfCorrect = 0;
    this.resultPoints = 0;
    this.correct = 0;
    this.errors = 0;

  }

  async getRoundData() {
    this.data = await getFullDataWords(this.level, this.round, this.wordsAmntInRound);
    shuffleArray(this.data);
    this.allRoundTranslations = await this.getAllGroupWordTranslatons();
  }

  async getAllGroupWordTranslatons() {
    const dataWords = this.data.map(({ wordTranslate }) => wordTranslate);
    const allData = await getFullDataWords(this.level, 0, 600);
    const allWords = allData
      .map(({ wordTranslate }) => wordTranslate)
      .filter((word) => !dataWords.includes(word));
    return allWords;
  }

  static getSimilarWords(sample, words) {
    const ending = sample.slice(-2);
    const begining = sample.slice(0, 2);

    let similarWords = words.filter((word) => word.slice(-2) === ending || word.slice(0, 2) === begining);
    similarWords = [...new Set(similarWords)];
    shuffleArray(similarWords);
    similarWords = similarWords.slice(0, this.answersAmnt);

    while (similarWords.length < this.answersAmnt) {
      similarWords.push(words[getRandomInt(words.length - 1)]);
    }
    return similarWords;
  }

  getWords() {
    const currentWord = this.data[this.currentAnswer].wordTranslate;
    this.words = Game.getSimilarWords(currentWord, this.allRoundTranslations);
    this.words[this.rightAnswer] = currentWord;
  }

  getRightAnswer() {
    this.rightAnswer = getRandomInt(this.answersAmnt);
  }

  fillDataWord() {
    const currentData = this.data[this.currentAnswer];
    this.playElements.word.innerText = currentData.word;
    // eslint-disable-next-line prefer-destructuring
    this.playElements.translation.innerText = this.words[0];
    // this.currentAnswer += 1;
  }

  startGame(){
    hideElement(loadPage);
    removeChild(loadPage);
    showElement(playPage);
    playAudio('assets/audio/start.mp3');
    const startTimer = timer(60, 'play__time', '', this, this.generateResults);
    startTimer();

  }

  addClassesOnCard(){
    if(this.data[this.currentAnswer].wordTranslate === this.words[0]){
      this.correct += 1;
      this.card.addCorrectAnswer();
    }
    else {
      this.errors += 1;
      this.card.addErrorAnswer();
    }
  }

  generateResults(){}

  generateFieldOfGame() {
    this.playElements.points.innerText = 0;
    this.playElements.enhasment.innerText = SPRINT_MODES[this.numberEnhasment].innerText;
    const openPage = document.querySelector('img[alt="bird"]');
    openPage.style.marginLeft = '15px';
    this.getRoundData().then(() => this.generateNewGame());
  }

  generateNewGame(){
    this.getRightAnswer();
    this.getWords();
    this.fillDataWord();
  }

};
