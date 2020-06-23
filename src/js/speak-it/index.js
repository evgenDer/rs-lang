import StartScreen from './StartScreen';
import GamePage from './gamePage/GamePage';


const mainWrapper = document.querySelector('.speak-it_main');

const startScreen = new StartScreen();
const gamePage = new GamePage();
mainWrapper.append( gamePage.generateGamePage(), startScreen.generateStartScreen());

document.addEventListener('startSpeakit', () => {
  gamePage.start();
})
