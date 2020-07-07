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
  console.log(Object.assign(word, wordOptions));
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
  let mark = 0;
  const currentMark = word.optional['successPoint'];
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

  if (word.optional['referenceCount'] === 1) {
    mark = 1;
  } else if (currentMark <= 4) {
    if (isSuccess) {
      if (isgamemode) {
        mark = currentMark + difficultyToSuccessPoint[word.difficulty] / 2;
      } else {
        mark = currentMark + difficultyToSuccessPoint[word.difficulty];
      }
    } else if (currentMark > 2) {
      if (isgamemode) {
        mark = currentMark - difficultyToErrorPoint[word.difficulty] / 2;
      } else {
        mark = currentMark - difficultyToErrorPoint[word.difficulty];
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
    timing = (currentMark * 23 - 22) / 24; //days
  } else if (currentMark <= 3) {
    timing = (currentMark * 48 - 72) / 24; //days
  } else if (currentMark <= 4) {
    timing = currentMark * 7 - 18; //days
  } else if (currentMark <= 5) {
    timing = currentMark * 20 - 70; //days
  }
  const repeatRating = Math.floor(timing * 24 * 3600 * 1000 + word.optional['lastUpdateDate']);
  return repeatRating;
}

function openCardUpdate(word) {
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
