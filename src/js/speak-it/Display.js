import { createElement } from '../utils/create';

export default class Display {
  constructor() {
    this.imageSrc = './assets/img/speakit-default-img.jpg';
  }

  generateDisplay() {
    this.image = createElement({ tagName: 'img', classNames: 'image', attrs: [['src', this.imageSrc]] });
    this.input = createElement({ tagName: 'input', classNames: 'input', attrs: [['type', 'text'], ['disabled', 'true']] });
    const display = createElement({ tagName: 'div', classNames: 'display', children: [this.image, this.input] });
    this.addListeners();
    return display;
  }

  addListeners() {
    document.addEventListener('changeWord', (event) => {
      this.image.src = event.detail.image;
      this.input.value = event.detail.translate;
    });
  }
}
