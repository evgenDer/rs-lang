import { SAVANNAH_TEXT, SAVANNAH_TITLE, SAVANNAH_BUTTON } from '../utils/constants';
import { createElement } from '../utils/create';
import loader from '../../img/icons/savannah_loader.svg';
import createHeader from './gamepage';

const rnd = (rndTrash) => {
  const number = Math.floor(Math.random() * 20);
  return rndTrash.includes(number) ? rnd(rndTrash) : number;
};
const request = () => fetch('https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0')
  .then((res) => res.json());


const createMain = (obj) => {
  console.log(obj);
  const rndTrash = [];
  rnd.call(this, rndTrash);
};

const createGameTimer = () => {
  let time = 3;
  const gameContainer = document.querySelector('.game-container');
  const timerText = createElement('h2', 'timer__text');
  const image = createElement('img', 'loader', '', [['src', loader]]);
  const timer = createElement('div', 'timer', [timerText, image]);
  gameContainer.append(timer);

  setTimeout(() => {
    const spinner = document.querySelector('.loader');

    spinner.classList.add('opacity-one', 'show-after-click');
    timer.classList.add('show-after-click');

    const timerId = setInterval(() => {
      timerText.innerHTML = time;
      time -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      timer.classList.add('hide');
      createHeader();
      setTimeout(() => {
        request().then(createMain);
        timer.remove();
      }, 1000);
    }, 4000);
  }, 1000);
};

const createStartingPage = () => {
  const gameContainer = document.querySelector('.game-container');
  const gameButton = createElement('button', 'game-container__btn', '', '', SAVANNAH_BUTTON);
  const gameText = createElement('p', 'game-container__text', '', '', SAVANNAH_TEXT);
  const gameTitle = createElement('h1', 'game-container__title', '', '', SAVANNAH_TITLE);
  const gameStartContainer = createElement('div', 'game-container__start', [gameTitle, gameText, gameButton]);
  gameContainer.append(gameStartContainer);
};

const onStartButtonClick = () => {
  const start = document.querySelector('.game-container__start');
  start.classList.add('animated-hide');
  createGameTimer();
  setTimeout(() => start.remove(), 1000);
};

const hangEventOnStartButton = () => {
  const startButton = document.querySelector('.game-container__btn');
  startButton.addEventListener('click', onStartButtonClick);
};

const hangEventOnWindow = () => {
  window.addEventListener('load', () => {
    createStartingPage();
    hangEventOnStartButton();
  });
};

export default hangEventOnWindow;
