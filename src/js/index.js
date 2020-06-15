import addNavigationClickHandler from './navigation/index';
import addAuthorizationClickHandler from './authorization/authorization';
import { isNewUser } from './utils/checks';


window.onload = () => {
  if (isNewUser()) {
    window.location.href = 'authorization.html';
    addAuthorizationClickHandler();
  }
  addNavigationClickHandler();
};
