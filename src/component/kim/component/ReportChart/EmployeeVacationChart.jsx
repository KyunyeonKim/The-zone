import React, {Component} from 'react';
import * as echarts from 'echarts';

class EmployeeVacationChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.chartInstance = null;

        // Binding functions in the constructor
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
            this.chartInstance.dispose();
        }
    }

    initChart() {
        const { approvedVacationCount, rejectedVacationCount, requestedVacationCount } = this.props;

        if(!this.chartInstance){
            this.chartInstance = echarts.init(this.chartRef.current);
        }

        if(approvedVacationCount > 0 || requestedVacationCount > 0 || rejectedVacationCount>0){
            this.chartInstance.setOption(this.getOption(),true);
        }
        else{
            this.chartInstance.clear();
            this.chartInstance.setOption(this.getNoDataOption(),true);
        }
    }




    getOption () {
        const { approvedVacationCount, rejectedVacationCount, requestedVacationCount } = this.props;

        return {
            title: {
                text: '연차 현황',
                left: 'center'
            },
            tooltip: {
                // tooltip을 비활성화하려면 이 속성을 false로 설정하세요.
                show: false
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: 'bottom',
                data: [
                    { name: '승인', icon: 'circle', textStyle: { color:  'black' } },
                    { name: '반려', icon: 'circle', textStyle: { color: 'black' } },
                    { name: '요청중', icon: 'circle', textStyle: { color: 'black' } }
                ]
            },
            series: [
                {
                    name: '연차 현황',
                    type: 'pie',
                    radius: ['45%', '70%'],
                    avoidLabelOverlap: false, // 레이블 겹침을 방지합니다.
                    data: [
                        { value: approvedVacationCount, name: '승인', itemStyle: { color: '#ADD8E6'  } },
                        { value: rejectedVacationCount, name: '반려', itemStyle: { color: '#FFB6C1' } },
                        { value: requestedVacationCount, name: '요청중', itemStyle: { color: '#FFFACD' } }
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
                        }
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
            <div ref={this.chartRef} style={{ width: '85%', height: '350px' }}></div> // 차트 컨테이너
        );
    }
}

export default EmployeeVacationChart;
