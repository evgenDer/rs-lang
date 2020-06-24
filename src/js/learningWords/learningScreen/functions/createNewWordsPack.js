import { getDataWords, getWordById } from '../../../api/words';
import { getAllUserWords } from '../../../api/userWords';

export async function createNewWordsPack(dayNewWordsCount, group = 0, page = 0) {
  let allUserWords = await getAllUserWords();
  let allUpdatedUserWords = [];

  if (!Array.isArray(allUserWords)) { allUserWords = [] }
  allUserWords = sortLearnedWords(allUserWords);

  for (let i = 0; i < allUserWords.length; i += 1) {
    const word = await getWordById(allUserWords[i].wordId);
    const updatedWord = Object.assign(allUserWords[i], word);
    allUpdatedUserWords.push(updatedWord);
  }

  let dayNewWordsPack = [];
  dayNewWordsPack = await updateNewWordsPack(dayNewWordsPack, allUserWords, dayNewWordsCount, group, page);

  const wordArrs = {
    newWords: dayNewWordsPack,
    learnedWords: allUpdatedUserWords,
  }
  console.log(wordArrs);
  return wordArrs;
}

function sortLearnedWords(allUserWords) {
  return allUserWords.sort((a, b) => +a.optional.successPoint < +b.optional.successPoint);
}

async function updateNewWordsPack(dayNewWordsPack = [], allUserWords = [], dayNewWordsCount = 10, group = 0, page = 0) {
  let localDayNewWordsPack = dayNewWordsPack;
  const newWordsPack = await getDataWords(0, 0);

  for (let i = 0; i < newWordsPack.length; i += 1) {
    let isNewWord = true;
    for (let j = 0; j < allUserWords.length; j += 1) {
      if (newWordsPack[i].id === allUserWords[j].id) {
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
  return await updateNewWordsPack(localDayNewWordsPack, allUserWords, dayNewWordsCount, group, page + 1)

}
