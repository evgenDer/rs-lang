import learningScreenShadowTreeHTML from './domBuilder/shadowTree/shadowTree';

import createCard from './domBuilder/lightTree/createCard';
import createStatusBar, { updateStatusBar } from './domBuilder/lightTree/createStatusBar';
import createArrow from './domBuilder/lightTree/createArrow';
import { createModeButtons, updateModeButtons } from './domBuilder/lightTree/createModeButtons';
import createDifficultyButtons from './domBuilder/lightTree/createDifficultyButtons';
import updateDifficultyButtons from './domBuilder/lightTree/updateDifficultyButtons';
import createResults from './domBuilder/lightTree/createResults';
import createEvents from './events/createEvents';

import whatsNext from './events/eventFunctions/whatsNext';
import getDayLocalState from './functions/getDayLocalState';
import { getConfiguration } from '../../configuration';
import dayStat from '../../main-page/dayStat';
import statistics, { Statistics } from '../../statistics/components/statistics';

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
      learning: {
        isHardMode: false,
        groupNumber: 0,
        learningWordsPage: 0,
      },
    };

    this.wordArrs = {
      newWords: [],
      learnedWords: [],
      needToRepeat: [],
    };

    this.statistics = {
      currentRightAnswerSeries: 0,
      longestRightAnswerSeries: 0,
      rightAnswers: 0,
    };

    this.stat = null;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = learningScreenShadowTreeHTML;
    this.init();
  }

  async init() {
    this.insertAdjacentHTML(
      'afterbegin',
      `<img slot='loadingIcon' src='assets/img/icons/loading.gif'>
      <span slot='loadingIcon'>Секундочу, формируем карточки на сегодня...</span>`,
    );
    const loadingIcon = this.shadowRoot.querySelector('div#loading');

    await this.setSettings();
    console.log(this.settings);
    await getDayLocalState(this);
    console.log(this.settings);
    loadingIcon.remove();
    const willCreateCard = whatsNext(this);
    if (willCreateCard) {
      createModeButtons(this);
      updateModeButtons(this);

      createArrow(this);
      if (this.state.mode === 'repeating') {
        this.querySelector('[slot=leftArrow]').classList.add('inactive');
      }

      createStatusBar(this);
      updateStatusBar(this);

      createCard(this);

      createDifficultyButtons(this);
      updateDifficultyButtons(this);

      createEvents(this);
      this.stat = new Statistics('Learning');
      const today = new Date();
      this.stat.dateTime = new Date(today.getYear(), today.getMonth(), today.getDate());
    } else {
      createResults(this);
    }

  }

  async setSettings() {
    let config = await getConfiguration();
    for (let prop in config) {
      if (this.settings.hasOwnProperty(prop)) {
        this.settings[prop] = config[prop];
      } else if (prop === 'maxNewWordsPerDay') {
        this.settings.newWordCount = config[prop];
      } else if (prop === 'maxCardsWithWordsPerDay') {
        this.settings.wordCount = config[prop];
      }
    }
    this.settings.learning['groupNumber'] = config.difficultyLevel;
    return;
  }

  setState(prop, newProp) {
    this.state[prop] = newProp;
  }
}
