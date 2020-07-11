import { getTokenTime } from '../helpers/tokenHeleper';
import { getToken } from '../../../storage';

function isValidToken() {
  const currentTime = Date.parse(new Date()) / 1000;
  let tokenTime = 0;
  const token = getToken();
  if(token && token !== "undefined"){
    tokenTime = getTokenTime();
  }
  const tokenUpdateTime = tokenTime - 12600000;
  return currentTime < tokenUpdateTime;
}

function isNewUser() {
  return !(isValidToken() && localStorage.getItem('userId') !== null);
}

export { isValidToken, isNewUser };
