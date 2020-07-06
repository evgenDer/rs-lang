/* eslint-disable no-undef */
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

export function renderDateTimeChartForGame(data) {
  if (!data) {
    return;
  }

  const chart = new CanvasJS.Chart('gameChartContainer', {
    animationEnabled: true,
    title: {
      text: 'Результаты'
    },
    axisX: {
      title: 'Время'
    },
    axisY: {
      title: 'Результат игры',
      includeZero: false
    },
    toolTip: {
      shared: true
    },
    data: [{
        type: "splineArea",
        showInLegend: true,
        name: "Результат",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        dataPoints: data.dataResult
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
