import { GAME_MODES } from './constants';
import { showElement, hideElement } from '../helpers/html-helper';


const toSwitch = document.getElementById('game-mode-switch');
const modeBtn = document.querySelector('.game-control__btn_mode');
const descAct = document.querySelector('.desc_active');
const descDis = document.querySelector('.desc_disabled');

export function switchGameMode() {
  const currentMode = GAME_MODES.all === toSwitch.textContent;

  if (currentMode) {
    modeBtn.classList.remove('game-control__btn_mode_active');
    modeBtn.classList.add('game-control__btn_mode_disabled');

    hideElement(descAct);
    showElement(descDis);
  } else {
    modeBtn.classList.remove('game-control__btn_mode_disabled');
    modeBtn.classList.add('game-control__btn_mode_active');

    hideElement(descDis);
    showElement(descAct);
  }

  toSwitch.textContent = currentMode ? GAME_MODES.learned : GAME_MODES.all;
}

export function addGameModeSwitchClickHandler() {
  modeBtn.addEventListener('click', () => {
    switchGameMode();
  });
}

export function getGameMode() {
  return toSwitch.textContent;
}
