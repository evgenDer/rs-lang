import { loginUser, createUser } from '../api/authorizationApi';
import { ERROR_MSG, PASSWORD } from '../utils/constants';
import { setDateToken, setUserId, setToken } from '../utils/storage';

function show() {
  PASSWORD.setAttribute('type', 'text');
}

function hide() {
  PASSWORD.setAttribute('type', 'password');
}

let passwordShown = false;

function changeVisibilityPassword() {
  if (!passwordShown) {
    show();
  } else {
    hide();
  }
  passwordShown = !passwordShown;
}

async function logIn(event) {
  try {
    event.preventDefault();
    const infoAboutUser = await loginUser();
    setUserId(infoAboutUser);
    setToken(infoAboutUser);
    setDateToken();
    window.history.pushState(null, null, 'index.html');
    window.location.replace('index.html');
  } catch (error) {
    ERROR_MSG.innerText = 'Пароль или логин введены неверно';
  }
}

function addAuthorizationClickHandler() {
  document.getElementById('eye').addEventListener('click', changeVisibilityPassword, false);
  document.querySelector('.sign-up').addEventListener('click', createUser);
  document.querySelector('.log-in').addEventListener('click', logIn);
}

export default addAuthorizationClickHandler;
