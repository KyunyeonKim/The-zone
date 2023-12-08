import React, { Component } from "react";
import axios from "axios";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";


const styles = theme => ({
    paper: {
        display: 'flex', // 플렉스 컨테이너로 내부 아이템을 수평 정렬합니다.
        alignItems: 'center', // 세로축 중앙 정렬로 아이템을 배치합니다.
        justifyContent: 'flex-start', // 요소들을 컨테이너의 시작점에서부터 배치합니다.
        border: '1px solid #000000', // 경계선을 더 진한 검은색으로 설정합니다.
        borderRadius: 4, // 모서리를 약간 둥글게 처리합니다.
        overflow: 'hidden', // 자식 요소들이 border-radius를 따르도록 함,,
        width: ' max', // 가로 폭을 내용에 맞게 조절합니다.
        maxWidth: '600px', // 최대 너비를 600px로 설정합니다.
        margin: 'auto', // Paper 컴포넌트를 수평 중앙에 배치합니다.

    },
    titleSection: {
        display: 'flex',
        alignItems: 'center', // 세로 방향으로 중앙 정렬합니다.
        justifyContent: 'center', // 가로 방향으로 중앙 정렬합니다.
        flexGrow: 1,
        padding: theme.spacing(1, 2), // 상하 8px, 좌우 16px 패딩을 적용합니다.
        backgroundColor: '#e3f2fd', // 연한 하늘색 배경
        color: '#000000', // 제목 텍스트 색상을 검은색으로 설정합니다.
        fontWeight: 'bold', // 텍스트의 두께를 굵게 설정합니다.
        width: '35%', // 예를 들어, 폭을 부모 컨테이너의 50%로 설정합니다.
        maxWidth: 200, // 최대 폭을 600px로 설정할 수도 있습니다.
        margin: 'auto', // Paper 컴포넌트를 중앙에 위치시킵니다.
        height:'75%',
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
        textAlign: 'right', // 텍스트를 오른쪽 정렬합니다.
        width: '70%', // 너비를 조절합니다. 원하는 비율로 설정하세요
        height:'75%',
    }
});
class ReportApprovalAttendance extends Component {
    state = {
        approvedCount: null,
    };

    componentDidMount() {
        this.loadApprovedMonthVacationData();
    }

    loadApprovedMonthVacationData = () => {
        const {year, month} = this.props;
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        axios.post("http://localhost:8080/login", loginForm);

        axios.get(`http://localhost:8080/chart/normal?year=${year}&month=${month}`)
            .then(response => {
                this.setState({approvedCount: response.data});
                if (this.props.onDataLoaded) {
                    this.props.onDataLoaded(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching approved vacation data: ", error);
            });
    }

    render() {
        const {approvedCount} = this.state;
        const {classes, month} = this.props;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (
            <Paper className={classes.paper}>
                <div className={classes.titleSection}>
                    <Typography variant="subtitle1">
                        {monthName} 근태 정상
                    </Typography>
                </div>
                <div className={classes.dataSection}>
                    <Typography variant="h6">
                        {approvedCount !== null ? approvedCount : 'Loading...'}
                    </Typography>
                </div>
            </Paper>
        );
    }
}
export default withStyles(styles)(ReportApprovalAttendance);
