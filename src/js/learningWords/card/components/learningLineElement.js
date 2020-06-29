import removeAnswer from '../../learningScreen/events/eventFunctions/removeAnswer';

const style = {
  inputColor: '#b9f3fc',
  correctLetterColor: '#61bd4f',
  deletedWordColor: '#fe5c55',
};

export default class LearningLineElement extends HTMLElement {
  constructor() {
    super();

    this.state = {
      word: null,
      wordTranslate: null,
      textMeaning: null,
      textExample: null,
    };

    this.localState = {
      isReadyToRenderArr: [],
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>
    :host {display: flex; flex-direction: row;}
    div {text-align: center;}
    
    #background {position: relative; left:0; top:0;
       background-color: ${style.inputColor}; border-radius: 5px; user-select: none;}
    #background .hidden {visibility: hidden;}
    #wordContainer {position: absolute; left:0; top:0;}
    ::slotted(span[slot=word1]) {padding: 2px 5px 2px 10px; opacity: 0.3;}
    ::slotted(span[slot=word2]) {padding: 2px 5px 2px 10px; opacity: 0.3;}
    #errorAnimationContainer {position: absolute; left:0; top:0;}
    ::slotted(span[slot=word3]) {padding: 2px 5px 2px 10px; opacity: 1; transition: opacity; transition-duration: 1s;}
    ::slotted(span.animatted) {opacity: 0;}
    ::slotted(input) {padding: 1px 5px 2px 11px; width: 100%; position:absolute; left:0; top:0;
       background: transparent; border: none; outline: none; }
    ::slotted(span[slot=input]) {padding: 2px 5px 2px 10px; color: ${style.correctLetterColor};}
    ::slotted(span[slot=input].deleted) {color: ${style.deletedWordColor};}
    </style>

      <div id='background'>
        <slot name='word1' class='hidden'></slot>

       <div id='wordContainer'>
          <slot name='word2' ></slot>
        </div>

        <div id='errorAnimationContainer'>
          <slot name='word3'></slot>
        </div>

        <slot name='input' ></slot>
      </div>
    `;
  }

  render() {
    if (this.state.isDone) {
      if (this.state.isDeleted) {
        this.innerHTML = `<span slot='input' class='deleted'>${this.state.word}</span>`;
      } else {
        this.innerHTML = `<span slot='input'>${this.state.word}</span>`;
      }
    } else {
      this.innerHTML = `<span slot='word1'>${this.state.word}</span>
      <input slot='input'>`;
      this.querySelector('input').focus();
      this.querySelector('input').onfocus = () => {
        removeAnswer(this);
      };
    }
  }

  setState(propName, newPropState) {
    if (this.state[propName] !== newPropState) {
      this.state[propName] = newPropState;
      if (propName === 'word' ) {
        this.setAttribute(propName, this.state[propName]);
      }
    }
  }

  static get observedAttributes() {
    return ['word', 'translation'];
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
        this.render();
      }
    }, 16);
  }
}
