import { getUserId } from '../utils/storage';
import sendRequest from './requests';

async function upserSettings(settings) {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
    const content = await sendRequest('PUT', urlRequest, true, settings);
    return content;
  } catch (error) {
    return error;
  }
}

async function getSettings() {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
    const content = await sendRequest('GET', urlRequest, true);
    return content;
  } catch (error) {
    return error;
  }
}

export { upserSettings, getSettings };
