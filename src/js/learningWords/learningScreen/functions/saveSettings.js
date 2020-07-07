import { getConfiguration } from '../../../configuration/index';
import * as configurationService from '../../../api/settings';

export default async function saveSettingsFromLearningWords(learningScreenElemen) {
  const prevConfiguration = await getConfiguration();
  prevConfiguration.showWordTranslation = learningScreenElemen.settings.showWordTranslation;
  prevConfiguration.enableAutomaticAudio = learningScreenElemen.settings.enableAutomaticAudio;
  prevConfiguration.showNewWordTranslation = learningScreenElemen.settings.showNewWordTranslation;
  prevConfiguration.showSentenceTranslation = learningScreenElemen.settings.showSentenceTranslation;
  prevConfiguration.learning = {
    groupNumber: learningScreenElemen.settings.learning.groupNumber,
    learningWordsPage: learningScreenElemen.settings.learning.learningWordsPage,
  };
  await configurationService.upserSettings({ optional: prevConfiguration });
}
