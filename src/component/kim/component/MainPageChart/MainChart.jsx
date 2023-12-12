import React, {Component} from "react";
import * as echarts from 'echarts';
import {Box, Paper, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    details: {
        marginRight: theme.spacing(5),
        alignItems: 'center'
    },
    chartContainer: {
        width: '200px',
        height: '200px'
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
        const usedVacation = data[0].value;
        const totalVacation = usedVacation + data[1].value;
        const usedPercentage = totalVacation > 0 ? ((usedVacation / totalVacation) * 100).toFixed(0) : 0; // 정수로 반올림


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
                text:  `${usedPercentage}%`,
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
                        <Typography variant="subtitle1" style={ {fontFamily:'IBM Plex Sans KR',fontSize:'17px',whiteSpace:'nowrap' ,fontWeight: 'bold',marginBottom:"10px"}}>
                            {item.name}&nbsp;
                        </Typography>
                        <Typography variant="subtitle1" style={{fontFamily:'IBM Plex Sans KR',fontSize:'18px',whiteSpace:'nowrap',marginBottom:"10px" }}>
                            {item.value} 개
                        </Typography>
                </Box>

        ));
    };

    render() {
        const {classes, data} = this.props;

        return (
            <Box className={classes.root}>
                <Box className={classes.details}>
                    {this.renderDetails(data)}
                </Box>
                <Box ref={this.chartRef} className={classes.chartContainer}/>
            </Box>
        );
    }
}

export default withStyles(styles)(MainChart);
