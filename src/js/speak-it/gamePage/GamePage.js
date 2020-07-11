import StatusBar from './StatusBar';
import Display from './Display';
import CardsBoard from './CardsBoard';
import Microphone from './Microphone';
import Results from './Results';
import { MAX_ATTEMTS_COUNT, TYPE_MICROPHONE_MESSAGE } from '../constants';
import { createElementObj } from '../../utils/create';
import { getGameStatistics} from '../../utils/storage';



export default class GamePage {
  constructor() {
    this.isGameMode = false;
  }

  generateGamePage() {
  const localData = getGameStatistics('speakitStatistic');
  this.statusBar = new StatusBar();
  this.gameBoard = new CardsBoard();
  this.display = new Display();
  this.microphone = new Microphone();
  this.results = new Results();
  this.startGameModeBtn = createElementObj({ tagName: 'button', classNames: 'btn btn_speak', textContent: 'Тренировака произношение' });
  const buttons = createElementObj({ tagName: 'div', classNames: 'btns', children: [this.startGameModeBtn] });

  const callbacksForStatusBar = {
    onChangeLevel: (result)=> {
      this.gameBoard.cahgeCards(result);
      this.display.update({translate: ''});
    },
    onClickRestart: () => this.restart(),
    onClickMicrophoneToggle: (microphoneOn) => {
      if (this.isGameMode) {
        if(!microphoneOn) {
        this.microphone.turnOnPause();
      } else {
        this.turnOnMicrophone();
      }}
    },
    onClickStatistics: () => this.showResults(),
    onClickHome: () => GamePage.goToHomePage(),

  }
  const callbacksForResults = {
    onClickNewRaund: ()=> {
      this.restart();
      this.statusBar.chageRound();
    },
    onClickReturn: () => {
      if (!this.isGameMode) {
        this.display.update({translate: ''});
      } else {
        this.turnOnMicrophone();
      }
      this.gameBoard.updateCards();
    },
    onClickReport: () => {},
  }

  this.gameContainer = createElementObj({ tagName: 'div', classNames: 'game-container hidden', children: [
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

  static goToHomePage() {
    window.location.href = 'games.html';
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
      this.startGameModeBtn.innerHTML = 'Тренировака произношение';
      this.startGameModeBtn.classList.remove('game-mode_btn');
    }
    this.gameBoard.makeInactiveAllCards();
    this.display.update({translate: ''});
    this.isGameMode = false;
  }

  checkAvailableWords(timeOut) {
    this.gameBoard.increaseCurrentWordIndex();
    setTimeout(() => {
      if (this.gameBoard.isAllWordsPass()) {
        this.updateDisplay();
        this.microphone.clearInput();
        this.microphone.removeMessage();
      } else {
        this.showResults();
      }
    }, timeOut)

  }

  updateDisplay() {
    this.attemptsСount = 0;
    this.display.update(this.gameBoard.getCurrentWordInfo());
  }

  turnOnMicrophone() {
    this.microphone.turnOn((word) => {
      if (this.gameBoard.checkAnswers(word)) {
        this.microphone.addMessage(TYPE_MICROPHONE_MESSAGE.right);
        this.statusBar.addStar(true);
        this.checkAvailableWords('2000');
      } else {
        this.microphone.addMessage(TYPE_MICROPHONE_MESSAGE.error);
        this.attemptsСount += 1;
        if (this.attemptsСount >= MAX_ATTEMTS_COUNT) {
          this.microphone.addMessage(TYPE_MICROPHONE_MESSAGE.nextWord);
          this.statusBar.addStar();
          this.checkAvailableWords('2500');
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
        this.statusBar.addStar();
        this.checkAvailableWords('800');
      }

    });
  }
}
