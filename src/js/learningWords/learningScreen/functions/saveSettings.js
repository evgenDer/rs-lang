import { getConfiguration } from '../../../configuration/index';
import * as configurationService from '../../../api/settings';

export default async function saveSettingsFromLearningWords(learningScreenElemen) {
  const prevConfiguration = await getConfiguration();

  const configuration = {
    optional: {
      difficultyLevel: learningScreenElemen.settings.difficultyLevel,
      learningWordsPage: learningScreenElemen.settings.learningWordsPage,
      showWordTranslation: learningScreenElemen.settings.showWordTranslation,
      enableAutomaticAudio: learningScreenElemen.settings.enableAutomaticAudio,
      showNewWordTranslation: learningScreenElemen.settings.showNewWordTranslation,
      showSentenceTranslation: learningScreenElemen.settings.showSentenceTranslation,
      maxNewWordsPerDay: prevConfiguration.maxNewWordsPerDay,
      maxCardsWithWordsPerDay: prevConfiguration.maxCardsWithWordsPerDay,
      showSentenceExplanation: prevConfiguration.showSentenceExplanation,
      showExplanationExample: prevConfiguration.showExplanationExample,
      showWordTranscription: prevConfiguration.showWordTranscription,
      showImageAssociation: prevConfiguration.showImageAssociation,
      showAnswer: prevConfiguration.showAnswer,
      deleteWords: prevConfiguration.deleteWords,
      markAsDifficultWord: prevConfiguration.markAsDifficultWord,
      possibilityToMarkWord: prevConfiguration.possibilityToMarkWord,
    },
  };
  await configurationService.upserSettings(configuration);

  console.log(prevConfiguration);
}
