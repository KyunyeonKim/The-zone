import React, { Component } from 'react';
import * as echarts from 'echarts';

class EmployeeVacationChart extends Component {
    chartRef = React.createRef(); // 차트 컨테이너 참조 생성

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate() {
        this.initChart();
    }

    initChart = () => {
        const chartInstance = echarts.init(this.chartRef.current);
        chartInstance.setOption(this.getOption());
    };

    getOption = () => {
        const { approvedVacationCount, rejectedVacationCount, requestedVacationCount } = this.props;

        return {
            title: {
                text: '연차 사용 현황',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['승인', '반려', '요청중']
            },
            series: [
                {
                    name: '연차 현황',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: approvedVacationCount, name: '승인' },
                        { value: rejectedVacationCount, name: '반려' , itemStyle: { color: 'red' }},
                        { value: requestedVacationCount, name: '요청중' ,itemStyle: { color: '#FFA500' }}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }

    render() {
        return (
            <div ref={this.chartRef} style={{ width: '100%', height: '400px' }}></div> // 차트 컨테이너
        );
    }
}

export default EmployeeVacationChart;
