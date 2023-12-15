import React, {Component} from 'react';
import axios from 'axios';
import {Paper, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    paper: {
        overflow: 'hidden', // 자식 요소들이 border-radius를 따르도록 함,,
        height: '140px', // 원하는 높이로 설정
        maxWidth: '600px', // 최대 너비를 600px로 설정합니다.
        borderRadius: '0px', // 모서리를 각지게 만듭니다.
        borderBottom: '2px solid #000000', // 왼쪽에 1픽셀 굵기의 검은색 선을 추가합니다.


    },
    titleSection: {
        display: 'flex',
        alignItems: 'center', // 세로 방향으로 중앙 정렬합니다.
        justifyContent: 'center', // 가로 방향으로 중앙 정렬합니다.
        flexGrow: 1,
        padding: theme.spacing(1, 2), // 상하 8px, 좌우 16px 패딩을 적용합니다.
        backgroundColor: '#F2F2F2',
        fontFamily: 'IBM Plex Sans KR, sans-serif',

        color: '#000000', // 제목 텍스트 색상을 검은색으로 설정합니다.
        fontWeight: 'bold', // 텍스트의 두께를 굵게 설정합니다.
        maxWidth: 400, // 최대 폭을 600px로 설정할 수도 있습니다.
        height:'50%',
        borderBottom: '2px solid black'
    },
    borderSection: {
        borderLeft: '4px solid #000000', // 왼쪽에 1픽셀 굵기의 검은색 선을 추가합니다.
    },
    dataSection: {
        display: 'flex',
        alignItems: 'center', // 세로 방향으로 중앙 정렬합니다.
        justifyContent: 'center', // 가로 방향으로 중앙 정렬합니다.
        fontFamily: 'IBM Plex Sans KR, sans-serif', // 사용할 글꼴 설정
        fontSize: '20px', // 폰트 사이즈를 20px로 설정
        height:'50%',
    },
    subtitle1:{
        fontFamily: 'IBM Plex Sans KR, sans-serif', // 사용할 글꼴 설정
        fontSize: '20px', // 폰트 사이즈를 20px로 설정
    },
});

class ReportVacationRejectedInfo extends Component {
    state = {
        rejectedVacationCount: null,
    };

    componentDidMount() {
        this.loadRejectedMonthVacationData();
    }

    loadRejectedMonthVacationData = () => {
        const { year, month } = this.props;
        axios.get(`http://localhost:8080/chart/rejectedmonthvacation?year=${year}&month=${month}`)
            .then(response => {
                this.setState({ rejectedVacationCount: response.data });
                if (this.props.onDataLoaded) {
                    this.props.onDataLoaded(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching rejected vacation data: ", error);
            });
    }

    render() {
        const { rejectedVacationCount } = this.state;
        const {classes,month} = this.props;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1];

        return (
            <Paper className={classes.paper}>
                <div className={classes.titleSection}>
                    <Typography className={classes.subtitle1}>
                        {monthName} 연차 반려
                    </Typography>
                </div>
                <div className={classes.dataSection}>
                    <Typography variant="h6"  style={{ textAlign: 'center', width: '100%' }}>
                    {rejectedVacationCount !== null ?   rejectedVacationCount : 'Loading...'}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ReportVacationRejectedInfo);
