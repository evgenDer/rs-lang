import { GAME_MODES, SPRINT_MODES, ERR_MSG } from '../games/constants';
import { showElement, hideElement, removeChild } from '../helpers/html-helper';
import { getFullDataWords, getWordById } from '../api/words';
import { timer, clearTimer } from './timer';
import { shuffleArray, getRandomInt } from '../helpers/math-helper';
import { playAudio, stopAudio } from '../helpers/audio';
import Card from './card';
import { DATA_URL, AUDIO_B64, WORD_STATE } from '../utils/constants';
import { addStatisticRoundSprint, createStaticticRound } from './statistic';
import { selectNextRound, getCurrentLevel, getCurrentRound } from '../games/dropdown';
import { saveCustomConfiguration } from '../configuration/index';
import { increaseWordErrorCount, increaseWordReferenceCount } from '../words/updateWordState';
import { getAllUserWords, updateUserWord } from '../api/userWords';

const SERIES_LENGTH = 4;

const playPage = document.querySelector('.game-sprint__play');
const loadPage = document.querySelector('.game-sprint__load');
const startPage = document.querySelector('.game-sprint__start');

export default class Game {
  constructor(mode = GAME_MODES.all, level = 1, round = 1) {
    this.mode = mode;
    this.level = level;
    this.round = round;

    this.data = [];
    this.translateWords = [];
    this.words = [];
    this.userData = [];

    this.wordsAmntInRound = 100;
    this.answersAmnt = 2;
    this.currentTranslateAnswer = 0;
    this.currentAnswer = 0;

    this.card = new Card();

    this.playElements = {
      points: document.querySelector('.game-sprint__play_mark p'),
      images: document.querySelector('.body__images'),
      enhasment: document.querySelector('.card__result p'),
      cardAnswers: document.querySelector('.card__answers'),
      word: document.querySelector('.word_learn'),
      translation: document.querySelector('.word_translate'),
      btnCorrect: document.querySelector('.btn_correct'),
      btnWrong: document.querySelector('.btn_wrong'),
    };

    this.numberEnhasment = 0;
    this.currentPoint = SPRINT_MODES[this.numberEnhasment].points;
    this.seriesOfCorrect = 0;
    this.resultPoints = 0;
    this.correct = 0;
    this.errors = 0;
    this.points = 0;

    this.isError = false;

  }

  async getRoundData() {

  if (this.mode === GAME_MODES.all) {
    this.data = await getFullDataWords(this.level, this.round, this.wordsAmntInRound);
    shuffleArray(this.data);
    saveCustomConfiguration('sprint', { level: getCurrentLevel(), round: getCurrentRound() });
  } else {
    const userData = await getAllUserWords();
    if (userData.length < this.wordsAmntInRound) {
      this.isError = true;
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
    const allData = await getFullDataWords(this.level, 0, 600);
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
    this.data[this.currentAnswer].correct = 0;

    const currentWord = this.data[this.currentAnswer].wordTranslate;
    this.words = this.getSimilarWords(currentWord, this.allRoundTranslations);
    this.words[this.rightAnswer] = currentWord;
  }

  getRightAnswer() {
    this.rightAnswer = getRandomInt(this.answersAmnt);
  }

  fillDataWord() {
    const currentData = this.data[this.currentAnswer];
    this.playElements.word.innerText = currentData.word;
    // eslint-disable-next-line prefer-destructuring
    this.currentTranslateAnswer = getRandomInt(this.words.length);
    this.playElements.translation.innerText = this.words[this.currentTranslateAnswer];
  }

  startGame(){
    hideElement(loadPage);
    removeChild(loadPage);
    if(!this.isError){
      showElement(playPage);
      const startTimer = timer(1, 'play__time', '', this, this.generateResults);
      startTimer();
      playAudio('assets/audio/start.mp3');
      this.addButtonClickHandler();
    }
    else {
      stopAudio();
      showElement(startPage);
    }
  }

  increaseCorrectAnswers(){
    this.data[this.currentAnswer].isCorrect = true;
    this.data[this.currentAnswer].isError = false;
    this.seriesOfCorrect += 1;
    this.points += SPRINT_MODES[this.numberEnhasment].points;
    this.playElements.points.innerText = this.points;
    this.checkSeries();
    this.card.addCorrectCard(this.numberEnhasment);
    if (this.mode === GAME_MODES.learned) {
      const currentUserData = this.userData[this.currentAnswer];
      increaseWordReferenceCount(currentUserData);
      updateUserWord(currentUserData.wordId, currentUserData);
    }
    const img = document.querySelector('.card__answers .hidden');
    if(this.numberEnhasment === SPRINT_MODES.length - 1 && this.seriesOfCorrect !== SERIES_LENGTH){
      playAudio('assets/audio/correctAnswer.mp3');
    }
    else if((img && this.seriesOfCorrect > 0) || !this.numberEnhasment){
      showElement(img);
      playAudio('assets/audio/correctAnswer.mp3');
    }
    this.generateNextWord();

  }

  increaseErrorAnswers(){
    this.data[this.currentAnswer].isError = true;
    this.data[this.currentAnswer].isCorrect = false;
    this.seriesOfCorrect = 0;
    this.numberEnhasment = 0;
    this.playElements.enhasment.innerText = '';
    playAudio('assets/audio/error.mp3');
    this.card.addErrorCard();
    this.generateNextWord();
    if (this.mode === GAME_MODES.learned) {
      const currentUserData = this.userData[this.currentAnswer];
      increaseWordErrorCount(currentUserData);
      updateUserWord(currentUserData.wordId, currentUserData);
    }
  }

  checkSeries(){
    if (this.seriesOfCorrect === SERIES_LENGTH)
    {
      if(this.numberEnhasment !== SPRINT_MODES.length - 1){
        this.numberEnhasment += 1;
        this.playElements.enhasment.innerText = SPRINT_MODES[this.numberEnhasment].innerText;
      }
      this.card.addNewMode(this.numberEnhasment);
      this.seriesOfCorrect = 0;
    }
  }

  addButtonClickHandler(){
    this.playElements.btnCorrect.addEventListener('click', () => {
      if(this.data[this.currentAnswer].wordTranslate === this.words[this.currentTranslateAnswer]){
        this.increaseCorrectAnswers();
      } else this.increaseErrorAnswers();
    });
    playPage.querySelector('.btn_exit').addEventListener('click', () => {
      stopAudio();
      hideElement(playPage);
      showElement(startPage);
      clearTimer();
    });
    this.playElements.btnWrong.addEventListener('click', () => {
      if(this.data[this.currentAnswer].wordTranslate !== this.words[this.currentTranslateAnswer]){
        this.increaseCorrectAnswers();
      } else this.increaseErrorAnswers();
    });
    document.addEventListener('keydown', (event) => {
      const {key} = event;
      if(key === 'ArrowLeft') {
        this.playElements.btnWrong.click();
      }
      if(key === 'ArrowRight'){
        this.playElements.btnCorrect.click();
      }
    });

    const audioHelper = this.mode === GAME_MODES.all ? DATA_URL : AUDIO_B64;

    document.querySelector('.btn_pronoucing').addEventListener('click', () => {
      playAudio(`${audioHelper}${this.data[this.currentAnswer].audio}`);
    });
    document.querySelector('.btn_audioexample').addEventListener('click', () => {
      playAudio(`${audioHelper}${this.data[this.currentAnswer].audioExample}`);
    });
  }

  generateNextWord(){
    this.currentAnswer += 1;
    if (this.currentAnswer === this.wordsAmntInRound) {
      this.generateResults();
    }
    else {
      this.generateNewCard();
    }
  }

  generateResults(){
    clearTimer();
    hideElement(playPage);
    selectNextRound();
    const spinner = `<div style="height: 80px; width: 80px; margin-top: 20vh" uk-spinner="ratio: 4.5"></span>`;
    loadPage.insertAdjacentHTML('beforeend', spinner);
    showElement(loadPage);
    createStaticticRound(this.points).then(() => {
      hideElement(loadPage);
      showElement(startPage);
      addStatisticRoundSprint(this.data, this.points);
      // eslint-disable-next-line no-undef
      UIkit.modal('.modal-round').show();
      const btnClose = document.getElementById('modal-btn-close');
      btnClose.addEventListener('click', () => {
        document.querySelector('.modal-round').remove();
      });
    });
  }

  generateFieldOfGame() {
    this.playElements.points.innerText = 0;
    this.playElements.enhasment.innerText = SPRINT_MODES[this.numberEnhasment].innerText;
    const openPage = document.querySelector('img[alt="bird"]');
    openPage.style.marginLeft = '15px';
    this.card.addProgressBar();
    this.getRoundData().then(() => this.generateNewCard()).catch((err) => {
      // eslint-disable-next-line no-undef
      UIkit.notification({
        message: `<span uk-icon='icon: warning'></span> ${err}`,
        status: 'warning',
        pos: 'top-center',
      });
    hideElement(playPage);
    showElement(loadPage);
    });
  }

  generateNewCard(){
    this.getRightAnswer();
    this.getWords();
    this.fillDataWord();
  }

};
