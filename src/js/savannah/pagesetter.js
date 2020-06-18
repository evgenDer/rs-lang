/* eslint-disable import/no-unresolved */
import { SAVANNAH_TEXT, SAVANNAH_TITLE } from 'Utils/constants';
import { createElement } from '../utils/create';


const createGameTimer = () => {
  const gameContainer = document.querySelector('.game-container');
  const spinner = document.querySelector('.loader');
  const timerText = createElement('h2', 'timer__text');
  const timer = createElement('div', 'timer', [timerText]);
  let time = 3;
  gameContainer.append(timer);

  setTimeout(() => {
    spinner.classList.add('display-in-bl', 'show-after-click');
    timer.classList.add('show-after-click');
    const timerId = setInterval(() => {
      timerText.innerHTML = time;
      time -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
    }, 4000);
  }, 1000);
};

const onStartButtonClick = () => {
  const start = document.querySelector('.game-container__start');
  start.classList.add('animated-hide');
  createGameTimer();
};

export const hangEventOnStartButton = () => {
  const startButton = document.querySelector('.game-container__btn');
  startButton.addEventListener('click', onStartButtonClick);
};

const createStartingPage = () => {
  const gameContainer = document.querySelector('.game-container');
  const gameText = createElement('p', 'game-container__text', '', '', SAVANNAH_TEXT);
  const gameTitle = createElement('h1', 'game-container__title', '', '', SAVANNAH_TITLE);
  const gameStartContainer = createElement('div', 'game-container__start', [gameText, gameTitle]);
  gameContainer.append(gameStartContainer);
};

export const hangEventOnWindow = () => {
  window.addEventListener('load', createStartingPage);
};
