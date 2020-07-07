/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import Sentence from './sentence';
import { createElement } from '../../utils/create';
import { removeChild, removeAllButtons, insertNewButtons } from '../../utils/helpers';
import { BUTTONS_CLASSES, DATA_URL } from '../../utils/constants';
import { addHintShowImage, addHints } from './hints';
import { DEFAULT_SETTINGS_PUZZLE } from '../../constants/default-settings';
import Sortable from '../../../../node_modules/sortablejs';
import { createStaticticRound } from './statistic';
import { hideElement } from '../../helpers/html-helper';
import { updateUserWord } from '../../api/userWords';
import { increaseWordReferenceCount, increaseWordErrorCount } from '../../words/updateWordState';
import { Statistics } from '../../statistics/components/statistics';
import { getGameMode } from '../../games/gameModeSwitch';
import { GAME_MODES } from '../../games/constants';


const COUNT_SENTENCE = 10;
const RESULT_FIELD = document.querySelector('.block-results');
const SOURCE_FIELD = document.querySelector('.block-source');

// eslint-disable-next-line func-names
HTMLAudioElement.prototype.stop = function () {
  this.pause();
  this.currentTime = 0.0;
};
function addImageInPage(image, infoAboutImage) {
  createStaticticRound(image.src, infoAboutImage);
  const sourceField = document.querySelector('.block-source');
  const resultField = document.querySelector('.block-results');
  removeChild(sourceField);
  const infoPage = createElement('p', '', [], [], infoAboutImage);
  const imageRound = createElement('img', '',[], [['src', image.src]]);
  sourceField.append(infoPage);
  resultField.append(imageRound);
}
export default class Round {
  constructor(level, page, dataPage, infoAboutImage) {
    this.page = page;
    this.level = level;
    this.image = new Image();
    this.audioSentence = new Audio();
    this.dataPage = dataPage;
    this.srcImagesParts = [];
    this.currentSentenceNumber = 0;
    this.width = RESULT_FIELD.offsetWidth + 1;
    this.height = RESULT_FIELD.offsetHeight;
    this.infoAboutImage = infoAboutImage;
    this.currentSentence = {};
    this.correct = 0;
    this.errors = 0;
  }

  generateNewRoundOnPage(imageSrc) {
    this.image.onload = () => {
      removeChild(RESULT_FIELD);
      removeChild(SOURCE_FIELD);
      this.generateNewRoundImages();
      this.generateSentenceInRound();
    };
    this.image.setAttribute('crossorigin', 'anonymous');
    this.image.src = imageSrc;
    this.image.classList.add('hidden');
    RESULT_FIELD.append(this.image);
  }

  generateNewRoundImages() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const height = this.height / COUNT_SENTENCE;
    for (let i = 0; i < COUNT_SENTENCE; i += 1) {
      const y = -(height * i);
      canvas.width = this.width;
      canvas.height = this.height / COUNT_SENTENCE;
      ctx.drawImage(this.image, 0, y, this.width, height * COUNT_SENTENCE);
      this.srcImagesParts.push(canvas.toDataURL());
    }
  }

  generateSentenceInRound() {
    const slicedImage = new Image();
    slicedImage.src = this.srcImagesParts[this.currentSentenceNumber];
    slicedImage.onload = () => {
      removeAllButtons();
      removeChild(SOURCE_FIELD);
      const height = this.height / COUNT_SENTENCE;
      const textExample = this.dataPage[this.currentSentenceNumber].textExample.replace(/<\/?[a-zA-Z]+>/gi, '');
      this.currentSentence = new Sentence(slicedImage, textExample, this.width, height);
      const currentSentenceElement = createElement('div', 'sentence current');
      currentSentenceElement.style.paddingLeft = `${this.height /(2*COUNT_SENTENCE) }px`;
      const newSentenceElemement = this.currentSentence.renderSourceGame();
      SOURCE_FIELD.append(newSentenceElemement);
      RESULT_FIELD.append(currentSentenceElement);
      this.addHintsInRound();
      this.addClickPuzzles();
      this.addDropPuzzles();
      const unknownButton = createElement('button', 'btn_unknown');
      insertNewButtons([unknownButton]);
      this.unknownButtonEventListeners();
      hideElement(document.querySelector('.load-page'));
    };
  }

  addHintsInRound() {
    const englPuzzleSettings = JSON.parse(localStorage.getItem('englishPuzzle')) || DEFAULT_SETTINGS_PUZZLE;
    addHintShowImage(englPuzzleSettings.showImage, this.srcImagesParts[this.currentSentenceNumber]);
    addHints();
    const translateFieldElement = document.querySelector('.translate');
    const autoPlaySoundElement = document.querySelector(`.${BUTTONS_CLASSES.autoPlaySound}`);
    if (!autoPlaySoundElement.classList.contains('disable')) {
      this.playAudio();
    }
    const translateText = this.dataPage[this.currentSentenceNumber].textExampleTranslate;
    translateFieldElement.innerText = translateText;
    document.querySelector(`.${BUTTONS_CLASSES.showImage}`).addEventListener('click', () => {
      englPuzzleSettings.showImage = !englPuzzleSettings.showImage;
      // eslint-disable-next-line max-len
      addHintShowImage(englPuzzleSettings.showImage, this.srcImagesParts[this.currentSentenceNumber]);
      localStorage.setItem('englishPuzzle', JSON.stringify(englPuzzleSettings));
    });
    const buttonHints = document.querySelector('.block-hints');
    const buttonSound = buttonHints.querySelector('.btn_pronoucing');
    buttonSound.addEventListener('click', () => {
      if (!buttonSound.classList.contains('hidden')) {
        this.playAudio();
      }
    });
  }

  generateCorrectSentence() {
    removeChild(SOURCE_FIELD);
    RESULT_FIELD.querySelector('.current').remove();
    const newSentenceElemement = this.currentSentence.renderCorrectSentence();
    RESULT_FIELD.append(newSentenceElemement);
  }

  playAudio() {
    this.audioSentence.stop();
    this.audioSentence.src = `${DATA_URL}${this.dataPage[this.currentSentenceNumber].audioExample}`;
    this.audioSentence.autoplay = true;
    this.audioSentence.play();
  }

  checkCorrectSentence() {
    const arraySentence = this.dataPage[this.currentSentenceNumber].textExample.replace(/<\/?[a-zA-Z]+>/gi, '').split(' ');
    const sentenceBlock = document.querySelector('.current').querySelectorAll('canvas');
    let countCorrectSentence = 0;
    sentenceBlock.forEach((element, index) => {
      const ctx = element.getContext('2d');
      const isCorrect = element.dataset.word === arraySentence[index];
      if (isCorrect) {
        ctx.strokeStyle = 'green';
        ctx.stroke();
        countCorrectSentence += 1;
      } else {
        ctx.strokeStyle = 'red';
        ctx.stroke();
      }
      this.dataPage[this.currentSentenceNumber].result = isCorrect;
    });
    if (countCorrectSentence === arraySentence.length) {
      this.correct+=1;
      return true;
    }
    return false;
  }

  addDropPuzzles(){
    const currentSentenceElement = RESULT_FIELD.querySelector('.current');
    const newSentenceElemement = SOURCE_FIELD.querySelector('.sentence');
    currentSentenceElement.addEventListener("mouseleave", () => {
      this.checkPuzzles();
    }, false);
    const sortCurrent = new Sortable(currentSentenceElement, {
      group: 'shared',
      animation: 150,
    });
    const sortSource = new Sortable(newSentenceElemement, {
      group: 'shared',
      animation: 150
    });
  }

  continuationGame() {
    if (this.currentSentenceNumber === COUNT_SENTENCE - 1) {
      const statistic = new Statistics('EnglishPuzzle');
      removeChild(SOURCE_FIELD);
      removeChild(RESULT_FIELD);
      addImageInPage(this.image, this.infoAboutImage);
      removeAllButtons();
      const resultButton = createElement('button', 'btn_result', [], [['uk-toggle','target: #modal-close-default']]);
      const nextButton = createElement('button', 'btn_next');
      const { correct, errors } = this;
      statistic.updateGameStatistics(correct, errors );
      insertNewButtons([resultButton, nextButton]);
    } else {
      this.generateCorrectSentence();
      document.querySelector('.current').classList.remove('current');
      this.currentSentenceNumber += 1;
      this.generateSentenceInRound();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addClickPuzzles() {
    const currentSentence = RESULT_FIELD.querySelector('.current');
    SOURCE_FIELD.addEventListener('click', (event) => {
      const elementClick = event.target.closest('canvas');
      if (elementClick) {
        currentSentence.append(elementClick);
      }
    });
    currentSentence.addEventListener('click', (event) => {
      const elementClick = event.target.closest('canvas');
      if (elementClick) {
        this.checkPuzzles();
        SOURCE_FIELD.querySelector('.sentence').append(elementClick);
      }
    });
  }

  checkPuzzles(){
    const countElements = SOURCE_FIELD.querySelectorAll('canvas').length;
    if (countElements === 0) {
      removeAllButtons();
      const checkButtons = createElement('button', 'btn_check');
      insertNewButtons([checkButtons]);
      this.checkButtonEventListener();
    }
  }

  continueButtonEventListeners() {
    document.querySelector('.btn_continue').addEventListener('click', async() => {
      const {userWord, _id} = this.dataPage[this.currentSentenceNumber];
      const mode = getGameMode();
      if ( mode !== GAME_MODES.all) {
        if(this.dataPage[this.currentSentenceNumber].result){
          increaseWordReferenceCount(userWord);
          this.correct += 1;
        } else {
          increaseWordErrorCount(userWord);
          this.errors += 1;
        }
          updateUserWord(_id, userWord);
      }
      this.continuationGame();
    });
  }

  unknownButtonEventListeners() {
    document.querySelector('.btn_unknown').addEventListener('click', () => {
      this.generateCorrectSentence();
      removeAllButtons();
      const continueButton = createElement('button', 'btn_continue');
      insertNewButtons([continueButton]);
      this.dataPage[this.currentSentenceNumber].result = false;
      this.continueButtonEventListeners();
    });
  }

  checkButtonEventListener() {
    document.querySelector('.btn_check').addEventListener('click', () => {
      removeAllButtons();
      if (this.checkCorrectSentence()) {
        const continueButton = createElement('button', 'btn_continue');
        insertNewButtons([continueButton]);
        this.continueButtonEventListeners();
      } else {
        const unknownButton = createElement('button', 'btn_unknown');
        insertNewButtons([unknownButton]);
        this.unknownButtonEventListeners();
      }
    });
  }
}
