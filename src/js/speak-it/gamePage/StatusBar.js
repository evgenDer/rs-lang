import { createElementObj } from '../../utils/create';
import Dropdoun from './Dropdown';

const LEVELS_NUMBER = 6;
const ROUNDS_NUMBER = 60;
const MODE_INFO = {
  studied: {
  textMessage: 'В игре будут задей- <br> ствованы только <br> изученные слова',
  textBtn:'Слова: Изученные',
},
  all: {
    textMessage:'В игре будут задей- <br> ствованы слова из <br> всей коллекции',
    textBtn:'Слова: все',
  },
}

export default class StatusBar {
  constructor() {
    this.levelsDropdoun = '';
    this.roundsDropdoun = '';
    this.starsContainer = '';
    this.isRepeatLearnedWords = true;
  }

  generate(localData, callbackFunctions) {
    this.modeBtn = createElementObj({
      tagName: 'button',
      classNames: 'uk-button uk-button-default speakit_game-control__btn speakit_game-control__btn-mode',
      textContent: MODE_INFO.studied.textBtn,
    });
    this.modeMessage = createElementObj({ tagName: 'p', classNames: 'mode-info', textContent: MODE_INFO.studied.textMessage });
    const modeMessageContainer = createElementObj({
      tagName: 'div',
      classNames: 'game-control_list-container game-control_list-container_mode',
      children: [this.modeMessage],
      attrs: [['uk-dropdown', 'animation: uk-animation-slide-top-small; duration: 1000; pos: bottom-right"']],
    });

    this.levelsDropdoun = new Dropdoun('Уровень', LEVELS_NUMBER, localData.level);
    this.roundsDropdoun = new Dropdoun('Раунд', ROUNDS_NUMBER, localData.page);
    const gameControl = createElementObj({
      tagName: 'div',
      classNames: 'game-control',
      children: [
        this.modeBtn,
        modeMessageContainer,
        this.levelsDropdoun.generate(() => this.roundsDropdoun.makeItemActive(0)),
        this.roundsDropdoun.generate(() => {
          const data = { studied: false, level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
          callbackFunctions.onChangeLevel(data);
        }),
      ],
    });

    const iconMicrophone = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: microphone']] });
    this.btnMicrophone = createElementObj({ tagName: 'button', classNames: 'btn btn_microphone', children: [iconMicrophone] });
    const iconRestart = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: refresh']] });
    this.btnRestart = createElementObj({ tagName: 'button', classNames: 'btn btn_restart', children: [iconRestart] });
    const iconStatistic = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: file-text']] });
    this.btnStatistic = createElementObj({ tagName: 'button', classNames: 'btn btn_statistic', children: [iconStatistic] });
    const linkHome = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: home']] });
    this.btnExit = createElementObj({ tagName: 'button', classNames: 'btn btn_exit', children: [linkHome] });
    const cont = createElementObj({ tagName: 'div', children: [this.btnRestart, this.btnStatistic, this.btnExit, this.btnMicrophone] });

    this.starsContainer = createElementObj({ tagName: 'div', classNames: 'stars_container' });
    const statusBarContainer = createElementObj({ tagName: 'div', classNames: 'status-bar_container', children: [gameControl, this.starsContainer, cont] });
    this.addListeners(callbackFunctions);
    return statusBarContainer;
  }

  chageRound() {
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

  addStar() {
    const star = createElementObj({ tagName: 'img', classNames: 'star uk-animation-scale-down', attrs: [['src', './assets/img/icons/star.svg']] });
    this.starsContainer.append(star);
  }

  removeProgress() {
    this.starsContainer.innerHTML = '';
  }

  startGameMode() {
    this.levelsDropdoun.disableСhange();
    this.roundsDropdoun.disableСhange();
  }

  stopGameMode() {
    this.levelsDropdoun.enableСhange();
    this.roundsDropdoun.enableСhange();
    this.removeProgress();
  }

  addListeners(callbackFunctions) {
    this.modeBtn.addEventListener('click', () => {
      if (this.isRepeatLearnedWords) {
        this.modeBtn.innerHTML = MODE_INFO.all.textBtn;
        this.modeMessage.innerHTML = MODE_INFO.all.textMessage;
        this.levelsDropdoun.show();
        this.roundsDropdoun.show();
        const data = { studied: false, level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
        callbackFunctions.onChangeLevel(data);
      } else {
        this.modeBtn.innerHTML = MODE_INFO.studied.textBtn;
        this.modeMessage.innerHTML = MODE_INFO.studied.textMessage;
        this.levelsDropdoun.hide();
        this.roundsDropdoun.hide();
        callbackFunctions.onChangeLevel({studied: true});
      }
      this.isRepeatLearnedWords = !this.isRepeatLearnedWords;
    });

    this.btnRestart.addEventListener('click', callbackFunctions.onClickRestart);

    this.btnStatistic.addEventListener('click', callbackFunctions.onClickStatistics);

    this.btnExit.addEventListener('click', callbackFunctions.onClickHome);
  }
}
