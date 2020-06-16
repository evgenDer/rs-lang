import { getTokenForRequest } from './authorization';
import { getUserId } from '../utils/storage';

async function createUserWord(wordId, word) {
  try {
    const userId = getUserId();
    const token = await getTokenForRequest();
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }
}

async function getRequestByWordIdWithSuchMethod(methodRequest, wordId) {
  try {
    const userId = getUserId();
    const token = await getTokenForRequest();
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: methodRequest,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }
}

async function getAllUserWords() {
  try {
    const userId = getUserId();
    const token = await getTokenForRequest();
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }
}

async function getUserWordById(wordId) {
  const result = await getRequestByWordIdWithSuchMethod('GET', wordId);
  return result;
}

async function updateUserWord(wordId) {
  const result = await getRequestByWordIdWithSuchMethod('PUT', wordId);
  return result;
}

async function deleteUserWord(wordId) {
  const result = await getRequestByWordIdWithSuchMethod('DELETE', wordId);
  return result;
}

export {
  getAllUserWords, getUserWordById, updateUserWord, deleteUserWord, createUserWord,
};
