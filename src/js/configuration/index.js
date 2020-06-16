import {
  DEFAULT_USER_CONFIGURATION,
  DEFAULT_CARDS_VIEW,
  DEFAULT_APP_CONFIGURATION,
} from '../constants/defaul-settings';
import * as localStorage from '../data-access/local-storage';
import * as htmlHelper from '../helpers/html-helper';

const getUserConfiguration = () => {
  const userConfiguration = localStorage.getUserConfiguration();

  if (!userConfiguration) {
    localStorage.setUserConfiguration(DEFAULT_USER_CONFIGURATION);
  }

  return userConfiguration;
};

const getCardsConfiguration = () => {
  const cardsConfiguration = localStorage.getCardsViewConfiguration();

  if (!cardsConfiguration) {
    localStorage.setCardsViewConfiguration(DEFAULT_CARDS_VIEW);
  }

  return cardsConfiguration;
};

const getAppConfiguration = () => {
  const appConfiguration = localStorage.getAppConfiguration();

  if (!appConfiguration) {
    localStorage.setAppConfiguration(DEFAULT_APP_CONFIGURATION);
  }

  return appConfiguration;
};

const updateUserConfigurationPageElement = () => {
  const userConfiguration = getUserConfiguration();

  htmlHelper.updateInputValue(userConfiguration.maxNewWordsPerDay, '#form-maxNewWordsPerDay');
  htmlHelper.updateInputValue(userConfiguration.maxCardsWithWordsPerDay, '#form-maxCardsWithWordsPerDay');
  htmlHelper.updateInputValue(userConfiguration.difficultyLevel, '#form-difficultyLevel');
};

const updateCardsConfigurationPageElement = () => {
  const cardsConfiguration = getCardsConfiguration();

  htmlHelper.updateCheckboxValue(cardsConfiguration.showWordTranslation, '#form-showWordTranslation');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showSentenceExplanation, '#form-showSentenceExplanation');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showExplanationExample, '#form-showExplanationExample');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showWordTranscription, '#form-showWordTranscription');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showImageAssociation, '#form-showImageAssociation');
};

const updateAppConfigurationPageElement = () => {
  const appConfiguration = getAppConfiguration();

  htmlHelper.updateCheckboxValue(appConfiguration.enableAutomaticAudio, '#form-enableAutomaticAudio');
  htmlHelper.updateCheckboxValue(appConfiguration.showNewWordTranslation, '#form-showNewWordTranslation');
  htmlHelper.updateCheckboxValue(appConfiguration.showSentenceTranslation, '#form-showSentenceTranslation');
  htmlHelper.updateCheckboxValue(appConfiguration.showAnswer, '#form-showAnswer');
  htmlHelper.updateCheckboxValue(appConfiguration.deleteWords, '#form-deleteWords');
  htmlHelper.updateCheckboxValue(appConfiguration.markAsDifficultWord, '#form-markAsDifficultWord');
};


export const updateConfigurationValues = () => {
  updateUserConfigurationPageElement();
  updateCardsConfigurationPageElement();
  updateAppConfigurationPageElement();
};
