import { Game } from './Game';
import { addGameModeSwitchClickHandler, getGameMode } from '../games/gameModeSwitch';
import { showElement, hideElement } from '../helpers/html-helper';
import * as Dropdown from '../games/dropdown';


const startBtn = document.querySelector('.description__start');
const description = document.querySelector('.audiochallenge__desription');
const gameField = document.querySelector('.audiochallenge__game-field');
const exitGameBtn = document.querySelector('.audiochallenge__exit > .exit');
const backGameBtn = document.querySelector('.audiochallenge__exit > .exit__back');
const exitBtnContainer = document.querySelector('.audiochallenge__exit');

const modeBtn = document.querySelector('.game-control__btn_mode');

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


function addExitGameBtnClickHandler() {
  exitGameBtn.addEventListener('click', () => {
    exitGame();
  });
  backGameBtn.addEventListener('click', () => {
    showElement(modeBtn);
    hideElement(gameField);
    showElement(description);
    setExitButtonStdMode();

    game.stopGame();
    Dropdown.enableDropdowns();
  });
}


function addStartButtonClickHandler() {
  startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    hideElement(modeBtn);
    hideElement(description);
    showElement(gameField);
    setExitButtonBackMode();

    Dropdown.disableDropdowns();
    game = new Game(getGameMode(), Dropdown.getCurrentLevel(), Dropdown.getCurrentRound());
    game.startGame();
  });
}


window.onload = () => {
  addStartButtonClickHandler();
  addExitGameBtnClickHandler();
  addGameModeSwitchClickHandler();
  Dropdown.addDropdownsEventHandlers();
};
