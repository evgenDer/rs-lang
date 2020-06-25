import { createElement } from '../../utils/create';

export default class StatusBar {
  constructor() {
    this.isPonunciationMode = false;
  }

  generateStatusBar() {

    this.starsContainer = createElement({ tagName: 'div', classNames: 'stars_container' });
    const statusBarContainer = createElement({ tagName: 'div', classNames: 'status-bar_container', children: [ this.starsContainer] });
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
