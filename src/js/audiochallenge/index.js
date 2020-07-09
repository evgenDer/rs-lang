import { Game } from './Game';
import * as Dropdown from '../games/dropdown';
import { addGameModeSwitchClickHandler, getGameMode, disableGameModeSwitch, enableGameModeSwitch } from '../games/gameModeSwitch';
import { showElement, hideElement } from '../helpers/html-helper';
import { Statistics } from '../statistics/components/statistics';


const startBtn = document.querySelector('.description__start');
const description = document.querySelector('.audiochallenge__desription');
const exitGameBtn = document.querySelector('.audiochallenge__exit > .exit');
const backGameBtn = document.querySelector('.audiochallenge__exit > .exit__back');
const exitBtnContainer = document.querySelector('.audiochallenge__exit');

const modeBtn = document.querySelector('.game-control__btn_mode');

const bgLayer = document.querySelector('.bg-layer');

const statBtn = document.querySelector('.game-control__btn_stat');
const stat = new Statistics('Аудиовызов');

let game;


function exitGame() {
  document.location.href = 'games.html';
}

function setExitButtonBackMode() {
  exitBtnContainer.classList.remove('audiochallenge__exit_full');
  exitBtnContainer.classList.add('audiochallenge__exit_back');
}

function setExitButtonStdMode() {
  exitBtnContainer.classList.remove('audiochallenge__exit_back');
  exitBtnContainer.classList.add('audiochallenge__exit_full');
}


let timeOutID;

const bgColor = {
  rgb: '90, 40, 120',
  alpha: 0,
  direction: 1,
  min: 0,
  max: 0.3,
  pitch: 0.01,
}

function changeBgLayer() {
  bgLayer.style.background = `rgba(${bgColor.rgb}, ${bgColor.alpha})`;

  bgColor.alpha += bgColor.pitch * bgColor.direction;
  if (bgColor.alpha > bgColor.max || bgColor.alpha < bgColor.min) {
    bgColor.direction *= -1;
  }

  timeOutID = setTimeout(changeBgLayer, 1000);
}


function addExitGameBtnClickHandler() {
  exitGameBtn.addEventListener('click', () => {
    exitGame();
  });
  backGameBtn.addEventListener('click', () => {
    game.stopGame();
    Dropdown.enableDropdowns();

    enableGameModeSwitch(modeBtn);
    showElement(statBtn);
    showElement(description);
    setExitButtonStdMode();

    clearTimeout(timeOutID);
  });
}


function addStartButtonClickHandler() {
  startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    disableGameModeSwitch(modeBtn);
    hideElement(statBtn);
    hideElement(description);
    setExitButtonBackMode();

    Dropdown.disableDropdowns();
    game = new Game(getGameMode(), Dropdown.getCurrentLevel(), Dropdown.getCurrentRound());
    game.startGame();

    changeBgLayer();
  });
}


function addStatisticsButtonClickHandler() {
  statBtn.addEventListener('click', (event) => {
    event.preventDefault();

    stat.showGlobalStatistics(false);
  });
}


window.onload = () => {
  addStartButtonClickHandler();
  addExitGameBtnClickHandler();
  addGameModeSwitchClickHandler();

  Dropdown.addDropdownsEventHandlers();
  Dropdown.addActiveGameControls('audioCall');
  Dropdown.enableDropdowns();

  addStatisticsButtonClickHandler();
};
