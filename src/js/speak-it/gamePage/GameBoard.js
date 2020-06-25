import { getDataWords } from '../../api/words';
import Card from './Card';
import { createElement } from '../../utils/create';
import { getGameStatistics} from '../../utils/storage';

export default class GameBoard {
  constructor() {
    this.currentCards = [];
    this.audioObj = new Audio();
  }

  generateGameBoard() {

    this.cardsContainer = createElement({ tagName: 'div', classNames: 'cards_container' });
    return this.cardsContainer;
  }

  addCards() {
    const localData = getGameStatistics('speakitStatistic');
    getDataWords(localData.level, localData.page).then((data) => {
      data.forEach((cardData) => {
        this.currentCards.push(new Card(cardData));
      });
      this.currentCards.map((card) => this.cardsContainer.append(card.generateCard()));
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
