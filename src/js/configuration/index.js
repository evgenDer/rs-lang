import {
  DEFAULT_USER_CONFIGURATION,
} from '../constants/defaul-settings';
import * as localStorage from '../data-access/local-storage';

const getUserConfiguration = () => {
  const userConfiguration = localStorage.getUserConfiguration();

  if (!userConfiguration) {
    localStorage.setUserConfiguration(DEFAULT_USER_CONFIGURATION);
  }

  return userConfiguration;
};

const updateUserConfigurationPageElement = () => {
  const userConfiguration = getUserConfiguration();

  const maxNewWordsPerDayElement = document.querySelector('#form-maxNewWordsPerDay');
  maxNewWordsPerDayElement.value = userConfiguration.maxNewWordsPerDay;

  const maxCardsWithWordsPerDayElement = document.querySelector('#form-maxCardsWithWordsPerDay');
  maxCardsWithWordsPerDayElement.value = userConfiguration.maxCardsWithWordsPerDay;

  const difficultyLevelElement = document.querySelector('#form-difficultyLevel');
  difficultyLevelElement.value = userConfiguration.difficultyLevel;
};

export const  updateConfigurationValues = () => {
  updateUserConfigurationPageElement();
};
