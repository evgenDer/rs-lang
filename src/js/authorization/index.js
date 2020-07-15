import { ERROR_MSG, PASSWORD } from './constants';
import { setUserId, setToken, setRefreshToken } from '../utils/storage';
import { loginUser, createUser } from '../api/authorization';
import { APP_NAME } from '../utils/constants';
import { createElement } from '../utils/create';
import PromoPage from '../promo/promoPageElement/promoPageClass';

customElements.define('promo-page', PromoPage);

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
      setUserId(content);
    } else {
      throw new Error();
    }
    } catch (error) {
    ERROR_MSG.innerText = 'Пароль или логин введены неверно';
  }
}
export function addLendingPage() {
  document.querySelector('promo-page').classList.add('hidden');
  document.querySelector('header').remove();
  document.body.style.background = `linear-gradient(rgba(8, 15, 26, 0.1) 0%, rgba(17, 17, 46, 0.2) 100%),
  url('assets/img/promoBackground.jpg') no-repeat`;
  document.querySelector('.authentication-page').classList.remove('hidden');
}
export function addAuthorizationClickHandler() {
  document.getElementById('eye').addEventListener('click', changeVisibilityPassword, false);
  document.querySelector('.sign-up').addEventListener('click', createUser);
  document.querySelector('.log-in').addEventListener('click', logIn);
  document.querySelector('.header__btn').addEventListener('click', addLendingPage);
}

export function generateLendingPage(){
  const btnLogIn = createElement('button', 'header__btn');
  const aligner = createElement('div', 'header__aligner');

  const logo = createElement('h1', 'logo', [], [], APP_NAME);
  const logoContainer = createElement('div', 'header__logo', [logo]);

  const wrapper = createElement('div', 'wrapper header__wrapper', [
    aligner,
    logoContainer,
    btnLogIn
  ]);

  const header = createElement('header', 'header', [wrapper]);
  document.body.prepend(header);

}

