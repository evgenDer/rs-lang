import createGameTimer from '../main-page/timer';


const onStartButtonClick = () => {
  const start = document.querySelector('.game-container__start');
  const select = document.querySelector('.header__game-controls');
  select.classList.add('hidden');
  start.classList.add('animated-hide');
  createGameTimer();
  setTimeout(() => start.remove(), 1000);
};

export default onStartButtonClick;
