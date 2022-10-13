// get from server
let legends = ["Temperature", "Humidity", "Light", "Growth"];
let labels = [];
let datas = [[],[],[],[]];

data = data.split('\n').slice(0, -1);
// if data's length is over 7, start with 7th data
// construct datas
for (let i = data.length > 7 ? data.length-7 : 0; i < data.length; i++) {
    let row = data[i].split(',');
    labels.push(row[0]);
    datas[0].push(row[1]);
    datas[1].push(row[2]);
    datas[2].push(row[3]);
    datas[3].push(row[4]);
}


const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
]

const get_dataset = (label, data, color) => {
    return {
        label: label,
        data: data,
        fill : false,
        borderColor: color,
        tension: 0.1
    }
}

const get_option = (legend, datas) => {
    var min = math.mean(datas) - Math.sqrt(math.variance(datas)) * 3;
    var max = math.mean(datas) + Math.sqrt(math.variance(datas)) * 3;
    return {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${legend} Chart`
            },
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'y',
                }
              }
        },
        scales: {
            y: {
                min: min,
                max: max,
            },
        },
        maintainAspectRatio: false,
    }
    
}

const construct_chart = (labels, datas, legend, color) => {
    var ctx = document.getElementById(`${legend}-chart`).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [get_dataset(legend, datas, color)],
        },
        options: get_option(legend, datas),
    });
    return chart;
}

let charts = []
for (var i = 0; i < legends.length; i++) {
    charts.push(construct_chart(labels, datas[i], legends[i], colors[i]));
}


// table
let tds = document.querySelectorAll("td");
for (var i = 0; i < tds.length; i++) {
    tds[i].innerText = datas[i][datas[i].length - 1];
}


