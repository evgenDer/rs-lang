/* eslint-disable no-undef */
export function renderDateTimeChart(data) {
  if (!data) {
    return;
  }

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    zoomEnabled: true,
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
        name: "Правильно",
        color: "#61bd4f",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        dataPoints: data.dataCorrect
      },
      {
        type: "splineArea",
        showInLegend: true,
        name: "Неправильно",
        color: "#fe5c55",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        dataPoints: data.dataError
      }
    ]
  });

  chart.render();
}

export function renderDateTimeChartForGame(data, withGameScore) {
  if (!data) {
    return;
  }

  const chartData = [];

  if(withGameScore){
    chartData.push({
      type: "splineArea",
      showInLegend: true,
      name: "Результат",
      xValueType: "dateTime",
      xValueFormatString: "DD MMM hh:mm TT",
      dataPoints: data.dataResult
    });
  }

  chartData.push({
    type: "splineArea",
    showInLegend: true,
    name: "Правильно",
    xValueType: "dateTime",
    xValueFormatString: "DD MMM hh:mm TT",
    color: "#61bd4f",
    dataPoints: data.dataCorrect
  });

  chartData.push({
    type: "splineArea",
    showInLegend: true,
    name: "Неправильно",
    color: "#fe5c55",
    xValueType: "dateTime",
    xValueFormatString: "DD MMM hh:mm TT",
    dataPoints: data.dataError
  });


  const chart = new CanvasJS.Chart('gameChartContainer', {
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Результаты'
    },
    axisX: {
      title: 'Время',
    },
    axisY: {
      title: 'Результат игры',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    data: chartData
  });

  chart.render();
}

export function renderPercentToAllChart(data){
  if (!data) {
    return;
  }

  const chart = new CanvasJS.Chart('chartPercentContainer', {
    animationEnabled: true,
    zoomEnabled: true,
    title:{
      text: "Прогресс изученных слов"
    },
    axisY: {
      maximum: 3600
    },
    data: [{
      type: "stepArea",
      markerSize: 5,
      xValueFormatString: "DD MMM",
      yValueFormatString: "#,##0.##\" из 3600\"",
      dataPoints: data
    }]
  });

  chart.render();
}
