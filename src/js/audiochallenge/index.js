import { Game } from './Game';
import { addGameModeSwitchClickHandler } from '../games/index';
import { showElement, hideElement } from '../helpers/html-helper';


const startBtn = document.querySelector('.description__start');
const description = document.querySelector('.audiochallenge__desription');
const gameField = document.querySelector('.audiochallenge__game-field');
const exitGameBtn = document.querySelector('.audiochallenge__exit > .exit');
const backGameBtn = document.querySelector('.audiochallenge__exit > .exit__back');
const exitBtnContainer = document.querySelector('.audiochallenge__exit');

const mainSpeakerBtn = document.getElementById('main-speaker');
const wordSpeakerBtn = document.getElementById('word-speaker');
const exampleSpeakerBtn = document.getElementById('example-speaker');

const modeBtn = document.querySelector('.game-control__btn_mode');


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
  });
}


function addStartButtonClickHandler() {
  startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    hideElement(modeBtn);
    hideElement(description);
    showElement(gameField);
    setExitButtonBackMode();

    // eslint-disable-next-line no-unused-vars
    const game = new Game();
  });
}


function addSpeakerButtonsClickHandler() {
  mainSpeakerBtn.addEventListener('click', () => {
    // repeat audio
  });
  wordSpeakerBtn.addEventListener('click', () => {
    // repeat audio
  });
  exampleSpeakerBtn.addEventListener('click', () => {
    // repeat audio
  });
}


window.onload = () => {
  addStartButtonClickHandler();
  addExitGameBtnClickHandler();
  addGameModeSwitchClickHandler();

  addSpeakerButtonsClickHandler();
};
