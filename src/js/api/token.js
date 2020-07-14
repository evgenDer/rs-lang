import {
  getUserId,
  getRefreshToken,
  setToken,
  setRefreshToken,
  getToken,
  setDateToken
} from '../utils/storage';
import {
  BACKEND_URL
} from '../utils/constants';
import {
  isValidToken
} from '../utils/checks';

export async function getRefreshTokenFromApi() {
  try {
    const userId = getUserId();
    const refreshToken = getRefreshToken();
    // eslint-disable-next-line no-irregular-whitespace
    const urlRequest = `${BACKEND_URL}/users/${userId}/tokens`;
    const rawResponse = await fetch(urlRequest, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await rawResponse.json();
    setToken(result);
    setRefreshToken(result);
    setDateToken();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getTokenForRequest() {
  const refreshToken = getRefreshToken();

  if (refreshToken === "undefined" || !refreshToken || !isValidToken(refreshToken)) {
    await getRefreshTokenFromApi();
    const token = getToken();
    if (token === "undefined") {
      window.location.href = 'index.html';
    }

    return token;
  }
  return getToken();
}
