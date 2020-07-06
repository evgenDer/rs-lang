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
    lwc: 0,
    nwc: 0
  };

  return statistics;
};

// export const getNewWordData = (word, isCorrect, wordLevel) => {
//   const wordData = {
//     w: word,
//     c: 0,
//     e: 0,
//     l: wordLevel,
//   };

//   if (isCorrect) {
//     wordData.c += 1;
//   } else {
//     wordData.e += 1;
//   }

//   return wordData;
// };

// export const updateWordData = (wordValue, isCorrect) => {
//   const wordData = wordValue;

//   if (isCorrect) {
//     wordData.c += 1;
//   } else {
//     wordData.e += 1;
//   }

//   return wordData;
// };

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

// export const updateStatisticsValues = (statisticsToUpdate, word, isCorrect, wordLevel, isStrike, gameScore) => {
//   const updatedStatistics = statisticsToUpdate;

//   updatedStatistics.tce += 1;

//   if (wordLevel !== -1) {
//     updatedStatistics.tnw += 1;
//   }

//   if (isCorrect) {
//     updatedStatistics.tc += 1;
//   } else {
//     updatedStatistics.te += 1;
//   }

//   if (isStrike) {
//     updatedStatistics.ts += 1;
//   }

//   if (gameScore !== 0) {
//     updatedStatistics.gs = gameScore;
//   }

//   let wordValue = updatedStatistics.wd.find((w) => w.w.toLowerCase() === word.toLowerCase());

//   if (!wordValue) {
//     wordValue = getNewWordData(word, isCorrect, wordLevel);
//     updatedStatistics.wd.push(wordValue);
//   } else {
//     wordValue = updateWordData(wordValue, isCorrect);
//   }

//   return updatedStatistics;
// };

export const getDateTimeStatisticsForChart = (statistics, gameName) => {
  const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === gameName.toLowerCase());

  const data = gamedata.d.map(function map(f) {
    return {
      x: f.dt,
      y: f.tce
    };
  });

  return data;
}

// export const getWordLevelStatisticsForChart = (statistics, gameName) => {
//   const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === gameName.toLowerCase());

//   const series1 = [];
//   const series2 = [];

//   gamedata.d.forEach(data => {
//     data.wd.forEach(wordData => {
//       if (wordData.l !== -1) {
//         const existingData1 = series1.find(f => f.id === wordData.l);

//         if (!existingData1) {
//           series1.push({
//             label: `Level ${wordData.l}`,
//             id: wordData.l,
//             y: wordData.c
//           })
//         } else {
//           existingData1.y += wordData.c;
//         }

//         const existingData2 = series2.find(f => f.id === wordData.l);

//         if (!existingData2) {
//           series2.push({
//             label: `Level ${wordData.l}`,
//             id: wordData.l,
//             y: wordData.e
//           })
//         } else {
//           existingData2.y += wordData.e;
//         }
//       }
//     });
//   });

//   const sorted1 = series1.sort((a, b) => {
//     return a.id - b.id;
//   });

//   const sorted2 = series2.sort((a, b) => {
//     return a.id - b.id;
//   });

//   return {
//     sorted1,
//     sorted2
//   }
// }
