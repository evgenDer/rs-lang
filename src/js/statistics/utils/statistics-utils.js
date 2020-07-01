/* eslint-disable no-param-reassign */
export const stringifyStatisticsData = (statistics) => {
  const statisticsData = JSON.stringify(statistics.optional.sd);
  statistics.optional.sd = statisticsData;

  return statistics;
};

export const parseStatisticsData = (statistics) => {
  if (!statistics || !statistics.optional) {
    return statistics;
  }

  const parsedStatistics = {};
  parsedStatistics.optional = statistics.optional;
  parsedStatistics.learnedWords = statistics.learnedWords;

  try {
    const statisticsData = JSON.parse(statistics.optional.sd);
    parsedStatistics.optional.sd = statisticsData;

    return parsedStatistics;
  } catch (e) {
    return statistics;
  }
};

export const getNewStatisticsValue = (currentStatistics, gameName) => {
  const statistics = {
    learnedWords: 0,
    optional: {
      sd: [{
        n: gameName,
        d: [currentStatistics],
      }],
    },
  };

  return statistics;
};

export const getNewStatisticsDataValue = (dateTime) => {
  const statistics = {
    dt: dateTime,
    tce: 0,
    tnw: 0,
    tc: 0,
    te: 0,
    ts: 0,
    wd: [],
  };

  return statistics;
};

export const getNewWordData = (word, isCorrect, wordLevel) => {
  const wordData = {
    w: word,
    c: 0,
    e: 0,
    l: wordLevel,
  };

  if (isCorrect) {
    wordData.c += 1;
  } else {
    wordData.e += 1;
  }

  return wordData;
};

export const updateWordData = (wordValue, isCorrect) => {
  const wordData = wordValue;

  if (isCorrect) {
    wordData.c += 1;
  } else {
    wordData.e += 1;
  }

  return wordData;
};

export const getCurrentStatistics = (globalStatistics, gameName, dateTime) => {
  const parsed = parseStatisticsData(globalStatistics);

  const statisticsData = parsed.optional.sd
    .find((n) => n.n.toLowerCase() === gameName.toLowerCase());

  if (!statisticsData) {
    return null;
  }

  const currentStatistics = statisticsData.d.find((f) => f.dt === dateTime);

  return currentStatistics;
}

export const updateStatisticsValues = (statisticsToUpdate, word, isCorrect, wordLevel, isStrike) => {
  const updatedStatistics = statisticsToUpdate;

  updatedStatistics.tce += 1;

  if (wordLevel !== -1) {
    updatedStatistics.tnw += 1;
  }

  if (isCorrect) {
    updatedStatistics.tc += 1;
  } else {
    updatedStatistics.te += 1;
  }

  if (isStrike) {
    updatedStatistics.ts += 1;
  }

  let wordValue = updatedStatistics.wd.find((w) => w.w.toLowerCase() === word.toLowerCase());

  if (!wordValue) {
    wordValue = getNewWordData(word, isCorrect, wordLevel);
    updatedStatistics.wd.push(wordValue);
  } else {
    wordValue = updateWordData(wordValue, isCorrect);
  }

  return updatedStatistics;
};
