import { loginUser } from '../api/authorizationApi';
import { ERROR_MSG, LOG_PAGE } from '../utils/constants';


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


export { changeVisibilityPassword, logIn };
