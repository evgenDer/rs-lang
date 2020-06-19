import StartScreen from './StartScreen';
import StatusBar from './StatusBar';

const mainWrapper = document.querySelector('.speak-it_main');
const gameContainer = document.querySelector('.game-container');

const startScreen = new StartScreen();
mainWrapper.append(startScreen.generateStartScreen());
const statusBar = new StatusBar();
gameContainer.append(statusBar.generateStatusBar());
