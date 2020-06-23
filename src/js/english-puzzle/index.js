import { exitGame } from '../utils/helpers';

const { default: Game } = require("./components/game");

document.querySelector('.btn_exit').addEventListener('click', () => {
  exitGame();
});

document.querySelector('.btn_close').addEventListener('click', () => {
  exitGame();
});

window.onload = () =>{
  const game = new Game(1,1);
  game.createNewGame();

}
