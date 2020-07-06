import { getSettings } from '../api/settings';
import { getAggregatedUserWords } from '../api/userWords';
import { createElementObj } from '../utils/create';
import { calculateRepeatTiming } from '../words/updateWordState';
import Card from './Card';

const FILTERS = {
  deleted: {'userWord.optional.mode':{'$eq':'deleted'}},
  hard: {'$and':[{'userWord.difficulty':'hard', 'userWord.optional.mode': {'$not': {'$eq':'deleted'}}}]},
  learning: {'$and':[{'userWord.difficulty':{'$in':['normal', 'easy']}, 'userWord.optional.mode': {'$not': {'$eq':'deleted'}}}]},
}

const wordsWrapper = document.querySelector('.vocabulary_cards-wrapper');
const audioObj = new Audio();
const cards = [];
let configuration = '';

function generateDataForCards(UserWordsData, wordCategory) {
  const dataForCards = UserWordsData.map((wordData) => {
    const data = {
      lastUpdateDate: wordData.userWord.optional.lastUpdateDate,
      repeatCount: wordData.userWord.optional.repeatCount,

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

function playAudio(audioSrc) {
  audioObj.pause();
  audioObj.src = audioSrc;
  audioObj.play();
}

function ErrorMassage() {
  const errorMessage = createElementObj({ tagName: 'p', classNames: `vocabulary__error-message`, textContent: 'Слова данной категории отсутствуют' });
  wordsWrapper.innerHTML = '';
  wordsWrapper.append(errorMessage);
}

async function drawCards(wordCategory) {
  const UserWordsData = await getAggregatedUserWords(FILTERS[wordCategory], 3600);
  if(UserWordsData[0].paginatedResults.length === 0) {
    ErrorMassage();
  } else {
    const dataForCards = generateDataForCards(UserWordsData[0].paginatedResults, wordCategory);
    wordsWrapper.innerHTML = '';
    cards.length = 0;
    let displayRestoreButton = false;
    if(wordCategory !== 'learning') {
      displayRestoreButton = true;
    }
    dataForCards.forEach((cardData) => {
      const card = new Card(cardData);
      cards.push(card);
      wordsWrapper.append(card.generate((audioSrc) => playAudio(audioSrc), displayRestoreButton));
    });
  }

}

export  default async function initVocabularyPage() {
  configuration = await getSettings();
  drawCards('learning');

  const switcher = document.querySelector('.vocabulary__switcher');
  switcher.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    drawCards(event.target.id);
  }
});
}
