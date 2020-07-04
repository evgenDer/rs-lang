import { showElement, removeClassesFromElement, removeChild } from '../helpers/html-helper';
import playAudio from '../helpers/audio';
import { SPRINT_MODES } from '../games/constants';
import { createElement } from '../utils/create';

const errorIconSrc = 'assets/img/icons/error.svg';
const correctIconSrc = 'assets/img/icons/correct.svg';


export default class Card {
  constructor(){
    this.card = document.querySelector('.card');
    this.numberMode = 0;
    this.correctAnswers = [];
  }

  addCorrectCard(){
    this.card.classList.add('card_correct');
    this.insertResultIcon(correctIconSrc);
  }

  addErrorCard(){
    this.card.classList.add('card_error');
    playAudio('assets/audio/error.mp3');
    this.insertResultIcon(errorIconSrc);
    Card.addImagesCard();
    Card.removeCardElements();
    this.numberMode = 0;
    this.addProgressBar();
  }

  static removeCardElements() {
    for (let i = 1; i < SPRINT_MODES.length; i+=1){
      removeClassesFromElement('.card__header', SPRINT_MODES[i].сlassElement, 'correct');
    }
  }

  insertResultIcon(imageSrc){
    const resultIcon =  createElement('img', 'icon_result', [], [['src',`${imageSrc}`]]);
    this.card.append(resultIcon);
    setTimeout(() =>{
      removeClassesFromElement('.card', 'card_correct', 'card_error');
      const iconResult = document.querySelector('.icon_result');
      if(iconResult) iconResult.remove();
    }, 500)
  }

  addNewMode(numberMode) {
    this.numberMode = numberMode;
    const headerCard = document.querySelector('.card__header');
    const img = document.querySelector('.body__images .hidden');
    if(img){
      showElement(img);
    }
    this.addProgressBar();
    playAudio('assets/audio/correct.mp3');
    headerCard.classList.add(SPRINT_MODES[this.numberMode].сlassElement);
    headerCard.classList.add('correct');
  }

  static addImagesCard(){
    const images = document.querySelectorAll('.body__images img');
    images.forEach((img)=>{
      img.classList.add('hidden');
    });
    const openPage = document.querySelector('img[alt="bird"]');
    openPage.classList.remove('hidden');
    openPage.style.marginLeft = '15px';
  }

  addProgressBar() {
    const cardAnswers = document.querySelector('.card__answers');
    removeChild(cardAnswers);
    let circle;
    const countCircles = 3;
    if(this.numberMode !== SPRINT_MODES.length - 1){
      for(let i = 0; i < countCircles; i += 1){
        const img = createElement('img', 'hidden', [], [['src', correctIconSrc]])
        circle = createElement('div', 'circle', [img]);
        cardAnswers.append(circle);
      }
    }
    else {
      const img = createElement('img', '', [], [['src', correctIconSrc]]);
      circle = createElement('div', 'circle', [img]);
      cardAnswers.append(circle);
    }
  }
}
