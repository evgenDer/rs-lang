import {
  DEFAULT_USER_CONFIGURATION,
  DEFAULT_CARDS_VIEW,
  DEFAULT_APP_CONFIGURATION,
} from '../constants/defaul-settings';
import * as localStorage from '../data-access/local-storage';
import * as page from './page';

export const getUserConfiguration = () => {
  let userConfiguration = localStorage.getUserConfiguration();

  if (!userConfiguration) {
    userConfiguration = DEFAULT_USER_CONFIGURATION;
    localStorage.setUserConfiguration(userConfiguration);
  }

  return userConfiguration;
};

export const getCardsConfiguration = () => {
  let cardsConfiguration = localStorage.getCardsViewConfiguration();

  if (!cardsConfiguration) {
    cardsConfiguration = DEFAULT_CARDS_VIEW;
    localStorage.setCardsViewConfiguration(cardsConfiguration);
  }

  return cardsConfiguration;
};

export const getAppConfiguration = () => {
  let appConfiguration = localStorage.getAppConfiguration();

  if (!appConfiguration) {
    appConfiguration = DEFAULT_APP_CONFIGURATION;
    localStorage.setAppConfiguration(appConfiguration);
  }

  return appConfiguration;
};

const updateConfigurationValues = () => {
  const userConfiguration = getUserConfiguration();
  page.updateUserConfigurationPageElement(userConfiguration);

  const cardsConfiguration = getCardsConfiguration();
  page.updateCardsConfigurationPageElement(cardsConfiguration);

  const appConfiguration = getAppConfiguration();
  page.updateAppConfigurationPageElement(appConfiguration);
};

const saveUserConfiguration = () => {
  const userConfiguration = page.getUserConfiguration();

  localStorage.setUserConfiguration(userConfiguration);
  return true;
};

const saveCardsConfiguration = () => {
  const cardsConfiguration = page.getCardsConfiguration();

  if (cardsConfiguration.showWordTranslation === false &&
    cardsConfiguration.showSentenceExplanation === false &&
    cardsConfiguration.showExplanationExample === false) {
    page.showValidationErrorMessage();
    return false;
  }

  localStorage.setCardsViewConfiguration(cardsConfiguration);
  return true;
};

const saveAppConfiguration = () => {
  const appConfiguration = page.getAppConfiguration();

  localStorage.setAppConfiguration(appConfiguration);
  return true;
};

const addSaveButtonClickHandler = () => {
  document.querySelector('.configuration__save-button').addEventListener('click', () => {
    if (saveUserConfiguration() && saveCardsConfiguration() && saveAppConfiguration()) {
      UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Сохранено",
        status: 'success',
        pos: 'top-right',
      });
    }
  });
};

const addCheckboxClickHandler = () => {
  const checkboxes = document.querySelectorAll('.configuration__card .uk-checkbox');
  checkboxes.forEach((element) => element.addEventListener('click', () => {
    checkboxes.forEach((checboxEl) => {
      checboxEl.classList.remove('validation_failed');
    });
  }));
};

export const initConfigurationPage = () => {
  updateConfigurationValues();
  addSaveButtonClickHandler();
  addCheckboxClickHandler();
};
