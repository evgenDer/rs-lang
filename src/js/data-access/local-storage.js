const USER_CONFIGURATION_NAME = 'userConfiguration';

export const setUserConfiguration = (userConfiguration) => {
  const json = JSON.stringify(userConfiguration);
  window.localStorage.setItem(USER_CONFIGURATION_NAME, json);
};

export const getUserConfiguration = () => {
  const json = window.localStorage.getItem(USER_CONFIGURATION_NAME);
  return JSON.parse(json);
};
