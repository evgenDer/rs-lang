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
    tc: 0,
    te: 0,
    gs: 0,
    lwc: 0
  };

  return statistics;
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

export const updateLearningStatisticsValues = (statisticsToUpdate, isCorrect) => {
  const updatedStatistics = statisticsToUpdate;

  if(isCorrect){
    updatedStatistics.tc += 1;
  }
  else{
    updatedStatistics.te += 1;
  }

  updatedStatistics.lwc += 1;

  return updatedStatistics;
}

export const updateGameStatisticsValues = (statisticsToUpdate, totalCorrect, totalError, gameScore) => {
  const updatedStatistics = statisticsToUpdate;

  updatedStatistics.lwc = totalCorrect + totalError;
  updatedStatistics.tc = totalCorrect;
  updatedStatistics.te = totalError;
  updatedStatistics.gs = gameScore;

  return updatedStatistics;
}

export const getDateTimeStatisticsForChart = (statistics, gameName) => {
  const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === gameName.toLowerCase());

  if(!gamedata || !gamedata.d){
    return;
  }

  const dataTotal = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.lwc
    };
  });

  const dataCorrect = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.tc
    };
  });

  const dataError = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.te
    };
  });

  return {
    dataTotal,
    dataCorrect,
    dataError
  };
}

export const getGameDateTimeStatisticsForChart = (statistics, gameName) => {
  const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === gameName.toLowerCase());

  if(!gamedata || !gamedata.d){
    return;
  }

  const dataResult = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.gs
    };
  });

  const dataCorrect = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.tc
    };
  });

  const dataError = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.te
    };
  });

  return {
    dataResult,
    dataCorrect,
    dataError
  };
}

export const getPercentToTotalStatisticsForChart = (statistics, gameName) => {
  const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === gameName.toLowerCase());

  const totalWordsCount = 3600;

  let totalLearningWordsCount = 0;

  if(!gamedata || !gamedata.d){
    return null;
  }

  const data = gamedata.d.map(function map(f) {
    const dateTime = new Date(f.dt);
    totalLearningWordsCount += f.lwc;
    const percent = totalLearningWordsCount;

    return {
      x: dateTime,
      y: percent
    };
  });

  return data;
}

export const getUserMaxScore = (statistics) => {
  const gameScoreArr = statistics.d.map(f => f.gs);
  const maxScore = Math.max(...gameScoreArr);

  return maxScore;
}
