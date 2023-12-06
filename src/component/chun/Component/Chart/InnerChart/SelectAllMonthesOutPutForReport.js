import React, { Component } from 'react';
import * as echarts from 'echarts';
import {chartDataStore} from "../../../../../index";

class SelectAllMonthesOutPutForReport extends Component {
    constructor(props) {
        super(props);
        this.approvalRequestedAttendance=[];
        this.approvedCount=[];
        this.approvedVacationCount=[];
        this.rejectedVacationCount=[];
        this.requestedVacationCount=[];
        this.unapprovedVacationCount=[]

    }
    approvalRequestedAttendance;
    approvedCount;
    approvedVacationCount;
    rejectedVacationCount;
    requestedVacationCount;
    unapprovedVacationCount

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
        const { data } = this.props;
        // const data = chartDataStore.store
        console.log("넘어온 data : ",data);
        // console.log(Object.keys(data));
        this.approvalRequestedAttendance = [];
        this.approvedCount = [];
        this.approvedVacationCount = [];
        this.rejectedVacationCount = [];
        this.requestedVacationCount = [];
        this.unapprovedVacationCount = [];

        //approvedVacationCount : 연차 승인
        // rejectedVacationCount: 연차 반려
        // requestedVacationCount : 연차 요청중
        // approvedCount : 근태 정상
        // unapprovedVacationCount : 근태 이상
        // approvalRequestedAttendance : 근태 이상 요청중;

        if(Object.values(data).every((array)=>array.length===0)!==true){
            Object.keys(data).forEach((element) => {
                const array = data[element];
                console.log("Array : ",array);
                if (array.length === 0) {
                    this.approvalRequestedAttendance.push(0);
                    this.unapprovedVacationCount.push(0);
                    this.approvedCount.push(0);
                    this.approvedVacationCount.push(0);
                    this.rejectedVacationCount.push(0);
                    this.requestedVacationCount.push(0);
                } else {
                    this.approvalRequestedAttendance.push(array['approvalRequestedAttendance']);
                    this.unapprovedVacationCount.push(array['unapprovedVacationCount']);
                    this.approvedCount.push(array['approvedCount']);
                    this.approvedVacationCount.push(array['approvedVacationCount']);
                    this.rejectedVacationCount.push(array['rejectedVacationCount']);
                    this.requestedVacationCount.push(array['requestedVacationCount']);
                }

            });

        }
        console.log("this.approvalRequestedAttendance : ",this.approvalRequestedAttendance);
        console.log("this.unapprovedVacationCount : ",this.unapprovedVacationCount);
        console.log("this.approvedCount : ",this.approvedCount);
        console.log("this.approvedVacationCount : ",this.approvedVacationCount);
        console.log("this.rejectedVacationCount : ",this.rejectedVacationCount);
        console.log("this.requestedVacationCount : ",this.requestedVacationCount);

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
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec']
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
                    data:this.rejectedVacationCount
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
                    data:this.approvedCount
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
                    data: this.unapprovedVacationCount
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
                    data: this.approvalRequestedAttendance
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

export default SelectAllMonthesOutPutForReport;
