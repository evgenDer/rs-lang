import { changeVisibilityPassword, logIn } from './authorization/authorization';
import { createUser } from './api/authorizationApi';
import { isNewUser } from './utils/checks';
import { LOG_PAGE } from './utils/constants';

document.getElementById('eye').addEventListener('click', changeVisibilityPassword, false);

document.querySelector('.sign-up').addEventListener('click', createUser);

document.querySelector('.log-in').addEventListener('click', logIn);

window.onload = () => {
  // localStorage.clear();
  if (isNewUser()) {
    document.body.classList.add('authentication');
    LOG_PAGE.classList.remove('hidden');
  } else if (!LOG_PAGE.classList.contains('hidden')) {
    LOG_PAGE.classList.add('hidden');
    document.body.classList.remove('authentication');
  }
};
