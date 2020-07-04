import { exitGame } from '../utils/helpers';
import { showElement, hideElement } from '../helpers/html-helper';
import { addGameModeSwitchClickHandler } from '../games/index';
import Game from "./components/game";

document.querySelector('.btn_exit').addEventListener('click', () => {
  exitGame();
});

document.querySelector('.btn_close').addEventListener('click', () => {
  exitGame();
});

window.onload = async() => {
  addGameModeSwitchClickHandler();
  const startPage = document.querySelector('.start-page');
  startPage.querySelector('.block-start__button').addEventListener('click', async() => {
    showElement(startPage);
    const loaderPage = document.querySelector('.load-page');
    hideElement(loaderPage);
    // const configuration = await getConfiguration();
    // const gameObject = JSON.parse(configuration.englishPuzzle);
    // const configurationGame = (isEmptyObject(gameObject) ) ? DEFAULT_SETTINGS_GAME : gameObject;
    // const game = new Game(configurationGame.level, configurationGame.round);
    const game = new Game(1, 1);
    game.createNewGame();
  });
}
