import { getDataWords, getWordById } from '../../../api/words';
import { getAllUserWords } from '../../../api/userWords';
import { calculateRepeatTiming } from '../../../words/updateWordState';

export async function createNewWordsPack(dayNewWordsCount, dayWordsCount, group = 0, page = 0) {
  let allUserWords = await getAllUserWords();
  console.log(allUserWords);
  let allUpdatedUserWords = [];
  let dayNewWordsPack = [];
  dayNewWordsPack = await updateNewWordsPack(
    dayNewWordsPack,
    allUserWords,
    dayNewWordsCount,
    group,
    page,
  );

  dayNewWordsPack.map((element) =>
    Object.assign(element, {
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

  if (!Array.isArray(allUserWords)) {
    allUserWords = [];
  }

  allUserWords = allUserWords.filter((element) => element.optional.mode !== 'deleted');
  allUserWords = sortLearnedWords(allUserWords);
  allUserWords = sortLearnedWordsByNeededToRepeat(allUserWords);

  if (allUserWords.length > dayWordsCount) {
    allUserWords = allUserWords.slice(0, dayWordsCount);
  }

  for (let i = 0; i < allUserWords.length; i += 1) {
    const word = await getWordById(allUserWords[i].wordId);
    console.log(word);
    const updatedWord = Object.assign(allUserWords[i], word);
    allUpdatedUserWords.push(updatedWord);
  }

  if (allUpdatedUserWords.length < dayWordsCount) {
    allUpdatedUserWords = allUpdatedUserWords.concat(
      dayNewWordsPack.slice(0, dayWordsCount - allUserWords.length),
    );
  }

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
  let localDayNewWordsPack = dayNewWordsPack;
  const newWordsPack = await getDataWords(group, page);
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
    }
  }
  if (localDayNewWordsPack.length >= dayNewWordsCount) {
    return localDayNewWordsPack.filter((element, index) => index < dayNewWordsCount);
  }
  if (page === 30) {
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
