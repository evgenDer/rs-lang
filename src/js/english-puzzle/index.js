import { exitGame, addHidden, removeHidden } from '../utils/helpers';
import { DEFAULT_SETTINGS_GAME } from '../constants/defaul-settings';
import { isEmptyObject } from '../utils/checks';
import { getConfiguration } from '../configuration/index';
import Game from "./components/game";

document.querySelector('.btn_exit').addEventListener('click', () => {
  exitGame();
});

document.querySelector('.btn_close').addEventListener('click', () => {
  exitGame();
});

window.onload = async() =>{
  const startPage = document.querySelector('.start-page');
  startPage.querySelector('.block-start__button').addEventListener('click', async() => {
    addHidden(startPage);
    const loaderPage = document.querySelector('.load-page');
    removeHidden(loaderPage);
    const configuration= await getConfiguration();
    const gameObject = configuration.englishPuzzle;
    const configurationGame = (typeof(gameObject) === "undefined" || !isEmptyObject(gameObject) ) ? DEFAULT_SETTINGS_GAME : configuration.englishPuzzle;
    const game = new Game(configurationGame.level, configurationGame.round);
    game.createNewGame();
  });
}
