import { getUserId, getRefreshToken, setToken, setRefreshToken, getToken } from '../utils/storage';
import { BACKEND_URL } from '../utils/constants';
import { isValidToken } from '../utils/checks';

export async function getRefreshTokenFromApi(){
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
    return result;
  } catch (error) {
    window.location = 'index.html';
    return null;
  }
}

export async function getTokenForRequest() {
  if (!isValidToken()) {
    const infoAboutUser = await getRefreshTokenFromApi();
    if(infoAboutUser){
      setToken(infoAboutUser);
      setRefreshToken(infoAboutUser);
    }
  }
  return getToken();
}
