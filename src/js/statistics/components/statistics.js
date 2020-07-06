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

  async updateGameStatistics(totalCorrect, totalError, gameScore) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateGameStatisticsValues(this.currentStatistics, totalCorrect, totalError, gameScore);

    await statisticsHelper.updateStatisticsData(this.globalStatistics);
  }

  async updateLearningStatistics(learningWordsCount, totalCorrect, totalError){
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateLearningStatisticsValues(this.currentStatistics, learningWordsCount, totalCorrect, totalError);

    await statisticsHelper.updateStatisticsData(this.globalStatistics);
  }

  /**
   * Updates statistics with provided values.
   * @param {string} word - Word
   * @param {boolean} isCorrect - Is correct answer or not
   * @param {number} wordLevel - Difficulty level of the word. -1 if word is not new
   * @param {boolean} isStrike - Is answer is correct again (previous answer was correct)
   * @param {number} gameScore - Score for the game
   */
  async updateStatistics(word, isCorrect, wordLevel = -1, isStrike = false, gameScore = 0) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateStatisticsValues(this.currentStatistics, word, isCorrect, wordLevel, isStrike, gameScore);

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
  async showGlobalStatistics() {
    const mainElement = document.querySelector("body div");
    const prevModal = document.querySelector('#global-statistics-modal');

    if (prevModal !== null) {
      prevModal.remove();
    }

    const modalElement = statisticsHelper.getModalForGlobalStatistics();

    mainElement.innerHTML += modalElement;
    UIkit.modal("#global-statistics-modal").show();

    const data = await statisticsHelper.getWordLevelStatistics(this.gameName);
    chartHelper.renderMultiSeriesColumnChart(data);

    const dateTimeData = await statisticsHelper.getDateTimeStatistics(this.gameName);
    chartHelper.renderDateTimeChart(dateTimeData);
  }

   async showDateTimeStatisitcsChart(){
    const dateTimeData = await statisticsHelper.getDateTimeStatistics(this.gameName);

    chartHelper.renderDateTimeChart(dateTimeData);
   }

   async showPercentToAllChart() {
     const data = await statisticsHelper.getPercentToTotalStatistics(this.gameName);

     chartHelper.renderPercentToAllChart(data);
   }
}
