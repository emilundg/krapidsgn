// LineChart.js
import {
    Line,
    mixins
} from 'vue-chartjs'
const {
    reactiveProp
} = mixins

export default {
    extends: Line,
    props: ['options'],
    mixins: [reactiveProp],
    data() {
        return {
            chartOptions: {
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {

                            var dataIndex = tooltipItem.datasetIndex;
                            var currentDataSet = data.datasets[dataIndex];
                            var label = currentDataSet.label || '';


                            if (label) {
                                label += ': ';
                            }
                            label += tooltipItem.yLabel;

                            var currentObject = currentDataSet.data[tooltipItem.index]

                            var dataDiv = document.getElementById("data");
                            dataDiv.style.display = "flex";

                            document.getElementById("intensityData").innerHTML = currentObject.y;
                            document.getElementById("dateData").innerHTML = currentObject.t;
                            document.getElementById("situationData").innerHTML = currentObject.situation;
                            document.getElementById("resultData").innerHTML = currentObject.result;
                            document.getElementById("consequenceData").innerHTML = currentObject.consequence;

                            return label;
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 6,
                            max: 10
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {}
                        }
                    }]
                }
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    }
}