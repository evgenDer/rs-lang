import cardShadowTreeHTML from './domBuilder/shadowTree/shadowTree';
import initLearning from './domBuilder/lightTree/initLearningMode';
import updateCardContent from './domBuilder/lightTree/updateCardContent';
import createEventListener from './events/createEventListener';

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
      isFirstAnswer: true,
    };

    this.settings = {
      deleteWords: true,
      markAsDifficultWord: true,
      possibilityToMarkWord: true,
      showAnswer: true,
      showExplanationExample: true,
      showImageAssociation: true,
      showNewWordTranslation: true,
      showSentenceExplanation: true,
      showSentenceTranslation: true,
      showWordTranscription: true,
      showWordTranslation: true,
      enableAutomaticAudio: true,
    };

    this.localState = {
      isReadyToRenderArr: [],
      isAudioPlaying: false,
      isFirstCreating: false,
    };

    this.audio = {
      word: null,
      example: null,
      meaning: null,
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = cardShadowTreeHTML;
  }

  setState(propName, newPropState) {
    if (this.state[propName] !== newPropState) {
      this.state[propName] = newPropState;
      if (
        propName === 'word' ||
        propName === 'wordTranslation' ||
        propName === 'isDone' ||
        propName === 'isDeleted'
      ) {
        this.setAttribute(propName, this.state[propName]);
      }
    }
  }

  setSettings(propName, newPropState) {
    if (this.settings[propName] !== newPropState) {
      this.settings[propName] = newPropState;
    }
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
        if (this.localState.isFirstCreating) {
          initLearning(this);
          createEventListener(this);
        }
        updateCardContent(this);
      }
    }, 16);
  }
}
