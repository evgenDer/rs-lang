import { createElement } from '../../utils/create';

export default class StatusBar {
  constructor() {
    this.isPonunciationMode = false;
  }

  generateStatusBar() {
    const numberOfLevels = 6;
    this.levels = [];
    for (let i = 0; i < numberOfLevels; i += 1) {
      const level = createElement({ tagName: 'li', classNames: 'level' });
      this.levels.push(level);
    }
    this.difficultyLevels = createElement({ tagName: 'ul', classNames: 'difficulty-levels', children: this.levels });
    this.starsContainer = createElement({ tagName: 'div', classNames: 'stars_container' });
    const statusBarContainer = createElement({ tagName: 'div', classNames: 'status-bar_container', children: [this.difficultyLevels, this.starsContainer] });
    return statusBarContainer;
  }

  addStar() {
    const star = createElement({ tagName: 'img', classNames: 'star', attrs: [['src', './assets/img/icons/star.svg']] });
    this.starsContainer.append(star);
  }

  removeProgress(){
    this.starsContainer.innerHTML = '';
  }
}
