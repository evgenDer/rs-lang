import { getDataWords, getWordById } from '../../../api/words';
import { getAllUserWords } from '../../../api/userWords';
import { calculateRepeatTiming } from '../../../words/updateWordState';
import saveSettingsFromLearningWords from './saveSettings';

export async function createNewWordsPack(dayNewWordsCount, dayWordsCount, group = 0, page = 0) {
  let allUserWords = await getAllUserWords();
  let allUpdatedUserWords = [];
  let dayNewWordsPack = [];
  let newWordsNeededCount = +dayNewWordsCount;

  if (!Array.isArray(allUserWords)) {
    allUserWords = [];
  }

  allUpdatedUserWords = allUserWords.filter((element) => element.optional.mode !== 'deleted');
  allUpdatedUserWords = sortLearnedWords(allUpdatedUserWords);
  allUpdatedUserWords = sortLearnedWordsByNeededToRepeat(allUpdatedUserWords);

  if (allUpdatedUserWords.length > dayWordsCount) {
    allUpdatedUserWords = allUpdatedUserWords.slice(0, dayWordsCount);
  }

  for (let i = 0; i < allUpdatedUserWords.length; i += 1) {
    const word = await getWordById(allUpdatedUserWords[i].wordId);
    const updatedWord = Object.assign(allUpdatedUserWords[i], word, {
      isDone: false,
      isFirstAnswer: true,
    });
    allUpdatedUserWords[i] = updatedWord;
  }

  if (allUpdatedUserWords.length < dayWordsCount) {
    newWordsNeededCount += dayWordsCount - allUpdatedUserWords.length;
  }

  dayNewWordsPack = await updateNewWordsPack(
    dayNewWordsPack,
    allUserWords,
    newWordsNeededCount,
    group,
    page,
  );

  dayNewWordsPack.map((element) =>
    Object.assign(element, {
      isDone: false,
      isFirstAnswer: true,
      difficulty: 'normal', // easy, normal, hard
      optional: {
        mode: 'newWord', //deleted,null
        lastUpdateDate: Date.now(),
        referenceCount: 0,
        errorCount: 0,
        repeatCount: 0,
        rightSequence: 0,
        successPoint: 0, // [0,5]
      },
    }),
  );

  const wordArrs = {
    newWords: dayNewWordsPack,
    learnedWords: allUpdatedUserWords,
    needToRepeat: [],
  };

  return wordArrs;
}

function sortLearnedWords(allUserWords) {
  return allUserWords.sort((a, b) => calculateRepeatTiming(a) - calculateRepeatTiming(b));
}

function sortLearnedWordsByNeededToRepeat(allUserWords) {
  let notNeedToRepeatArr = [];
  let needToRepeatArr = [];
  let newWordToRepeatArr = [];
  for (let i = 0; i < allUserWords.length; i += 1) {
    if (allUserWords[i].optional.mode === 'needToRepeat') {
      needToRepeatArr.push(allUserWords[i]);
    } else if (allUserWords[i].optional.mode === 'newWord') {
      newWordToRepeatArr.push(allUserWords[i]);
    } else {
      notNeedToRepeatArr.push(allUserWords[i]);
    }
  }
  return needToRepeatArr.concat(notNeedToRepeatArr, newWordToRepeatArr);
}

async function updateNewWordsPack(
  dayNewWordsPack = [],
  allUserWords = [],
  dayNewWordsCount = 10,
  group = 0,
  page = 0,
) {
  const learningScreen = document.querySelector('learning-screen');
  let localDayNewWordsPack = dayNewWordsPack;
  const newWordsPack = await getDataWords(group, page);
  let isNewWordLearnedArr = Array(newWordsPack.length).fill(false);
  for (let i = 0; i < newWordsPack.length; i += 1) {
    let isNewWord = true;
    for (let j = 0; j < allUserWords.length; j += 1) {
      if (newWordsPack[i].id === allUserWords[j].wordId) {
        isNewWord = false;
        break;
      }
    }
    if (isNewWord) {
      localDayNewWordsPack.push(newWordsPack[i]);
    } else {
      isNewWordLearnedArr[i] = true;
    }
  }

  if (isNewWordLearnedArr.indexOf(false) === -1) {
    if (learningScreen.settings.learning.learningWordsPage >= 30) {
      learningScreen.settings.learning.learningWordsPage = 0;
      if (learningScreen.settings.learning.groupNumber >= 5) {
        learningScreen.settings.learning.groupNumber = 0;
      } else {
        learningScreen.settings.learning.groupNumber += 1;
      }
    } else {
      learningScreen.settings.learning.learningWordsPage += 1;
    }
    await saveSettingsFromLearningWords(learningScreen);
  }

  if (localDayNewWordsPack.length >= dayNewWordsCount) {
    return localDayNewWordsPack.filter((element, index) => index < dayNewWordsCount);
  }

  if (page === 30) {
    if (group === 5) {
      return await updateNewWordsPack(localDayNewWordsPack, allUserWords, dayNewWordsCount, 0, 0);
    }
    return await updateNewWordsPack(
      localDayNewWordsPack,
      allUserWords,
      dayNewWordsCount,
      group + 1,
      0,
    );
  }
  return await updateNewWordsPack(
    localDayNewWordsPack,
    allUserWords,
    dayNewWordsCount,
    group,
    page + 1,
  );
}
