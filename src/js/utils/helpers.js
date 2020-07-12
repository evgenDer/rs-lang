import { ERROR_PASSWORD } from '../authorization/constants';

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

function exitGame() {
  document.location.href = 'games.html';
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


export { getUser, getMistakeResponse, exitGame, shuffle };
