import dayResultsShadowTreeHTML from './domBuilder/shadowTree/shadowTree';
import initDayResults from './domBuilder/lightTree/initDayResults';
import createEventListener from './events/createEvents';

export default class dayLearningResults extends HTMLElement {
  constructor() {
    super();
    this.state = {
      newWordCount: null,
      wordCount: null,
      rightAnswers: null,
      bestSeries: null,
    };
    this.localState = {
      isReadyToRenderArr: [],
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = dayResultsShadowTreeHTML;
    createEventListener(this);
  }

  setState(propName, newPropState) {
    if (this.state[propName] !== newPropState) {
      this.state[propName] = newPropState;
      this.setAttribute(propName, this.state[propName]);
    }
  }

  static get observedAttributes() {
    return ['newwordcount'];
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
        initDayResults(this);
      }
    }, 16);
  }
}
