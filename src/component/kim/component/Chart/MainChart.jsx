import React, { Component } from "react";
import * as echarts from 'echarts';
import { withStyles, Typography, Box } from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    details: {
        marginRight: theme.spacing(5),
    },
    chartContainer: {
        width: '50%',
        height: '320px'
    },
    detailText: {
        // 기존 스타일 유지
        margin: theme.spacing(1, 0),
        // 새로운 스타일 추가
        fontWeight: 'bold', // 굵은 글씨
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

        // Calculate the total and usage rate here
        const totalVacation = data.reduce((acc, item) => acc + item.value, 0);
        const usageRate = ((data[0].value / totalVacation) * 100).toFixed(2);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}개 ({d}%)'
            },
            series: [
                {
                    name: 'Vacation Data',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '50%'],
                    startAngle: 90,
                    label: {
                        normal: {
                            formatter: '{d}%\n사용률',
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                            }
                        }
                    },
                    data: data.map((item, index) => ({
                        value: item.value,
                        name: item.name,
                        // Set the color of the remaining vacation slice to white
                        itemStyle: index === 1 ? { color: 'white' } : {}
                    }))
                }
            ]
        };

        chart.setOption(option);
    };

    renderDetails = (data) => {
        return data.map((item, index) => (
            <Typography key={index} variant="subtitle1" className={this.props.classes.detailText}>
                {item.name}: {item.value}개
            </Typography>
        ));
    };

    render() {
        const { classes, data } = this.props;
        const totalVacation = data.reduce((acc, item) => acc + item.value, 0);
        const usageRate = ((data[0].value / totalVacation) * 100).toFixed(2);

        return (
            <Box className={classes.root}>
                <Box className={classes.details}>
                    <Typography variant="h7" style={{ fontWeight: 'bold' }}>
                        총 연차 개수: {totalVacation}개
                    </Typography>
                    {this.renderDetails(data)}
                </Box>
                <Box ref={this.chartRef} className={classes.chartContainer} />
            </Box>
        );
    }
}

export default withStyles(styles)(MainChart);
