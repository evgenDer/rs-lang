import getUserWordById from '../api/userWords';
import getWordById from '../api/words';

import { WORD_STATE } from '../utils/constants';
/*
const newWordOptionsTemplate = {
  "difficulty": 'normal', // easy, normal, hard
  "options": {
    mode: null, //deleted,learning,needToRepeat
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
  return Object.assign(word, wordOptions);
}

function increaseWordErrorCount(word, isgamemode) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['referenceCount'] += 1;
  word.optional['errorCount'] += 1;
  word.optional['mode'] = WORD_STATE.repeating;
  word.optional['rightSequence'] = 0;
  calculateSuccessPoint(word, isgamemode);
}

function increaseWordReferenceCount(word, isgamemode) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['referenceCount'] += 1;
  calculateSuccessPoint(word, isgamemode, true);
}

function switchDeleteModeUserWord(word) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['mode'] = WORD_STATE.deleted;
}

function increaseWordRightSequenceCount(word, isgamemode) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['referenceCount'] += 1;
  word.optional['rightSequence'] += 1;
  word.optional['mode'] = WORD_STATE.learning;
  calculateSuccessPoint(word, isgamemode, true);
}

function increaseRepeatCount(word) {
  word.optional['repeatCount'] += 1;
}

function calculateSuccessPoint(word, isgamemode = false, isSuccess = false) {
  const currentMark = word.optional['successPoint'];
  let mark = currentMark;
  const difficultyToSuccessPoint = {
    hard: 0.2,
    normal: 0.5,
    easy: 1,
  };
  const difficultyToErrorPoint = {
    hard: 1,
    normal: 0.5,
    easy: 0.2,
  };

  if (currentMark <= 4) {
    if (currentMark < 1 && isSuccess) {
      mark = 3;
    } else {
      mark = 1;
    }

    if (isSuccess) {
      if (isgamemode) {
        mark = mark + difficultyToSuccessPoint[word.difficulty] / 2;
      } else {
        mark = mark + difficultyToSuccessPoint[word.difficulty];
      }
    } else if (currentMark > 2) {
      if (isgamemode) {
        mark = mark - difficultyToErrorPoint[word.difficulty] / 2;
      } else {
        mark = mark - difficultyToErrorPoint[word.difficulty];
      }
    }
    if (currentMark >= 2 && mark < 2) {
      mark = 2;
    }
  } else if (currentMark > 4) {
    mark = 3.8 + word.optional['rightSequence'] * 0.4;
  }

  if (mark > 5) {
    mark = 5;
  }

  word.optional['successPoint'] = mark;
}

function calculateRepeatTiming(word) {
  const currentMark = word.optional['successPoint'];
  let timing = 0;
  if (currentMark <= 2) {
    timing = (currentMark * 40 - 20) / (24 * 60); //mins-days
  } else if (currentMark <= 3) {
    timing = (currentMark * 47 - 93) / 24; //hours-days
  } else if (currentMark <= 4) {
    timing = currentMark * 5 - 13; //days
  } else if (currentMark <= 5) {
    timing = currentMark * 23 - 85; //days
  }
  const repeatRating = Math.floor(timing * 24 * 3600 * 1000 + word.optional['lastUpdateDate']);
  return repeatRating;
}

function openCardUpdate(word) {
  word.optional['lastUpdateDate'] = Date.now();
  word.optional['mode'] = WORD_STATE.repeating;
  word.optional['rightSequence'] = 0;
  word.optional['repeatCount'] += 1;
  calculateSuccessPoint(word);
}

export {
  getUpdatedUserWord,
  increaseWordErrorCount,
  increaseWordReferenceCount,
  switchDeleteModeUserWord,
  increaseWordRightSequenceCount,
  calculateRepeatTiming,
  increaseRepeatCount,
  openCardUpdate,
};
