import React, { Component } from 'react';
import * as echarts from 'echarts';

class EmployeeBarChart extends Component {
    chartRef = React.createRef();
    chartInstance = null;

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate(prevProps) {
        // monthlyData가 변경되었을 경우 차트 업데이트
        if (JSON.stringify(prevProps.monthlyData) !== JSON.stringify(this.props.monthlyData)) {
            this.updateChart();
        }
    }

    initChart = () => {
        if (this.chartRef.current) {
            this.chartInstance = echarts.init(this.chartRef.current);
            this.chartInstance.setOption(this.getOption());
        }
    };

    updateChart = () => {
        if (this.chartInstance) {
            this.chartInstance.setOption(this.getOption(), true);
        }
    };



    getOption = () => {
        const { monthlyData } = this.props;

        // 각 월별로 표시될 y축 레이블
        const yAxisData = monthlyData.map((_, index) => `${index + 1}월`);

        // 시리즈 데이터 생성
        const series = [
            {
                name: '승인된 연차',
                type: 'bar',
                data: monthlyData.map(data => data.approvedVacationCount)
            },
            {
                name: '거절된 연차',
                type: 'bar',
                data: monthlyData.map(data => data.rejectedVacationCount)
            },
            {
                name: '요청중인 연차',
                type: 'bar',
                data: monthlyData.map(data => data.requestedVacationCount)
            },
            {
                name: '승인된 근태',
                type: 'bar',
                data: monthlyData.map(data => data.approvedCount)
            },
            {
                name: '거절된 근태',
                type: 'bar',
                data: monthlyData.map(data => data.unapprovedVacationCount)
            },
            {
                name: '요청중인 근태',
                type: 'bar',
                data: monthlyData.map(data => data.approvalRequestedAttendance)
            }
        ];

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: { data: series.map(s => s.name) },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'value' },
            yAxis: { type: 'category', data: yAxisData },
            series: series
        };
    };

    render() {
        return (
            <div ref={this.chartRef} style={{ height: '400px' }}></div>
        );
    }
}

export default EmployeeBarChart;
