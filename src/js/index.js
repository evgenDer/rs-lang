import addNavigationClickHandler from './navigation/index';
import addAuthorizationClickHandler from './authorization/index';
import { isNewUser } from './utils/checks';

window.onload = () => {
  window.stop();
  if (isNewUser()) {
    addAuthorizationClickHandler();
  }
  addNavigationClickHandler();
};

