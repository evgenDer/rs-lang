/* eslint-disable no-undef */
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

  async updateStatistics(word, isCorrect, wordLevel = -1, isStrike = false) {
    if (!this.globalStatistics) {
      this.globalStatistics = await statisticsHelper.initStatistics(this.gameName, this.dateTime);
    }

    this.currentStatistics = statisticsUtils.getCurrentStatistics(this.globalStatistics, this.gameName, this.dateTime);
    this.currentStatistics = statisticsUtils.updateStatisticsValues(this.currentStatistics, word, isCorrect, wordLevel, isStrike);

    await statisticsHelper.updateStatisticsData(this.globalStatistics);
  }

  async endStatistics() {
    return this.currentStatistics;
  }

  async getDateTimeStatistics() {
    const statistics = await statisticsHelper.getStatistics();

    if (!statistics || !statistics.optional ||
      !statistics.optional.sd) {
      return null;
    }

    const gamedata = statistics.optional.sd.find(f => f.n.toLowerCase() === this.gameName.toLowerCase());
    const data = gamedata.d.map(function (f) {
      return {
        x: f.dt,
        y: f.tnw
      };
    });

    return data;
  }

  async showTemporaryStatistics() {
    let modalElement = null;

    const mainElement = document.querySelector(".wrapper");
    const prevModal = document.querySelector('#temporaty-statistics-modal');

    if (prevModal !== null) {
      prevModal.remove();
    }

    if (this.currentStatistics === null) {
      modalElement = `
        <div id="temporaty-statistics-modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <h2 class="uk-modal-title">Извините, результатов нет</h2>
        </div>
      </div>`
    } else {
      modalElement = `
      <div id="temporaty-statistics-modal" uk-modal>
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
    UIkit.modal("#temporaty-statistics-modal").show();
  }
}
