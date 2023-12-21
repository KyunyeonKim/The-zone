import React, {Component} from 'react';
import * as echarts from 'echarts';
import {chartDataStore} from "../../../../../index";

class SelectAllMonthesOutPutForReport extends Component {
    chartRef

    constructor(props) {
        super(props);
        this.approvalRequestedAttendance = [];
        this.approvedCount = [];
        this.attendanceAbnormal = [];
        this.approvedVacationCount = [];
        this.rejectedVacationCount = [];
        this.requestedVacationCount = [];

        chartDataStore.updateChart = this.initChart.bind(this)
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.initChart();
    }


    initChart = (kindOf) => {
        const chartInstance = echarts.init(this.chartRef.current);
        chartInstance.setOption(this.getOption(kindOf));
        this.setState({})
    };

    getOption = (kindOf) => {
        let data = chartDataStore.store

        const colors = {
            '연차 승인': '#ADD8E6', // 파란색
            '연차 반려': '#FFB6C1', // 분홍색
            '연차 요청중': '#FFFACD', // 연노랑색
            '근태 정상': '#78E8F7', // 연파란색
            '근태 이상': '#FFA6EC', // 연분홍색
            '근태 이상 요청중': '#AAFFBC' // 연녹색
        };

        // const data = chartDataStore.store
        console.log("넘어온 data : ", data);
        // console.log(Object.keys(data));

        //approvedVacationCount : 연차 승인
        // rejectedVacationCount: 연차 반려
        // requestedVacationCount : 연차 요청중
        // approvedCount : 근태 정상
        // unapprovedVacationCount : 근태 이상
        // approvalRequestedAttendance : 근태 이상 요청중;
        if (kindOf === 'attendance') {
            this.approvalRequestedAttendance = [];
            this.approvedCount = [];
            this.attendanceAbnormal = [];
        } else if (kindOf === 'vacation') {
            this.approvedVacationCount = [];
            this.rejectedVacationCount = [];
            this.requestedVacationCount = [];
        }

        for(let element of Object.keys(data))
        {
            const atom = data[element];
            console.log(`atom : ${JSON.stringify(atom)} ${JSON.stringify(typeof atom)}`);
            if ( Array.isArray(atom) && atom.length === 0) {
                if (kindOf === 'attendance') {
                    this.approvalRequestedAttendance.push(0);
                    this.attendanceAbnormal.push(0);
                    this.approvedCount.push(0);
                } else if (kindOf === 'vacation') {
                    this.approvedVacationCount.push(0);
                    this.rejectedVacationCount.push(0);
                    this.requestedVacationCount.push(0);
                }
            } else {
                if (kindOf === 'attendance') {
                    if (atom.approvalRequestedAttendance !== undefined)
                        this.approvalRequestedAttendance.push(atom.approvalRequestedAttendance);
                    if (atom.attendanceAbnormal !== undefined)
                        this.attendanceAbnormal.push(atom.attendanceAbnormal);
                    if (atom.attendanceNormal !== undefined)
                        this.approvedCount.push(atom.attendanceNormal);
                } else if (kindOf === 'vacation') {
                    if (atom.vacationNormal !== undefined)
                        this.approvedVacationCount.push(atom.vacationNormal);
                    if (atom.vacationRejected !== undefined)
                        this.rejectedVacationCount.push(atom.vacationRejected);
                    if (atom.vacationRequested !== undefined)
                        this.requestedVacationCount.push(atom.vacationRequested);
                }
            }
        };




        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [
                {
                    name: '연차 승인',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: { color: '#4F5DF8' }, // 파란색
                    data: this.approvedVacationCount
                },
                {
                    name: '연차 반려',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: { color: '#F74F4F' }, // 분홍색
                    data: this.rejectedVacationCount
                },
                {
                    name: '연차 요청중',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: { color: '#B3A62C' }, // 연녹색
                    data: this.requestedVacationCount
                },
                {
                    name: '근태 정상',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: { color: '#1B46C6' }, // 연녹색
                    data: this.approvedCount
                },
                {
                    name: '근태 이상',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: { color: '#D643B7' },
                    data: this.attendanceAbnormal
                },
                {
                    name: '근태 이상 요청중',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: { color: '#33CC4C' }, // 연녹색
                    data: this.approvalRequestedAttendance
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

export default SelectAllMonthesOutPutForReport;
