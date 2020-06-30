import { createElement } from '../../utils/create';

export default class Loader {
  constructor(line) {
    if(line) {
      this.generateLine()
    } else {
      this.generate();
    }
  }

  generate() {
    const circles = [];
    for(let i=0; i < 8; i += 1) {
      const circle = createElement({ tagName: 'div', classNames: `circle circle-${i + 1}`});
      circles.push(circle);
    }
    const loading = createElement({ tagName: 'div', classNames: 'circle-loader', children: circles });
    this.wrapper = createElement({ tagName: 'div', classNames: 'loader-wrapper hidden', children: [loading] });
  }

  generateLine() {
      const circles = [];
      for(let i=0; i < 4; i += 1) {
        const circle = createElement({ tagName: 'div', classNames: `circle-line circle-line-${i + 1}`});
        circles.push(circle);
      }
      const loading = createElement({ tagName: 'div', classNames: 'circle-loader circle-loader-line', children: circles });
      this.wrapper = createElement({ tagName: 'div', classNames: 'loader-wrapper hidden', children: [loading] });
    }

  show() {
    this.wrapper.classList.remove('hidden');
  }

  hide() {
    this.wrapper.classList.add('hidden');
  }

  getElement() {
    return this.wrapper;
  }
}
