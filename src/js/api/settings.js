import { getTokenForRequest } from './authorization';
import { getUserId } from '../utils/storage';

async function upsertSettings(settings) {
  try {
    const userId = getUserId();
    const token = await getTokenForRequest();
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }
}

async function getSettings() {
  try {
    const userId = getUserId();
    const token = await getTokenForRequest();
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'GET',
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

export { upsertSettings, getSettings };
