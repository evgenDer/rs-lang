import { createElement } from '../../utils/create';
import Loader from './Loader';

export default class Display {
  constructor() {
    this.defaultImageSrc = './assets/img/speakit-default-img.jpg';
    this.loader = new Loader();
  }

  generate() {
    this.image = createElement({ tagName: 'img', classNames: 'image', attrs: [['src', this.defaultImageSrc]] });
    this.word = createElement({ tagName: 'p', classNames: 'word display_word'});
    this.transcription = createElement({ tagName: 'p', classNames: 'transcription display_transcription'});
    this.translate = createElement({ tagName: 'p', classNames: 'display_translate'});
    this.wordContainer = createElement({
      tagName: 'div',
      classNames: 'display_word-container word-container',
      children: [ this.word, this.transcription, this.translate],
    });
    this.wrapper = createElement({ tagName: 'div', classNames: 'info-wrapper', children: [this.image, this.wordContainer] });
    const display = createElement({ tagName: 'div', classNames: 'display', children: [this.wrapper,  this.loader.getElement()] });
    return display;
  }

  update({img, translate, word, transcription}) {
    this.loader.show();
    this.wrapper.classList.add('invisible');
     this.wrapper.classList.remove('uk-animation-fade');

    if(img) {
      this.image.src = img;
    } else {
      this.image.src = this.defaultImageSrc;
    }
    this.image.onload = () => {
      if (word) this.word.textContent = word;
      if (transcription) this.transcription.textContent = transcription;
      this.translate.textContent = translate;
      this.wrapper.classList.remove('invisible');
      this.wrapper.classList.add('uk-animation-fade');
      this.loader.hide();
    };
  }

  startGameMode() {
    this.wrapper.classList.add('game-mode_info-wrapper');
  }

  stopGameMode() {
    this.wrapper.classList.remove('game-mode_info-wrapper');
  }
}
