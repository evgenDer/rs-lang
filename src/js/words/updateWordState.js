import createUserWord from '../api/userWords';
import updateUserWord from '../'

import getUserWordById from '../api/userWords';
import getWordById from '../api/words';

/*
const newWordOptionsTemplate = {
  "difficulty": 'normal', // easy, normal, hard
  "options": {
    mode: null, //deleted,null,needToRepeat
    lastUpdateDate: null,
    referenceCount: 0,
    errorCount: 0,
    repeatCount: 0,
    rightSequence: 0,
    successPoint: 0, // [0,5]
  }
}
*/

async function getUpdatedUserWord(wordId) {
  const word = await getWordById(wordId);
  const wordOptions = await getUserWordById(wordId);
  console.log(Object.assign(word, wordOptions));
  return Object.assign(word, wordOptions);
}

function increaseWordErrorCount(word) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['referenceCount'] += 1;
  word.optional['errorCount'] += 1;
  word.optional['mode'] = 'needToRepeat';
  word.optional['rightSequence'] = 0;
  calculateSuccessPoint(word);
}

function increaseWordReferenceCount(word) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['referenceCount'] += 1;
  calculateSuccessPoint(word);
}

function switchDeleteModeUserWord(word) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['mode'] = 'deleted';
}

function increaseWordRightSequenceCount(word) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['referenceCount'] += 1;
  word.optional['rightSequence'] += 1;
  word.optional['mode'] = 0;
  calculateSuccessPoint(word, 'success');
}

function increaseRepeatCount(word) {
  word.optional['repeatCount'] += 1;
}

function calculateSuccessPoint(word, mode) {
  let mark = 0;
  const currentMark = word.optional['successPoint'];
  const difficultyToSuccessPoint = {
    'hard': 0.2,
    'normal': 0.6,
    'easy': 1,
  }
  const difficultyToErrorPoint = {
    'hard': 1,
    'normal': 0.6,
    'easy': 0.2,
  }

  if (word.optional['referenceCount'] === 1) {
    mark = 1;
  } else if ((word.optional['referenceCount'] - word.optional['errorCount']) <= 5) {
    mark = 1 + ((word.optional['referenceCount'] - word.optional['errorCount']) / 5);
    console.log(mark);
  } else if (currentMark <= 4) {
    if (mode == 'success') {
      mark = word.optional['successPoint'] + difficultyToSuccessPoint[word.difficulty];
    } else {
      mark = word.optional['successPoint'] - difficultyToErrorPoint[word.difficulty];
    }
    if (mark < 1) { mark = 1; }
  } else if (currentMark > 4) {
    mark = 3.8 + word.optional['rightSequence'] / 5;
  } else if (currentMark > 5) {
    mark = 5;
  }
  word.optional['successPoint'] = mark;
}

function calculateRepeatTiming(word) {
  const timing = 30 * word.optional['successPoint'] / 5; //days
  const repeatRating = Math.floor(timing * 24 * 3600 * 1000 + word.optional['lastUpdateDate']);
  return repeatRating;
}

function openCardUpdate(word) {
  word.optional['mode'] = 'needToRepeat';
  word.optional['rightSequence'] = 0;
  word.optional['repeatCount'] += 1;
  calculateSuccessPoint(word);
}

export {
  getUpdatedUserWord, increaseWordErrorCount, increaseWordReferenceCount, switchDeleteModeUserWord,
  increaseWordRightSequenceCount, calculateRepeatTiming, increaseRepeatCount, openCardUpdate
}
