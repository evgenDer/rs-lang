import StatusBar from './StatusBar';
import Display from './Display';
import GameBoard from './GameBoard';
import Results from './Results';
import { createElement } from '../../utils/create';
import { getGameStatistics} from '../../utils/storage';

export default class GamePage {
  constructor() {
    this.isGameMode = false;
  }

  generateGamePage() {
  const localData = getGameStatistics('speakitStatistic');
  this.statusBar = new StatusBar();
  this.gameBoard = new GameBoard();
  this.display = new Display();
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
      }
      this.gameBoard.updateCards();
    },
  }

  this.gameContainer = createElement({ tagName: 'div', classNames: 'game-container hidden', children: [
    this.statusBar.generate(localData, callbacksForStatusBar),
    this.display.generate(),
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
    this.gameBoard.makeInactiveAllCards();
    const data = {
      correctAnswers: this.gameBoard.getWordsWithCorrectAnswer(),
      incorrectAnswers: this.gameBoard.getWordsWithNotCorrectAnswer(),
    }
    this.results.addData(data);
    this.results.show();
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
  }
}
