import learningScreenShadowTreeHTML from './domBuilder/shadowTree/shadowTree';

import createCard from './domBuilder/lightTree/createCard';
import createStatusBar, { updateStatusBar } from './domBuilder/lightTree/createStatusBar';
import createArrow from './domBuilder/lightTree/createArrow';
import createModeButtons from './domBuilder/lightTree/createModeButtons';
import createDifficultyButtons from './domBuilder/lightTree/createDifficultyButtons'
import createResults from './domBuilder/lightTree/createResults';
import createEvents from './events/createEvents';

import { getUserConfiguration } from '../../data-access/local-storage';

import findNextNotDeletedWord from './functions/findNextNotDeletedWord';
import getDayLocalState from './functions/getDayLocalState';

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
      mode: 'new&repeat', //new, repeat, new&repeat
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



    getDayLocalState(this)
      .then(() => {
        console.log(this.wordArrs);
        createStatusBar(this);
        updateStatusBar(this);

        createArrow(this);
        createModeButtons(this);
        createDifficultyButtons(this);

        /*
        if (this.state.mode === 'learning') {
          this.state.currentLearningCardIndex =
            findNextNotDeletedWord(this, this.state.currentLearningCardIndex, 'right');
        } else {
          this.state.currentNewWordCardIndex =
            findNextNotDeletedWord(this, this.state.currentNewWordCardIndex, 'right');
        }*/
        createCard(this);

        createEvents(this);
        /*
                if (
                  this.localState.newWordProgressArr.indexOf(false) === -1 &&
                  this.localState.learningProgressArr.indexOf(false) === -1
                ) {
                  createResults(this);
                }*/
      });


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
