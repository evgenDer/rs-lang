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
      includeZero: false
    },
    toolTip: {
      shared: true
    },
    data: [{
        type: "splineArea",
        showInLegend: true,
        name: "Изучено слов",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        dataPoints: data.dataTotal
      },
      {
        type: "splineArea",
        showInLegend: true,
        name: "Неправильно",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        dataPoints: data.dataError
      },
      {
        type: "splineArea",
        showInLegend: true,
        name: "Правильно",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        dataPoints: data.dataCorrect
      }
    ]
  });

  chart.render();
}

export function renderPercentToAllChart(data){
  if (!data) {
    return;
  }

  const chart = new CanvasJS.Chart('chartPercentContainer', {
    animationEnabled: true,
    title:{
      text: "Прогресс изученных слов"
    },
    axisY: {
      suffix: "%",
      // maximum: 100
    },
    data: [{
      type: "stepArea",
      markerSize: 5,
      xValueFormatString: "DD MMM",
      yValueFormatString: "#,##0.##\"%\"",
      dataPoints: data
    }]
  });

  chart.render();
}
