import cardShadowTreeHTML from './shadowTree/shadowTree.js';
import initLearningMode from './lightTree/initLearningMode.js'

export default class WordCardElement extends HTMLElement {
  constructor() {
    this.state = {
      word: null,
      translation: null,
      mode: 'learning',
    }

    this.settings = {
      learningMode: true,
    }

  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = shadowTreeHTML;
    this.switchMode();
  }

  switchMode() {
    this.innerHTML = ``;
    switch (this.state.mode) {
      case 'learning':
        initLearningMode(this);
        break;
    }
  }

  setState(propName, newPropState) {
    if (this.state[propName] != newPropState) {
      this.state[propName] = newPropState;
      this.setAttribute(propName, this.state[propName]);
    }
  }


}
