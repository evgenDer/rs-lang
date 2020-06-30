import StatusBar from './StatusBar';
import Display from './Display';
import GameBoard from './GameBoard';
import Microphone from './Microphone';
import Results from './Results';
import { createElement } from '../../utils/create';
import { getGameStatistics} from '../../utils/storage';

const MAX_ATTEMTS_COUNT = 4;

export default class GamePage {
  constructor() {
    this.isGameMode = false;
  }

  generateGamePage() {
  const localData = getGameStatistics('speakitStatistic');
  this.statusBar = new StatusBar();
  this.gameBoard = new GameBoard();
  this.display = new Display();
  this.microphone = new Microphone();
  this.results = new Results();
  this.startGameModeBtn = createElement({ tagName: 'button', classNames: 'btn btn_speak', textContent: 'Start speaking' });
  const buttons = createElement({ tagName: 'div', classNames: 'btns', children: [this.startGameModeBtn] });

  const callbacksForStatusBar = {
    onChangeLevel: (result)=> {
      this.gameBoard.cahgeCards(result);
      this.display.update({translate: ''});
    },
    onClickRestart: () => this.restart(),
    onClickStatistics: () => this.showResults(),
  }
  const callbacksForResults = {
    onNewRaund: ()=> {
      this.restart();
      this.statusBar.chageRound();
    },
    onReturn: () => {
      if (!this.isGameMode) {
        this.display.update({translate: ''});
      } else {
        this.turnOnMicrophone();
      }
      this.gameBoard.updateCards();
    },
  }

  this.gameContainer = createElement({ tagName: 'div', classNames: 'game-container hidden', children: [
    this.statusBar.generate(localData, callbacksForStatusBar),
    this.display.generate(),
    this.microphone.generate(),
    this.gameBoard.generate(),
    buttons,
    this.results.generate( callbacksForResults ),
  ] });

  this.gameBoard.cahgeCards(localData);
  this.addListeners();
  return this.gameContainer
  }

  start() {
    this.gameContainer.classList.remove('hidden');
  }

  showResults() {
    if (this.isGameMode) this.microphone.turnOff();
    this.gameBoard.makeInactiveAllCards();
    const data = {
      correctAnswers: this.gameBoard.getWordsWithCorrectAnswer(),
      incorrectAnswers: this.gameBoard.getWordsWithNotCorrectAnswer(),
    }
    this.results.addData(data);
    this.results.show();
  }

  restart() {
    if (this.isGameMode) {
      this.statusBar.stopGameMode();
      this.display.stopGameMode();
      this.microphone.turnOff();
      this.gameBoard.stopGameMode();
      this.startGameModeBtn.innerHTML = 'Start speaking';
      this.startGameModeBtn.classList.remove('game-mode_btn');
    }
    this.gameBoard.makeInactiveAllCards();
    this.display.update({translate: ''});
    this.isGameMode = false;
  }

  checkAvailableWords() {
    this.gameBoard.increaseCurrentWordIndex();
    if (this.gameBoard.isAllWordsPass()) {
      this.updateDisplay();
    } else {
      this.showResults();
    }
  }

  updateDisplay() {
    this.attemptsСount = 0;
    this.display.update(this.gameBoard.getCurrentWordInfo());
  }

  turnOnMicrophone() {
    this.microphone.turnOn((word) => {
      if (this.gameBoard.checkAnswers(word)) {
        this.statusBar.addStar();
        this.checkAvailableWords();
        this.microphone.clearInput();
      } else {
        this.attemptsСount += 1;
        if (this.attemptsСount >= MAX_ATTEMTS_COUNT) {
          this.checkAvailableWords();
        }
      }
    });
  }

  addListeners() {
    this.gameBoard.getCardsContainer().addEventListener('click', (event) => {
      if (!this.isGameMode) {
        this.gameBoard.cardOnClickHandler(event, (data) =>  this.display.update(data));
      }
    });

    this.results.getContainer().addEventListener('click', (event) => {
        this.gameBoard.cardOnClickHandler(event);
    });

    this.startGameModeBtn.addEventListener('click', () => {
      if (!this.isGameMode) {
        this.isGameMode = !this.isGameMode;
        this.startGameModeBtn.innerHTML = 'Пропустить';
        this.startGameModeBtn.classList.add('game-mode_btn');
        this.gameBoard.startGameMode();
        this.statusBar.startGameMode();
        this.display.startGameMode();
        this.updateDisplay();
        this.turnOnMicrophone();
      } else {
        this.checkAvailableWords();
      }

    });
  }
}
