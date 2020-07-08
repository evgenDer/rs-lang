/* eslint-disable no-undef */
import * as statisticsHelper from '../utils/statistics-helper';
import * as statisticsUtils from '../utils/statistics-utils';
import * as chartHelper from '../utils/chart-helper';

// eslint-disable-next-line import/prefer-default-export
export class Statistics {
  /**
   * Creates statistics model with temporary and global data.
   * @param {string} gameName - Name for statistics object
   * @example
   * // Creates statistics for game 'SpeakIt'
   * new Statistics("SpeakIt");
   * @example
   * // Creates statistics for words
   * new Statistics("Learning");
   */
  constructor(gameName) {
    this.gameName = gameName;
    this.dateTime = Date.now();
    this.globalStatistics = null;
    this.currentStatistics = null;
  }

  /**
   * Updates game statistics with provided values.
   * @param {totalCorrect} totalCorrect - Number of correct answers
   * @param {totalError} totalError - Number of error answers
   * @param {number} gameScore - Score for the game
   */
  async updateGameStatistics(totalCorrect, totalError, gameScore) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateGameStatisticsValues(this.currentStatistics, totalCorrect, totalError, gameScore);

    await statisticsHelper.updateStatisticsData(this.globalStatistics);
  }

  /**
   * Updates game statistics with provided values.
   * @param {learningWordsCount} learningWordsCount - Number of learning words
   * @param {totalCorrect} totalCorrect - Number of correct answers
   * @param {totalError} totalError - Number of error answers
   */
  async updateLearningStatistics(learningWordsCount, totalCorrect, totalError) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateLearningStatisticsValues(this.currentStatistics, learningWordsCount, totalCorrect, totalError);

    await statisticsHelper.updateStatisticsData(this.globalStatistics);
  }

  /**
   * Gets temporary statistics for current game
   * @return {object} Temporary statistics objects
   */
  async getCurrentStatistics() {
    return this.currentStatistics;
  }

  /**
   * Gets user max score for current game
   * @return {number} User game score
   */
  async getUserMaxScore() {
    const statistics = await statisticsHelper.getGameStatistics(this.gameName);

    if(!statistics){
      return 0;
    }

    const maxScore =  statisticsUtils.getUserMaxScore(statistics);

    return maxScore;
  }

  /**
   * Shows modal with temporary statistics for current game
   */
  async showTemporaryStatistics() {
    const mainElement = document.querySelector(".wrapper");
    const prevModal = document.querySelector('#temporary-statistics-modal');

    if (prevModal !== null) {
      prevModal.remove();
    }

    const modalElement = statisticsHelper.getModalForTemporaryStatistics(this.currentStatistics);

    mainElement.innerHTML += modalElement;
    UIkit.modal("#temporary-statistics-modal").show();
  }

  /**
   * Shows modal with global statistics for current game
   */
  async showGlobalStatistics(withGameScore = false) {
    const mainElement = document.querySelector("body div");
    const prevModal = document.querySelector('#global-statistics-modal');

    if (prevModal !== null) {
      prevModal.remove();
    }

    const modalElement = statisticsHelper.getModalForGlobalStatistics();

    mainElement.innerHTML += modalElement;
    UIkit.modal("#global-statistics-modal").show();

    const dateTimeData = await statisticsHelper.getDateTimeStatisticsForGame(this.gameName);
    chartHelper.renderDateTimeChartForGame(dateTimeData, withGameScore);
  }

  async showDateTimeStatisitcsChart() {
    const dateTimeData = await statisticsHelper.getDateTimeStatistics(this.gameName);

    chartHelper.renderDateTimeChart(dateTimeData);
  }

  async showPercentToAllChart() {
    const data = await statisticsHelper.getPercentToTotalStatistics(this.gameName);

    chartHelper.renderPercentToAllChart(data);
  }
}
