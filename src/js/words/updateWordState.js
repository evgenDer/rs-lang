import createUserWord from '../api/userWords';
import updateUserWord from '../'

import getUserWordById from '../api/userWords';
import getWordById from '../api/words';

/*
const newWordOptionsTemplate = {
  "difficulty": 'normal', // easy, normal, hard
  "options": {
    mode: null, //deleted,null
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
  word.optional[lastUpdateDate] = Date.now();
  word.optional[referenceCount] += 1;
  word.optional[errorCount] += 1;
  word.optional[rightSequence] = 0;
  calculateSuccessPoint(word);
}

function increaseWordReferenceCount(word) {
  word.optional[lastUpdateDate] = Date.now();
  word.optional[referenceCount] += 1;
  calculateSuccessPoint(word);
}

function deleteUserWord(word) {
  word.optional[mode] = 'deleted';
}

function increaseWordRepeatCount(word) {
  word.optional[lastUpdateDate] = Date.now();
  word.optional[referenceCount] += 1;
  word.optional[repeatCount] += 1;
  calculateSuccessPoint(word);
}

function increaseWordRightSequenceCount(word) {
  word.optional[lastUpdateDate] = Date.now();
  word.optional[referenceCount] += 1;
  word.optional[rightSequence] += 1;
  calculateSuccessPoint(word);
}

function calculateSuccessPoint(word) {
  const c1 = 0.15;
  const difficultyToPoint = {
    'hard': 1 / 28,
    'normal': 5 / 91,
    'easy': 1 / 11,
  }
  word.optional[successPoint] += c1;
}

function calculateRepeatTiming(word) {
  const timing = 30 * successPoint / 5; //days
  const repeatRating = Math.floor(timing * 24 * 3600 * 1000 + word.optional[lastUpdateDate]);
  return repeatRating;
}

export {
  getUpdatedUserWord, increaseWordErrorCount, increaseWordReferenceCount, deleteUserWord,
  increaseWordRepeatCount, increaseWordRightSequenceCount, calculateRepeatTiming
}
