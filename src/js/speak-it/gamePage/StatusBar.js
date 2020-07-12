import { createElementObj } from '../../utils/create';

export default class StatusBar {
  constructor() {
    this.levelsDropdoun = '';
    this.roundsDropdoun = '';
    this.starsContainer = '';
    this.isRepeatLearnedWords = true;
  }

  generate(callbackFunctions) {
    this.exit = createElementObj({ tagName: 'img', classNames: 'status-bar_exit', attrs: [['src', './assets/img/icons/arrow-right.svg'], ['alt', 'назад']] });
    this.microphoneImg = createElementObj({ tagName: 'img', classNames: 'btn_microphone-img', attrs: [['src', './assets/img/icons/microphoneOff.svg'], ['alt', 'microphone']] });
    this.btnMicrophone = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn_microphone disabled', children: [this.microphoneImg] });
    const iconRestart = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: refresh']] });
    this.btnRestart = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn_restart', children: [iconRestart] });
    const iconStatistic = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: file-text']] });
    this.btnResult = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn_statistic', children: [iconStatistic] });
    const linkHome = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: home']] });
    this.btnHome = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn_home', children: [linkHome] });
    const btnContainer = createElementObj({ tagName: 'div', children: [this.btnRestart, this.btnResult, this.btnHome, this.btnMicrophone] });

    this.starsContainer = createElementObj({ tagName: 'div', classNames: 'stars_container' });
    const statusBarContainer = createElementObj({ tagName: 'div', classNames: 'status-bar_container', children: [this.exit, this.starsContainer, btnContainer] });
    this.addListeners(callbackFunctions);
    return statusBarContainer;
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

  startGameMode() {
    this.btnMicrophone.classList.remove('disabled');
    this.isMicrophoneOn = true;
  }

  stopGameMode() {
    this.removeProgress();
    this.btnMicrophone.classList.remove('pushed')
    this.btnMicrophone.classList.add('disabled');
    this.isMicrophoneOn = false;
  }

  addListeners(callbackFunctions) {
    this.btnMicrophone.addEventListener('click', () => {
      if (this.isMicrophoneOn) {
        this.btnMicrophone.classList.add('pushed');
      } else {
        this.btnMicrophone.classList.remove('pushed');
      }
      this.isMicrophoneOn = !this.isMicrophoneOn;
      callbackFunctions.onClickMicrophoneToggle(this.isMicrophoneOn);
    });

    this.btnRestart.addEventListener('click', callbackFunctions.onClickRestart);

    this.btnResult.addEventListener('click', callbackFunctions.onClickResult);

    this.btnHome.addEventListener('click', callbackFunctions.onClickHome);

    this.exit.addEventListener('click', ()=> {
      const customEvent = new CustomEvent('speakitBackToHomepage');
      document.dispatchEvent(customEvent);
    });
  }
}
