import learningScreenShadowTreeHTML from './domBuilder/shadowTree/shadowTree';

import createCard from './domBuilder/lightTree/createCard';
import createStatusBar from './domBuilder/lightTree/createStatusBar';
import createArrow from './domBuilder/lightTree/createArrow';
import createModeButtons from './domBuilder/lightTree/createModeButtons';
import createEvents from './events/createEvents';

import { getUserConfiguration } from '../../data-access/local-storage';

import getDayLocalState from './functions/getDayLocalState';
import createResults from './domBuilder/lightTree/createResults';

export default class LearningScreenElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      mode: 'newWord',
      currentNewWordCardIndex: 0,
      currentLearningCardIndex: 0,
    };

    this.localState = {
      newWordProgressArr: [],
      learningProgressArr: [],
      deletedArr: [],
    };

    this.settings = {
      enableAutomaticAudio: true,
      newWordCount: 3,
      wordCount: 6,
      difficultyLevel: 0,
    };

    this.wordArrs = {
      newWords: [],
      learnedWords: [],
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = learningScreenShadowTreeHTML;

    this.setSettingsFromLocalStorage();
    getDayLocalState(this);

    createStatusBar(this);
    createArrow(this);
    createModeButtons(this);
    createCard(this);

    createEvents(this);

    if (
      this.localState.newWordProgressArr.indexOf(false) === -1 &&
      this.localState.learningProgressArr.indexOf(false) === -1
    ) {
      createResults(this);
    }
  }

  setSettingsFromLocalStorage() {
    let config = getUserConfiguration();
    console.log(config);
    if (config == null) {
      config = {
        maxNewWordsPerDay: 3,
        maxCardsWithWordsPerDay: 3,
        difficultyLevel: 0,
      };
    }
    this.settings.newWordCount = config.maxNewWordsPerDay;
    this.settings.wordCount = config.maxCardsWithWordsPerDay;
    this.settings.difficultyLevel = config.difficultyLevel;
    console.log(this.settings);
  }

  setState(prop, newProp) {
    this.state[prop] = newProp;
  }
}
