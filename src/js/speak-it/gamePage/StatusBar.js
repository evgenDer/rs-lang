import { createElementObj } from '../../utils/create';
import Dropdoun from './Dropdown';
import { LEVELS_NUMBER, ROUNDS_NUMBER, MODE_INFO } from '../constants';
import { addConfiguration } from '../utils';
import { saveCustomConfiguration } from '../../configuration/index';


export default class StatusBar {
  constructor() {
    this.levelsDropdoun = '';
    this.roundsDropdoun = '';
    this.starsContainer = '';
    this.isRepeatLearnedWords = true;
  }

  generate(callbackFunctions) {
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
    const gameControl = createElementObj({
      tagName: 'div',
      classNames: 'game-control',
      children: [
        this.modeBtn,
        this.modeMessageContainer,
        this.levelsDropdoun.generate(() => this.roundsDropdoun.makeItemActive(0)),
        this.roundsDropdoun.generate(() => {
          const data = { studied: false, level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
          saveCustomConfiguration('speakIt', { level: this.levelsDropdoun.getNumCurrentItem(), round: this.roundsDropdoun.getNumCurrentItem() });
          this.callbackFunctions.onChangeLevel(data);
        }),
      ],
    });

    addConfiguration().then((config) => {
      this.levelsDropdoun.setNumCurrentItem(config.level);
      this.roundsDropdoun.setNumCurrentItem(config.round);
    });

    this.microphoneImg = createElementObj({ tagName: 'img', classNames: 'btn_microphone-img', attrs: [['src', './assets/img/icons/microphoneOff.svg'], ['alt', 'microphone']] });
    this.btnMicrophone = createElementObj({ tagName: 'button', classNames: 'btn btn_microphone disabled', children: [this.microphoneImg] });
    const iconRestart = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: refresh']] });
    this.btnRestart = createElementObj({ tagName: 'button', classNames: 'btn btn_restart', children: [iconRestart] });
    const iconStatistic = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: file-text']] });
    this.btnStatistic = createElementObj({ tagName: 'button', classNames: 'btn btn_statistic', children: [iconStatistic] });
    const linkHome = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: home']] });
    this.btnExit = createElementObj({ tagName: 'button', classNames: 'btn btn_exit', children: [linkHome] });
    const cont = createElementObj({ tagName: 'div', children: [this.btnRestart, this.btnStatistic, this.btnExit, this.btnMicrophone] });

    this.starsContainer = createElementObj({ tagName: 'div', classNames: 'stars_container' });
    const statusBarContainer = createElementObj({ tagName: 'div', classNames: 'status-bar_container', children: [gameControl, this.starsContainer, cont] });
    this.addListeners();
    return statusBarContainer;
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

  addStar(correctAnswer) {
    let imgSrc = '';
    if (!correctAnswer) {
      imgSrc = './assets/img/icons/star-error.svg';
    } else {
      imgSrc = './assets/img/icons/star.svg';
    }
    const star = createElementObj({ tagName: 'img', classNames: 'star uk-animation-scale-down', attrs: [['src', imgSrc]] });
    this.starsContainer.append(star);
  }

  removeProgress() {
    this.starsContainer.innerHTML = '';
  }

  disableСhangeModeBtn() {
    this.modeMessageContainer.setAttribute('uk-dropdown', 'mode: click');
    this.modeBtn.setAttribute('disabled', 'true');
    this.modeBtn.classList.add('disabled');
  }

  enableСhangeModeBtn() {
    this.modeMessageContainer.setAttribute('uk-dropdown', 'animation: uk-animation-slide-top-small; duration: 1000; pos: bottom-right');
    this.modeBtn.removeAttribute('disabled');
    this.modeBtn.classList.remove('disabled');
  }

  startGameMode() {
    this.levelsDropdoun.disableСhange();
    this.roundsDropdoun.disableСhange();
    this.disableСhangeModeBtn();
    this.btnMicrophone.classList.remove('disabled');
    this.isMicrophoneOn = true;
  }

  stopGameMode() {
    this.levelsDropdoun.enableСhange();
    this.roundsDropdoun.enableСhange();
    this.enableСhangeModeBtn();
    this.removeProgress();
    this.btnMicrophone.classList.remove('pushed')
    this.btnMicrophone.classList.add('disabled');
    this.isMicrophoneOn = false;
  }

  addListeners() {
    this.modeBtn.addEventListener('click', () => {
      if (this.isRepeatLearnedWords) {
        this.modeBtn.innerHTML = MODE_INFO.all.textBtn;
        this.modeMessage.innerHTML = MODE_INFO.all.textMessage;
        this.levelsDropdoun.show();
        this.roundsDropdoun.show();
        const data = { studied: false, level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
        this.callbackFunctions.onChangeLevel(data);
      } else {
        this.modeBtn.innerHTML = MODE_INFO.studied.textBtn;
        this.modeMessage.innerHTML = MODE_INFO.studied.textMessage;
        this.levelsDropdoun.hide();
        this.roundsDropdoun.hide();
        this.callbackFunctions.onChangeLevel({ studied: true });
      }
      this.isRepeatLearnedWords = !this.isRepeatLearnedWords;
    });

    this.btnMicrophone.addEventListener('click', () => {
      if (this.isMicrophoneOn) {
        this.btnMicrophone.classList.add('pushed');
      } else {
        this.btnMicrophone.classList.remove('pushed');
      }
      this.isMicrophoneOn = !this.isMicrophoneOn;
      this.callbackFunctions.onClickMicrophoneToggle(this.isMicrophoneOn);
    });

    this.btnRestart.addEventListener('click', this.callbackFunctions.onClickRestart);

    this.btnStatistic.addEventListener('click', this.callbackFunctions.onClickStatistics);

    this.btnExit.addEventListener('click', this.callbackFunctions.onClickHome);
  }
}
