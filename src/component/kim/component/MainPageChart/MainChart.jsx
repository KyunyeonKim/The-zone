import React, {Component} from "react";
import * as echarts from 'echarts';
import {Box, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    details: {
        marginRight: theme.spacing(5),

        alignItems: 'center'
    },
    chartContainer: {
        width: '80%',
        height: '250px'
    },
    detailText: {
        // 기존 스타일 유지
        margin: theme.spacing(4, 0),
        // 새로운 스타일 추가
        fontWeight: 'bold', // 굵은 글씨
        display: 'flex',
        justifyContent: 'space-between',
        width: '120%', // Box가 부모 컨테이너의 전체 너비를 차지하도록 설정,
    },

    totalVacationText: {
        fontWeight: 'bold',
        // 여기에 추가적인 스타일을 정의할 수 있습니다.
    },
});

class MainChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate() {
        this.initChart();
    }

    initChart = () => {
        const { data } = this.props;
        const chart = echarts.init(this.chartRef.current);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}개 ({d}%)'
            },
            series: [
                {
                    name: 'Vacation Data',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                        { value: data[0].value, name: data[0].name, itemStyle: { color: '#007bff' } }, // 연차 사용 갯수
                        { value: data[1].value, name: data[1].name, itemStyle: { color: 'skyblue' } } // 연차 잔여 갯수
                    ],
                    label: {
                        normal: {
                            show: false // 각 데이터 포인트 주변의 라벨 숨김
                        }
                    },
                    labelLine: {
                        show: false // 라벨 라인 숨김
                    }
                }
            ],
            title: {
                show: true,
                text: `${data[0].value / (data[0].value + data[1].value) * 100}%`, // 중앙에 표시할 텍스트
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }
        };

        chart.setOption(option);
    };

    renderDetails = (data) => {
        return data.map((item, index) => (
            <Box key={index} display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" style={ {color:'#2568ac',fontFamily:'Noto Sans KR,sans-serif',fontSize:'20px',whiteSpace:'nowrap' ,fontWeight: 'bold'}}>
                    {item.name}&nbsp;
                </Typography>
                <Typography variant="subtitle1" style={{fontFamily:'Noto Sans KR,sans-serif',fontSize:'20px',whiteSpace:'nowrap' }}>
                    {item.value}
                </Typography>
            </Box>
        ));
    };

    render() {
        const {classes, data} = this.props;

        return (
            <Box className={classes.root}>
                <Box className={classes.details}>
                    <Box display="flex" justifyContent="space-between" width="120%">

                    </Box>
                    {this.renderDetails(data)}
                </Box>
                <Box ref={this.chartRef} className={classes.chartContainer}/>
            </Box>
        );
    }
}

export default withStyles(styles)(MainChart);
