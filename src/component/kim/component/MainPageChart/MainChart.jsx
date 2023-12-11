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
        const {data} = this.props;
        const chart = echarts.init(this.chartRef.current, null, {renderer: 'canvas', width: 'auto', height: 'auto'}); // Adjust the size as needed

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}개 ({d}%)'
            },
            series: [
                {
                    name: 'Vacation Data',
                    type: 'pie',
                    radius: ['50%', '70%'], // Increase the radius for a larger pie chart
                    center: ['50%', '50%'],
                    startAngle: 90,
                    label: {
                        normal: {
                            formatter: (params) => {
                                // Use a custom formatter function to increase the size of the percentage part
                                return `{big|${params.percent}%}\n{small|사용률}`;
                            },
                            rich: {
                                big: {
                                    fontFamily:'Noto Sans KR,sans-serif',
                                    fontSize: 40, // Larger font size for percentage
                                    fontWeight: 'bold'

                                },
                                small: {
                                    fontFamily:'Noto Sans KR,sans-serif',
                                    fontSize: 14, // Smaller font size for the word '사용률'
                                    fontWeight: 'bold'
                                }
                            },
                            position: 'center',
                            show: true
                        }
                    },
                    data: data.map((item, index) => ({
                        value: item.value,
                        name: item.name,
                        itemStyle: index === 1 ? {color: 'white'} : {}
                    }))
                }
            ]
        };

        chart.setOption(option);
    };

    renderDetails = (data) => {
        return data.map((item, index) => (
            <Box key={index} display="flex" justifyContent="space-between" className={this.props.classes.detailText}>
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
        const totalVacation = data.reduce((acc, item) => acc + item.value, 0);

        return (
            <Box className={classes.root}>
                <Box className={classes.details}>
                    <Box display="flex" justifyContent="space-between" width="120%">
                        <Typography variant="subtitle1" style={ {color:'#2568ac',fontFamily:'Noto Sans KR,sans-serif',fontSize:'20px',whiteSpace:'nowrap',fontWeight: 'bold' }}>
                            총 연차 갯수 &nbsp;
                        </Typography>
                        <Typography variant="subtitle1" style={{fontFamily:'Noto Sans KR,sans-serif',fontSize:'20px',whiteSpace:'nowrap' }}>
                            {totalVacation}
                        </Typography>
                    </Box>
                    {this.renderDetails(data)}
                </Box>
                <Box ref={this.chartRef} className={classes.chartContainer}/>
            </Box>
        );
    }
}

export default withStyles(styles)(MainChart);
