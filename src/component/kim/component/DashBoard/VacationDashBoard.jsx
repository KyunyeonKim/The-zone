import React, { Component } from 'react';
import { withStyles, Grid, Typography, Paper } from '@material-ui/core';
import VacationApprovalInfo from '../Chart/VacationApprovalInfo'; // 예시 컴포넌트
import VacationRequestedInfo from '../Chart/VacationRequestedInfo'; // 예시 컴포넌트
import VacationRejectedInfo from '../Chart/VacationRejectedInfo'; // 예시 컴포넌트
import VacationMineEChart from '../Chart/VacationMineEChart'; // 예시 컴포넌트
import UnApprovalAttendance from "../Chart/UnApprovalAttendance";
import ApprovalAttendance from "../Chart/ApprovalAttendance";
import ApprovalRequestedAttendance from "../Chart/ApprovalRequestedAttendance";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        // 부모 컨테이너의 높이를 설정하기 위해 minHeight를 추가합니다.
        minHeight: '1000px', // 이 값은 차트의 높이와 맞추기 위해 설정됩니다.
    },
    paper: {
        padding: theme.spacing(2),
        height: '82%', // 차트의 높이를 부모 Grid 아이템의 높이에 맞춥니다.
    },
    combinedInfoSection: {
        padding: theme.spacing(2),
        // md 값을 style 객체에서 제거합니다. 이것은 JSS 스타일 객체에서 사용할 수 없는 속성입니다.
    },
    chartSection: {
        padding: theme.spacing(2),
        // Chart 섹션 Grid 아이템의 높이를 설정합니다.
        height: '400px', // 차트 컨테이너와 같은 높이입니다.
    },
    chartContainer: {
        height: '90%', // 차트의 높이를 부모 Grid 아이템의 높이에 맞춥니다.
        width: '100%',
    },
});

class VacationDashboard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {/* 승인/요청/거절된 연차 정보와 출석 정보 섹션 */}
                    <Grid item xs={12} md={7} className={classes.combinedInfoSection}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6}>
                                    <VacationApprovalInfo year={2023} month={1} />
                                    <VacationRejectedInfo year={2023} month={1}/>
                                    <VacationRequestedInfo year={2023} month={1}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ApprovalAttendance year={2023} month={1} />
                                   <UnApprovalAttendance year={2023} month ={1}/>
                                    <ApprovalRequestedAttendance year={2023} month={1}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* 차트 섹션 */}
                    <Grid item xs={12} md={5} className={classes.chartSection}>
                        <Paper className={classes.chartContainer}>
                            <VacationMineEChart />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(VacationDashboard);