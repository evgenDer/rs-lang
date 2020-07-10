import { getTokenTime } from '../helpers/tokenHeleper';
import { getToken } from './storage';

function isValidToken() {
  const currentTime = Date.parse(new Date()) / 1000;
  console.log(currentTime);
  let tokenTime = 0;
  if(getToken()){
    tokenTime = getTokenTime();
  }
  return currentTime < tokenTime;
}

function isNewUser() {
  console.log(isValidToken());
  return !(isValidToken() && localStorage.getItem('userId') !== null);
}

export { isValidToken, isNewUser };
