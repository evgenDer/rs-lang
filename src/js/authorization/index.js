import { ERROR_MSG, PASSWORD } from './constants';
import { setDateToken, setUserId, setToken, setUserPassword, setUserEmail } from '../utils/storage';
import { loginUser, createUser } from '../api/authorization';

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
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    const infoAboutUser = await loginUser( userEmail, userPassword );
    setUserId(infoAboutUser);
    setToken(infoAboutUser);
    setUserPassword(userPassword);
    setUserEmail(userEmail);
    setDateToken();
    window.history.pushState(null, null, 'main.html');
    window.location.replace('main.html');
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
