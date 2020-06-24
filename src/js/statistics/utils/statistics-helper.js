import * as statisticsService from '../../api/statistics';
import * as statisticsUtils from './statistics-utils';

async function initNewStatisticsData(prevStatisticsObject, gameName, dateTime) {
  let statistics = prevStatisticsObject;
  const currentStatistics = statisticsUtils.getNewStatisticsDataValue(dateTime);

  if (!prevStatisticsObject.optional || !prevStatisticsObject.optional.statisticsData) {
    statistics = statisticsUtils.getNewStatisticsValue(currentStatistics, gameName);
  } else {
    statistics = statisticsUtils.parseStatisticsData(statistics);

    const statisticsData = statistics.optional.statisticsData
      .find((d) => d.name.toLowerCase() === gameName.toLowerCase());

    if (!statisticsData) {
      statistics.optional.statisticsData.push({
        name: gameName,
        data: [currentStatistics]
      })
    } else {
      statisticsData.data.push(currentStatistics);
    }
  }

  return statistics;
}

export async function updateStatisticsData(globalStatistics) {
  const statisticsForUpdate = statisticsUtils.stringifyStatisticsData(globalStatistics);
  await statisticsService.upserStatistic(statisticsForUpdate);
}

export async function initStatistics(gameName, dateTime) {
  const prevStatisticsObject = await statisticsService.getStatistics();
  const statistics = await initNewStatisticsData(prevStatisticsObject, gameName, dateTime);

  return statistics;
}

export async function getStatistics() {
  const statistics = await statisticsService.getStatistics();

  const parsedStatistics = statisticsUtils.parseStatisticsData(statistics);
  return parsedStatistics;
}
