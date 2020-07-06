/* eslint-disable no-undef */
export function renderMultiSeriesColumnChart(data) {
  if (!data) {
    return;
  }

  const chart = new CanvasJS.Chart("wordLevelChart");

  chart.options.axisY = {
    includeZero: false
  };
  chart.options.title = {
    text: "Колличество изученных слов по уровням"
  };

  const series1 = {
    type: "column",
    name: "Правильно отвечены",
    showInLegend: true
  };

  const series2 = {
    type: "column",
    name: "Неправильно отвечены",
    showInLegend: true
  };

  chart.options.data = [];
  chart.options.data.push(series1);
  chart.options.data.push(series2);

  series1.dataPoints = data.sorted1;
  series2.dataPoints = data.sorted2;

  chart.render();
}

export function renderDateTimeChart(data) {
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
}
