import { createElementObj } from '../utils/create';


export default class StartScreen {
  constructor() {
    this.startScreen = '';
  }

  generateStartScreen() {
    this.exit = createElementObj({ tagName: 'img', classNames: 'speakit_exit', attrs: [['src', './assets/img/icons/close-game.svg'], ['alt', 'закрыть игру']] });
    const title = createElementObj({ tagName: 'h2', classNames: 'intro__title', textContent: 'SPEAK IT' });
    const line1 = createElementObj({ tagName: 'p', classNames: 'intro__info_line', textContent: 'Нажмите на карточку со словом, чтобы увидеть его <br>перевод и услышать звучание. ' });
    const line2 = createElementObj({ tagName: 'p', classNames: 'intro__info_line', textContent: 'Нажмите на кнопку "Тренировка произношения" и <br> произнесите слова в микрофон.' });
    const info = createElementObj({ tagName: 'div', classNames: 'intro__info', children: [ line1, line2] });
    this.startBtn = createElementObj({ tagName: 'button', classNames: 'btn btn-start-game', textContent: 'Начать' });
    const intro = createElementObj({ tagName: 'div', classNames: 'intro', children: [ title, info, this.startBtn] });
    this.startScreen = createElementObj({ tagName: 'div', classNames: 'start-screen', children: [this.exit, intro] });

    this.addListeners();
    return this.startScreen;
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      this.startScreen.classList.add('hidden');
      const customEvent = new CustomEvent('speakitNewGame');
      document.dispatchEvent(customEvent);
    });
    this.exit.addEventListener('click', () => {
      window.location.href = 'games.html';
    });
  }
}
