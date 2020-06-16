import learningScreenShadowTreeHTML from './shadowTree/shadowTree.js';

import createCard from './lightTree/createCard.js';
import createStatusBar from './lightTree/createStatusBar.js';

import getNewWords from './functions/getWords.js';
import getLearnedWords from './functions/getWords.js';

export default class LearningScreenElement extends HTMLElement {
  constructor() {
    this.state = {
      currentCardIndex: 0,
    };

    this.settings = {
      newWordCount: 3,
      wordCount: 6,
    }

    this.wordArrs = {
      newWords: [],
      learnedWords: [],
    }

  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = learningScreenShadowTreeHTML;

    getNewWords();
    getLearnedWords();

    createStatusBar(this);
    createCard(this);
  }



}
