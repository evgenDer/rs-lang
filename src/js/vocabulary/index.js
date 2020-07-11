/* eslint-disable no-underscore-dangle */
import { getConfiguration } from '../configuration/index';
import { getAggregatedUserWords } from '../api/userWords';
import { upserSettings } from '../api/settings';
import { createElementObj } from '../utils/create';
import { calculateRepeatTiming } from '../words/updateWordState';
import { SORTING_OPTIONS, CATEGORIES_WORDS, CATEGORIES } from '../constants/vocobularConstants';
import Card from './Card';
import ControlBar from './ControlBar';
import Loader from './Loader';
import { getConfiguration } from '../configuration';
import * as configurationService from '../api/settings';
import dayStat from '../main-page/dayStat';

const main = document.querySelector('.vocabulary__form');
const cardsWrapper = document.querySelector('.vocabulary_cards-wrapper');
const audioObj = new Audio();
const isSortAscendingDefault = true;
const sortNameDefault = 'prescription';
const categoryDefault = CATEGORIES.learning;
const loader = new Loader();
let controlBtns = '';
let cards = [];
let configuration = '';

function generateDataForCards(UserWordsData, wordCategory) {
  const dataForCards = UserWordsData.map((wordData) => {
    const data = {
      id: wordData._id,
      optional: wordData.userWord.optional,
      difficulty: wordData.userWord.difficulty,
      audio: wordData.audio,
      word: wordData.word,
      wordTranslate: wordData.wordTranslate,
    };
    if (wordCategory !== CATEGORIES.deleted) {
      data.repeatTiming = calculateRepeatTiming(wordData.userWord);
    }

    if (configuration.showImageAssociation) {
      data.image = wordData.image;
    }
    if (configuration.showWordTranscription) {
      data.transcription = wordData.transcription;
    }
    if (configuration.showSentenceExplanation) {
      data.textMeaning = wordData.textMeaning;
      data.textMeaningTranslate = wordData.textMeaningTranslate;
      data.audioMeaning = wordData.audioMeaning;
    }
    if (configuration.showExplanationExample) {
      data.textExample = wordData.textExample;
      data.textExampleTranslate = wordData.textExampleTranslate;
      data.audioExample = wordData.audioExample;
    }
    return data;
  });
  return dataForCards;
}

function showErrorMassage() {
  const errorMessage = createElementObj({
    tagName: 'p',
    classNames: `vocabulary__error-message`,
    textContent: 'Слова данной категории отсутствуют',
  });
  cardsWrapper.innerHTML = '';
  cardsWrapper.append(errorMessage);
}

const callbackFunctionForCard = {
  OnClickRestore: (wordId) => {
    cards = cards.filter((card) => card.getIdWord() !== wordId);
    if (cards.length > 0) {
      cardsWrapper.innerHTML = '';
      cards.forEach((card) => cardsWrapper.append(card.getElement()));
    } else {
      showErrorMassage();
      controlBtns.hideRepeatButton();
    }
  },
  OnClickPlayAudio: (audioSrc) => {
    audioObj.src = audioSrc;
    audioObj.play();
  },
};

function sortArr(nameFunction, isSortAscending) {
  cards.sort((a, b) => {
    if (a[nameFunction]() > b[nameFunction]()) {
      return isSortAscending ? 1 : -1;
    }
    if (a[nameFunction]() === b[nameFunction]()) {
      return 0;
    }
    return isSortAscending ? -1 : 1;
  });
}

function sortСards(sortName, isSortAscending) {
  if (cards.length > 0) {
    const { nameFunction } = SORTING_OPTIONS[sortName];
    sortArr(nameFunction, isSortAscending);
    cardsWrapper.innerHTML = '';
    cards.forEach((card) => cardsWrapper.append(card.getElement()));
  }
}

async function updateCards(categoryWord, sortName, isSortAscending) {
  cardsWrapper.innerHTML = '';
  cardsWrapper.append(loader.getElement());
  const UserWordsData = await getAggregatedUserWords(CATEGORIES_WORDS[categoryWord].filter, 3600);
  if (UserWordsData[0].paginatedResults.length === 0) {
    showErrorMassage();
  } else {
    const dataForCards = generateDataForCards(UserWordsData[0].paginatedResults, categoryWord);
    cards.length = 0;
    let displayRestoreButton = false;
    if (categoryWord !== CATEGORIES.learning) {
      displayRestoreButton = true;
    }
    dataForCards.forEach((cardData) => {
      const card = new Card(cardData);
      cards.push(card);
      card.generate(callbackFunctionForCard, displayRestoreButton);
    });
    sortСards(sortName, isSortAscending);
    if (categoryWord === CATEGORIES.hard) {
      controlBtns.showRepeatButton();
    }
  }
}

async function startRepetitionWords() {
  configuration.learning = {
    isHardMode: true,
    groupNumber: configuration.learning.groupNumber,
    learningWordsPage: configuration.learning.learningWordsPage,
  };
  await upserSettings({ optional: configuration });
  dayStat.updateStat();
  dayStat.saveStat();
  window.localStorage.setItem('dayLearningDate', '-1');
  window.location.href = 'learningWords.html';
}

const callbackForControlBar = {
  onClickCategoryWord: (categoryWord, sortName, isSortAscending) =>
    updateCards(categoryWord, sortName, isSortAscending),
  onClickSorting: (sortName, isSortAscending) => sortСards(sortName, isSortAscending),
  onClickRepetitionWords: async () => startRepetitionWords(),
}

export default async function initVocabularyPage() {
  configuration = await getConfiguration();
  controlBtns = new ControlBar(isSortAscendingDefault, sortNameDefault, categoryDefault);
  main.insertBefore(controlBtns.generate(callbackForControlBar), cardsWrapper);
  updateCards(categoryDefault, sortNameDefault, isSortAscendingDefault);
}
