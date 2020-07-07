import { getSettings } from '../api/settings';
import { getAggregatedUserWords} from '../api/userWords';
import { createElementObj } from '../utils/create';
import { calculateRepeatTiming } from '../words/updateWordState';
import Card from './Card';

const FILTERS = {
  deleted: {'userWord.optional.mode':{'$eq':'deleted'}},
  hard: {'$and':[{'userWord.difficulty':'hard', 'userWord.optional.mode': {'$not': {'$eq':'deleted'}}}]},
  learning: {'$and':[{'userWord.difficulty':{'$in':['normal', 'easy']}, 'userWord.optional.mode': {'$not': {'$eq':'deleted'}}}]},
}

const cardsWrapper = document.querySelector('.vocabulary_cards-wrapper');
const audioObj = new Audio();
let cards = [];
let configuration = '';
let currentlyCategoryWord = 'learning';

function generateDataForCards(UserWordsData, wordCategory) {
  const dataForCards = UserWordsData.map((wordData) => {

    const data = {
      id: wordData._id,
      optional: wordData.userWord.optional,
      difficulty: wordData.userWord.difficulty,
      audio: wordData.audio,
      word: wordData.word,
      wordTranslate: wordData.wordTranslate,
    }
    if(wordCategory !== 'deleted') {
      data.repeatTiming = calculateRepeatTiming(wordData.userWord);
    }

    if(configuration.optional.showImageAssociation) {
      data.image = wordData.image;
    }
    if(configuration.optional.showWordTranscription) {
      data.transcription = wordData.transcription;
    }
    if(configuration.optional.showSentenceExplanation) {
      data.textMeaning = wordData.textMeaning;
      data.textMeaningTranslate = wordData.textMeaningTranslate;
      data.audioMeaning = wordData.audioMeaning;
    }
    if(configuration.optional.showExplanationExample) {
      data.textExample = wordData.textExample;
      data.textExampleTranslate = wordData.textExampleTranslate;
      data.audioExample = wordData.audioExample;
    }
    return data;
  });
  return dataForCards;
}

function ErrorMassage() {
  const errorMessage = createElementObj({
    tagName: 'p',
    classNames: `vocabulary__error-message`,
    textContent: 'Слова данной категории отсутствуют',
  });
  cardsWrapper.innerHTML = '';
  cardsWrapper.append(errorMessage);
}

const callbackFunction = {
  OnClickRestore: (wordId) => {
    cards = cards.filter((card) => card.getIdWord() !== wordId);
    if  (cards.length > 0) {
      cardsWrapper.innerHTML = '';
      cards.forEach((card) => cardsWrapper.append(card.getElement()));
    } else {
      ErrorMassage();
    }
  },
  OnClickPlayAudio: (audioSrc) => {
    audioObj.pause();
    audioObj.src = audioSrc;
    audioObj.play();
  },
}

async function drawCards() {
  const UserWordsData = await getAggregatedUserWords(FILTERS[currentlyCategoryWord], 3600);
  if(UserWordsData[0].paginatedResults.length === 0) {
    ErrorMassage();
  } else {
    const dataForCards = generateDataForCards(UserWordsData[0].paginatedResults, currentlyCategoryWord);
    cardsWrapper.innerHTML = '';
    cards.length = 0;
    let displayRestoreButton = false;
    if(currentlyCategoryWord !== 'learning') {
      displayRestoreButton = true;
    }
    dataForCards.forEach((cardData) => {
      const card = new Card(cardData);
      cards.push(card);
      cardsWrapper.append(card.generate(callbackFunction, displayRestoreButton));
    });
  }
}

export  default async function initVocabularyPage() {
  configuration = await getSettings();
  const switcher = document.querySelector('.vocabulary__switcher');
  switcher.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    currentlyCategoryWord = event.target.id;
    drawCards();
  }
});
  drawCards('learning');
}
