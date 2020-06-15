import addNavigationClickHandler from './navigation/index';
import {
  updateConfigurationValues,
} from './configuration/index';


window.onload = () => {
  addNavigationClickHandler();

  updateConfigurationValues();
};
