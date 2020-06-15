import { LIFETIME_TOKEN } from './constants';

function isValidToken() {
  const currentDateString = new Date().toString();
  const tokenDateString = localStorage.getItem('date');
  return (Date.parse(currentDateString) - Date.parse(tokenDateString) <= LIFETIME_TOKEN);
}

function isNewUser() {
  return !(isValidToken() && localStorage.getItem('userId') !== null);
}

export { isValidToken, isNewUser };
