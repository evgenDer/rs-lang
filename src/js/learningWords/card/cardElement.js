import cardShadowTreeHTML from './shadowTree/shadowTree.js';
import initLearningMode from './lightTree/initLearningMode.js'

export default class WordCardElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      word: null,
      translation: null,
      mode: 'newWord',
    }

    this.settings = {

    }

    this.localState = {
      isReadyToRenderArr: [],
    }

  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = cardShadowTreeHTML;
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

  static get observedAttributes() {
    return ['word', 'translation']
  }

  attributeChangedCallback() {
    this.localState.isReadyToRenderArr.push(false);
    const updateIndex = this.localState.isReadyToRenderArr.length - 1;
    setTimeout(() => {
      this.localState.isReadyToRenderArr[updateIndex] = true;
      let isReadyToRender = false;
      const currentLength = this.localState.isReadyToRenderArr.length;
      for (let i = 0; i < currentLength; i += 1) {
        if (this.localState.isReadyToRenderArr[i]) {
          isReadyToRender = true;
        } else {
          isReadyToRender = false;
          break;
        }
      }
      if (isReadyToRender) {
        this.localState.isReadyToRenderArr = [];
        initLearningMode(this);
      }
    }, 16)
  }
}
