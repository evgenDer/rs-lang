import { createElement } from '../utils/create';


export default class StartScreen {
  constructor() {
    this.startScreen = '';
  }

  generateStartScreen() {
    const title = createElement({ tagName: 'h2', classNames: 'intro__title', textContent: 'SPEAK IT' });
    const line1 = createElement({ tagName: 'p', classNames: 'intro__info_line', textContent: 'Нажмите на карточку со словом, чтобы увидеть его <br>перевод и услышать звучание. ' });
    const line2 = createElement({ tagName: 'p', classNames: 'intro__info_line', textContent: 'Нажмите на кнопку "Тренировка произношения" и <br> произнесите слова в микрофон.' });
    const info = createElement({ tagName: 'div', classNames: 'intro__info', children: [ line1, line2] });
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
