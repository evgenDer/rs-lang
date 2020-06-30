import { createElement } from '../utils/create';


export default class StartScreen {
  constructor() {
    this.startScreen = '';
  }

  generateStartScreen() {
    const title = createElement({ tagName: 'h2', classNames: 'intro__title', textContent: 'SPEAKIT' });
    const info = createElement({ tagName: 'p', classNames: 'intro__info', textContent: 'Нажмите на слова, чтобы услышать их звучание. <br> Нажмите на кнопку и произнесите слова в микрофон.' });
    this.startBtn = createElement({ tagName: 'button', classNames: 'btn btn-start-game', textContent: 'Начать' });
    const intro = createElement({ tagName: 'div', classNames: 'intro', children: [ title, info, this.startBtn] });
    this.startScreen = createElement({ tagName: 'div', classNames: 'start-screen', children: [intro] });

    this.addListeners();
    return this.startScreen;
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      this.startScreen.classList.add('hidden');
      const customEvent = new CustomEvent('speakitNewGame');
      document.dispatchEvent(customEvent);
    });
  }
}
