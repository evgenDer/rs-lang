import { DEFAULT_CONFIGURATION_GAMES } from '../constants/default-settings';
import { getCustomConfiguration, saveCustomConfiguration } from '../configuration/index';
import { ERR_MSG } from '../games/constants';
import { getFullDataWords } from '../api/words';
import { getAggregatedUserWords } from '../api/userWords';

export async function addConfiguration() {
  const gameConfiguration = await getCustomConfiguration('speakIt');
  if (!gameConfiguration || Object.keys(gameConfiguration).length === 0) {
    saveCustomConfiguration(DEFAULT_CONFIGURATION_GAMES);
    return DEFAULT_CONFIGURATION_GAMES;
  }
  return gameConfiguration;
}

export async function getUserWords(filter, wordsAmntInRound) {
  const result = await getAggregatedUserWords(filter, 3600);
  const UserWordsData = result[0].paginatedResults;
  if (UserWordsData.length < wordsAmntInRound) {
    throw ERR_MSG;
  }
  return UserWordsData
    .sort((a, b) => a.userWord.optional.successPoint - b.userWord.optional.successPoint)
    .slice(0, wordsAmntInRound);
}

export async function getWordsByLevelAndRound(data, wordsAmntInRound) {
  const result = await getFullDataWords(data.level, data.page, wordsAmntInRound);
  if (result.length < wordsAmntInRound) {
    throw ERR_MSG;
  }
  return result;
}

