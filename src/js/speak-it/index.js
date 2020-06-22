import StartScreen from './StartScreen';
import StatusBar from './StatusBar';
import GameBoard from './GameBoard';
import Display from './Display';

const mainWrapper = document.querySelector('.speak-it_main');
const gameContainer = document.querySelector('.game-container');

const startScreen = new StartScreen();
mainWrapper.append(startScreen.generateStartScreen());
const statusBar = new StatusBar();
const gameBoard = new GameBoard();
const display = new Display();
gameContainer.append(
  statusBar.generateStatusBar(),
  display.generateDisplay(),
  gameBoard.generateGameBoard(),
);
