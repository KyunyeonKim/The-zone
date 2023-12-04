import React, { Component } from "react";
import axios from "axios";
import MainChart from "./MainChart";
import { CircularProgress, withStyles , Box } from "@material-ui/core";

const styles = theme => ({
    infoBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        textAlign: 'center'
    }, chartInfoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // 다음 줄로 넘기기
        width: '100%',
        marginTop: theme.spacing(2),
    },
    chartInfoBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(2), // 요소 간 간격 조정
        // 필요한 경우 width 설정 추가
    },
    colorSquare: {
        width: 10,
        height: 10,
        marginRight: theme.spacing(1), // 오른쪽 마진
    },
    totalVacation:{
        height: 40,
        marginRight: theme.spacing(1), // 오른쪽 마진
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },



    chartContainer: {
        flexGrow: 5,

    },
    chartDescriptionContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column', // 이 부분을 column으로 유지
        alignItems: 'center', // 가운데 정렬
    },
    totalVacationWrapper: {
        display: 'flex',
        flexDirection: 'row', // 가로 방향으로 정렬
        justifyContent: 'space-around', // 요소들이 균등하게 분포하도록 설정
        width: '100%', // 너비를 100%로 설정
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'flex-start', // Align items to the start of the row
        flexWrap: 'wrap', // Wrap items to next line if space runs out
        width: '100%', // Full width to accommodate child elements
    },
    totalVacationText: {
        // 새로운 스타일 추가
        margin: theme.spacing(1),
        fontWeight: 'bold',
    },


});


class VacationMineEChart extends Component {
    state = {
        chartData: null,
        loading: true
    };

    componentDidMount() {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        axios.post("http://localhost:8080/login", loginForm);

        axios.get('http://localhost:8080/chart/vacationmine')
            .then(response => {
                const data = this.transformData(response.data);
                this.setState({ chartData: data, loading: false });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                this.setState({ loading: false });
            });
    }

    transformData = (data) => {
        const remainingVacation = data.totalVacation - data.useVacation;
        return [
            { value: data.useVacation,name:'연차 사용 갯수' },
            { value: remainingVacation,name:'연차 잔여 갯수' }
        ];
    }



    render() {
        const { chartData, loading } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                {loading ? <CircularProgress /> : chartData && (
                    <>
                        <div className={classes.chartDescriptionContainer}>
                            <div className={classes.columnContainer}>
                                {chartData.map((item, index) => (
                                    <div key={index} className={classes.chartInfoBox}>
                                        <div className={classes.colorSquare}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.chartContainer}>
                            <MainChart data={chartData} />
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(VacationMineEChart);
