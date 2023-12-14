import React, {Component} from "react";
import axios from "axios";
import {Paper, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    paper: {
        display: 'flex', // 플렉스 컨테이너로 내부 아이템을 수평 정렬합니다.
        overflow: 'hidden', // 자식 요소들이 border-radius를 따르도록 함,,
        height: '130px', // 원하는 높이로 설정
        maxWidth: '600px', // 최대 너비를 600px로 설정합니다.
        margin: 'auto', // Paper 컴포넌트를 수평 중앙에 배치합니다.
        borderRadius: '0px', // 모서리를 각지게 만듭니다.

    },
    titleSection: {
        display: 'flex',
        alignItems: 'center', // 세로 방향으로 중앙 정렬합니다.
        justifyContent: 'center', // 가로 방향으로 중앙 정렬합니다.
        padding: theme.spacing(1, 2), // 상하 8px, 좌우 16px 패딩을 적용합니다.
        backgroundColor: '#719FE4',
        color: '#000000', // 제목 텍스트 색상을 검은색으로 설정합니다.
        fontWeight: 'bold', // 텍스트의 두께를 굵게 설정합니다.
        maxWidth: 200, // 최대 폭을 600px로 설정할 수도 있습니다.
        margin: 'auto', // Paper 컴포넌트를 중앙에 위치시킵니다.
        height:'95%',
    },
    dataSection: {
        display: 'flex', // Flexbox 레이아웃을 사용합니다.
        alignItems: 'center', // 세로 방향으로 중앙 정렬합니다.
        justifyContent: 'center', // 가로 방향으로 중앙 정렬합니다.
        flexGrow: 1,
        padding: theme.spacing(1, 2), // 상하 8px, 좌우 16px 패딩을 적용합니다.
        backgroundColor: '#ffffff', // 배경을 흰색으로 설정합니다.
        color: '#000000', // 데이터 텍스트 색상을 검은색으로 설정합니다.
        fontWeight: 'normal', // 데이터 텍스트의 두께를 기본으로 설정합니다.
        width: '81%', // 너비를 조절합니다. 원하는 비율로 설정하세요
        height:'75%',
    }, borderSection: {
        borderLeft: '4px solid #000000', // 왼쪽에 1픽셀 굵기의 검은색 선을 추가합니다.
        height: '400%', // 높이를 부모 요소와 동일하게 설정합니다.
    },
});
class ReportVacationRequestedInfo extends Component {
    state = {
        requestedVacationCount: null,
    };

    componentDidMount() {
        this.loadRequestedMonthVacationData();
    }

    loadRequestedMonthVacationData = () => {
        const { year, month } = this.props;
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        axios.post("http://localhost:8080/login", loginForm);
        axios.get(`http://localhost:8080/chart/requestedmonthvacation?year=${year}&month=${month}`)
            .then(response => {
                this.setState({ requestedVacationCount: response.data });
                if (this.props.onDataLoaded) {
                    this.props.onDataLoaded(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching requested vacation data: ", error);
            });
    }

    render() {
        const {  requestedVacationCount} = this.state;
        const {classes,month} = this.props;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (
            <Paper className={classes.paper}>
                <div className={classes.titleSection}>
                    <Typography variant="subtitle1">
                        {monthName} 연차 요청중
                    </Typography>
                </div>
                <div className={classes.dataSection}>
                    <Typography variant="h6">
                        {requestedVacationCount !== null ? requestedVacationCount : 'Loading...'}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ReportVacationRequestedInfo);
