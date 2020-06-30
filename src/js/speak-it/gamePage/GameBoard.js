import { getDataWords } from '../../api/words';
import Card from './Card';
import Loader from './Loader';
import { createElement } from '../../utils/create';
import shuffleArray from '../../utils/shuffleArray';

export default class GameBoard {
  constructor() {
    this.currentCards = [];
    this.mixedСards = [];
    this.audioObj = new Audio();
    this.loader = new Loader(true);
  }

  generate() {
    this.cardsContainer = createElement({ tagName: 'div', classNames: 'cards_container'});
    this.wrapper = createElement({ tagName: 'div', classNames: 'wrapper_game-board', children: [this.cardsContainer, this.loader.getElement() ]});
    return this.wrapper;
  }

  cahgeCards(data) {
    this.cardsContainer.classList.add('hidden');
    this.loader.show();
    this.cardsContainer.innerHTML = '';
    this.currentCards.length = 0;
    this.mixedСards.length = 0;
    getDataWords(data.level, data.page)
    .then((result) => {
      if(result.length > 0) {
        result.forEach((cardData) => {
          this.currentCards.push(new Card(cardData));
        });
        this.currentCards.map((card) => this.cardsContainer.append(card.generateCard()));
        this.loader.hide();
        this.cardsContainer.classList.remove('hidden');
      }
    });
  }

  getCardsContainer() {
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
    this.wrapper.classList.add('hidden');
    this.mixedСards = shuffleArray(this.currentCards);
    this.gameModeCurrentWordIndex = 0;
  }

  stopGameMode() {
    this.wrapper.classList.remove('hidden');
    this.currentCards.forEach((card) => card.markAsNotGuessed());
  }

  getCurrentWordInfo() {
    const currentCard = this.mixedСards[this.gameModeCurrentWordIndex];
    return {img: currentCard.getImgUrl(),
      translate: currentCard.getTranslate(),
      word: currentCard.getWord(),
      transcription: currentCard.getTranscription(),
    };
  }

  getWordsWithCorrectAnswer() {
    return this.currentCards.filter((card) => card.wasAnswered());
  }

  getWordsWithNotCorrectAnswer() {
    return this.currentCards.filter((card) => !card.wasAnswered());
  }

  cardOnClickHandler(event, callback) {
    const currentCard = this.getCardByEvent(event.target);
    if (currentCard) {
      this.makeInactiveAllCards();
      currentCard.makeActive();
      this.playAudio(currentCard.getAudioSrc());
      if (callback) {
        callback({img: currentCard.getImgUrl(), translate: currentCard.getTranslate()});
      }
    }
  }

  checkAnswers(inputValue) {
    const currentCard = this.mixedСards[this.gameModeCurrentWordIndex];
    if (currentCard.getWord().toLowerCase() === inputValue.toLowerCase()) {
      currentCard.markAsGuessed();
      return true;
    }
    return false;
}

  increaseCurrentWordIndex(){
    this.gameModeCurrentWordIndex += 1;
  }

  isAllWordsPass() {
    return this.mixedСards.length > this.gameModeCurrentWordIndex;
  }

  updateCards() {
    this.cardsContainer.innerHTML = '';
    this.currentCards.forEach((card) => {
      card.removeChangeForResults();
      this.cardsContainer.append(card.getElement());
    });
    this.makeInactiveAllCards();
  }
}
