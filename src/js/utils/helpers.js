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

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function removeChild(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.lastChild);
  }
}


function exitGame() {
  document.location.href = 'games.html';
}

function removeAllButtons() {
  const buttonsBlock = document.querySelector('.block-btns');
  removeChild(buttonsBlock);
}

function insertNewButtons(buttons) {
  const buttonsBlock = document.querySelector('.block-btns');
  if (buttons.length) {
    buttons.forEach((button) => {
      buttonsBlock.append(button);
    });
  }
}


export {
  getUser, getMistakeResponse, shuffle, removeChild, removeAllButtons, insertNewButtons, exitGame,
};
