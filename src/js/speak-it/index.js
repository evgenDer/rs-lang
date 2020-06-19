import StartScreen from './StartScreen';

const mainWrapper = document.querySelector('.speak-it_main');
// const gameContainer = document.querySelector('.game-container');

const startScreen = new StartScreen();
mainWrapper.append(startScreen.generateStartScreen());
