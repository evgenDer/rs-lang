import cardShadowTreeHTML from './domBuilder/shadowTree/shadowTree.js';
import initNewWord from './domBuilder/lightTree/initNewWord.js';
import initLearning from './domBuilder/lightTree/initLearningMode.js';
import initCardOptions from './domBuilder/lightTree/initOptions.js';
import createEventListener from './events/createEventListener.js';


export default class WordCardElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      word: null,
      translation: null,
      sentence: null,
      sentenceTranslation: null,
      mode: null,
      isDone: false,
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
    createEventListener(this);
  }

  switchMode() {
    this.innerHTML = ``;
    switch (this.state.mode) {
      case 'learning':
        initLearning(this);
        break;

      case 'newWord':
        initNewWord(this);
        break;
    }
    initCardOptions(this);
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
        this.switchMode();
      }
    }, 16)
  }
}
