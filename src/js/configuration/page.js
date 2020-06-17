import * as htmlHelper from '../helpers/html-helper';

export const updateUserConfigurationPageElement = (userConfiguration) => {
  htmlHelper.updateInputValue(userConfiguration.maxNewWordsPerDay, '#form-maxNewWordsPerDay');
  htmlHelper.updateInputValue(userConfiguration.maxCardsWithWordsPerDay, '#form-maxCardsWithWordsPerDay');
  htmlHelper.updateInputValue(userConfiguration.difficultyLevel, '#form-difficultyLevel');
};

export const updateCardsConfigurationPageElement = (cardsConfiguration) => {
  htmlHelper.updateCheckboxValue(cardsConfiguration.showWordTranslation, '#form-showWordTranslation');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showSentenceExplanation, '#form-showSentenceExplanation');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showExplanationExample, '#form-showExplanationExample');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showWordTranscription, '#form-showWordTranscription');
  htmlHelper.updateCheckboxValue(cardsConfiguration.showImageAssociation, '#form-showImageAssociation');
};

export const updateAppConfigurationPageElement = (appConfiguration) => {
  htmlHelper.updateCheckboxValue(appConfiguration.enableAutomaticAudio, '#form-enableAutomaticAudio');
  htmlHelper.updateCheckboxValue(appConfiguration.showNewWordTranslation, '#form-showNewWordTranslation');
  htmlHelper.updateCheckboxValue(appConfiguration.showSentenceTranslation, '#form-showSentenceTranslation');
  htmlHelper.updateCheckboxValue(appConfiguration.showAnswer, '#form-showAnswer');
  htmlHelper.updateCheckboxValue(appConfiguration.deleteWords, '#form-deleteWords');
  htmlHelper.updateCheckboxValue(appConfiguration.markAsDifficultWord, '#form-markAsDifficultWord');
};

export const getUserConfiguration = () => {
  const userConfiguration = {};

  userConfiguration.maxNewWordsPerDay = htmlHelper.getInputValue('#form-maxNewWordsPerDay');
  userConfiguration.maxCardsWithWordsPerDay = htmlHelper.getInputValue('#form-maxCardsWithWordsPerDay');
  userConfiguration.difficultyLevel = htmlHelper.getInputValue('#form-difficultyLevel');

  return userConfiguration;
};

export const getCardsConfiguration = () => {
  const cardsConfiguration = {};

  cardsConfiguration.showWordTranslation = htmlHelper.getCheckboxValue('#form-showWordTranslation');
  cardsConfiguration.showSentenceExplanation = htmlHelper.getCheckboxValue('#form-showSentenceExplanation');
  cardsConfiguration.showExplanationExample = htmlHelper.getCheckboxValue('#form-showExplanationExample');
  cardsConfiguration.showWordTranscription = htmlHelper.getCheckboxValue('#form-showWordTranscription');
  cardsConfiguration.showImageAssociation = htmlHelper.getCheckboxValue('#form-showImageAssociation');

  return cardsConfiguration;
};

export const getAppConfiguration = () => {
  const appConfiguration = {};

  appConfiguration.enableAutomaticAudio = htmlHelper.getCheckboxValue('#form-enableAutomaticAudio');
  appConfiguration.showNewWordTranslation = htmlHelper.getCheckboxValue('#form-showNewWordTranslation');
  appConfiguration.showSentenceTranslation = htmlHelper.getCheckboxValue('#form-showSentenceTranslation');
  appConfiguration.showAnswer = htmlHelper.getCheckboxValue('#form-showAnswer');
  appConfiguration.deleteWords = htmlHelper.getCheckboxValue('#form-deleteWords');
  appConfiguration.markAsDifficultWord = htmlHelper.getCheckboxValue('#form-markAsDifficultWord');

  return appConfiguration;
};

export const showValidationErrorMessage = () => {
  htmlHelper.setClassesToElement('#form-showWordTranslation', 'validation_failed');
  htmlHelper.setClassesToElement('#form-showSentenceExplanation', 'validation_failed');
  htmlHelper.setClassesToElement('#form-showExplanationExample', 'validation_failed');
};
