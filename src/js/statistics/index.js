/* eslint-disable indent */
import {
  Statistics
} from './components/statistics';

export async function initStatistics() {
  const stat = new Statistics('daily-2');

  //  await stat.updateStatistics('game', true, 2);
  //  await stat.updateStatistics('new', true, 2);
  //  await stat.updateStatistics('summer', true, 2);
  //  await stat.updateStatistics('summer', true, 2);
  //  await stat.updateStatistics('winter', false, 2);
  //  await stat.updateStatistics('winter', false, 2);

  const data = await stat.getDateTimeStatistics('daily-2');

  if (!data) {
    return;
  }

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: 'Колличество изученных слов'
    },
    axisX: {
      title: "Время"
    },
    axisY: {
      title: "Колличество слов",
    },
    data: [{
      type: "line",
      name: "Время",
      connectNullData: true,
      xValueType: "dateTime",
      xValueFormatString: "DD MMM hh:mm TT",
      dataPoints: data
    }]
  });
  chart.render();
};
