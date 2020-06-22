import StartScreen from './StartScreen';
import StatusBar from './StatusBar';
import GameBoard from './GameBoard';

const mainWrapper = document.querySelector('.speak-it_main');
const gameContainer = document.querySelector('.game-container');

const startScreen = new StartScreen();
mainWrapper.append(startScreen.generateStartScreen());
const statusBar = new StatusBar();
const gameBoard = new GameBoard();
gameContainer.append(
  statusBar.generateStatusBar(),
  gameBoard.generateGameBoard(),
);
