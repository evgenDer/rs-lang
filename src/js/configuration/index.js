import {
  DEFAULT_USER_CONFIGURATION,
  DEFAULT_CARDS_VIEW,
  DEFAULT_APP_CONFIGURATION,
} from '../constants/defaul-settings';
import * as localStorage from '../data-access/local-storage';
import * as htmlHelper from '../helpers/html-helper';

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

const updateConfigurationValues = () => {
  updateUserConfigurationPageElement();
  updateCardsConfigurationPageElement();
  updateAppConfigurationPageElement();
};

const saveUserConfiguration = () => {
  const userConfiguration = getUserConfiguration();

  userConfiguration.maxNewWordsPerDay = htmlHelper.getInputValue('#form-maxNewWordsPerDay');
  userConfiguration.maxCardsWithWordsPerDay = htmlHelper.getInputValue('#form-maxCardsWithWordsPerDay');
  userConfiguration.difficultyLevel = htmlHelper.getInputValue('#form-difficultyLevel');

  localStorage.setUserConfiguration(userConfiguration);
};

const saveCardsConfiguration = () => {
  const cardsConfiguration = getCardsConfiguration();

  cardsConfiguration.showWordTranslation = htmlHelper.getCheckboxValue('#form-showWordTranslation');
  cardsConfiguration.showSentenceExplanation = htmlHelper.getCheckboxValue('#form-showSentenceExplanation');
  cardsConfiguration.showExplanationExample = htmlHelper.getCheckboxValue('#form-showExplanationExample');
  cardsConfiguration.showWordTranscription = htmlHelper.getCheckboxValue('#form-showWordTranscription');
  cardsConfiguration.showImageAssociation = htmlHelper.getCheckboxValue('#form-showImageAssociation');

  localStorage.setCardsViewConfiguration(cardsConfiguration);
};

const saveAppConfiguration = () => {
  const appConfiguration = getAppConfiguration();

  appConfiguration.enableAutomaticAudio = htmlHelper.getCheckboxValue('#form-enableAutomaticAudio');
  appConfiguration.showNewWordTranslation = htmlHelper.getCheckboxValue('#form-showNewWordTranslation');
  appConfiguration.showSentenceTranslation = htmlHelper.getCheckboxValue('#form-showSentenceTranslation');
  appConfiguration.showAnswer = htmlHelper.getCheckboxValue('#form-showAnswer');
  appConfiguration.deleteWords = htmlHelper.getCheckboxValue('#form-deleteWords');
  appConfiguration.markAsDifficultWord = htmlHelper.getCheckboxValue('#form-markAsDifficultWord');

  localStorage.setAppConfiguration(appConfiguration);
};

const addSaveButtonClickHandler = () => {
  document.querySelector('.configuration__save-button').addEventListener('click', () => {
    saveUserConfiguration();
    saveCardsConfiguration();
    saveAppConfiguration();

    UIkit.notification({ message: "<span uk-icon='icon: check'></span> Сохранено", status: 'success', pos: 'top-right' });
  });
};

export const initConfigurationPage = () => {
  updateConfigurationValues();
  addSaveButtonClickHandler();
};
