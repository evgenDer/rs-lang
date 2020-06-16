import { getUserId } from '../utils/storage';
import sendRequest from './requests';
import { BACKEND_URL } from '../utils/constants';

async function upserStatistic(statistics) {
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
    const content = await sendRequest('GET', true, urlRequest);
    return content;
  } catch (error) {
    return error;
  }
}

export { upserStatistic, getStatistics };
