import Round from './round';
import { getDataWords } from '../../api/words';
import { MASTERPIECE_URL } from '../../utils/constants';
import { removeChild, removeAllButtons, shuffle } from '../../utils/helpers';
import { showElement, hideElement } from '../../helpers/html-helper';
import { saveCustomConfiguration } from '../../configuration/index';
import paintings1 from '../levels/level1';
import paintings2 from '../levels/level2';
import paintings3 from '../levels/level3';
import paintings4 from '../levels/level4';
import paintings5 from '../levels/level5';
import paintings6 from '../levels/level6';
import { addStatisticRoundEnglishPuzzle } from './statistic';
import { GAME_MODES, ERR_MSG } from '../../games/constants';
import { getAggregatedWords } from '../../api/userWords';
import { selectNextRound } from '../../games/dropdown';

function getPageData(numberLevel) {
  switch (numberLevel) {
    case 1: return paintings1;
    case 2: return paintings2;
    case 3: return paintings3;
    case 4: return paintings4;
    case 5: return paintings5;
    default: return paintings6;
  }
}

const loadPage = document.querySelector('.load-page');

const startPage = document.querySelector('.start-page');
const playPage = document.querySelector('.play-page');
const countPages = 24;


export default class Game {
  constructor(mode, numberStartLevel, numberStartRound) {
    this.mode = mode;
    this.numberLevel = numberStartLevel;
    this.numberRound = numberStartRound;
    this.pageData = getPageData(this.numberLevel);
    this.countRounds = 0;
    this.wordsAmntInRound = 10;
    this.dataPage = [];
  }

  async getCurrentRound() {
    if (this.mode === GAME_MODES.all){
      this.dataPage = await getDataWords(this.numberLevel, this.numberRound);
    }
    else {
      const userData = await getAggregatedWords();
      if (userData.totalCount < this.wordsAmntInRound) {
        throw ERR_MSG;
      }
      this.numberRound = Number(localStorage.getItem('numberPage'));
      if(this.numberRound >= countPages){
        this.numberRound = 0;
      }
      this.numberRound += 1;
      localStorage.setItem('numberPage', this.numberRound);
      this.dataPage = shuffle(userData.paginatedResults);
    }
    hideElement(loadPage);
    showElement(playPage);
    const { name, author, year } = this.pageData[this.numberRound];
    const infoAboutPage = `${name} - ${author} (${year})`;
    const round = new Round(this.numberLevel, this.numberRound, this.dataPage, infoAboutPage);
    return round;
  }

  saveConfiguration(){
    const {numberLevel, numberRound} = this;
    const savedConfiguration = JSON.stringify({ level: numberLevel, round: numberRound });
    saveCustomConfiguration('englishPuzzle', savedConfiguration);
  }

 createNewGame() {
    hideElement(document.querySelector('.start-page'));
    this.generateNewRound();
    this.addEventsListenersOnButtons();
  }

  async generateNewRound() {
    try{
    showElement(loadPage);
    const imageSrc = `${MASTERPIECE_URL}${this.pageData[this.numberRound].imageSrc}`;
    this.round = await this.getCurrentRound();
    this.round.generateNewRoundOnPage(imageSrc);
    } catch(error){
      // eslint-disable-next-line no-undef
      UIkit.notification({
        message: `<span uk-icon='icon: warning'></span> ${error}`,
        status: 'warning',
        pos: 'top-center',
      });
    }
  }

  addEventsListenersOnButtons() {
    document.querySelector('.btn_exit').addEventListener('click', () => {
      hideElement(playPage);
      showElement(startPage);
    });
    document.querySelector('.block-btns').addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (button.classList.contains('btn_next')) {
        const statElement = document.getElementById('modal-close-default');
        if(statElement !== null){
          statElement.remove();
        }
        removeAllButtons();
        removeChild(document.querySelector('.block-results'));
        hideElement(playPage);
        showElement(startPage);
      }
      if (button.classList.contains('btn_result')) {
        if (this.mode === GAME_MODES.all) {
          selectNextRound();
          this.saveConfiguration();
        }
        addStatisticRoundEnglishPuzzle(this.round.dataPage);
      }
    });
  }
}
