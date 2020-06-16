import { getUserId } from '../utils/storage';
import sendRequest from './requests';

async function createUserWord(wordId, word) {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
    const content = await sendRequest('POST', urlRequest, true, word);
    return content;
  } catch (error) {
    return error;
  }
}

async function makeRequestByWordId(methodRequest, wordId) {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
    const content = await sendRequest(methodRequest, urlRequest, true);
    return content;
  } catch (error) {
    return error;
  }
}

async function getAllUserWords() {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
    const content = await sendRequest('POST', urlRequest, true);
    return content;
  } catch (error) {
    return error;
  }
}

async function getUserWordById(wordId) {
  const result = await makeRequestByWordId('GET', wordId);
  return result;
}

async function updateUserWord(wordId) {
  const result = await makeRequestByWordId('PUT', wordId);
  return result;
}

async function deleteUserWord(wordId) {
  const result = await makeRequestByWordId('DELETE', wordId);
  return result;
}

export {
  getAllUserWords, getUserWordById, updateUserWord, deleteUserWord, createUserWord,
};
