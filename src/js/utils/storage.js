import { DEFAULT_SETTINGS_PUZZLE } from '../constants/defaul-settings';

function setUserId(infoAboutUser) {
  localStorage.setItem('userId', infoAboutUser.userId);
}

function setToken(infoAboutUser) {
  localStorage.setItem('token', infoAboutUser.token);
}

function setDateToken() {
  const dateGetToken = new Date();
  localStorage.setItem('tokenDate', dateGetToken.toString());
}

function setUserPassword(user) {
  localStorage.setItem('email', user.email);
}

function setUserEmail(user) {
  localStorage.setItem('password', user.password);
}

function getToken() {
  return localStorage.getItem('token');
}

function getUserId() {
  return localStorage.getItem('userId');
}

function getDateToken() {
  return localStorage.getItem('tokenDate');
}

function removeUserId() {
  localStorage.removeItem('userId');
}

function setDataEnglishPuzzle(englishPuzzleSettings) {
  localStorage.setItem('englishPuzzle', JSON.stringify(englishPuzzleSettings));
}

function getDataEnglishPuzzle() {
  return JSON.parse(localStorage.getItem('englishPuzzle')) || DEFAULT_SETTINGS_PUZZLE;
}

export {
  setUserId, setToken, setDateToken, setUserPassword, setDataEnglishPuzzle,
  getDataEnglishPuzzle, setUserEmail, getToken, getUserId, getDateToken, removeUserId,
};
