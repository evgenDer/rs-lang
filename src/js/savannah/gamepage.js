import { createElement } from '../utils/updated-create';
import Game from './Game';
import { getGameMode } from '../games/gameModeSwitch';
import { getCurrentLevel, getCurrentRound } from '../games/dropdown';
import createFooter from './game-page/footer';
import createMain from './game-page/main';
import heartCreator from '../utils/heart-creator';
import dagger from '../../img/icons/delete.svg';
import audioIcon from '../../img/icons/sound-on.svg';
import returnIcon from '../../img/icons/arrow-right.svg';
import closeGame from './exit';
import { SAVANNAH_BUTTON, SAVANNAH_TEXT, SAVANNAH_TITLE } from '../utils/constants';
import createSpinner from '../utils/spinner';
import { playAudio, stopAudio } from '../helpers/audio';

export const createProcessTemplate = () => {
  const { answers } = createMain();
  const footer = createFooter();
  const process = createElement({ tagName: 'section', classNames: 'process', children: [answers, footer] });
  const game = new Game ( getGameMode(), getCurrentLevel(), getCurrentRound());
  game.startGame();
  stopAudio();
  document.body.append(process);
  setTimeout(() => {
    process.classList.add('show-after-click');
  }, 1000);
};

export const createGameTimer = () => {
  let time = 3;
  const close = document.querySelector('.game-container__dagger-img');
  const hearts = document.querySelector('.game-container__hearts');
  const timerText = createElement({ tagName: 'h2', classNames: 'timer__text' });
  const image = createSpinner();
  const timer = createElement({ tagName: 'div', classNames: 'timer', children: [timerText, image] });
  document.body.append(timer);
  setTimeout(() => {
    image.classList.add('opacity-one', 'show-after-click');
    timer.classList.add('show-after-click');
    playAudio('assets/audio/time.mp3');
    const timerId = setInterval(() => {
      timerText.textContent = time;
      time -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      timer.classList.add('hidden');
      hearts.classList.remove('hidden');
      close.classList.add('btn_return');
      close.src = returnIcon;
      createProcessTemplate();
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

export function generateGame(){
  const game = new Game(getGameMode(), getCurrentLevel(), getCurrentRound() );
  console.log(getCurrentLevel(), getCurrentRound());
  game.startGame();
}

export const createHeaderOnStartingPage = () => {
  const cross = createElement({ tagName: 'img', classNames: 'game-container__dagger-img', attrs: [['src', dagger]] });
  const iconAudio = createElement ({ tagName: 'img', classNames: 'game-container_audio', attrs: [['src', audioIcon]]});
  const heartContainer = createElement({ tagName: 'div', classNames: 'game-container__hearts hidden', children: heartCreator()});
  const headerContainer = document.querySelector('.game-container__head');
  headerContainer.append(heartContainer);
  heartContainer.prepend(iconAudio);
  headerContainer.prepend(cross);
  createMainOnStartingPage();
  const closeButton = document.querySelector('.game-container__dagger-img');
  document.querySelector('.game-container__dagger-img').addEventListener('click', () => {
    if(closeButton.classList.contains('btn_return')){
      window.location.href = 'game_savannah.html';
    }
    else {
      closeGame();
    }
  });
};



