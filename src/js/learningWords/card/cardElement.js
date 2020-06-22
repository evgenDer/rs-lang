import cardShadowTreeHTML from './domBuilder/shadowTree/shadowTree';
import initNewWord from './domBuilder/lightTree/initNewWord';
import initLearning from './domBuilder/lightTree/initLearningMode';
import initCardOptions from './domBuilder/lightTree/initOptions';
import createEventListener from './events/createEventListener';

import { getCardsViewConfiguration, getAppConfiguration } from '../../data-access/local-storage';

export default class WordCardElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      id: null,
      group: null,
      page: null,
      word: null,
      image: null,
      audio: null,
      audioMeaning: null,
      audioExample: null,
      textMeaning: null,
      textExample: null,
      transcription: null,
      textExampleTranslate: null,
      textMeaningTranslate: null,
      wordTranslate: null,
      wordsPerExampleSentence: null,
      mode: null,
      isDeleted: null,
    };

    this.settings = {

    };

    this.localState = {
      isReadyToRenderArr: [],
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = cardShadowTreeHTML;
    this.setSettingsFromLocalStorage();
    createEventListener(this);
  }

  switchMode() {
    this.innerHTML = '';
    switch (this.state.mode) {
      case 'learning':
        initLearning(this);
        break;

      case 'newWord':
        initNewWord(this);
        break;
      default:
        break;
    }
    initCardOptions(this);
  }

  setState(propName, newPropState) {
    if (this.state[propName] !== newPropState) {
      this.state[propName] = newPropState;
      if (propName === 'word' || propName === 'wordTranslation' || propName === 'isDone' || propName === 'isDeleted') {
        this.setAttribute(propName, this.state[propName]);
      }
    }
  }

  setSettingsFromLocalStorage() {
    const config = getCardsViewConfiguration();
    const appConfig = getAppConfiguration();

    Object.assign(this.settings, config, appConfig);
  }


  static get observedAttributes() {
    return ['word', 'wordTranslate', 'isdone', 'isdeleted'];
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
    }, 16);
  }
}
