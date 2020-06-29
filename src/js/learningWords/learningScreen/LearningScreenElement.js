import learningScreenShadowTreeHTML from './domBuilder/shadowTree/shadowTree';

import createCard from './domBuilder/lightTree/createCard';
import createStatusBar, { updateStatusBar } from './domBuilder/lightTree/createStatusBar';
import createArrow from './domBuilder/lightTree/createArrow';
import createModeButtons from './domBuilder/lightTree/createModeButtons';
import createDifficultyButtons from './domBuilder/lightTree/createDifficultyButtons';
import createResults from './domBuilder/lightTree/createResults';
import createEvents from './events/createEvents';

import { getUserConfiguration } from '../../data-access/local-storage';

import whatsNext from './events/eventFunctions/whatsNext';
import getDayLocalState from './functions/getDayLocalState';
import { getConfiguration } from '../../configuration';

export default class LearningScreenElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      mode: 'newWord',
      currentNewWordCardIndex: 0,
      currentLearningCardIndex: 0,
      currentRepeatingCardIndex: 0,
    };

    this.localState = {
      newWordProgressArr: [],
      learningProgressArr: [],
      needToRepeatProgressArr: [],
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
      hardMode: false,
      enableAutomaticAudio: true,
      newWordCount: 3,
      wordCount: 6,
      difficultyLevel: 0,
    };

    this.wordArrs = {
      newWords: [],
      learnedWords: [],
      needToRepeat: [],
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = learningScreenShadowTreeHTML;
    this.init();
  }

  /*
        if (this.state.mode === 'learning') {
          this.state.currentLearningCardIndex =
            findNextNotDeletedWord(this, this.state.currentLearningCardIndex, 'right');
        } else {
          this.state.currentNewWordCardIndex =
            findNextNotDeletedWord(this, this.state.currentNewWordCardIndex, 'right');
        }*/

  /*
                if (
                  this.localState.newWordProgressArr.indexOf(false) === -1 &&
                  this.localState.learningProgressArr.indexOf(false) === -1
                ) {
                  createResults(this);
                }*/
  async init() {
    await this.setSettingsFromLocalStorage();
    await getDayLocalState(this);
    console.log(this.settings);
    const willCreateCard = whatsNext(this);
    if (willCreateCard) {
      createStatusBar(this);
      updateStatusBar(this);

      createArrow(this);
      createModeButtons(this);
      createDifficultyButtons(this);

      createCard(this);

      createEvents(this);
    }
  }

  async setSettingsFromLocalStorage() {
    let config = await getConfiguration();
    console.log(config);
    for (let prop in config) {
      if (this.settings.hasOwnProperty(prop)) {
        this.settings[prop] = config[prop];
      } else if (prop === 'maxNewWordsPerDay') {
        this.settings.newWordCount = config[prop];
      } else if (prop === 'maxCardsWithWordsPerDay') {
        this.settings.wordCount = config[prop];
      }
    }
    console.log(this.settings);
    return;
  }

  setState(prop, newProp) {
    this.state[prop] = newProp;
  }
}
