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

function setUserEmail(email) {
  localStorage.setItem('email', email);
}

function setUserPassword(password) {
  localStorage.setItem('password', password);
}

function getUserPassword(){
  return localStorage.getItem('password');
}

function getUserEmail(){
  return localStorage.getItem('email');
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
  setUserId, setToken, setDateToken, setUserPassword, getUserEmail, getUserPassword, setDataEnglishPuzzle,
  getDataEnglishPuzzle, setUserEmail, getToken, getUserId, getDateToken, removeUserId,
};
