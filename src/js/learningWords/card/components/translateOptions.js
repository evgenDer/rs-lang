import updateCardContent from '../domBuilder/lightTree/updateCardContent';
import saveDayLocalState from '../../learningScreen/functions/saveDayLocalState';
import LearningLineElement from './learningLineElement';
import saveSettingsFromLearningWords from '../../learningScreen/functions/saveSettings';

const style = {
  backgroundColor: '#338c9930',
  correctLetterColor: '#61bd4f',
  deletedWordColor: '#fe5c55',
  tabletWidth: '768px',
  mobileBigWidth: '414px',
};

export default class TranslateOptions extends HTMLElement {
  constructor() {
    super();

    this.state = {
      showNewWordTranslation: false,
      showSentenceTranslation: false,
      showWordTranslation: false,
      showSentenceExplanation: false,
      showExplanationExample: false,
    };


    this.localState = {
      isReadyToRenderArr: [],
      isFirstCreating: false,
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>
      :host{font-size: 17px}
      #contentBlock {padding: 20px;}
      #header {padding-bottom: 5px; width: 100%; display: block; font-size: 20px; font-weight: bold; border-bottom: 1px solid #e5e5e5}
      form {padding-top: 5px;}
      .optionLine {padding: 2px; display: flex;}
      span {width: calc(100% - 15px); display: block;}
      .inactive {filter:brightness(0.5) opacity(0.5);}

      @media screen and (max-width: ${style.tabletWidth}) {
        :host{font-size: 13px}
        #contentBlock {padding: 15px;}
        #header{font-size: 17px}
      }

    </style>

    <div id='contentBlock'>
    <span id='header'>Настройки перевода</span>
      <form>
        <div class='optionLine'>
          <span class='showNewWordTranslation '>Отображать перевод слов</span>
          <slot name='newWordTranslationCheckbox'></slot>
        </div>
        <div class='optionLine'>
          <span class='showSentenceTranslation'>Отображать перевод предложений</span>
          <slot name='sentenseTranslationCheckbox'></slot>
        </div>
      </form>
    </div>

    `;
    this.innerHTML = `
    <input type='checkbox' slot='newWordTranslationCheckbox' class='showNewWordTranslation '></input>
    <input type='checkbox' slot='sentenseTranslationCheckbox' class=' showSentenceTranslation'></input>`;

    this.querySelectorAll('input[type=checkbox]').forEach((element) => {
      element.addEventListener('change', () => {
        this.state[element.classList[0]] = element.checked;
        const screen = document.querySelector('learning-screen');
        const card = document.querySelector('card-word');
        screen.settings[element.classList[0]] = this.state[element.classList[0]];
        card.settings[element.classList[0]] = this.state[element.classList[0]];
        updateCardContent(card);
        saveSettingsFromLearningWords(screen);
      });
    });
  }

  render() {
    const wordTranslText = this.shadowRoot.querySelector('span.showNewWordTranslation');
    const sentTranslText = this.shadowRoot.querySelector('span.showSentenceTranslation');
    const wordTranslChbx = this.querySelector('.showNewWordTranslation');
    const sentTranslChbx = this.querySelector('.showSentenceTranslation');

    if (this.state.showWordTranslation) {
      wordTranslText.classList.add('inactive');
      wordTranslChbx.classList.add('inactive');
      wordTranslChbx.checked = true;
      wordTranslChbx.disabled = true;
    } else {
      wordTranslChbx.checked = this.state.showNewWordTranslation;
    }
    if (!this.state.showSentenceExplanation && !this.state.showExplanationExample) {
      sentTranslText.classList.add('inactive');
      sentTranslChbx.classList.add('inactive');
      sentTranslChbx.checked = false;
      sentTranslChbx.disabled = true;
    } else {
      sentTranslChbx.checked = this.state.showSentenceTranslation;
    }

  }

  setState(propName, newPropState) {
    if (this.state[propName] !== newPropState) {
      this.state[propName] = newPropState;
      this.setAttribute(propName, this.state[propName]);
    }
  }

  static get observedAttributes() {
    return [`shownewwordtranslation`, `showsentencetranslation`, `showwordtranslation`];
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
