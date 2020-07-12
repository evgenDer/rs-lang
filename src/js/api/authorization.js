import { ERROR_MSG } from '../authorization/constants';
import { getMistakeResponse, getUser } from '../utils/helpers';
import { BACKEND_URL } from '../utils/constants';

async function createUser(event) {
  event.preventDefault();
  const user = getUser();
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
    return content;
  }
  catch(error){
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
    return error;
  }
}

export { createUser, loginUser  };
