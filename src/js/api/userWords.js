/* eslint-disable no-param-reassign */
import { getUserId } from '../utils/storage';
import sendRequest from './requests';
import { BACKEND_URL } from '../utils/constants';

async function createUserWord(wordId, word) {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/words/${wordId}`;
    const content = await sendRequest('POST', urlRequest, true, word);
    return content;
  } catch (error) {
    return error;
  }
}

async function makeRequestByWordId(methodRequest, wordId, word) {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/words/${wordId}`;
    const content = await sendRequest(methodRequest, urlRequest, true, word);
    return content;
  } catch (error) {
    return error;
  }
}

async function getAllUserWords() {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/words`;
    const content = await sendRequest('GET', urlRequest, true);
    return content;
  } catch (error) {
    return error;
  }
}

async function getUserWordById(wordId) {
  const result = await makeRequestByWordId('GET', wordId);
  return result;
}

async function updateUserWord(wordId, word) {
  if(Object.prototype.hasOwnProperty.call(word, 'id')){
    delete word.id;
  }
  if(Object.prototype.hasOwnProperty.call(word, 'wordId')){
    delete word.wordId;
  }
  const result = await makeRequestByWordId('PUT', wordId, word);
  return result;
}
async function deleteUserWord(wordId) {
  const result = await makeRequestByWordId('DELETE', wordId);
  return result;
}

export { getAllUserWords, getUserWordById, updateUserWord, deleteUserWord, createUserWord };
