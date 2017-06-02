import React from 'react';
import { PropTypes } from 'react';
import Chart from 'chart.js';

class PieChart extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.drawChart();
    }
    
    componentDidUpdate(prevProps, prevState) {
        this.drawChart();
    }
    
    drawChart() {
        const ctx = document.getElementById("chart");
        const pieChart = new Chart(ctx, {
           type: "pie",
           data: {
               labels: this.props.chartLabels,
               datasets: [{
                    data: this.props.chartData,
                    backgroundColor: [
                        "#50C7FB",
                        "#FB50C7",
                        "#C7FB50"
                    ],
                    hoverBackgroundColor: [
                        "#50C7FB",
                        "#FB50C7",
                        "#C7FB50"    
                    ]
               }]
           }
        });
    }
    
    render() {
        return (
          <canvas id="chart" width="500" height="500"></canvas>  
        );
    }
}

PieChart.propTypes = {
    chartLabels: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.arrayOf(PropTypes.number) 
}

export default PieChart;
