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

const hangEventOnStartButton = () => {
  const startButton = document.querySelector('.game-container__btn');
  startButton.addEventListener('click', onStartButtonClick);
};

export default hangEventOnStartButton;
