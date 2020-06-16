import { getUserId } from '../utils/storage';
import sendRequest from './requests';

async function upserStatistic(statistics) {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
    const content = await sendRequest('PUT', urlRequest, true, statistics);
    return content;
  } catch (error) {
    return error;
  }
}

async function getStatistics() {
  try {
    const userId = getUserId();
    const urlRequest = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
    const content = await sendRequest('GET', true, urlRequest);
    return content;
  } catch (error) {
    return error;
  }
}

export { upserStatistic, getStatistics };
