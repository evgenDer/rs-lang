import sendRequest from './requests';
import { BACKEND_URL, AUX_API_URL } from '../utils/constants';


export async function getCountWordsInGroup(numberGroup, wordsPerExampleSentence = 10, wordsPerPage = 20) {
  try {
    const urlRequest = `${BACKEND_URL}/words/count?group=${numberGroup}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const content = await sendRequest('GET', urlRequest);
    return content.count;
  } catch (error) {
    return error;
  }
}

export async function getDataWords(numberGroup, numberPage, wordsPerExampleSentence = 10, wordsPerPage = 10) {
  try {
    const urlRequest = `${BACKEND_URL}/words/?group=${numberGroup}&page=${numberPage}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
    const result = await sendRequest('GET', urlRequest);
    return result;
  } catch (error) {
    return error;
  }
}

export async function getFullDataWords(numberGroup, numberPage, wordsPerPage = 10) {
  return getDataWords(numberGroup, numberPage, '', wordsPerPage);
}

export async function getWordById(idWord) {
  try {
    const urlRequest = `${BACKEND_URL}/words/${idWord}`;
    const result = await sendRequest('GET', urlRequest);
    return result;
  } catch (error) {
    return error;
  }
}

export async function getWordDetalization(word) {
  try {
    const urlRequest = `${AUX_API_URL}/words/search?search=${word}`;
    const result = await fetch(urlRequest);
    const content = await result.json();
    console.log(content);
    return content;
  } catch (error) {
    return error;
  }
};

