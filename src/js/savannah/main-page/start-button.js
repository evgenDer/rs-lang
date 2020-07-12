import { SAVANNAH_BUTTON, SAVANNAH_TEXT, SAVANNAH_TITLE } from '../../utils/constants';
import { createElement } from '../../utils/updated-create';
import createSpinner from '../../utils/spinner';


export const createGameTimer = () => {
  let time = 3;

  const hearts = document.querySelector('.game-container__hearts');
  const timerText = createElement({ tagName: 'h2', classNames: 'timer__text' });
  const image = createSpinner();
  const timer = createElement({ tagName: 'div', classNames: 'timer', children: [timerText, image] });
  document.body.append(timer);
  setTimeout(() => {
    image.classList.add('opacity-one', 'show-after-click');
    timer.classList.add('show-after-click');
    const timerId = setInterval(() => {
      timerText.textContent = time;
      time -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      timer.classList.add('hidden');
      hearts.classList.remove('hidden');
      // createProcessTemplate();
      setTimeout(() => {
        timer.remove();
      }, 1000);
    }, 4000);
  }, 1000);
};


const onStartButtonClick = () => {
  const start = document.querySelector('.game-container__start');
  const select = document.querySelector('.header__game-controls');
  select.classList.add('hidden');
  start.classList.add('animated-hide');
  createGameTimer();
  setTimeout(() => start.remove(), 1000);
};


const createMainOnStartingPage = () => {
  const gameButton = createElement({
    tagName: 'button', classNames: 'game-container__btn', textContent: SAVANNAH_BUTTON, onClick: [onStartButtonClick],
  });
  const gameText = createElement({ tagName: 'p', classNames: 'game-container__text', textContent: SAVANNAH_TEXT });
  const gameTitle = createElement({ tagName: 'h1', classNames: 'game-container__title', textContent: SAVANNAH_TITLE });
  const gameStartContainer = createElement({ tagName: 'div', classNames: 'game-container__start', children: [gameTitle, gameText, gameButton] });
  document.body.append(gameStartContainer);
};



export default createMainOnStartingPage;
