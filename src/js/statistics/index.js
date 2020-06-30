import {
  Statistics
} from './components/statistics';

let stat = null;

export default async function initStatistics() {
  stat = new Statistics('daily-2');
  const data = await stat.getDateTimeStatistics('daily-2');

  if (!data) {
    return;
  }

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Колличество изученных слов'
    },
    axisX: {
      title: 'Время'
    },
    axisY: {
      title: 'Колличество слов',
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
