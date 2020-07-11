import { getFullDataWords } from '../../api/words';
import { getAggregatedUserWords } from '../../api/userWords';
import Card from './Card';
import Loader from './Loader';
import { createElementObj } from '../../utils/create';
import { shuffleArray } from '../../helpers/math-hepler';
import { ERR_MSG } from '../../games/constants';

export default class CardsBoard {
  constructor() {
    this.currentCards = [];
    this.mixedСards = [];
    this.audioObj = new Audio();
    this.loader = new Loader(true);
    this.wordsAmntInRound = 10;
    this.filter = { '$and': [{ 'userWord.difficulty': { '$in': ['normal', 'easy', 'hard'] }, 'userWord.optional.mode': { '$not': { '$eq': 'deleted' } } }] };
  }

  generate() {
    this.cardsContainer = createElementObj({ tagName: 'div', classNames: 'cards_container' });
    this.wrapper = createElementObj({ tagName: 'div', classNames: 'wrapper_game-board', children: [this.cardsContainer, this.loader.getElement()] });
    return this.wrapper;
  }

  async cahgeCards(data) {
    this.cardsContainer.classList.add('hidden');
    this.loader.show();
    this.cardsContainer.innerHTML = '';
    this.currentCards.length = 0;
    this.mixedСards.length = 0;
    let userData = '';
    if (data.studied) {
      userData = await this.getUserWords();
    } else {
      userData = await this.getWordsByLevelAndRound(data);
    }
    shuffleArray(userData);
    userData.forEach((cardData) => {
      this.currentCards.push(new Card(cardData));
    });
    this.currentCards.map((card) => this.cardsContainer.append(card.generateCard()));
    this.loader.hide();
    this.cardsContainer.classList.remove('hidden');
  }

  async getUserWords() {
    const result = await getAggregatedUserWords(this.filter, 3600);
    const UserWordsData = result[0].paginatedResults;
    if (UserWordsData.length < this.wordsAmntInRound) {
      throw ERR_MSG;
    }
    return UserWordsData
      .sort((a, b) => a.userWord.optional.successPoint - b.userWord.optional.successPoint)
      .slice(0, this.wordsAmntInRound);
  }

  async getWordsByLevelAndRound(data) {
    const result = await getFullDataWords(data.level, data.page, this.wordsAmntInRound);
      if (result.length < this.wordsAmntInRound) {
        throw ERR_MSG;
      }
      return result;
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

  startGameMode() {
    this.makeInactiveAllCards();
    this.wrapper.classList.add('hidden');
    this.mixedСards = this.currentCards;
    shuffleArray(this.mixedСards);
    this.gameModeCurrentWordIndex = 0;
  }

  stopGameMode() {
    this.wrapper.classList.remove('hidden');
    this.currentCards.forEach((card) => card.markAsNotGuessed());
  }

  getCurrentWordInfo() {
    const currentCard = this.mixedСards[this.gameModeCurrentWordIndex];
    return {
      img: currentCard.getImgUrl(),
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
        callback({ img: currentCard.getImgUrl(), translate: currentCard.getTranslate() });
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

  increaseCurrentWordIndex() {
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
