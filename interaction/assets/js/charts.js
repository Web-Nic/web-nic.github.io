let positiveMain = {
  x: [1, 2, 3, 4, 5],
  y: [8, 6, 9, 7, 5],
  legendgroup: 'positive',
  mode: 'lines',
  name: '10 шт промоутери',
  line: {
    color: 'rgb(126, 211, 33)',
    dash: 'solid',
    width: 2
  }
};

let positiveLimit = {
  x: [1, 2, 3, 4, 5],
  y: [5, 5, 5, 5, 5],
  legendgroup: 'positive',
  mode: 'lines',
  name: 'Визначений ліміт',
  line: {
    color: 'rgb(126, 211, 33)',
    dash: 'dashdot',
    width: 2
  }
};

let positiveRating = {
  x: [1, 2, 3, 4, 5],
  y: [7, 7, 7, 7, 7],
  legendgroup: 'positive',
  mode: 'lines',
  name: '9 Середня оцінка за обраний період    ',
  line: {
    color: 'rgb(126, 211, 33)',
    dash: 'dot',
    width: 2
  }
};

let neutralMain = {
  x: [1, 2, 3, 4, 5],
  y: [18, 16, 19, 17, 15],
  legendgroup: 'neutral',
  mode: 'lines',
  name: '10 шт нейтралі',
  line: {
    color: 'rgb(255, 206, 0)',
    dash: 'solid',
    width: 2
  }
};

let neutralLimit = {
  x: [1, 2, 3, 4, 5],
  y: [15, 15, 15, 15, 15],
  legendgroup: 'neutral',
  mode: 'lines',
  name: 'Визначений ліміт',
  line: {
    color: 'rgb(255, 206, 0)',
    dash: 'dashdot',
    width: 2
  }
};

let neutralRating = {
  x: [1, 2, 3, 4, 5],
  y: [17, 17, 17, 17, 17],
  legendgroup: 'neutral',
  mode: 'lines',
  name: '9 Середня оцінка за обраний період',
  line: {
    color: 'rgb(255, 206, 0)',
    dash: 'dot',
    width: 2
  }
};

let negativeMain = {
  x: [1, 2, 3, 4, 5],
  y: [28, 26, 29, 27, 25],
  legendgroup: 'negative',
  mode: 'lines',
  name: '10 шт детрактори',
  line: {
    color: 'rgb(210, 65, 3)',
    dash: 'solid',
    width: 2
  }
};

let negativeLimit = {
  x: [1, 2, 3, 4, 5],
  y: [25, 25, 25, 25, 25],
  legendgroup: 'negative',
  mode: 'lines',
  name: 'Визначений ліміт',
  line: {
    color: 'rgb(210, 65, 3)',
    dash: 'dashdot',
    width: 2
  }
};

let negativeRating = {
  x: [1, 2, 3, 4, 5],
  y: [27, 27, 27, 27, 27],
  legendgroup: 'negative',
  mode: 'lines',
  name: '9 Середня оцінка за обраний період    ',
  line: {
    color: 'rgb(210, 65, 3)',
    dash: 'dot',
    width: 2
  }
};



let data = [positiveMain, positiveLimit, positiveRating, negativeMain, negativeLimit, negativeRating, neutralMain,
neutralLimit, neutralRating];

let layout = {
  title: 'Загальна тенденція обсягу відповідей респондентів по локації “Київ” за період червень 2023 - липень 2023 р',
  xaxis: {
    range: [0.75, 5.25],
    autorange: false,
    showgrid: false
  },
  yaxis: {
    range: [0, 40],
    autorange: false,
    showgrid: false,
    showline: false
  },
  legend: {
    "orientation": "h",
    font: {
      size: 12
    }
  }
};

Plotly.newPlot('gd', data, layout);
