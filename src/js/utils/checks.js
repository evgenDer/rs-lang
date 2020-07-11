import { getTokenTime } from '../helpers/tokenHeleper';
import { getToken } from '../../../storage';

function isValidToken() {
  const currentTime = Date.parse(new Date()) / 1000;
  let tokenTime = 0;
  const token = getToken()
  if(token && typeof(token) === "undefined"){
    tokenTime = getTokenTime();
  }
  const tokenUpdateTime = tokenTime - 12600000;
  return currentTime < tokenUpdateTime;
}

function isNewUser() {
  return !(localStorage.getItem('userId') !== null);
}

export { isValidToken, isNewUser };
