import sendRequest from './requests';
import { BACKEND_URL } from '../utils/constants';

async function getCountWordsInGroup(numberGroup, wordsPerExampleSentence = 10, wordsPerPage = 20) {
  try {
    const urlRequest = `${BACKEND_URL}/words/count?group=${numberGroup}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const content = await sendRequest('GET', urlRequest);
    return content.count;
  } catch (error) {
    return error;
  }
}

// eslint-disable-next-line max-len
async function getDataWords(numberGroup, numberPage, wordsPerExampleSentence = 10, wordsPerPage = 10) {
  try {
    const urlRequest = `${BACKEND_URL}/words/?group=${numberGroup}&page=${numberPage}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const result = await sendRequest('GET', urlRequest);
    return result;
  } catch (error) {
    return error;
  }
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

export { getCountWordsInGroup, getWordById, getDataWords };
