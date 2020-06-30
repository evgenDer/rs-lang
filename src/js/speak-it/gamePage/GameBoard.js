import { getDataWords } from '../../api/words';
import Card from './Card';
import { createElement } from '../../utils/create';

export default class GameBoard {
  constructor() {
    this.currentCards = [];
    this.mixedСards = [];
    this.audioObj = new Audio();
  }

  generate() {
    this.cardsContainer = createElement({ tagName: 'div', classNames: 'cards_container'});
    this.wrapper = createElement({ tagName: 'div', classNames: 'wrapper_game-board', children: [this.cardsContainer ]});
    return this.wrapper;
  }

  cahgeCards(data) {
    this.cardsContainer.innerHTML = '';
    this.currentCards.length = 0;
    getDataWords(data.level, data.page)
    .then((result) => {
      if(result.length > 0) {
        result.forEach((cardData) => {
          this.currentCards.push(new Card(cardData));
        });
        this.currentCards.map((card) => this.cardsContainer.append(card.generateCard()));
      }
    });
  }

  getContainer() {
    return this.cardsContainer;
  }

  getCardByEvent(eventTarget) {
    const currentCard = this.currentCards.find((card) => {
      const cardElement = card.getElement();
      return cardElement.contains(eventTarget);
    });
    return currentCard;
  }

  playAudio(audioSrc) {
    this.audioObj.src = audioSrc;
    this.audioObj.play();
  }

  makeInactiveAllCards() {
    this.currentCards.forEach((card) => card.makeInactive());
  }

  startGameMode(){
    this.makeInactiveAllCards();
    this.getWordsWithCorrectAnswer().forEach((card)=> card.markAsGuessed())
  }

  getWordsWithCorrectAnswer() {
    return this.currentCards.filter((card) => card.wasAnswered());
  }

  cardOnClickHandler(event, callback) {
    const currentCard = this.getCardByEvent(event.target);
    if (currentCard) {
      this.makeInactiveAllCards();
      currentCard.makeActive();
      this.playAudio(currentCard.getAudioSrc());
      callback({img: currentCard.getImgUrl(), translate: currentCard.getTranslate()});
    }
  }

  checkAnswers(inputValue, callback) {
   const currentCard = this.currentCards.find((card) => card.getWord() === inputValue.toLowerCase() && !card.wasAnswered());
   if (currentCard) {
    currentCard.markAsGuessed();
    callback({img: currentCard.getImgUrl()});
  }
}
}
