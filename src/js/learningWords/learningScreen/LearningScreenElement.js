import learningScreenShadowTreeHTML from './domBuilder/shadowTree/shadowTree.js';

import createCard from './domBuilder/lightTree/createCard.js';
import createStatusBar from './domBuilder/lightTree/createStatusBar.js';
import createArrow from './domBuilder/lightTree/createArrow.js';
import createEvents from './events/createEvents.js';

import getNewWords from './functions/getWords.js';
import getLearnedWords from './functions/getWords.js';

export default class LearningScreenElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      currentCardIndex: 0,
    };

    this.localState = {
      progressArr: [false, false, false, false, false, false, false, false, false, false],
    }

    this.settings = {
      newWordCount: 3,
      wordCount: 6,
    }

    this.wordArrs = {
      newWords: [{ word: `one`, translation: 'один' }, { word: `two`, translation: 'два' }, { word: `three`, translation: 'три' }],
      learnedWords: [{ word: `one`, translation: 'один' }, { word: `two`, translation: 'два' }, { word: `three`, translation: 'три' }],
    }

  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = learningScreenShadowTreeHTML;

    //getNewWords();
    //getLearnedWords();

    createStatusBar(this);
    createArrow(this);
    createCard(this, 'newWord');
    createEvents(this);
  }



}
