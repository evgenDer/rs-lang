import Sentence from './sentence';
import { createElement } from '../../utils/create';
import { removeChild } from '../../utils/helpers';
import { BUTTONS_CLASSES, DATA_URL } from '../../utils/constants';
import { addHintShowImage, addHints } from './hints';
import { DEFAULT_SETTINGS_PUZZLE } from '../../constants/defaul-settings';

const COUNT_SENTENCE = 10;
const RESULT_FIELD = document.querySelector('.block-results');
const SOURCE_FIELD = document.querySelector('.block-source');

HTMLAudioElement.prototype.stop = function () {
  this.pause();
  this.currentTime = 0.0;
};


export default class Round {
  constructor(level, page, dataPage) {
    this.page = page;
    this.level = level;
    this.image = new Image();
    this.audioSentence = new Audio();
    this.dataPage = dataPage;
    this.srcImagesParts = [];
    this.currentSentenceNumber = 0;
    this.width = RESULT_FIELD.offsetWidth;
    this.height = RESULT_FIELD.offsetHeight;
    this.currenSentenceElement = createElement('div', 'sentence');
  }

  generateNewRoundOnPage(imageSrc) {
    this.image.onload = () => {
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
      ctx.drawImage(this.image, 0, y, this.width, height);
      this.srcImagesParts.push(canvas.toDataURL());
    }
  }

  generateSentenceInRound() {
    const slicedImage = document.createElement('img');
    slicedImage.onload = () => {
      const height = this.height / COUNT_SENTENCE;
      const textExample = this.dataPage[this.currentSentenceNumber].textExample.replace(/<\/?[a-zA-Z]+>/gi, '');
      const newSentence = new Sentence(slicedImage, textExample, this.width, height);
      this.currenSentenceElement = createElement('div', 'sentence current');
      const newSentenceElemement = newSentence.renderSourceGame();
      SOURCE_FIELD.append(newSentenceElemement);
      RESULT_FIELD.append(this.currenSentenceElement);
      this.addHintsInRound();
      this.addClickPuzzles();
    };
    slicedImage.src = this.srcImagesParts[this.currentSentenceNumber];
  }

  // eslint-disable-next-line class-methods-use-this
  addClickPuzzles() {
    const currentSentence = RESULT_FIELD.querySelector('.current');
    SOURCE_FIELD.addEventListener('click', (event) => {
      const elementClick = event.target.closest('canvas');
      currentSentence.append(elementClick);
    });
    currentSentence.addEventListener('click', (event) => {
      const elementClick = event.target.closest('canvas');
      SOURCE_FIELD.querySelector('.sentence').append(elementClick);
    });
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

  playAudio() {
    const audioSentenceSrc = `${DATA_URL}${this.dataPage[this.currentSentenceNumber].audioExample}`;
    this.audioSentence.stop();
    this.audioSentence.src = audioSentenceSrc;
    this.audioSentence.play();
  }

  generateCorrectSentence() {
    RESULT_FIELD.removeChild(RESULT_FIELD.lastChild);
    const newSentence = this.generateNewSentence();
    const newSentenceElemement = newSentence.renderCorrectSentence();
    RESULT_FIELD.append(newSentenceElemement);
  }

  checkCorrectSentence() {
    const arraySentence = this.dataPage[this.currentSentenceNumber].textExample.split(' ');
    const sentenceBlock = document.querySelector('.current').querySelectorAll('canvas');
    let countCorrectSentence = 0;
    sentenceBlock.forEach((element, index) => {
      const ctx = element.getContext('2d');
      if (element.innerText === arraySentence[index]) {
        ctx.strokeStyle = 'green';
        ctx.stroke();
        countCorrectSentence += 1;
      } else {
        ctx.strokeStyle = 'red';
        ctx.stroke();
      }
    });
    if (countCorrectSentence === arraySentence.length) {
      return true;
    }
    return false;
  }


  clickButton(event) {
    const puzzle = event.target.closest('canvas');
    this.currenSentenceElement.append(puzzle);
    puzzle.remove();
  }

  continuationGame() {
    if (this.currentSentenceNumber === COUNT_SENTENCE) {
      removeChild(SOURCE_FIELD);
      removeChild(RESULT_FIELD);
    }
  }
}
