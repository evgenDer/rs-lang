import learningScreenShadowTreeHTML from './domBuilder/shadowTree/shadowTree.js';

import createCard from './domBuilder/lightTree/createCard.js';
import createStatusBar from './domBuilder/lightTree/createStatusBar.js';
import createArrow from './domBuilder/lightTree/createArrow.js';
import createModeButtons from './domBuilder/lightTree/createModeButtons.js';
import createEvents from './events/createEvents.js';

import { getUserConfiguration } from '../../data-access/local-storage.js';

import { getNewWords } from './functions/getWords.js';
import getLearnedWords from './functions/getWords.js';

export default class LearningScreenElement extends HTMLElement {
  constructor() {
    super();
    this.state = {
      mode: 'newWord',
      currentNewWordCardIndex: 0,
      currentLearningCardIndex: 0,
    };

    this.localState = {
      newWordProgressArr: [false, false, false],
      learningProgressArr: [false, false, false, false, false, false, false, false, false, false],
    }

    this.settings = {
      newWordCount: 3,
      wordCount: 6,
      difficultyLevel: 0,
    }

    this.wordArrs = {
      newWords: [{
        "id": "5e9f5ee35eb9e72bc21af565",
        "group": 0,
        "page": 9,
        "word": "site",
        "image": "files/10_0198.jpg",
        "audio": "files/10_0198.mp3",
        "audioMeaning": "files/10_0198_meaning.mp3",
        "audioExample": "files/10_0198_example.mp3",
        "textMeaning": "A <i>site</i> is a place.",
        "textExample": "We found the perfect <b>site</b> for our picnic.",
        "transcription": "[sait]",
        "textExampleTranslate": "Мы нашли идеальное место для нашего пикника",
        "textMeaningTranslate": "Сайт - это место",
        "wordTranslate": "сайт",
        "wordsPerExampleSentence": 8
      },
      {
        "id": "5e9f5ee35eb9e72bc21af569",
        "group": 0,
        "page": 10,
        "word": "aware",
        "image": "files/11_0202.jpg",
        "audio": "files/11_0202.mp3",
        "audioMeaning": "files/11_0202_meaning.mp3",
        "audioExample": "files/11_0202_example.mp3",
        "textMeaning": "If someone is <i>aware</i>, they know that something or a situation exists.",
        "textExample": "The student became <b>aware</b> that the teacher was watching him.",
        "transcription": "[əwέər]",
        "textExampleTranslate": "Ученик осознал, что учитель следит за ним",
        "textMeaningTranslate": "Если кто-то знает, он знает, что что-то или ситуация существует",
        "wordTranslate": "знают",
        "wordsPerExampleSentence": 10
      },
      {
        "id": "5e9f5ee35eb9e72bc21af56a",
        "group": 0,
        "page": 10,
        "word": "battery",
        "image": "files/11_0203.jpg",
        "audio": "files/11_0203.mp3",
        "audioMeaning": "files/11_0203_meaning.mp3",
        "audioExample": "files/11_0203_example.mp3",
        "textMeaning": "A <i>battery</i> is an object placed inside something to supply it with electricity.",
        "textExample": "My brother needs a <b>battery</b> for his clock.",
        "transcription": "[bǽtəri]",
        "textExampleTranslate": "Моему брату нужна батарея для его часов",
        "textMeaningTranslate": "Батарея - это объект, помещенный внутрь чего-либо, чтобы обеспечить его электричеством",
        "wordTranslate": "батарея",
        "wordsPerExampleSentence": 8
      },],
      learnedWords: [{
        "id": "5e9f5ee35eb9e72bc21af565",
        "group": 0,
        "page": 9,
        "word": "site",
        "image": "files/10_0198.jpg",
        "audio": "files/10_0198.mp3",
        "audioMeaning": "files/10_0198_meaning.mp3",
        "audioExample": "files/10_0198_example.mp3",
        "textMeaning": "A <i>site</i> is a place.",
        "textExample": "We found the perfect <b>site</b> for our picnic.",
        "transcription": "[sait]",
        "textExampleTranslate": "Мы нашли идеальное место для нашего пикника",
        "textMeaningTranslate": "Сайт - это место",
        "wordTranslate": "сайт",
        "wordsPerExampleSentence": 8
      },
      {
        "id": "5e9f5ee35eb9e72bc21af569",
        "group": 0,
        "page": 10,
        "word": "aware",
        "image": "files/11_0202.jpg",
        "audio": "files/11_0202.mp3",
        "audioMeaning": "files/11_0202_meaning.mp3",
        "audioExample": "files/11_0202_example.mp3",
        "textMeaning": "If someone is <i>aware</i>, they know that something or a situation exists.",
        "textExample": "The student became <b>aware</b> that the teacher was watching him.",
        "transcription": "[əwέər]",
        "textExampleTranslate": "Ученик осознал, что учитель следит за ним",
        "textMeaningTranslate": "Если кто-то знает, он знает, что что-то или ситуация существует",
        "wordTranslate": "знают",
        "wordsPerExampleSentence": 10
      },
      {
        "id": "5e9f5ee35eb9e72bc21af56a",
        "group": 0,
        "page": 10,
        "word": "battery",
        "image": "files/11_0203.jpg",
        "audio": "files/11_0203.mp3",
        "audioMeaning": "files/11_0203_meaning.mp3",
        "audioExample": "files/11_0203_example.mp3",
        "textMeaning": "A <i>battery</i> is an object placed inside something to supply it with electricity.",
        "textExample": "My brother needs a <b>battery</b> for his clock.",
        "transcription": "[bǽtəri]",
        "textExampleTranslate": "Моему брату нужна батарея для его часов",
        "textMeaningTranslate": "Батарея - это объект, помещенный внутрь чего-либо, чтобы обеспечить его электричеством",
        "wordTranslate": "батарея",
        "wordsPerExampleSentence": 8
      },],
    }

  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = learningScreenShadowTreeHTML;

    //getNewWords();
    //getLearnedWords();

    this.setSettingsFromLocalStorage();


    createStatusBar(this);
    createArrow(this);
    createModeButtons(this);
    createCard(this);

    createEvents(this);
  }


  setSettingsFromLocalStorage() {
    const config = getUserConfiguration();
    this.settings.newWordCount = config.maxNewWordsPerDay;
    this.settings.wordCount = config.maxCardsWithWordsPerDay;
    this.settings.difficultyLevel = config.difficultyLevel;
    console.log(this.settings)
  }

  setState(prop, newProp) {
    this.state[prop] = newProp;
  }

}
