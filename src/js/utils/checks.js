import { LIFETIME_TOKEN } from '../authorization/constants';
import { getDateToken } from './storage';

function isValidToken() {
  const currentDateString = new Date().toString();
  const tokenDateString = getDateToken();
  return (Date.parse(currentDateString) - Date.parse(tokenDateString) <= LIFETIME_TOKEN);
}

function isNewUser() {
  return !(isValidToken() && localStorage.getItem('userId') !== null);
}

function isEmptyObject(object){
  if(Object.keys(object).length === 0){
    return true;
  }
  return false;
}

export { isValidToken, isNewUser, isEmptyObject };
