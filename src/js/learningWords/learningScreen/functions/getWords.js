import { getAllUserWords } from '../../../api/userWords';
import { getDataWords } from '../../../api/words';

export async function getNewWords() {
  const allwords = await getAllUserWords();
  console.log(allwords);
}

export function getLearnedWords() {

}
