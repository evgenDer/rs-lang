import { createElementObj } from '../utils/create';

export default class Loader {
  constructor() {
    this.generate();
  }

  generate() {
    const circles = [];
    for (let i = 0; i < 8; i += 1) {
      const circle = createElementObj({ tagName: 'div', classNames: `circle circle-${i + 1}` });
      circles.push(circle);
    }
    const loading = createElementObj({ tagName: 'div', classNames: 'circle-loader', children: circles });
    this.wrapper = createElementObj({ tagName: 'div', classNames: 'loader-wrapper', children: [loading] });
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
