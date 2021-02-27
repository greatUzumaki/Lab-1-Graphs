var speedCanvas = document.getElementById('speedChart');

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 15;

let GraphA = [];
let GraphB = [];

async function Edit() {
  let a1 = document.getElementById('isA1').value;
  let b1 = document.getElementById('isB1').value;
  let a2 = document.getElementById('isA2').value;
  let b2 = document.getElementById('isB2').value;
  let a3 = document.getElementById('isA3').value;
  let b3 = document.getElementById('isB3').value;
  let a4 = document.getElementById('isA4').value;
  let b4 = document.getElementById('isB4').value;
  let a5 = document.getElementById('isA5').value;
  let b5 = document.getElementById('isB5').value;
  let a6 = document.getElementById('isA6').value;
  let b6 = document.getElementById('isB6').value;
  let a7 = document.getElementById('isA7').value;
  let b7 = document.getElementById('isB7').value;
  let a8 = document.getElementById('isA8').value;
  let b8 = document.getElementById('isB8').value;
  let znachA = [a1, a2, a3, a4, a5, a6, a7, a8];
  let forSortA = [a1, a2, a3, a4, a5, a6, a7, a8];
  let znachB = [b1, b2, b3, b4, b5, b6, b7, b8];
  let forSortB = [b1, b2, b3, b4, b5, b6, b7, b8];
  znachA = znachA.map(Number);
  znachB = znachB.map(Number);
  forSortA = forSortA.map(Number);
  forSortB = forSortB.map(Number);
  forSortA.sort((a1, a2) => a1 - a2);
  let minA, maxA, midA;
  minA = forSortA[0];
  maxA = forSortA[7];
  midA = (maxA + minA) / 2;
  forSortB.sort((b1, b2) => b1 - b2);
  let minB, maxB, midB;
  minB = forSortB[0];
  maxB = forSortB[7];
  midB = (maxB + minB) / 2;
  GraphA = znachA.map((x) => Pclass(x, maxA, midA));
  document.getElementById('a1').value = GraphA[0];
  document.getElementById('a2').value = GraphA[1];
  document.getElementById('a3').value = GraphA[2];
  document.getElementById('a4').value = GraphA[3];
  document.getElementById('a5').value = GraphA[4];
  document.getElementById('a6').value = GraphA[5];
  document.getElementById('a7').value = GraphA[6];
  document.getElementById('a8').value = GraphA[7];
  GraphB = znachB.map((x) => Sclass(x, minB, midB, maxB));
  document.getElementById('b1').value = GraphB[0];
  document.getElementById('b2').value = GraphB[1];
  document.getElementById('b3').value = GraphB[2];
  document.getElementById('b4').value = GraphB[3];
  document.getElementById('b5').value = GraphB[4];
  document.getElementById('b6').value = GraphB[5];
  document.getElementById('b7').value = GraphB[6];
  document.getElementById('b8').value = GraphB[7];
}

function Sclass(x, a, b, c) {
  let answer;
  if (x <= a) {
    answer = 0;
  } else if (x >= a && x <= b) {
    answer = 2 * (((x - a) / (c - a)) * ((x - a) / (c - a)));
  } else if (x >= b && x <= c) {
    answer = 1 - 2 * (((x - c) / (c - a)) * ((x - c) / (c - a)));
  } else if (x >= c) {
    answer = 1;
  }
  return answer.toFixed(3);
}

function Pclass(x, max, mid) {
  if (x <= max) {
    return Sclass(x, max - mid, max - mid / 2, max);
  }
}

function Func() {
  if (document.getElementById('f1').checked) {
    Graph();
  } else if (document.getElementById('f2').checked) {
    alert('Объединение');
  } else if (document.getElementById('f3').checked) {
    alert('Пересечение');
  } else if (document.getElementById('f4').checked) {
    alert('Разность1');
  } else if (document.getElementById('f5').checked) {
    alert('Разность2');
  } else if (document.getElementById('f6').checked) {
    alert('Дополнение1');
  } else if (document.getElementById('f7').checked) {
    alert('Дополнение2');
  } else alert('Выберите функцию!');
}

function Kill() {
  GraphA = [];
  GraphB = [];
  Graph();
}

function Check() {
  if (document.getElementById('p1').checked) {
    alert('done');
  }
  if (document.getElementById('p2').checked) {
    alert('done');
  }
  if (document.getElementById('p3').checked) {
    alert('done');
  } else alert('Выберите проверку!');
}

function Index() {
  document.getElementById('in1').value = 12;
  document.getElementById('in2').value = 12;
  document.getElementById('in3').value = 12;
  document.getElementById('in4').value = 12;
  document.getElementById('in5').value = 12;
  document.getElementById('in6').value = 12;
  document.getElementById('in7').value = 12;
  document.getElementById('in8').value = 12;
  document.getElementById('in9').value = 12;
  document.getElementById('in10').value = 12;
  alert('Успешно!');
}

function Graph() {
  var speedData = {
    labels: [
      'СМ-1030А',
      'СМС-1062',
      'СМ-19А',
      'ВСКО-9',
      'Дорстенер 203',
      '«Ротомат»',
      'Р-550',
      '«Атлас-Интертехник»',
    ],
    datasets: [
      {
        label: 'A (со средней часовой производительностью)',
        data: GraphA,
        fill: false,
        lineTension: 0,
        pointRadius: 9,
        borderColor: 'rgba(255, 99, 132, 0.3)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
      },
      {
        label: 'B (с высокой установленной мощностью)',
        data: GraphB,
        fill: false,
        lineTension: 0,
        borderColor: 'rgba(0, 183, 255, 0.3)',
        backgroundColor: 'rgba(0, 183, 255, 0.3)',
        pointRadius: 9,
      },
    ],
  };

  var chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black',
      },
    },
  };

  var lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: speedData,
    options: chartOptions,
  });
}
