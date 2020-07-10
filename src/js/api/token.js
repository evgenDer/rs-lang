import { getUserId, getRefreshToken, setToken, setRefreshToken, getToken } from '../../../storage';
import { BACKEND_URL } from '../utils/constants';
import { isValidToken } from '../utils/checks';

export async function getRefreshTokenFromApi(){
  try {
    const userId = getUserId();
    const refreshToken = getRefreshToken();
    // eslint-disable-next-line no-irregular-whitespace
    const urlRequest = `${BACKEND_URL}/users/${userId}​/tokens`;
    const rawResponse = await fetch(urlRequest, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return rawResponse.json();

  } catch (error) {
    return error;
  }
}

export async function getTokenForRequest() {
  console.log(isValidToken());
  if (!isValidToken()) {
    const infoAboutUser = await getRefreshTokenFromApi();
    console.log(infoAboutUser);
    setToken(infoAboutUser);
    setRefreshToken(infoAboutUser);
  }
  return getToken();
}
