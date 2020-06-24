import Round from './round';
import { getDataWords, getCountWordsInGroup } from '../../api/words';
import { MASTERPIECE_URL } from '../../utils/constants';
import { addEventsListenerOnHintButtons } from './hints';
import { removeChild, removeAllButtons, insertNewButtons } from '../../utils/helpers';
import paintings1 from '../levels/level1';
import paintings2 from '../levels/level2';
import paintings3 from '../levels/level3';
import paintings4 from '../levels/level4';
import paintings5 from '../levels/level5';
import paintings6 from '../levels/level6';
import { createElement } from '../../utils/create';

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

const COUNT_LEVELS = 6;

export default class Game {
  constructor(numberStartLevel, numberStartRound) {
    this.numberLevel = numberStartLevel;
    this.numberRound = numberStartRound;
    this.pageData = getPageData(this.numberLevel);
    this.countRounds = 0;
  }

  async getCurrentRound() {
    const dataPage = await getDataWords(this.numberLevel - 1, this.numberRound - 1);
    const { name, author, year } = this.pageData[this.numberRound];
    const infoAboutPage = `${name} - ${author} (${year})`;
    const round = new Round(this.numberLevel, this.numberRound, dataPage, infoAboutPage);
    return round;
  }

  async generateRoundsInPage() {
    const activeRound = this.numberRound;
    this.numberRound = activeRound;
    this.countRounds = await getCountWordsInGroup(this.numberLevel - 1);
    console.log(this.countRounds);
    const switcherRound = document.querySelector('.switcher_round');
    removeChild(switcherRound);
    for (let i = 0; i < this.countRounds; i += 1) {
      const newElementRound = createElement('li', '', [], [], `Раунд: ${i + 1}`);
      switcherRound.append(newElementRound);
      if (activeRound - 1 === i) {
        newElementRound.classList.add('uk-active');
        const activeButton = document.querySelector('.button_round');
        activeButton.innerText = `Раунд: ${i + 1}`;
      }
    }
    switcherRound.addEventListener('click', (event) => {
      const elementClick = event.target.closest('li');
      if (!elementClick.classList.contains('uk-active')) {
        switcherRound.querySelector('.uk-active').classList.remove('uk-active');
        event.target.classList.add('uk-active');
        const textContent = event.target.innerText;
        document.querySelector('.button_round').innerText = textContent;
        this.numberRound = Number(textContent[textContent.length - 1]);
        this.generateNewRound();
      }
    });
  }

  generateLevelsInPage() {
    const switcherLevel = document.querySelector('.switcher_level');
    this.generateRoundsInPage();
    removeChild(switcherLevel);
    for (let i = 0; i < COUNT_LEVELS; i += 1) {
      const newElementLevel = createElement('li', '', [], [], `Уровень: ${i + 1}`);
      switcherLevel.append(newElementLevel);
      if (this.numberLevel -1 === i) {
        newElementLevel.classList.add('uk-active');
        const activeButton = document.querySelector('.button_level');
        activeButton.textContent = `Уровень: ${i + 1}`;
      }
    }
    switcherLevel.addEventListener('click', (event) => {
      const elementClick = event.target.closest('li');
      if (!elementClick.classList.contains('uk-active')) {
        switcherLevel.querySelector('.uk-active').classList.remove('uk-active');
        event.target.classList.add('uk-active');
        const textContent = event.target.innerText;
        document.querySelector('.button_level').innerText = textContent;
        this.numberLevel = Number(textContent[textContent.length - 1]);
        this.numberRound = 1;
        this.pageData = getPageData(this.numberLevel);
        this.generateRoundsInPage();
        this.generateNewRound();
      }
    });
  }

  createNewGame() {
    this.generateLevelsInPage();
    this.generateNewRound();
    this.addEventsListenersOnButtons();
  }

  async generateNewRound() {
    const imageSrc = `${MASTERPIECE_URL}${this.pageData[this.numberRound].imageSrc}`;
    this.round = await this.getCurrentRound();
    addEventsListenerOnHintButtons();
    this.round.generateNewRoundOnPage(imageSrc);
    // this.pageData[this.numberRound] = {};
    // this.addImageInPage();
  }

  addEventsListenersOnButtons() {
    document.querySelector('.block-btns').addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (button.classList.contains('btn_next')) {
        removeAllButtons();
        removeChild(document.querySelector('.block-results'));
        this.generateNextRound();
        insertNewButtons(['button_unknown']);
      }
      if (button.classList.contains('btn_result')) {
        //
      }
    });
  }

  generateNextRound() {
    if (this.countRounds === this.numberRound) {
      this.numberLevel += 1;
      const activeLevel = document.querySelector('.switcher_level li.uk-active');
      const nextLevel = activeLevel.nextElementSibling;
      nextLevel.click();
    } else {
      this.numberRound += 1;
      const activeRound = document.querySelector('.switcher_round li.uk-active');
      const nextRound = activeRound.nextElementSibling;
      nextRound.click();
    }
    this.generateNewRound();
  }
}
