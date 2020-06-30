import { ERROR_MSG } from '../authorization/constants';
import { getMistakeResponse, getUser } from '../utils/helpers';
import {
  setUserPassword, setUserEmail, setToken, getToken, getUserEmail, getUserPassword, setUserId,
} from '../utils/storage';
import { isValidToken } from '../utils/checks';
import { BACKEND_URL } from '../utils/constants';


async function createUser(event) {
  event.preventDefault();
  const user = getUser();
  setUserPassword(user);
  setUserEmail(user);
  const rawResponse = await fetch(`${BACKEND_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!rawResponse.ok) {
    ERROR_MSG.innerText = getMistakeResponse(rawResponse.status);
  } else {
    ERROR_MSG.innerText = 'Регистрация прошла успешно';
  }
}

async function loginUser(emailUser, passwordUser) {
  try{
  const user = {email: emailUser, password: passwordUser};
  const rawResponse = await fetch(`${BACKEND_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  setUserId(content);
  setToken(content);
  }
  catch(error){
    window.location.href = 'index.html';
  }
}

async function getTokenForRequest() {
  if (!isValidToken()) {
    const email = getUserEmail();
    const password = getUserPassword();
    const infoAboutUser = await loginUser(email, password);
    setToken(infoAboutUser.token);
  }
  return getToken();
}


export { createUser, loginUser, getTokenForRequest };
