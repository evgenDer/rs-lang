import StatusBar from './StatusBar';
import GameBoard from './GameBoard';
import Display from './Display';
import { createElement } from '../../utils/create';

export default class GamePage {
  constructor() {
    this.isPronunciationMode = false;
  }

  generateGamePage() {
  this.statusBar = new StatusBar();
  this.gameBoard = new GameBoard();
  this.display = new Display();
  this.restartBtn = createElement({ tagName: 'button', classNames: 'btn btn_restart', textContent: 'Restart' });
  this.speakBtn = createElement({ tagName: 'button', classNames: 'btn btn_speak', textContent: 'Start speaking' });
  this.resultBtn = createElement({ tagName: 'button', classNames: 'btn btn_result', textContent: 'Results' });
  const buttons = createElement({ tagName: 'div', classNames: 'btns', children: [this.restartBtn, this.speakBtn, this.resultBtn] });
  this.gameContainer = createElement({ tagName: 'div', classNames: 'game-container hidden', children: [
    this.statusBar.generateStatusBar(),
    this.display.generateDisplay(),
    this.gameBoard.generateGameBoard(),
    buttons,
  ] });
  this.addListeners();
  return this.gameContainer
  }

  start() {
    this.gameBoard.addCards();
    this.gameContainer.classList.remove('hidden');
  }

  addListeners() {
    this.gameBoard.getContainer().addEventListener('click', (event) => {
      if (!this.isPronunciationMode) {
        this.gameBoard.cardOnClickHandler(event, (data) =>  this.display.updateDisplay(data));
      }
    });

    this.speakBtn.addEventListener('click', () => {
      if (!this.isPronunciationMode) {
        this.speakBtn.innerHTML = 'Pause';
        this.gameBoard.startGameMode();
        this.display.turnOnMicrophone((word) => {
            this.gameBoard.checkAnswers(word, (data) => {
              this.display.updateDisplay(data);
              this.statusBar.addStar();
            });
          });
      } else {
        this.display.turnOffMicrophone();
        this.speakBtn.innerHTML ='Start speaking';
      }
      this.isPronunciationMode = !this.isPronunciationMode;
    });
  }
}
