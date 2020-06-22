export const stringifyStatisticsData = (statistics) => {
  const statisticsData = JSON.stringify(statistics.optional.statisticsData);
  statistics.optional.statisticsData = statisticsData;

  return statistics;
};

export const parseStatisticsData = (statistics) => {
  const parsedStatistics = {};
  parsedStatistics.optional = statistics.optional;
  parsedStatistics.learnedWords = statistics.learnedWords;

  const statisticsData = JSON.parse(statistics.optional.statisticsData);
  console.log(statisticsData);

  parsedStatistics.optional.statisticsData = statisticsData;

  return parsedStatistics;
};

export const getNewStatisticsValue = (currentStatistics, gameName) => {
  const statistics = {
    learnedWords: 0,
    optional: {
      statisticsData: [{
        name: gameName,
        data: [currentStatistics],
      }],
    },
  };

  return statistics;
};

export const getNewStatisticsDataValue = (dateTime) => {
  const statistics = {
    dateTime,
    totalCardsEnded: 0,
    totalNewWords: 0,
    totalCorrect: 0,
    totalErrors: 0,
    wordData: [],
  };

  return statistics;
};

export const getNewWordData = (word, isCorrect, wordLevel) => {
  const wordData = {
    word,
    correct: 0,
    error: 0,
    level: wordLevel,
  };

  if (isCorrect) {
    wordData.correct += 1;
  } else {
    wordData.error += 1;
  }

  return wordData;
};

export const updateWordData = (wordValue, isCorrect) => {
  const wordData = wordValue;

  if (isCorrect) {
    wordData.correct += 1;
  } else {
    wordData.error += 1;
  }

  return wordData;
};

export const getCurrentStatistics = (globalStatistics, gameName, dateTime) => {
  const statisticsData = globalStatistics.optional.statisticsData
    .find((n) => n.name.toLowerCase() === gameName.toLowerCase());

  if (!statisticsData) {
    return null;
  }

  const currentStatistics = statisticsData.data.find((f) => f.dateTime === dateTime);

  return currentStatistics;
}

export const updateStatisticsValues = (statisticsToUpdate, word, isCorrect, wordLevel) => {
  const updatedStatistics = statisticsToUpdate;

  updatedStatistics.totalCardsEnded += 1;

  if (wordLevel !== -1) {
    updatedStatistics.totalNewWords += 1;
  }

  if (isCorrect) {
    updatedStatistics.totalCorrect += 1;
  } else {
    updatedStatistics.totalErrors += 1;
  }

  let wordValue = updatedStatistics.wordData.find((w) => w.word.toLowerCase() === word.toLowerCase());

  if (!wordValue) {
    wordValue = getNewWordData(word, isCorrect, wordLevel);
    updatedStatistics.wordData.push(wordValue);
  } else {
    wordValue = updateWordData(wordValue, isCorrect);
  }

  return updatedStatistics;
};
