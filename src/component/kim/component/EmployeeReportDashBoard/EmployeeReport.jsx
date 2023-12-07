import React, { Component } from 'react';
import { Paper, Typography, Grid, withStyles } from '@material-ui/core';

// 차트 컴포넌트들을 임포트
import VacationApprovalInfo from "../Chart/VacationApprovalInfo";
import VacationRejectedInfo from "../Chart/VacationRejectedInfo";
import VacationRequestedInfo from "../Chart/VacationRequestedInfo";
import ApprovalAttendance from "../Chart/ApprovalAttendance";
import ApprovalRequestedAttendance from "../Chart/ApprovalRequestedAttendance";
import UnApprovalAttendance from "../Chart/UnApprovalAttendance";
import EmployeeVacationChart from "../ReportChart/EmployeeVacationChart";
import EmployeeAttendanceChart from "../ReportChart/EmployeeAttendanceChart";
import EmployeeBarChart from "../ReportChart/EmployeeBarChart";
import Container from "@material-ui/core/Container";


const styles = theme => ({
    root: {
        flexGrow: 1, // 컨테이너가 화면 전체 너비를 차지하도록 설정
        padding: theme.spacing(3), // 컨테이너의 내부 여백
    },
    paper: {
        padding: theme.spacing(2), // Paper 컴포넌트 내부 여백
        marginBottom: theme.spacing(2), // Paper 컴포넌트 간의 하단 여백
        borderRadius: theme.shape.borderRadius, // 모서리 둥글기
        boxShadow: '0px 3px 6px rgba(0,0,0,0.1)', // 그림자 효과
    },
    title: {
        margin: theme.spacing(2, 0), // 제목의 상하 여백
        color: theme.palette.primary.main, // 제목 색상
        fontWeight: 'bold', // 글씨 굵기
    },
    gridItem: {
        display: 'flex', // Flexbox 레이아웃 사용
    },
    chartSection: {
    }
});

class EmployeeReport extends Component {
    state = {
        vacationData: {}, // 연차 데이터
        attendanceData: {} // 근태 데이터
    };

    // 연차 데이터 로드 함수
    handleVacationDataLoaded = (month, dataType, data) => {
        this.setState(prevState => ({
            vacationData: {
                ...prevState.vacationData,
                [month]: {
                    ...prevState.vacationData[month],
                    [dataType]: data
                }
            }
        }));
    };

    // 근태 데이터 로드 함수
    handleAttendanceDataLoaded = (month, dataType, data) => {
        this.setState(prevState => ({
            attendanceData: {
                ...prevState.attendanceData,
                [month]: {
                    ...prevState.attendanceData[month],
                    [dataType]: data
                }
            }
        }));
    };

    aggregateMonthlyData = ()=>{
        const {vacationData, attendanceData} = this.state;
        const {months} = this.props;

        return months.map(month=> ({
            approvedVacationCount: vacationData[month]?.approvedVacationCount || 0,
            rejectedVacationCount: vacationData[month]?.rejectedVacationCount || 0 ,
            requestedVacationCount: vacationData[month]?.requestedVacationCount || 0,
            approvedCount: attendanceData[month]?.approvedCount || 0,
            unapprovedVacationCount: attendanceData[month]?.unapprovedVacationCount || 0,
            approvalRequestedAttendance: attendanceData[month]?.approvalRequestedAttendance || 0,
        }))
    }

    // 연차 차트 데이터 렌더링
    renderVacationMonthData = (year, month) => (
        <React.Fragment key={month}>
            <VacationApprovalInfo year={year} month={month} onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'approvedVacationCount', data)} />
            <VacationRejectedInfo year={year} month={month} onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'rejectedVacationCount', data)} />
            <VacationRequestedInfo year={year} month={month} onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'requestedVacationCount', data)} />
        </React.Fragment>
    );

    // 근태 차트 데이터 렌더링
    renderAttendanceMonthData = (year, month) => (
        <React.Fragment key={month}>
            <ApprovalAttendance year={year} month={month} onDataLoaded={(data) => this.handleAttendanceDataLoaded(month, 'approvedCount', data)} />
            <UnApprovalAttendance year={year} month={month} onDataLoaded={(data) => this.handleAttendanceDataLoaded(month, 'unapprovedVacationCount', data)} />
            <ApprovalRequestedAttendance year={year} month={month} onDataLoaded={(data) => this.handleAttendanceDataLoaded(month, 'approvalRequestedAttendance', data)} />
        </React.Fragment>
    );


    render() {
        const { classes, year, months } = this.props;
        const { vacationData, attendanceData } = this.state;
        const monthlyChartData = this.aggregateMonthlyData();

        return (
            <Container className={classes.root}>
                <Typography variant="h4" className={classes.title}>직원 연차 및 근태 보고서</Typography>
                <Grid container spacing={2}> {/* 그리드 간격 조정 */}
                    {months.map(month => (
                        <Grid item xs={12} sm={6} key={month} className={classes.gridItem}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" className={classes.title}>{`${month}월 정보`}</Typography>
                                <Grid container spacing={2}>
                                    {/* 연차 데이터 및 차트 */}
                                    <Grid item xs={6} md={6}>
                                        <EmployeeVacationChart
                                            approvedVacationCount={vacationData[month]?.approvedVacationCount || 0}
                                            rejectedVacationCount={vacationData[month]?.rejectedVacationCount || 0}
                                            requestedVacationCount={vacationData[month]?.requestedVacationCount || 0}
                                        />
                                        {this.renderVacationMonthData(year, month)}
                                    </Grid>

                                    {/* 근태 데이터 및 차트 */}
                                    <Grid item xs={6} md={6}>
                                        <EmployeeAttendanceChart
                                            approvedCount={attendanceData[month]?.approvedCount || 0}
                                            unapprovedVacationCount={attendanceData[month]?.unapprovedVacationCount || 0}
                                            approvalRequestedAttendance={attendanceData[month]?.approvalRequestedAttendance || 0}
                                        />
                                        {this.renderAttendanceMonthData(year, month)}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                {/* 전체 데이터 표시용 바 차트 */}
                <EmployeeBarChart monthlyData={monthlyChartData} />
            </Container>
        );
    }
}

export default withStyles(styles)(EmployeeReport);

