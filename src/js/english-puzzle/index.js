import { exitGame } from '../utils/helpers';
import { showElement, hideElement } from '../helpers/html-helper';
import { addGameModeSwitchClickHandler, getGameMode } from '../games/gameModeSwitch';
import * as Dropdown from '../games/dropdown';
import Game from "./components/game";
import { addEventsListenerOnHintButtons } from './components/hints';
import { Statistics } from '../statistics/components/statistics';

const startPage = document.querySelector('.start-page');
const loaderPage = document.querySelector('.load-page');

const statBtn = document.querySelector('.game-control__btn_stat');
const stat = new Statistics('EnglishPuzzle');

document.querySelector('.btn_close').addEventListener('click', () => {
  exitGame();
});

function addStatisticsButtonClickHandler() {
  statBtn.addEventListener('click', (event) => {
    event.preventDefault();

    stat.showGlobalStatistics(false);
  });
}


function addEventListenerOnStartButton(){
  startPage.querySelector('.block-start__button').addEventListener('click', async() => {
    showElement(loaderPage);
    hideElement(startPage);
    const game = new Game(getGameMode(), Dropdown.getCurrentLevel(), Dropdown.getCurrentRound());
    game.createNewGame();
  });
}

window.onload = () => {
  addEventListenerOnStartButton();
  addGameModeSwitchClickHandler();
  addEventsListenerOnHintButtons();
  Dropdown.addDropdownsEventHandlers();
  Dropdown.addActiveGameControls('englishPuzzle');
  Dropdown.enableDropdowns();
  addStatisticsButtonClickHandler();
}
