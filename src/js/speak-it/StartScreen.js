import { createElement } from '../utils/create';

export default class StartScreen {
  constructor() {
    this.intro = '';
  }

  generateStartScreen() {
    const title = createElement({ tagName: 'h2', classNames: 'intro__title', textContent: 'SPEAKIT' });
    const info = createElement({ tagName: 'p', classNames: 'intro__info', textContent: 'Click on the words to hear them sound.<br>Click on the button and speak the words into the microphone.' });
    this.startBtn = createElement({ tagName: 'button', classNames: 'btn btn-start-game', textContent: 'Start' });
    this.intro = createElement({ tagName: 'div', classNames: 'intro', children: [title, info, this.startBtn] });
    this.addListeners();
    return this.intro;
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      this.intro.classList.add('hidden');
    });
  }
}
