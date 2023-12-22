import React, {Component} from 'react';
import * as echarts from 'echarts';

class EmployeeVacationChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef(); // 차트 컨테이너 참조 생성
        this.chartInstance = null; // 차트 인스턴스를 저장할 변수

        // 메서드 바인딩
        this.initChart = this.initChart.bind(this);
        this.getOption = this.getOption.bind(this);
        this.getNoDataOption = this.getNoDataOption.bind(this);
    }

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


    initChart() {
        const {approvedCount, unapprovedVacationCount, approvalRequestedAttendance} = this.props;

        // 차트 인스턴스가 없으면 생성합니다.
        if (!this.chartInstance) {
            this.chartInstance = echarts.init(this.chartRef.current);
        }

        // 데이터가 하나라도 0 이상이면 차트를 업데이트합니다.
        if (approvedCount > 0 || unapprovedVacationCount > 0 || approvalRequestedAttendance > 0) {
            // 데이터가 있을 때 차트 옵션 설정
            this.chartInstance.setOption(this.getOption(), true);
        } else {
            // 데이터가 없거나 모든 데이터가 0이하일 때 "데이터없음" 옵션 설정
            this.chartInstance.clear();
            this.chartInstance.setOption(this.getNoDataOption(), true);
        }
    }


    getOption() {
        const {approvedCount, unapprovedVacationCount, approvalRequestedAttendance} = this.props;

        return {
            title: {
                text: '근태  현황',
                left: 'center'
            },
            tooltip: {
                // tooltip을 비활성화하려면 이 속성을 false로 설정하세요.
                show: false
            },
            legend: {
                // 범례 설정이 이미 차트 아래에 있도록 설정되어 있습니다.
                orient: 'horizontal',
                left: 'center',
                top: 'bottom',
                data: [
                    {name: '정상', icon: 'circle', textStyle: {color: 'black'}},
                    {name: '불량', icon: 'circle', textStyle: {color: 'black'}},
                    {name: '조정 요청', icon: 'circle', textStyle: {color: 'black'}}
                ]
            },
            series: [
                {
                    name: '근태 현황',
                    type: 'pie',
                    radius: ['45%', '70%'],
                    avoidLabelOverlap: false, // 레이블 겹침을 방지합니다.
                    data: [
                        {value: approvedCount, name: '정상', itemStyle: {color: '#1B46C6'}},
                        {value: unapprovedVacationCount, name: '불량', itemStyle: {color: '#D643B7'}},
                        {value: approvalRequestedAttendance, name: '조정 요청', itemStyle: {color: '#33CC4C'}}
                    ],
                    label: {
                        // 이 시리즈의 데이터 포인트 옆에 레이블을 표시하지 않도록 설정
                        show: false
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                    }
                }
            ]
        };
    }

    getNoDataOption() {
        // "데이터없음" 텍스트 표시 옵션
        return {
            graphic: {
                elements: [{
                    type: 'text',
                    style: {
                        text: '데이터가 없습니다',
                        fontSize: 20,
                        fontWeight: 'bold',
                        fill: '#d3d3d3' // 회색 텍스트 색상
                    },
                    left: 'center',
                    top: 'middle'
                }]
            }
        };
    }


    render() {
        return (
            <div ref={this.chartRef} style={{width: '80%', height: '350px'}}></div> // 차트 컨테이너
        );
    }
}

export default EmployeeVacationChart;
