const USER_CONFIGURATION_NAME = 'userConfiguration';
const CARDS_CONFIGURATION_NAME = 'cardsConfgiuration';
const APP_CONFIGURATION_NAME = 'appConfiguration';

export const setUserConfiguration = (userConfiguration) => {
  const json = JSON.stringify(userConfiguration);
  window.localStorage.setItem(USER_CONFIGURATION_NAME, json);
};

export const getUserConfiguration = () => {
  const json = window.localStorage.getItem(USER_CONFIGURATION_NAME);
  return JSON.parse(json);
};

export const setCardsViewConfiguration = (cardsConfiguration) => {
  const json = JSON.stringify(cardsConfiguration);
  window.localStorage.setItem(CARDS_CONFIGURATION_NAME, json);
};

export const getCardsViewConfiguration = () => {
  const json = window.localStorage.getItem(CARDS_CONFIGURATION_NAME);
  return JSON.parse(json);
};

export const setAppConfiguration = (appConfiguration) => {
  const json = JSON.stringify(appConfiguration);
  window.localStorage.setItem(APP_CONFIGURATION_NAME, json);
};

export const getAppConfiguration = () => {
  const json = window.localStorage.getItem(APP_CONFIGURATION_NAME);
  return JSON.parse(json);
};
