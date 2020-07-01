/* eslint-disable no-undef */
import {
  Statistics
} from './components/statistics';

let stat = null;

export default async function initStatistics() {
  stat = new Statistics('daily-2');
  const data = await stat.getDateTimeStatistics('daily-2');

  // await stat.updateStatistics('black', true, 3);
  //  await stat.updateStatistics('red', true, 1);
  //  await stat.updateStatistics('bag', true, 4);
  //  await stat.updateStatistics('lang', false, 4);
  //  await stat.updateStatistics('dog', true, 2);
  //  await stat.updateStatistics('cat', false, 2);

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
      type: "area",
      xValueType: "dateTime",
      xValueFormatString: "DD MMM hh:mm TT",
      dataPoints: data
    }]
  });

  chart.render();

  renderMultiSeriesColumnChart();
};

async function renderMultiSeriesColumnChart() {
  var chart = new CanvasJS.Chart("wordLevelChart");

  chart.options.axisY = {
    includeZero: false
  };
  chart.options.title = {
    text: "Колличество изученных слов по уровням"
  };

  var series1 = {
    type: "column",
    name: "Правильно отвечены",
    showInLegend: true
  };

  var series2 = {
    type: "column",
    name: "Неправильно отвечены",
    showInLegend: true
  };

  chart.options.data = [];
  chart.options.data.push(series1);
  chart.options.data.push(series2);

  const data = await stat.getWordLevelStatistics();

  series1.dataPoints = data.sorted1;
  series2.dataPoints = data.sorted2;

  chart.render();
}
