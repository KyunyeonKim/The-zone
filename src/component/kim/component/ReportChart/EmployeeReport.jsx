import React, { Component } from 'react';
import { Paper, Typography, Grid, withStyles } from '@material-ui/core';

// 차트 컴포넌트들을 임포트
import ReportApprovalAttendance from "../ReportChart/ReportApprovalAttendance";
import ReportUnApprovalAttendance from "../ReportChart/ReportUnApprovalAttendance";
import ReportVacationApprovalInfo from "../ReportChart/ReportVacationApprovalInfo";
import ReportApprovalRequestedAttendance from "../ReportChart/ReportApprovalRequestedAttendance";
import ReportVacationRequestedInfo from "../ReportChart/ReportVacationRequestedInfo";
import ReportVacationRejectedInfo from "../ReportChart/ReportVacationRejectedInfo"
import EmployeeVacationChart from "../ReportChart/EmployeeVacationChart";
import EmployeeAttendanceChart from "../ReportChart/EmployeeAttendanceChart";
import EmployeeBarChart from "../ReportChart/EmployeeBarChart";
import Container from "@material-ui/core/Container";
import Calendar from "react-calendar";


const styles = theme => ({
    root: {
        maxWidth: 'none', // Removes the max-width restriction
        padding: 0, // Removes padding
        margin: 0, // Removes margin to align with the left edge
    },
    paper: {
        padding: '10px',
        textAlign: 'center',
        color: 'black',
        height: '570px',
        width: '290px',
        boxShadow: 'none', // 그림자를 없애고
        backgroundColor: 'transparent', // 배경색을 투명하게 설정합니다.
    },
    chartPaper: {
        height: 300, // 차트 크기를 지정합니다. 실제 차트 라이브러리에 맞게 조정해야 합니다.
    },
    tablePaper: {
        height: 200, // 테이블 크기를 지정합니다. 실제 테이블 라이브러리에 맞게 조정해야 합니다.
    },
    title: {
        backgroundColor: '#4880D5',
        height: '100px',
        textAlign: 'center',
        border: '2px solid black',
        fontSize: '35px', // 이 값을 변경하여 글씨 크기 조절
        lineHeight: '100px', // 이 값을 'height'와 동일하게 설정하여 글자를 수직 가운데 정렬
        color: 'white', // 글자 색상을 흰색으로 설정
        // Material-UI의 theme.spacing을 사용하여 양 옆에 패딩 추가 (옵션)
        padding: theme.spacing(0, 2),
    },
    charttitle: {
        backgroundColor: 'white',
        height: '100px',
        textAlign: 'center',
        border: '2px solid black',
        fontSize: '35px', // 이 값을 변경하여 글씨 크기 조절
        lineHeight: '100px', // 이 값을 'height'와 동일하게 설정하여 글자를 수직 가운데 정렬
        color: 'black', // 글자 색상을 흰색으로 설정
        // Material-UI의 theme.spacing을 사용하여 양 옆에 패딩 추가 (옵션)
        padding: theme.spacing(0, 2),
    },
    card: {
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)', // Slightly scale up the card on hover
        },
    },
    cardContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
    count: {

    },
    reportContainer :{
        display: 'flex',
        flexDirection:'row',
    },
    // Define styles for different types of data
    reportPaper: {
        // 각 리포트 섹션에 적용될 스타일
        border: '0px', // 진한 검은색 테두리
    },
    largePaper: {
        minHeight: '675px', // 최소 높이 설정
        width: '100%',
        textAlign: 'center',
        // height: '100%', // 이 줄은 제거하거나 주석 처리
        border: '2px solid #111399', // 선 색상을 검은색(#000)으로 설정
    },
    calendar: {
        // 달력 컴포넌트에 적용할 스타일을 정의합니다.
        minHeight: '650px', // 최소 높이
        width: '100%', // 너비
        // 다른 필요한 스타일 속성들을 여기에 추가할 수 있습니다.
        border: '1px solid #ddd', // 달력 테두리 색상을 변경
        borderRadius: '4px', // 달력 모서리를 둥글게
    },
    calendarTile: {
        height: '100px',
        width: '100px',
        padding: '20px',
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #000', // 선 색상을 검은색(#000)으로 설정
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
        '&.react-calendar__tile--now': {
            backgroundColor: '#f00',
            color: '#fff',
        },
        '&.react-calendar__tile--active': {
            backgroundColor: '#000',
            color: '#fff',
        },
    },
    gridItem: {
        marginBottom: '20px',
        border: '1px solid #000', // 선 색상을 검은색(#000)으로 설정
        borderRadius: '10px',
    },
    gridItemDivider: {
        borderRight: '1px solid #000', // 그리드 아이템 사이에 오른쪽 경계선을 추가
    },

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

    aggregateMonthlyData = () => {
        const {vacationData, attendanceData} = this.state;
        const {months} = this.props;


        return months.map(month => ({
            approvedVacationCount: vacationData[month]?.approvedVacationCount || 0,
            rejectedVacationCount: vacationData[month]?.rejectedVacationCount || 0,
            requestedVacationCount: vacationData[month]?.requestedVacationCount || 0,
            approvedCount: attendanceData[month]?.approvedCount || 0,
            unapprovedVacationCount: attendanceData[month]?.unapprovedVacationCount || 0,
            approvalRequestedAttendance: attendanceData[month]?.approvalRequestedAttendance || 0,
        }))
    }

    // 연차 차트 데이터 렌더링
    renderVacationMonthData = (year, month) => (


        <React.Fragment key={month}>
            <ReportVacationApprovalInfo year={year} month={month}
                                        onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'approvedVacationCount', data)}/>
            <ReportVacationRejectedInfo year={year} month={month}
                                        onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'rejectedVacationCount', data)}/>
            <ReportVacationRequestedInfo year={year} month={month}
                                         onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'requestedVacationCount', data)}/>

        </React.Fragment>
    );


    // 근태 차트 데이터 렌더링
    renderAttendanceMonthData = (year, month) => (

        <React.Fragment key={month}>
            <ReportApprovalAttendance year={year} month={month}
                                      onDataLoaded={(data) => this.handleAttendanceDataLoaded(month, 'approvedCount', data)}/>
            <ReportUnApprovalAttendance year={year} month={month}
                                        onDataLoaded={(data) => this.handleAttendanceDataLoaded(month, 'unapprovedVacationCount', data)}/>
            <ReportApprovalRequestedAttendance year={year} month={month}
                                               onDataLoaded={(data) => this.handleAttendanceDataLoaded(month, 'approvalRequestedAttendance', data)}/>
        </React.Fragment>
    );


    render() {
        const {classes, year, months} = this.props;
        const {vacationData, attendanceData} = this.state;
        const monthlyChartData = this.aggregateMonthlyData();
        return (
            <Container className={classes.root}>
                <Grid container spacing={1}> {/* 그리드 사이의 간격을 설정합니다. */}
                    {months.map(month => (
                        <Grid container spacing={1} key={month}>
                            <Grid item xs={12}>
                                <Typography variant="h4"
                                            className={classes.charttitle}>{`${month}월별 근태 정보`}</Typography>
                            </Grid>
                            {/* 연차 정보 및 근태 정보 */}
                            <Grid item xs={12} container>
                                <Paper className={classes.paper} style={{width: '100%'}}>
                                    <Grid container spacing={1}>
                                        {/* 연차 정보 */}
                                        <Grid item xs={3}>
                                            <EmployeeVacationChart
                                                approvedVacationCount={vacationData[month]?.approvedVacationCount || 0}
                                                rejectedVacationCount={vacationData[month]?.rejectedVacationCount || 0}
                                                requestedVacationCount={vacationData[month]?.requestedVacationCount || 0}
                                            />
                                            {this.renderVacationMonthData(year, month)}
                                        </Grid>



                                        {/* 근태 정보 */}
                                        <Grid item xs={3}>
                                            <EmployeeAttendanceChart
                                                approvedCount={attendanceData[month]?.approvedCount || 0}
                                                unapprovedVacationCount={attendanceData[month]?.unapprovedVacationCount || 0}
                                                approvalRequestedAttendance={attendanceData[month]?.approvalRequestedAttendance || 0}
                                            />
                                            {this.renderAttendanceMonthData(year, month)}
                                        </Grid>

                                        <Grid item xs={6} >

                                            {/* Calendar 컴포넌트에 클래스를 적용합니다. */}
                                            <Calendar
                                                tileClassName={classes.calendarTile}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* 달력 정보 */}
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h4"
                            className={classes.title}>월별 막대차트 현황</Typography>
                <EmployeeBarChart monthlyData={monthlyChartData}/>
            </Container>
        );
    }
}

export default withStyles(styles)(EmployeeReport);

