import { ERROR_PASSWORD } from './constants';

function getUser() {
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  return { email: emailInput.value, password: passwordInput.value };
}

function getMistakeResponse(codeError) {
  if (codeError === ERROR_PASSWORD) {
    return 'Пароль не соответствует формату';
  }
  return 'Такой пользователь уже существует';
}


export { getUser, getMistakeResponse };
