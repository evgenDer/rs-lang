import { createElementObj } from '../../utils/create';

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
    const icon = createElementObj({ tagName: 'img', classNames: 'speaker-icon', attrs: [['src', './assets/img/icons/speaker.svg']] });
    const containerIcon = createElementObj({ tagName: 'div', classNames: 'container-speaker-icon', children: [icon] });
    const word = createElementObj({ tagName: 'p', classNames: 'word', textContent: this.word });
    const transcription = createElementObj({ tagName: 'p', classNames: 'transcription', textContent: this.transcription });
    this.translate = createElementObj({ tagName: 'p', classNames: 'translate', textContent: this.wordTranslate });
    const wordContainer = createElementObj({ tagName: 'div', classNames: 'word-container', children: [word, transcription, this.translate] });
    this.card = createElementObj({ tagName: 'div', classNames: 'card uk-animation-fade', children: [containerIcon, wordContainer] });
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

  getTranslate() {
    return this.wordTranslate;
  }

  getTranscription() {
    return this.transcription;
  }

  getElement() {
    return this.card;
  }

  changeElementForResults() {
    this.card.classList.add('result_card');
  }

  removeChangeForResults() {
    this.card.classList.remove('result_card');
  }

  wasAnswered() {
    return this.isCorrectAnswer;
  }

  markAsGuessed() {
    this.isCorrectAnswer = true;
  }

  markAsNotGuessed() {
    this.isCorrectAnswer = false;
  }

  makeInactive() {
    this.card.classList.remove('card_active');
  }

  makeActive() {
    this.card.classList.add('card_active');
  }
}
