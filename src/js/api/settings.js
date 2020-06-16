import { getUserId } from '../utils/storage';
import sendRequest from './requests';
import { BACKEND_URL } from '../utils/constants';

async function upserSettings(settings) {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/settings`;
    const content = await sendRequest('PUT', urlRequest, true, settings);
    return content;
  } catch (error) {
    return error;
  }
}

async function getSettings() {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/settings`;
    const content = await sendRequest('GET', urlRequest, true);
    return content;
  } catch (error) {
    return error;
  }
}

export { upserSettings, getSettings };
