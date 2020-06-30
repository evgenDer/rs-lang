import * as statisticsHelper from '../utils/statistics-helper';
import * as statisticsUtils from '../utils/statistics-utils';

// eslint-disable-next-line import/prefer-default-export
export class Statistics {
  constructor(gameName) {
    this.gameName = gameName;
    this.dateTime = Date.now();
    this.globalStatistics = null;
    this.currentStatistics = null;
  }

  async updateStatistics(word, isCorrect, wordLevel = -1) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateStatisticsValues(this.currentStatistics, word, isCorrect, wordLevel);

    await statisticsHelper.updateStatisticsData(this.globalStatistics);
  }

  async endStatistics() {
    return this.currentStatistics;
  }

  async getDateTimeStatistics() {
    const statistics = await statisticsHelper.getStatistics();

    if (!statistics || !statistics.optional ||
      !statistics.optional.statisticsData) {
      return null;
    }

    const gamedata = statistics.optional.statisticsData.find(f => f.name.toLowerCase() === this.gameName.toLowerCase());
    const data = gamedata.data.map(function (f) {
      return {
        x: f.dateTime,
        y: f.totalNewWords
      };
    });

    return data;
  }
}
