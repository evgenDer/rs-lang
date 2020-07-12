import { ERROR_MSG, PASSWORD } from './constants';
import { setUserId, setToken, setRefreshToken } from '../utils/storage';
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

async function logIn() {
  try {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    const content = await loginUser( userEmail, userPassword );
    setUserId(content);
    if(content  && typeof(content) !== "undefined" && localStorage.getItem('userId')){
      window.history.pushState(null, null, 'main.html');
      window.location.replace('main.html')
      setToken(content);
      setRefreshToken(content);
    } else {
      throw new Error();
    }
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
