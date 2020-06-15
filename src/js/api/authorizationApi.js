import { ERROR_MSG } from '../utils/constants';
import { getUser, getMistakeResponse } from '../utils/helpers';
import {
  setUserPassword, setUserEmail, setToken, getToken,
} from '../utils/storage';
import { isValidToken } from '../utils/checks';


async function createUser(event) {
  event.preventDefault();
  const user = getUser();
  setUserPassword(user);
  setUserEmail(user);
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!rawResponse.ok) {
    ERROR_MSG.innerText = getMistakeResponse(rawResponse.status);
  }
}

async function loginUser() {
  const user = getUser();
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  return content;
}

async function getTokenForRequest() {
  if (!isValidToken()) {
    const infoAboutUser = await loginUser();
    setToken(infoAboutUser);
  }
  return getToken();
}


export { createUser, loginUser, getTokenForRequest };
