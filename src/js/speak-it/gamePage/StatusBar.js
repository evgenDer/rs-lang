import { createElement } from '../../utils/create';
import Dropdoun from './Dropdown';

const LEVELS_NUMBER = 6;
const ROUNDS_NUMBER = 60;

export default class StatusBar {
  constructor() {
    this.levelsDropdoun = '';
    this.roundsDropdoun = '';
    this.starsContainer = '';
  }

  generate(localData, callbackFunctions) {
    this.levelsDropdoun = new Dropdoun('Уровень', LEVELS_NUMBER, localData.level);
    this.roundsDropdoun = new Dropdoun('Раунд', ROUNDS_NUMBER, localData.page);
    const gameControl = createElement({
      tagName: 'div',
      classNames: 'game-control',
      children: [
        this.levelsDropdoun.generate(() => this.roundsDropdoun.makeItemActive(0)),
        this.roundsDropdoun.generate(() => {
          const data = { level: this.levelsDropdoun.getNumCurrentItem(), page: this.roundsDropdoun.getNumCurrentItem() };
          callbackFunctions.onChangeLevel(data);
        }),
       ],
     });

    this.starsContainer = createElement({ tagName: 'div', classNames: 'stars_container' });
    const statusBarContainer = createElement({ tagName: 'div', classNames: 'status-bar_container', children: [ gameControl, this.starsContainer] });
    return statusBarContainer;
  }

  chageRound(){
    const currentRaund = this.roundsDropdoun.getNumCurrentItem();
    const currentLevel = this.levelsDropdoun.getNumCurrentItem();
    if( currentRaund < ROUNDS_NUMBER) {
      this.roundsDropdoun.makeItemActive(currentRaund + 1);
    } else if( currentLevel < LEVELS_NUMBER) {
        this.levelsDropdoun.makeItemActive(currentLevel + 1);
      } else {
        this.levelsDropdoun.makeItemActive(0);
      }
  }

  addStar() {
    const star = createElement({ tagName: 'img', classNames: 'star uk-animation-scale-down', attrs: [['src', './assets/img/icons/star.svg']] });
    this.starsContainer.append(star);
  }

  removeProgress() {
    this.starsContainer.innerHTML = '';
  }
}
