import { getDataWords } from '../api/words';
import Card from './Card';
import { createElement } from '../utils/create';

export default class GameBoard {
  constructor() {
    this.isPonunciationMode = false;
    this.currentCards = [];
    this.audioObj = new Audio();
  }

  generateGameBoard() {
    getDataWords(2, 0).then((data) => {
      data.forEach((cardData) => {
        this.currentCards.push(new Card(cardData));
      });
      this.currentCards.map((card) => this.cardsContainer.append(card.generateCard()));
    });
    this.cardsContainer = createElement({ tagName: 'div', classNames: 'cards_container' });
    this.addListeners();
    return this.cardsContainer;
  }

  getCardByEvent(eventTarget) {
    const currentCard = this.currentCards.find((card) => {
      const cardElement = card.getElement();
      return cardElement.contains(eventTarget);
    });
    return currentCard;
  }

  static createCustomEvent(nameEvent, data) {
    const event = new CustomEvent(nameEvent, { detail: data });
    document.dispatchEvent(event);
  }

  playAudio(audioSrc) {
    this.audioObj.src = audioSrc;
    this.audioObj.play();
  }

  addListeners() {
    this.cardsContainer.addEventListener('click', (event) => {
      if (!this.isPonunciationMode) {
        const currentCard = this.getCardByEvent(event.target);
        if (currentCard) {
          this.currentCards.forEach((card) => card.makeInactive());
          currentCard.makeActive();
          this.playAudio(currentCard.getAudioSrc());
          GameBoard.createCustomEvent('changeWord', currentCard.getDataForDisplay());
        }
      }
    });
  }
}
