var speedCanvas = document.getElementById('speedChart');

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.elements.point.borderWidth = 3;

let defGraphA = [];
let defGraphB = [];
let GraphA = [];
let GraphB = [];
let GraphC = [];

let setFillA = false;
let setFillB = false;

// Расчет данных
function Edit() {
  let isA1 = document.getElementById('isA1').value;
  let isB1 = document.getElementById('isB1').value;
  let isA2 = document.getElementById('isA2').value;
  let isB2 = document.getElementById('isB2').value;
  let isA3 = document.getElementById('isA3').value;
  let isB3 = document.getElementById('isB3').value;
  let isA4 = document.getElementById('isA4').value;
  let isB4 = document.getElementById('isB4').value;
  let isA5 = document.getElementById('isA5').value;
  let isB5 = document.getElementById('isB5').value;
  let isA6 = document.getElementById('isA6').value;
  let isB6 = document.getElementById('isB6').value;
  let isA7 = document.getElementById('isA7').value;
  let isB7 = document.getElementById('isB7').value;
  let isA8 = document.getElementById('isA8').value;
  let isB8 = document.getElementById('isB8').value;
  let znachA = [isA1, isA2, isA3, isA4, isA5, isA6, isA7, isA8];
  let forSortA = znachA.slice();
  let znachB = [isB1, isB2, isB3, isB4, isB5, isB6, isB7, isB8];
  let forSortB = znachB.slice();
  znachA = znachA.map(Number);
  znachB = znachB.map(Number);
  forSortA = forSortA.map(Number);
  forSortB = forSortB.map(Number);
  forSortA.sort((isA1, isA2) => isA1 - isA2);
  let minA, maxA, midA;
  minA = forSortA[0];
  maxA = forSortA[7];
  midA = (maxA + minA) / 2;
  forSortB.sort((isB1, isB2) => isB1 - isB2);
  let minB, maxB, midB;
  minB = forSortB[0];
  maxB = forSortB[7];
  midB = (maxB + minB) / 2;
  GraphA = znachA.map((x) => Pclass(x, minA, midA, maxA));
  let forSort = GraphA.slice();
  forSort.sort((a, b) => a - b);
  maxA = forSort[7];
  GraphA = GraphA.map((x) => {
    let result = x / maxA;
    return result.toFixed(3);
  });
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
  defGraphA = GraphA;
  defGraphB = GraphB;
  Graph(false, false);
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

function Pclass(x, min, mid, max) {
  if (x <= mid) {
    return Sclass(x, min, (min + mid) / 2, mid);
  } else {
    return 1 - Sclass(x, mid, (mid + max) / 2, max);
  }
}

// Функции
function Func() {
  // График
  if (document.getElementById('f1').checked) {
    GraphA = defGraphA;
    GraphB = defGraphB;
    Graph(false, false, false);
  }
  // Объединение
  else if (document.getElementById('f2').checked) {
    GraphA = GraphA.map(Number);
    GraphB = GraphB.map(Number);
    for (let i = 0; i < GraphB.length; i++) {
      if (GraphA[i] <= GraphB[i]) GraphC.push(GraphB[i]);
      else GraphC.push(GraphA[i]);
    }
    Graph(false, false, true);
  }
  // Пересечение
  else if (document.getElementById('f3').checked) {
    GraphA = GraphA.map(Number);
    GraphB = GraphB.map(Number);
    for (let i = 0; i < GraphB.length; i++) {
      if (GraphA[i] >= GraphB[i]) GraphC.push(GraphB[i]);
      else GraphC.push(GraphA[i]);
    }
    Graph(false, false, true);
  }
  // Разность A и B
  else if (document.getElementById('f4').checked) {
    GraphB = GraphB.map(Number);
    GraphB = GraphB.map((x) => {
      let answer;
      answer = Math.abs(x - 1);
      return answer.toFixed(3);
    });
    GraphA = GraphA.map(Number);
    for (let i = 0; i < GraphA.length; i++) {
      if (GraphB[i] >= GraphA[i]) GraphC.push(GraphA[i]);
      else GraphC.push(GraphB[i]);
    }
    Graph(false, false, true);
  }
  // Разность B и A
  else if (document.getElementById('f5').checked) {
    GraphA = GraphA.map(Number);
    GraphA = GraphA.map((x) => {
      let answer;
      answer = Math.abs(x - 1);
      return answer.toFixed(3);
    });
    GraphB = GraphB.map(Number);
    for (let i = 0; i < GraphB.length; i++) {
      if (GraphA[i] >= GraphB[i]) GraphC.push(GraphB[i]);
      else GraphC.push(GraphA[i]);
    }
    Graph(false, false, true);
  }
  // Дополнение A
  else if (document.getElementById('f6').checked) {
    GraphA = GraphA.map(Number);
    GraphA = GraphA.map((x) => {
      let answer;
      answer = Math.abs(x - 1);
      return answer.toFixed(3);
    });
    Graph(false, false, false);
  }
  // Дополнение B
  else if (document.getElementById('f7').checked) {
    GraphB = GraphB.map(Number);
    GraphB = GraphB.map((x) => {
      let answer;
      answer = Math.abs(x - 1);
      return answer.toFixed(3);
    });
    Graph(false, false, false);
  } else alert('Выберите функцию!');
}

// Сброс графика
function Kill() {
  GraphA = [];
  GraphB = [];
  GraphC = [];
  document.getElementById('b1').value = '';
  document.getElementById('b2').value = '';
  document.getElementById('b3').value = '';
  document.getElementById('b4').value = '';
  document.getElementById('b5').value = '';
  document.getElementById('b6').value = '';
  document.getElementById('b7').value = '';
  document.getElementById('b8').value = '';
  document.getElementById('a1').value = '';
  document.getElementById('a2').value = '';
  document.getElementById('a3').value = '';
  document.getElementById('a4').value = '';
  document.getElementById('a5').value = '';
  document.getElementById('a6').value = '';
  document.getElementById('a7').value = '';
  document.getElementById('a8').value = '';
  document.getElementById('in1').value = '';
  document.getElementById('in2').value = '';
  document.getElementById('in3').value = '';
  document.getElementById('in4').value = '';
  document.getElementById('in5').value = '';
  document.getElementById('in6').value = '';
  document.getElementById('in7').value = '';
  document.getElementById('in8').value = '';
  document.getElementById('in9').value = '';
  document.getElementById('in10').value = '';
  Graph(false, false, false);
}

// Проверка множеств
function Check() {
  // A в B
  outer: if (document.getElementById('p1').checked) {
    for (let i = 0; i < GraphB.length; i++) {
      if (GraphA[i] < GraphB[i]) continue;
      else alert('A не содержится в B');
      break outer;
    }
    alert('A содержится в B');
  }
  // B в A
  outer: if (document.getElementById('p2').checked) {
    for (let i = 0; i < GraphB.length; i++) {
      if (GraphA[i] > GraphB[i]) continue;
      else alert('B не содержится в A');
      break outer;
    }
    alert('B содержится в A');
  }
  // Равенство
  if (document.getElementById('p3').checked) {
    let arrA = GraphA;
    let arrB = GraphB;
    if (JSON.stringify(arrA) == JSON.stringify(arrB)) alert('A и B равны');
    else alert('A и B не равны!');
  }
}

// Индексы
function Index() {
  if (GraphA.length == 0) alert('Нет значений');
  else {
    GraphA = GraphA.map(Number);
    GraphB = GraphB.map(Number);

    let GraphAn = GraphA.map((x) => {
      let answer;
      answer = Math.abs(x - 1);
      return answer.toFixed(3);
    });
    GraphAn = GraphAn.map(Number);

    let GraphBn = GraphB.map((x) => {
      let answer;
      answer = Math.abs(x - 1);
      return answer.toFixed(3);
    });
    GraphBn = GraphBn.map(Number);

    function Min(arr1, arr2) {
      let minArr = [];
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] >= arr2[i]) {
          minArr.push(arr2[i]);
        } else minArr.push(arr1[i]);
      }
      return minArr;
    }

    function Max(arr1, arr2) {
      let maxArr = [];
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] >= arr2[i]) {
          maxArr.push(arr1[i]);
        } else maxArr.push(arr2[i]);
      }
      return maxArr;
    }

    function arraySum(array) {
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        sum += array[i];
      }
      return sum;
    }

    function arraySumPow(array) {
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        sum += Math.pow(array[i], 2);
      }
      return sum;
    }

    function SumRazn(arr1, arr2) {
      let sum = 0;
      for (let i = 0; i < arr1.length; i++) {
        sum += Math.pow(arr1[i] - arr2[i], 2);
      }
      return Math.sqrt(sum);
    }

    function Hamming(arr1, arr2) {
      let sum = 0;
      for (let i = 0; i < arr1.length; i++) {
        sum += Math.abs(arr1[i] - arr2[i]);
      }
      return sum;
    }

    // Линейный индекс A
    let minA = Min(GraphA, GraphAn);
    let sumA = arraySum(minA);
    let linA = (2 / 8) * sumA;
    document.getElementById('in1').value = linA.toFixed(3);
    // Линейный индекс B
    let minB = Min(GraphB, GraphBn);
    let sumB = arraySum(minB);
    let linB = (2 / 8) * sumB;
    document.getElementById('in2').value = linB.toFixed(3);
    // Квадратичный индекс A
    let sumPowA = arraySumPow(minA);
    let kvadrA = (2 / Math.sqrt(8)) * Math.sqrt(sumPowA);
    document.getElementById('in3').value = kvadrA.toFixed(3);
    // Квадратичный индекс B
    let sumPowB = arraySumPow(minB);
    let kvadrB = (2 / Math.sqrt(8)) * Math.sqrt(sumPowB);
    document.getElementById('in4').value = kvadrB.toFixed(3);
    // Егер A p=1
    let hamA = Hamming(GraphA, GraphAn);
    let egerA1 = 1 - hamA / 8;
    document.getElementById('in5').value = egerA1.toFixed(3);
    // Егер B p=1
    let hamB = Hamming(GraphB, GraphBn);
    let egerB1 = 1 - hamB / 8;
    document.getElementById('in6').value = egerB1.toFixed(3);
    // Егер A p=2
    let evklidA = SumRazn(GraphA, GraphAn);
    let egerA2 = 1 - evklidA / Math.sqrt(8);
    document.getElementById('in7').value = egerA2.toFixed(3);
    // Егер B p=2
    let evklidB = SumRazn(GraphB, GraphBn);
    let egerB2 = 1 - evklidB / Math.sqrt(8);
    document.getElementById('in8').value = egerB2.toFixed(3);
    // Коско A
    let maxA = Max(GraphA, GraphAn);
    let maxSumKoskoA = arraySum(maxA);
    let minSumKoskoA = arraySum(minA);
    let koskoA = minSumKoskoA / maxSumKoskoA;
    document.getElementById('in9').value = koskoA.toFixed(3);
    // Коско B
    let maxB = Max(GraphB, GraphBn);
    let maxSumKoskoB = arraySum(maxB);
    let minSumKoskoB = arraySum(minB);
    let koskoB = minSumKoskoB / maxSumKoskoB;
    document.getElementById('in10').value = koskoB.toFixed(3);
  }
}

// Альфа срез
function Srez() {
  let a1 = document.getElementById('a1').value;
  if (a1 == '') alert('Нет значений!');
  else {
    let a2 = document.getElementById('a2').value;
    let a3 = document.getElementById('a3').value;
    let a4 = document.getElementById('a4').value;
    let a5 = document.getElementById('a5').value;
    let a6 = document.getElementById('a6').value;
    let a7 = document.getElementById('a7').value;
    let a8 = document.getElementById('a8').value;
    let b1 = document.getElementById('b1').value;
    let b2 = document.getElementById('b2').value;
    let b3 = document.getElementById('b3').value;
    let b4 = document.getElementById('b4').value;
    let b5 = document.getElementById('b5').value;
    let b6 = document.getElementById('b6').value;
    let b7 = document.getElementById('b7').value;
    let b8 = document.getElementById('b8').value;
    let srez = document.getElementById('srez').value;
    let A = [a1, a2, a3, a4, a5, a6, a7, a8];
    let B = [b1, b2, b3, b4, b5, b6, b7, b8];
    A = A.map(Number);
    B = B.map(Number);
    let names = [
      'СМ-1030А',
      'СМС-1062',
      'СМ-19А',
      'ВСКО-9',
      'Дорстенер 203',
      '«Ротомат»',
      'Р-550',
      '«Атлас-Интертехник»',
    ];
    let srezA = A.map((x, index) => {
      if (x >= srez) {
        return names[index];
      }
    });
    srezA = srezA.filter((x) => x != undefined);
    let srezB = B.map((x, index) => {
      if (x >= srez) {
        return names[index];
      }
    });
    srezB = srezB.filter((x) => x != undefined);
    alert(
      `Разложение множества A: \n ${srezA.join(
        ' | '
      )} \n Разложение множества B: \n ${srezB.join(' | ')} `
    );
  }
}

// Настройка графика
function Graph(setFillA, setFillB, setShow) {
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
        fill: setFillA,
        lineTension: 0,
        pointRadius: 5,
        borderColor: 'rgba(255, 99, 132, 0.3)',
        backgroundColor: 'rgba(128,128,128, 0.15)',
        pointBackgroundColor: 'rgba(255, 255, 255, 0)',
      },
      {
        label: 'B (с высокой установленной мощностью)',
        data: GraphB,
        fill: setFillB,
        lineTension: 0,
        borderColor: 'rgba(0, 183, 255, 0.3)',
        backgroundColor: 'rgba(128,128,128, 0.15)',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 255, 255, 0)',
      },
      {
        label: 'Пересечение',
        data: GraphC,
        fill: true,
        lineTension: 0,
        borderColor: 'rgba(128,128,128, 0.15)',
        backgroundColor: 'rgba(128,128,128, 0.15)',
        showLine: setShow,
      },
    ],
  };

  var chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
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
