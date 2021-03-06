/* eslint-disable no-console */
import {
  getUserId
} from '../utils/storage';
import sendRequest from './requests';
import {
  BACKEND_URL
} from '../utils/constants';

async function updateStatistic(statistics) {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/statistics`;
    const content = await sendRequest('PUT', urlRequest, true, statistics);

    return content;
  } catch (error) {
    return error;
  }
}

async function getStatistics() {
  try {
    const userId = getUserId();
    const urlRequest = `${BACKEND_URL}/users/${userId}/statistics`;
    const content = await sendRequest('GET', urlRequest, true);
    return content;
  } catch (error) {
    return null;
  }
}

export {
  updateStatistic,
  getStatistics,
};
