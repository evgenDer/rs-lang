import { getAllUserWords } from '../../../api/userWords.js';
import { getDataWords } from '../../../api/words.js';

export async function getNewWords(newWordsCount) {
  const allwords = await getAllUserWords();
  console.log(allwords);
}

export function getLearnedWords() {

}

