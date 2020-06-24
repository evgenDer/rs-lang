import { SAVANNAH_TEXT, SAVANNAH_TITLE, SAVANNAH_BUTTON } from '../utils/constants';
import { createElement } from '../utils/updated-create';
import loader from '../../img/icons/savannah_loader.svg';
import createProcessTemplate from './gamepage';
import store from './store/store';
import request from './store/action-creators/fetch-words';
import { changeLevelSelectAction, changeRoundSelectAction } from './store/action-creators/change-select';

const createGameTimer = () => {
  let time = 3;
  const gameContainer = document.querySelector('.game-container');
  const timerText = createElement({ tagName: 'h2', classNames: 'timer__text' });
  const image = createElement({ tagName: 'img', classNames: 'loader', attrs: [['src', loader]] });
  const timer = createElement({ tagName: 'div', classNames: 'timer', children: [timerText, image] });
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
      createProcessTemplate();
      setTimeout(() => {
        timer.remove();
      }, 1000);
    }, 4000);
  }, 1000);
};

const hangEventOnSelect = (isLevel, event) => {
  const { value } = event.target;

  const { dispatch } = store;
  const { complexity, round } = store.getState();
  const param = { complexity, round };

  if (isLevel) {
    dispatch(changeLevelSelectAction(value));
    param.complexity = value;
  } else {
    dispatch(changeRoundSelectAction(value));
    param.round = value;
  }
  dispatch(request(param));
};

const createSelectOptions = (array, name) => array.map((item, index) => createElement({
  tagName: 'option', classNames: 'level-option', textContent: `${name} ${index + 1}`, attrs: [['value', `${index}`]],
}));


const createStartingPage = () => {
  const gameContainer = document.querySelector('.game-container');
  const levelOptions = createSelectOptions([...Array(6).keys()], 'Уровень');
  const roundOptions = createSelectOptions([...Array(30).keys()], 'Раунд');
  const levelSelect = createElement({
    tagName: 'select', classNames: 'select-css', children: levelOptions, onChange: hangEventOnSelect.bind(this, true),
  });
  const roundSelect = createElement({
    tagName: 'select', classNames: 'select-css', children: roundOptions, onChange: hangEventOnSelect.bind(this, false),
  });
  const selectContainer = createElement({ tagName: 'div', children: [levelSelect, roundSelect], classNames: 'select-container d-flex justify-content-between' });

  const gameButton = createElement({ tagName: 'button', classNames: 'game-container__btn', textContent: SAVANNAH_BUTTON });
  const gameText = createElement({ tagName: 'p', classNames: 'game-container__text', textContent: SAVANNAH_TEXT });
  const gameTitle = createElement({ tagName: 'h1', classNames: 'game-container__title', textContent: SAVANNAH_TITLE });
  const gameStartContainer = createElement({ tagName: 'div', classNames: 'game-container__start', children: [gameTitle, gameText, selectContainer, gameButton] });
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
