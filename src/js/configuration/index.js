/* eslint-disable no-undef */
import {
  DEFAULT_CONFIGURATION
} from '../constants/default-settings';

import * as page from './page';
import * as configurationService from '../api/settings';

export async function getConfiguration() {
  const configuration = await configurationService.getSettings();

  if (!configuration || configuration == null || !configuration.optional) {
    const configurationModel = {
      optional: DEFAULT_CONFIGURATION,
    };

    await configurationService.upserSettings(configurationModel);
    return DEFAULT_CONFIGURATION;
  }

  return configuration.optional;
}

async function updateConfiguration(configuration) {
  const configurationModel = {
    wordsPerDay: 10,
    optional: configuration,
  };

  await configurationService.upserSettings(configurationModel);
}

export async function saveCustomConfiguration(gameName, gameConfiguration) {
  const oldConfiguration = await getConfiguration();

  const configuration = oldConfiguration;

  if (!configuration) {
    return;
  }

  configuration[gameName] = JSON.stringify(gameConfiguration);

  await updateConfiguration(configuration);
}

export async function getCustomConfiguration(gameName) {
  try{
    const configuration = await getConfiguration();

    if (!configuration) {
      return null;
    }

    const value = JSON.parse(configuration[gameName]);

    return value;
  } catch (error) {
    return null;
  }
}

export async function updatDifficultyLevel(userDifficultyLevel) {
  const configuration = await getConfiguration();

  configuration.difficultyLevel = userDifficultyLevel;
  await updateConfiguration(configuration);
}

async function updateConfigurationValues() {
  const configuration = await getConfiguration();

  page.updateUserConfigurationPageElement(configuration);
  page.updateCardsConfigurationPageElement(configuration);
  page.updateAppConfigurationPageElement(configuration);
}

async function saveConfiguration() {
  const prevConfiguration = await getConfiguration();

  const userConfiguration = page.getUserConfiguration();
  const difficultyLevelValue = document.getElementById('form-difficultyLevel').value;
  const cardsConfiguration = page.getCardsConfiguration();

  if (Number(userConfiguration.maxNewWordsPerDay) > Number(userConfiguration.maxCardsWithWordsPerDay)) {
    page.showValidationErrorMessageForUserConfiguration();
    return false;
  }

  if (Number(userConfiguration.maxNewWordsPerDay) < 1) {
    page.showValidationErrorMessageForNewWords();
    return false;
  }

  if (Number(userConfiguration.maxCardsWithWordsPerDay) < 1) {
    page.showValidationErrorMessageForMaxCards();
    return false;
  }

  if (Number(difficultyLevelValue) < 1 || Number(difficultyLevelValue) > 7) {
    page.showValidationErrorMessageForDifficultyLevel();
    return false;
  }

  if (
    cardsConfiguration.showWordTranslation === false &&
    cardsConfiguration.showSentenceExplanation === false &&
    cardsConfiguration.showExplanationExample === false
  ) {
    page.showValidationErrorMessage();
    return false;
  }

  const appConfiguration = page.getAppConfiguration();
  let {
    dayLearningDate
  } = prevConfiguration;

  if (
    prevConfiguration.maxNewWordsPerDay !== userConfiguration.maxNewWordsPerDay ||
    prevConfiguration.maxCardsWithWordsPerDay !== userConfiguration.maxCardsWithWordsPerDay
  ) {
    dayLearningDate = Date.now();
  }

  prevConfiguration.maxNewWordsPerDay = userConfiguration.maxNewWordsPerDay;
  prevConfiguration.maxNewWordsPerDay = userConfiguration.maxNewWordsPerDay;
  prevConfiguration.maxCardsWithWordsPerDay = userConfiguration.maxCardsWithWordsPerDay;
  prevConfiguration.dayLearningDate = dayLearningDate;
  prevConfiguration.difficultyLevel = userConfiguration.difficultyLevel - 1;
  prevConfiguration.showWordTranslation = cardsConfiguration.showWordTranslation;
  prevConfiguration.showSentenceExplanation = cardsConfiguration.showSentenceExplanation;
  prevConfiguration.showExplanationExample = cardsConfiguration.showExplanationExample;
  prevConfiguration.showWordTranscription = cardsConfiguration.showWordTranscription;
  prevConfiguration.showImageAssociation = cardsConfiguration.showImageAssociation;
  prevConfiguration.enableAutomaticAudio = appConfiguration.enableAutomaticAudio;;
  prevConfiguration.showAnswer = appConfiguration.showAnswer;
  prevConfiguration.deleteWords = appConfiguration.deleteWords;
  prevConfiguration.possibilityToMarkWord = appConfiguration.possibilityToMarkWord;

  await updateConfiguration(prevConfiguration);

  window.localStorage.setItem('dayLearningDate', '-1');
  return true;
}

const addSaveButtonClickHandler = () => {
  document.querySelector('.configuration__save-button').addEventListener('click', async () => {
    if (await saveConfiguration()) {
      // eslint-disable-next-line no-undef
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
  checkboxes.forEach((element) =>
    element.addEventListener('click', () => {
      checkboxes.forEach((checboxEl) => {
        checboxEl.classList.remove('validation_failed');
      });
    }),
  );
};

const addInputClickHandler = () => {
  const inputs = document.querySelectorAll('.configuration__card .uk-input');
  inputs.forEach((element) =>
    element.addEventListener('click', () => {
      inputs.forEach((input) => {
        input.classList.remove('validation_failed');
      });
    }),
  );
};

export const initConfigurationPage = () => {
  updateConfigurationValues();
  addSaveButtonClickHandler();
  addCheckboxClickHandler();
  addInputClickHandler();
};
