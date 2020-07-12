import { createElementObj } from '../utils/create';
import Dropdoun from './Dropdown';
import { addConfiguration } from './utils';
import { saveCustomConfiguration } from '../configuration/index';
import { LEVELS_NUMBER, ROUNDS_NUMBER, MODE_INFO } from './constants';
import { Statistics } from '../statistics/components/statistics';


export default class StartScreen {
  constructor() {
    this.startScreen = '';
    this.statistics = new Statistics('SpeakIt');
    this.isRepeatLearnedWords = true;
  }

  generateStartScreen(callbackFunctions) {
    this.exit = createElementObj({ tagName: 'img', classNames: 'speakit_exit', attrs: [['src', './assets/img/icons/close-game.svg'], ['alt', 'закрыть игру']] });
    this.callbackFunctions = callbackFunctions;
    this.modeBtn = createElementObj({
      tagName: 'button',
      classNames: 'uk-button uk-button-default speakit_game-control__btn speakit_game-control__btn-mode',
      textContent: MODE_INFO.studied.textBtn,
    });
    this.modeMessage = createElementObj({ tagName: 'p', classNames: 'mode-info', textContent: MODE_INFO.studied.textMessage });
    this.modeMessageContainer = createElementObj({
      tagName: 'div',
      classNames: 'game-control_list-container game-control_list-container_mode',
      children: [this.modeMessage],
      attrs: [['uk-dropdown', 'animation: uk-animation-slide-top-small; duration: 1000; pos: bottom-right']],
    });

    this.levelsDropdoun = new Dropdoun('Уровень', LEVELS_NUMBER);
    this.roundsDropdoun = new Dropdoun('Раунд', ROUNDS_NUMBER);
    this.statisticsBtn = createElementObj({
      tagName: 'button',
      classNames: 'uk-button uk-button-default speakit_game-control__btn',
      textContent: 'Статистика',
    });
    const gameControl = createElementObj({
      tagName: 'div',
      classNames: 'game-control',
      children: [
        this.statisticsBtn,
        this.levelsDropdoun.generate(() => this.roundsDropdoun.makeItemActive(0)),
        this.roundsDropdoun.generate(() => {
          const data = { studied: false, level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
          saveCustomConfiguration('speakIt', { level: this.levelsDropdoun.getNumCurrentItem(), round: this.roundsDropdoun.getNumCurrentItem() });
          this.callbackFunctions.onChangeLevel(data);
        }),
        this.modeBtn,
        this.modeMessageContainer,
      ],
    });

    addConfiguration().then((config) => {
      this.levelsDropdoun.setNumCurrentItem(config.level);
      this.roundsDropdoun.setNumCurrentItem(config.round);
    });
    const header = createElementObj({ tagName: 'div', classNames: 'start-screen-header', children: [this.exit, gameControl] });

    const title = createElementObj({ tagName: 'h2', classNames: 'intro__title', textContent: 'SPEAK IT' });
    const line1 = createElementObj({ tagName: 'p', classNames: 'intro__info_line', textContent: 'Нажмите на карточку со словом, чтобы увидеть его <br>перевод и услышать звучание. ' });
    const line2 = createElementObj({ tagName: 'p', classNames: 'intro__info_line', textContent: 'Нажмите на кнопку "Тренировка произношения" и <br> произнесите слова в микрофон.' });
    const info = createElementObj({ tagName: 'div', classNames: 'intro__info', children: [ line1, line2] });
    this.startBtn = createElementObj({ tagName: 'button', classNames: 'btn btn-start-game', textContent: 'Начать' });
    const intro = createElementObj({ tagName: 'div', classNames: 'intro', children: [ title, info, this.startBtn] });
    this.startScreen = createElementObj({ tagName: 'div', classNames: 'start-screen', children: [header , intro] });

    this.addListeners();
    return this.startScreen;
  }

  chageRound() {
    if (this.isRepeatLearnedWords) {
      this.callbackFunctions.onChangeLevel({ studied: true });
    } else {
      const currentRaund = this.roundsDropdoun.getNumCurrentItem();
      const currentLevel = this.levelsDropdoun.getNumCurrentItem();
      if (currentRaund < ROUNDS_NUMBER) {
        this.roundsDropdoun.makeItemActive(currentRaund + 1);
      } else if (currentLevel < LEVELS_NUMBER) {
        this.levelsDropdoun.makeItemActive(currentLevel + 1);
      } else {
        this.levelsDropdoun.makeItemActive(0);
      }
    }
  }

  show() {
    this.startScreen.classList.remove('hidden');
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      this.startScreen.classList.add('hidden');
      const data = { studied: this.isRepeatLearnedWords, level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
      const customEvent = new CustomEvent('speakitNewGame', { detail: data });
      document.dispatchEvent(customEvent);
    });

    this.exit.addEventListener('click', () => {
      window.location.href = 'games.html';
    });

    this.modeBtn.addEventListener('click', () => {
      if (this.isRepeatLearnedWords) {
        this.modeBtn.innerHTML = MODE_INFO.all.textBtn;
        this.modeMessage.innerHTML = MODE_INFO.all.textMessage;
        this.levelsDropdoun.show();
        this.roundsDropdoun.show();

      } else {
        this.modeBtn.innerHTML = MODE_INFO.studied.textBtn;
        this.modeMessage.innerHTML = MODE_INFO.studied.textMessage;
        this.levelsDropdoun.hide();
        this.roundsDropdoun.hide();
      }
      this.isRepeatLearnedWords = !this.isRepeatLearnedWords;
    });

    this.statisticsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.statistics.showGlobalStatistics(true);
    });

  }
}
