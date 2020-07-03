import timer from './timer';
import { exitGame } from '../utils/helpers';
import { showElement, hideElement } from '../helpers/html-helper';
import { addGameModeSwitchClickHandler, getGameMode } from '../games/gameModeSwitch';
import Game from './game';
import playAudio from '../helpers/audio';
import * as Dropdown from '../games/dropdown';

// const modeBtn = document.querySelector('.game-control__btn_mode');
const startPage = document.querySelector('.game-sprint__start');
const loadPage = document.querySelector('.game-sprint__load');

function addExitGameBtnClickHandler() {
  document.querySelector('.btn_close').addEventListener('click', () => {
    exitGame();
  });
  document.querySelector('.btn_exit').addEventListener('click', () => {
    exitGame();
  });
}

function loadGame(){
  showElement(loadPage);
  const game = new Game(getGameMode(), Dropdown.getCurrentLevel(), Dropdown.getCurrentRound());
  const startTimer = timer(5, 'game-sprint__load', 'Приготовьтесь', game, game.startGame);
  game.generateFieldOfGame();
  startTimer();
}


function addStartButtonClickHandler() {
  document.querySelector('.game-control__btn_start').addEventListener('click', () => {
    hideElement(startPage);
    playAudio('assets/audio/time.mp3');
    loadGame();
  });
}


window.onload = () => {
  addGameModeSwitchClickHandler();
  addExitGameBtnClickHandler();
  addStartButtonClickHandler();
  Dropdown.addDropdownsEventHandlers();
}
