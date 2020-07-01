/* eslint-disable no-undef */
import * as statisticsHelper from '../utils/statistics-helper';
import * as statisticsUtils from '../utils/statistics-utils';


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
   * Updates statistics with provided values.
   * @param {string} word - Word
   * @param {boolean} isCorrect - Is correct answer or not
   * @param {number} wordLevel - Difficulty level of the word. -1 if word is not new
   * @param {boolean} isStrike - Is answer is correct again (previous answer was correct)
   */
  async updateStatistics(word, isCorrect, wordLevel = -1, isStrike = false) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateStatisticsValues(this.currentStatistics, word, isCorrect, wordLevel, isStrike);

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
   * Gets statistics by date time periods. Used for chart.
   * @return {Array} Array of object {x: date time, y: new words count}
   */
  async getDateTimeStatistics() {
    const statistics = await statisticsHelper.getStatistics();

    if (!statistics || !statistics.optional ||
      !statistics.optional.sd) {
      return null;
    }

    const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === this.gameName.toLowerCase());
    const data = gamedata.d.map(function map(f) {
      return {
        x: f.dt,
        y: f.tnw
      };
    });

    return data;
  }

  /**
   * Gets statistics by word levels. Used for chart.
   * @return {Array} Array of object {label: level description, y: count, id: level number}
   */
  async getWordLevelStatistics() {
    const statistics = await statisticsHelper.getStatistics();

    if (!statistics || !statistics.optional ||
      !statistics.optional.sd) {
      return null;
    }

    const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === this.gameName.toLowerCase());

    const series1 = [];
    const series2 = [];

    gamedata.d.forEach(data => {
      data.wd.forEach(wordData => {
        if (wordData.l !== -1) {
          const existingData1 = series1.find(f => f.id === wordData.l);

          if (!existingData1) {
            series1.push({
              label: `Level ${wordData.l}`,
              id: wordData.l,
              y: wordData.c
            })
          } else {
            existingData1.y += wordData.c;
          }

          const existingData2 = series2.find(f => f.id === wordData.l);

          if (!existingData2) {
            series2.push({
              label: `Level ${wordData.l}`,
              id: wordData.l,
              y: wordData.e
            })
          } else {
            existingData2.y += wordData.e;
          }
        }
      });
    });

    const sorted1 = series1.sort((a, b) => {
      return a.id - b.id;
    });

    const sorted2 = series2.sort((a, b) => {
      return a.id - b.id;
    });

    return {
      sorted1,
      sorted2
    }
  }

  /**
   * Shows modal with temporary statistics for current game
   */
  async showTemporaryStatistics() {
    let modalElement = null;

    const mainElement = document.querySelector(".wrapper");
    const prevModal = document.querySelector('#temporary-statistics-modal');

    if (prevModal !== null) {
      prevModal.remove();
    }

    if (this.currentStatistics === null) {
      modalElement = `
        <div id="temporary-statistics-modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <h2 class="uk-modal-title">Извините, результатов нет</h2>
        </div>
      </div>`
    } else {
      modalElement = `
      <div id="temporary-statistics-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">Ваши результаты</h2>
        <p>Всего карточек со словами пройдено: <span class="results-count" data-totalCardsEnded>${this.currentStatistics.tce}</span></p>
        <p>Всего новых слов изучено: <span class="results-count" data-totalNewWords>${this.currentStatistics.tnw}</span></p>
        <p>Правильных ответов: <span class="results-count" data-totalCorrect>${this.currentStatistics.tc}</span></p>
        <p>Неправильных ответов: <span class="results-count" data-totalErrors>${this.currentStatistics.te}</span></p>
        <p>Самая длинная серия: <span class="results-count" data-totalStrike>${this.currentStatistics.ts}</span></p>
      </div>
    </div>`;
    }

    mainElement.innerHTML += modalElement;
    UIkit.modal("#temporary-statistics-modal").show();
  }
}
