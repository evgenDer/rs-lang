import { Game } from './Game';
import * as Dropdown from '../games/dropdown';
import { addGameModeSwitchClickHandler, getGameMode, disableGameModeSwitch, enableGameModeSwitch } from '../games/gameModeSwitch';
import { showElement, hideElement } from '../helpers/html-helper';
import { Statistics } from '../statistics/components/statistics';


const startBtn = document.querySelector('.description__start');
const description = document.querySelector('.concentration__desription');
const exitGameBtn = document.querySelector('.concentration__exit > .exit');
const backGameBtn = document.querySelector('.concentration__exit > .exit__back');
const exitBtnContainer = document.querySelector('.concentration__exit');
const gameField = document.querySelector('.concentration__game-field');

const modeBtn = document.querySelector('.game-control__btn_mode');

const statBtn = document.querySelector('.game-control__btn_stat');
const stat = new Statistics('Концентрация');

let game;


function exitGame() {
  document.location.href = 'games.html';
}

function setExitButtonBackMode() {
  exitBtnContainer.classList.remove('concentration__exit_full');
  exitBtnContainer.classList.add('concentration__exit_back');
}

function setExitButtonStdMode() {
  exitBtnContainer.classList.remove('concentration__exit_back');
  exitBtnContainer.classList.add('concentration__exit_full');
}


function addExitGameBtnClickHandler() {
  exitGameBtn.addEventListener('click', () => {
    exitGame();
  });
  backGameBtn.addEventListener('click', () => {
    game.stopGame();
    Dropdown.enableDropdowns();

    enableGameModeSwitch(modeBtn);
    hideElement(gameField);
    showElement(statBtn);
    showElement(description);
    setExitButtonStdMode();
  });
}


function addStartButtonClickHandler() {
  startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    disableGameModeSwitch(modeBtn);
    hideElement(statBtn);
    hideElement(description);
    showElement(gameField);
    setExitButtonBackMode();

    Dropdown.disableDropdowns();
    game = new Game(getGameMode(), Dropdown.getCurrentLevel(), Dropdown.getCurrentRound());
    game.startGame();
  });
}


function addStatisticsButtonClickHandler() {
  statBtn.addEventListener('click', (event) => {
    event.preventDefault();

    stat.showGlobalStatistics();
  });
}


window.onload = () => {
  addStartButtonClickHandler();
  addExitGameBtnClickHandler();
  addGameModeSwitchClickHandler();

  Dropdown.addDropdownsEventHandlers();
  Dropdown.addActiveGameControls('mygame');
  Dropdown.enableDropdowns();
  
  addStatisticsButtonClickHandler();
};
