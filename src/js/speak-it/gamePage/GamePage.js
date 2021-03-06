import StatusBar from './StatusBar';
import Display from './Display';
import CardsBoard from './CardsBoard';
import Microphone from './Microphone';
import Results from './Results';
import { MAX_ATTEMTS_COUNT, TYPE_MICROPHONE_MESSAGE } from '../constants';
import { createElementObj } from '../../utils/create';

export default class GamePage {
  constructor() {
    this.isGameMode = false;
  }

  generateGamePage() {
    this.statusBar = new StatusBar();
    this.cardsBoard = new CardsBoard();
    this.display = new Display();
    this.microphone = new Microphone();
    this.results = new Results();
    this.startGameModeBtn = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn_speak', textContent: 'Тренировка произношение' });
    const buttons = createElementObj({ tagName: 'div', classNames: 'speak-it_btns', children: [this.startGameModeBtn] });

    const callbacksForStatusBar = {
      onClickRestart: () => this.restart(),
      onClickMicrophoneToggle: (microphoneOn) => this.toggleMicrophone(microphoneOn),
      onClickResult: () => this.showResults(),
      onClickHome: () => { window.location.href = 'games.html'; },
      onClickExit: () => this.stop(),
    }

    this.gameContainer = createElementObj({
      tagName: 'div', classNames: 'games-speak-it_game-container wrapper hidden', children: [
        this.statusBar.generate(callbacksForStatusBar),
        this.display.generate(),
        this.microphone.generate(),
        this.cardsBoard.generate(),
        buttons,
        this.results.generate(() => this.onClickReturn()),
      ]
    });
    this.addListeners();
    return this.gameContainer
  }

  start(data) {
    this.restart();
    this.gameContainer.classList.remove('hidden');
    this.cardsBoard.changeCards(data);
  }

  stop() {
    this.gameContainer.classList.add('hidden');
    this.restart();
  }

  onClickReturn() {
    if (!this.isGameMode) {
      this.display.update({ translate: '' });
    } else {
      this.turnOnMicrophone();
    }
    this.cardsBoard.updateCards();
  }

  toggleMicrophone(microphoneOn) {
    if (this.isGameMode) {
      if (!microphoneOn) {
        this.microphone.turnOnPause();
      } else {
        this.turnOnMicrophone();
      }
    }
  }

  showResults(isRoundEnd) {
    if (this.isGameMode) this.microphone.turnOff();
    this.cardsBoard.makeInactiveAllCards();
    const data = {
      correctAnswers: this.cardsBoard.getWordsWithCorrectAnswer(),
      incorrectAnswers: this.cardsBoard.getWordsWithNotCorrectAnswer(),
    }
    this.results.addData(data, isRoundEnd);
    this.results.show();
  }

  restart() {
    if (this.isGameMode) {
      this.statusBar.stopGameMode();
      this.display.stopGameMode();
      this.microphone.turnOff();
      this.cardsBoard.stopGameMode();
      this.startGameModeBtn.innerHTML = 'Тренировка произношение';
      this.startGameModeBtn.classList.remove('game-mode_btn');
    }
    this.cardsBoard.makeInactiveAllCards();
    this.display.update({ translate: '' });
    this.isGameMode = false;
  }

  checkAvailableWords(timeOut) {
    this.cardsBoard.increaseCurrentWordIndex();
    setTimeout(() => {
      if (this.cardsBoard.isAllWordsPass()) {
        this.updateDisplay();
        this.microphone.clearInput();
        this.microphone.removeMessage();
      } else {
        this.showResults(true);
      }
    }, timeOut)

  }

  updateDisplay() {
    this.attemptsСount = 0;
    this.display.update(this.cardsBoard.getCurrentWordInfo());
  }

  turnOnMicrophone() {
    this.microphone.turnOn((word) => {
      if (this.cardsBoard.checkAnswers(word)) {
        this.microphone.addMessage(TYPE_MICROPHONE_MESSAGE.right);
        this.statusBar.addStar(true);
        this.checkAvailableWords('2000');
      } else {
        this.microphone.addMessage(TYPE_MICROPHONE_MESSAGE.error);
        this.attemptsСount += 1;
        if (this.attemptsСount >= MAX_ATTEMTS_COUNT) {
          this.microphone.addMessage(TYPE_MICROPHONE_MESSAGE.nextWord);
          this.cardsBoard.markErroneousAnswer();
          this.statusBar.addStar();
          this.checkAvailableWords('2500');
        }
      }
    });
  }

  addListeners() {
    this.cardsBoard.getCardsContainer().addEventListener('click', (event) => {
      if (!this.isGameMode) {
        this.cardsBoard.cardOnClickHandler(event, (data) => this.display.update(data));
      }
    });

    this.results.getContainer().addEventListener('click', (event) => {
      this.cardsBoard.cardOnClickHandler(event);
    });

    this.startGameModeBtn.addEventListener('click', () => {
      if (!this.isGameMode) {
        this.isGameMode = !this.isGameMode;
        this.startGameModeBtn.innerHTML = 'Пропустить';
        this.startGameModeBtn.classList.add('game-mode_btn');
        this.cardsBoard.startGameMode();
        this.statusBar.startGameMode();
        this.display.startGameMode();
        this.updateDisplay();
        this.turnOnMicrophone();
      } else {
        this.statusBar.addStar();
        this.cardsBoard.markErroneousAnswer();
        this.checkAvailableWords('800');
      }
    });
  }
}
