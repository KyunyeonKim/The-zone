import React, {Component} from 'react';
import * as echarts from 'echarts';

class EmployeeVacationChart extends Component {
    chartRef = React.createRef(); // 차트 컨테이너 참조 생성
    chartInstance = null; // 차트 인스턴스를 저장할 변수

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate() {
        this.initChart();
    }

    componentWillUnmount() {
        if (this.chartInstance) {
            this.chartInstance.dispose(); // 차트 인스턴스 제거
        }
    }


    initChart = () => {
        if (!this.chartInstance) {
            this.chartInstance = echarts.init(this.chartRef.current);
        }
        this.chartInstance.setOption(this.getOption());
    };

    getOption = () => {
        const {
            approvedCount,
            unapprovedVacationCount,
            approvalRequestedAttendance,
        } = this.props;

        return {
            title: {
                text: '근태 사용 현황',
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
                    name: '근태 현황',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: approvedCount, name: '승인'},
                        {value: unapprovedVacationCount, name: '반려', itemStyle: {color: 'red'}},
                        {value: approvalRequestedAttendance, name: '요청중', itemStyle: {color: '#FFA500'}}
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
            <div ref={this.chartRef} style={{width: '100%', height: '400px'}}></div> // 차트 컨테이너
        );
    }
}

export default EmployeeVacationChart;
