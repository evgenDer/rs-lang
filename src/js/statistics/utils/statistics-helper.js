import * as statisticsService from '../../api/statistics';
import * as statisticsUtils from './statistics-utils';

async function initNewStatisticsData(prevStatisticsObject, gameName, dateTime) {
  let statistics = prevStatisticsObject;
  const currentStatistics = statisticsUtils.getNewStatisticsDataValue(dateTime);

  if (!prevStatisticsObject || !prevStatisticsObject.optional || !prevStatisticsObject.optional.sd) {
    statistics = statisticsUtils.getNewStatisticsValue(currentStatistics, gameName);
  } else {
    statistics = statisticsUtils.parseStatisticsData(statistics);

    const statisticsData = statistics.optional.sd
      .find((d) => d.n.toLowerCase() === gameName.toLowerCase());

    if (!statisticsData) {
      statistics.optional.sd.push({
        n: gameName,
        d: [currentStatistics]
      })
    } else {
      statisticsData.d.push(currentStatistics);
    }
  }

  return statistics;
}

export async function updateStatisticsData(globalStatistics) {
  const statisticsForUpdate = statisticsUtils.stringifyStatisticsData(globalStatistics);
  await statisticsService.updateStatistic(statisticsForUpdate);
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

export async function getDateTimeStatistics(gameName) {
  const statistics = await getStatistics();

  if (!statistics || !statistics.optional ||
    !statistics.optional.sd) {
    return null;
  }

  const data = statisticsUtils.getDateTimeStatisticsForChart(statistics, gameName);

  return data;
}

export async function getWordLevelStatistics(gameName) {
  const statistics = await getStatistics();

  if (!statistics || !statistics.optional ||
    !statistics.optional.sd) {
    return null;
  }

  const data = statisticsUtils.getWordLevelStatisticsForChart(statistics, gameName);

  return data;
}

export async function getPercentToTotalStatistics(gameName) {
  const statistics = await getStatistics();

  if (!statistics || !statistics.optional ||
    !statistics.optional.sd) {
    return null;
  }

  const data = statisticsUtils.getPercentToTotalStatisticsForChart(statistics, gameName);

  return data;
}

export function getModalForTemporaryStatistics(currentStatistics) {
  let modalElement = null;

  if (currentStatistics === null) {
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
      <p>Всего карточек со словами пройдено: <span class="results-count" data-totalCardsEnded>${currentStatistics.tce}</span></p>
      <p>Всего новых слов изучено: <span class="results-count" data-totalNewWords>${currentStatistics.tnw}</span></p>
      <p>Правильных ответов: <span class="results-count" data-totalCorrect>${currentStatistics.tc}</span></p>
      <p>Неправильных ответов: <span class="results-count" data-totalErrors>${currentStatistics.te}</span></p>
      <p>Самая длинная серия: <span class="results-count" data-totalStrike>${currentStatistics.ts}</span></p>
    </div>
  </div>`;
  }

  return modalElement;
}

export function getModalForGlobalStatistics() {
  const modalElement = `
  <div id="global-statistics-modal" class="uk-modal-container" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <h2 class="uk-modal-title">Общая статистика</h2>
      <div id="chartContainer">
        <p class="stat__info">Данные отсутствуют</p>
      </div>
      <div id="wordLevelChart" class=" uk-margin">
        <p class="stat__info">Данные отсутствуют</p>
      </div>
    </div>
  </div>`;

  return modalElement;
}
