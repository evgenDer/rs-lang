import { createElement } from '../../utils/create';

export default class Card {
  constructor(data) {
    this.id = data.id;
    this.word = data.word;
    this.transcription = data.transcription;
    this.wordTranslate = data.wordTranslate;
    this.imageUrl = `https://raw.githubusercontent.com/Marrlika/rslang-data/master/${data.image}`;
    this.audioSrc = `https://raw.githubusercontent.com/Marrlika/rslang-data/master/${data.audio}`;
    this.isCorrectAnswer = false;
  }

  generateCard() {
    const icon = createElement({ tagName: 'object', classNames: 'speaker-icon', attrs: [['type', 'image/svg+xml'], ['data', './assets/img/icons/speaker.svg']] });
    const containerIcon =  createElement({ tagName: 'span', classNames: 'container-speaker-icon', children: [icon] });
    const word = createElement({ tagName: 'p', classNames: 'word', textContent: this.word });
    const transcription = createElement({ tagName: 'p', classNames: 'transcription', textContent: this.transcription });
    const wordContainer = createElement({ tagName: 'div', classNames: 'word-container', children: [ word, transcription] });
    this.card = createElement({ tagName: 'div', classNames: 'card', children: [containerIcon, wordContainer] });
    return this.card;
  }

  getImgUrl() {
    return this.imageUrl;
  }

  getAudioSrc() {
    return this.audioSrc;
  }

  getWord() {
    return this.word;
  }

  getElement() {
    return this.card;
  }

  wasAnswered() {
  return this.isCorrectAnswer;
  }

  getTranslate() {
    return this.wordTranslate;
  }

  markAsGuessed() {
    this.isCorrectAnswer = true;
    this.card.classList.add('card_active');
  }

  makeInactive() {
    this.card.classList.remove('card_active');
  }

  makeActive() {
    this.card.classList.add('card_active');
  }
}
