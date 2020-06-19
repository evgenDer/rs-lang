import { createElement } from '../utils/create';

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
    const healthLevel = createElement({ tagName: 'div', classNames: 'health-level_container' });
    const statusBarContainer = createElement({ tagName: 'div', classNames: 'status-bar_container', children: [this.difficultyLevels, healthLevel] });
    return statusBarContainer;
  }
}
