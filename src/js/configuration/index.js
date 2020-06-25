import {
  DEFAULT_CONFIGURATION,
} from '../constants/defaul-settings';

import * as page from './page';
import * as configurationService from '../api/settings';

export async function getConfiguration() {
  const configuration = (await configurationService.getSettings()).optional;

  if (!configuration) {
    const configurationModel = {
      optional: DEFAULT_CONFIGURATION
    };

    await configurationService.upserSettings(configurationModel);
    return DEFAULT_CONFIGURATION;
  }

  return configuration;
};

export async function saveCustomConfiguration(gameName, gameConfiguration) {
  const configuration = await configurationService.getSettings();

  if(!configuration.optional){
    return;
  }

  configuration.optional[gameName] = gameConfiguration;

  await configurationService.upserSettings(configuration);
}

export async function updateConfigurationValues() {
  const configuration = await getConfiguration();

  page.updateUserConfigurationPageElement(configuration);
  page.updateCardsConfigurationPageElement(configuration);
  page.updateAppConfigurationPageElement(configuration);
};

async function saveConfiguration() {
  const userConfiguration = page.getUserConfiguration();
  const cardsConfiguration = page.getCardsConfiguration();

  if (cardsConfiguration.showWordTranslation === false &&
    cardsConfiguration.showSentenceExplanation === false &&
    cardsConfiguration.showExplanationExample === false) {
    page.showValidationErrorMessage();
    return false;
  }

  const appConfiguration = page.getAppConfiguration();

  const configuration = {
    maxNewWordsPerDay: userConfiguration.maxNewWordsPerDay,
    maxCardsWithWordsPerDay: userConfiguration.maxCardsWithWordsPerDay,
    difficultyLevel: userConfiguration.difficultyLevel,
    showWordTranslation: cardsConfiguration.showWordTranslation,
    showSentenceExplanation: cardsConfiguration.showSentenceExplanation,
    showExplanationExample: cardsConfiguration.showExplanationExample,
    showWordTranscription: cardsConfiguration.showWordTranscription,
    showImageAssociation: cardsConfiguration.showImageAssociation,
    enableAutomaticAudio: appConfiguration.enableAutomaticAudio,
    showNewWordTranslation: appConfiguration.showNewWordTranslation,
    showSentenceTranslation: appConfiguration.showSentenceTranslation,
    showAnswer: appConfiguration.showAnswer,
    deleteWords: appConfiguration.deleteWords,
    markAsDifficultWord: appConfiguration.markAsDifficultWord,
    possibilityToMarkWord: appConfiguration.possibilityToMarkWord,
  }

  const configurationModel = {
    optional: configuration
  };

  await configurationService.upserSettings(configurationModel);

  return true;
};

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
