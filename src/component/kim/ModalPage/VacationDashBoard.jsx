import React, {Component} from 'react';
import {Grid, Paper, Typography, withStyles} from '@material-ui/core';
import VacationApprovalInfo from '../component/MainPageChart/VacationApprovalInfo';
import VacationRequestedInfo from '../component/MainPageChart/VacationRequestedInfo';
import VacationRejectedInfo from '../component/MainPageChart/VacationRejectedInfo';
import VacationMineEChart from '../component/MainPageChart/VacationMineEChart';
import UnApprovalAttendance from "../component/MainPageChart/UnApprovalAttendance";
import ApprovalAttendance from "../component/MainPageChart/ApprovalAttendance";
import ApprovalRequestedAttendance from "../component/MainPageChart/ApprovalRequestedAttendance";

// const {closeModal} = this.props

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        height: '70%',
    },
    combinedInfoSection: {
        padding: theme.spacing(2),
    },
    chartSection: {
        padding: theme.spacing(2),
        height: '400px',
    },
    chartContainer: {
        height: '78%',
        width: '120%',
    },
    verticalDivider: {
        height: '100%',
        width: '1px',
        backgroundColor: theme.palette.divider,
    },
    divider: {

        margin: theme.spacing(2, 0),
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between', // 컨테이너 내용을 양 끝에 정렬합니다.
        alignItems: 'center', // 세로축 중앙 정렬
        width: '100%', // 부모 컨테이너의 전체 너비를 사용합니다.
    },
    title: {
        // '연차사용현황' 제목에 적용할 스타일
        flex: 1, // 남는 공간을 차지하도록 flex-grow 값 설정
        textAlign: 'left', // 텍스트를 왼쪽 정렬
        paddingRight: theme.spacing(2), // 오른쪽 패딩 추가
    },
    titleRight: {
        // '근태현황' 제목에 적용할 스타일
        flex: 1, // 남는 공간을 차지하도록 flex-grow 값 설정
        textAlign: 'left', // 텍스트를 오른쪽 정렬
        paddingLeft: theme.spacing(1), // 왼쪽 패딩 추가
    },
});

class VacationDashboard extends Component {
    render() {
        const {classes} = this.props;
        const {currentYear,currentMonth} = this.props
        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {/* 승인/요청/거절된 연차 정보와 출석 정보 섹션 */}
                    <Grid item xs={12} md={7} className={classes.combinedInfoSection}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={1} className={classes.titleContainer}>
                                <Typography variant="h5" className={classes.title}>
                                    연차사용현황
                                </Typography>
                                <Typography variant="h5" className={classes.titleRight}>
                                    근태현황
                                </Typography>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <VacationApprovalInfo year={currentYear} month={currentMonth}/>
                                    <VacationRejectedInfo year={currentYear} month={currentMonth}/>
                                    <VacationRequestedInfo year={currentYear} month={currentMonth}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <ApprovalAttendance year={currentYear} month={currentMonth}/>
                                    <UnApprovalAttendance year={currentYear} month={currentMonth}/>
                                    <ApprovalRequestedAttendance year={currentYear} month={currentMonth}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* 차트 섹션 */}
                    <Grid item xs={2} md={5} className={classes.chartSection}>
                        <Paper className={classes.chartContainer}>
                            <VacationMineEChart/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(VacationDashboard);