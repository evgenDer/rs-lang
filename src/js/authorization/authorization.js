import { loginUser, createUser } from '../api/authorizationApi';
import { ERROR_MSG, LOG_PAGE } from '../utils/constants';
import { isNewUser } from '../utils/checks';

function show() {
  const password = document.getElementById('pwd');
  password.setAttribute('type', 'text');
}

function hide() {
  const password = document.getElementById('pwd');
  password.setAttribute('type', 'password');
}

let passwordShown = false;

function changeVisibilityPassword() {
  if (!passwordShown) {
    passwordShown = true;
    show();
  } else {
    passwordShown = false;
    hide();
  }
}


async function logIn(event) {
  try {
    event.preventDefault();
    const infoAboutUser = await loginUser();
    localStorage.setItem('userId', infoAboutUser.userId);
    localStorage.setItem('token', infoAboutUser.token);
    const dateGetToken = new Date();
    localStorage.setItem('tokenDate', dateGetToken.toString());
    LOG_PAGE.classList.add('hidden');
    document.body.classList.remove('authentication');
  } catch (error) {
    ERROR_MSG.innerText = 'Пароль или логин введены неверно';
  }
}

function authorizationHandlers() {
  document.getElementById('eye').addEventListener('click', changeVisibilityPassword, false);
  document.querySelector('.sign-up').addEventListener('click', createUser);
  document.querySelector('.log-in').addEventListener('click', logIn);
  window.onload = () => {
    if (isNewUser()) {
      document.body.classList.add('authentication');
      LOG_PAGE.classList.remove('hidden');
    } else if (!LOG_PAGE.classList.contains('hidden')) {
      LOG_PAGE.classList.add('hidden');
      document.body.classList.remove('authentication');
    }
  };
}


// eslint-disable-next-line import/prefer-default-export
export { authorizationHandlers };
