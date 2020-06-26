import sendRequest from './requests';
import { BACKEND_URL } from '../utils/constants';

async function getCountWordsInGroup(numberGroup, wordsPerExampleSentence = 10, wordsPerPage = 10) {
  try {
    const urlRequest = `${BACKEND_URL}/words/count?group=${numberGroup}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const content = await sendRequest('GET', urlRequest);
    return content.count;
  } catch (error) {
    return 20;
  }
}

async function getDataWords(numberGroup, numberPage, wordsPerExampleSentence = 10, wordsPerPage = 10) {
  try {
    const urlRequest = `${BACKEND_URL}/words/?group=${numberGroup}&page=${numberPage}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const result = await sendRequest('GET', urlRequest);
    return result;
  } catch (error) {
    return error;
  }
}

async function getFullDataWords(numberGroup, numberPage, wordsPerPage = 10) {
  return getDataWords(numberGroup, numberPage, '', wordsPerPage);
}

async function getWordById(idWord) {
  try {
    const urlRequest = `${BACKEND_URL}/words/${idWord}`;
    const result = await sendRequest('GET', urlRequest);
    return result;
  } catch (error) {
    return error;
  }
}

export { getCountWordsInGroup, getWordById, getDataWords, getFullDataWords };
