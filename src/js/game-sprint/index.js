import { timer } from './timer';
import { exitGame } from '../utils/helpers';
import { showElement, hideElement, removeChild } from '../helpers/html-helper';
import { addGameModeSwitchClickHandler, getGameMode } from '../games/gameModeSwitch';
import Game from './game';
import { playAudio } from '../helpers/audio';
import * as Dropdown from '../games/dropdown';
import playHtml from './playHtml';
import { Statistics } from '../statistics/components/statistics';

// const modeBtn = document.querySelector('.game-control__btn_mode');
const startPage = document.querySelector('.game-sprint__start');
const loadPage = document.querySelector('.game-sprint__load');
const playPage = document.querySelector('.game-sprint__play');

const statBtn = document.querySelector('.game-control__btn_stat');
const stat = new Statistics('Sprint');

function addExitGameBtnClickHandler() {
  document.querySelector('.btn_close').addEventListener('click', () => {
    exitGame();
  });
}

function loadGame(){
  showElement(loadPage);
  removeChild(playPage);
  playPage.insertAdjacentHTML('beforeend', playHtml);
  const game = new Game(getGameMode(), Dropdown.getCurrentLevel(), Dropdown.getCurrentRound());
  game.generateFieldOfGame();
  const timeCountdown = 7;
  const startTimer = timer(timeCountdown, 'game-sprint__load', 'Приготовьтесь', game, game.startGame);
  startTimer();
}


function addStartButtonClickHandler() {
  document.querySelector('.game-control__btn_start').addEventListener('click', () => {
    hideElement(startPage);
    playAudio('assets/audio/time.mp3');
    loadGame();
  });
}

function addStatisticsButtonClickHandler() {
  statBtn.addEventListener('click', (event) => {
    event.preventDefault();
    stat.showGlobalStatistics(true);
  });
}


window.onload = () => {
  Dropdown.addDropdownsEventHandlers();
  Dropdown.addActiveGameControls('sprint');
  addGameModeSwitchClickHandler();
  addExitGameBtnClickHandler();
  addStartButtonClickHandler();

  addStatisticsButtonClickHandler();
}
