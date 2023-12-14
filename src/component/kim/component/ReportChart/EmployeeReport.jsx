import React, {Component} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, withStyles} from '@material-ui/core';

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
import InnerCalendar from "./InnerCalendar";

const styles = theme => ({
    root: {
        padding: 0, // Removes padding
        margin: 0, // Removes margin to align with the left edge
    },
    paper: {
        textAlign: 'center',
        color: 'black',
        height: '570px',
        width: '290px',
        boxShadow: 'none', // 그림자를 없애고
        backgroundColor: 'transparent', // 배경색을 투명하게 설정합니다.
        margin:'0px',
        padding:'0px'
    },
    chartPaper: {
        height: 300, // 차트 크기를 지정합니다. 실제 차트 라이브러리에 맞게 조정해야 합니다.
    },
    tablePaper: {
        height: 200, // 테이블 크기를 지정합니다. 실제 테이블 라이브러리에 맞게 조정해야 합니다.
        margin:'0px',
        padding:'0px'
    },
    title: {
        backgroundColor: '#719FE4',
        height: '100px',
        textAlign: 'center',
        border: '2px solid black',
        fontSize: '35px', // 이 값을 변경하여 글씨 크기 조절
        lineHeight: '100px', // 이 값을 'height'와 동일하게 설정하여 글자를 수직 가운데 정렬
        // Material-UI의 theme.spacing을 사용하여 양 옆에 패딩 추가 (옵션)
        padding: theme.spacing(0, 2),
    },
    charttitle: {
        backgroundColor: '#719FE4',
        textAlign: 'center',
        border: '2px solid black',
        fontSize: '35px', // 이 값을 변경하여 글씨 크기 조절
        lineHeight: '100px', // 이 값을 'height'와 동일하게 설정하여 글자를 수직 가운데 정렬
        color: 'black', // 글자 색상을 흰색으로 설정
        // Material-UI의 theme.spacing을 사용하여 양 옆에 패딩 추가 (옵션)
        margin:'0px',
        padding:'0px'

    },
    card: {
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)', // Slightly scale up the card on hover
        },
        margin:'0px',
        padding:'0px'
    },
    cardContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
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
        margin:'0px',
        padding:'0px'
    },
    calendar: {
        // 달력 컴포넌트에 적용할 스타일을 정의합니다.
        minHeight: '200px', // 최소 높이
        minWidth: '20px', // 너비
        // 다른 필요한 스타일 속성들을 여기에 추가할 수 있습니다.
        border: '1px solid #ddd', // 달력 테두리 색상을 변경
        borderRadius: '4px', // 달력 모서리를 둥글게
    },
    calendarTile: {
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

    BackGround:{
        width:'20%',
        margin:'0px',
        padding:'0px'
    },
    subtitle:{
        backgroundColor: '#719FE4',
    }

});

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
        border: '2px solid #000', // 셀 테두리 추가

    },
}))(TableCell);

const StyleTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
        border: '2px solid #000', // 셀 테두리 추가
         margin:'0px',
    padding:'0px'


    },
}))(TableCell);


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
            month, // 월 추가
            isSelected: true, // 이 데이터가 선택된 월임을 표시
            approvedVacationCount: vacationData[month]?.approvedVacationCount || 0,
            rejectedVacationCount: vacationData[month]?.rejectedVacationCount || 0,
            requestedVacationCount: vacationData[month]?.requestedVacationCount || 0,
            approvedCount: attendanceData[month]?.approvedCount || 0,
            unapprovedVacationCount: attendanceData[month]?.unapprovedVacationCount || 0,
            approvalRequestedAttendance: attendanceData[month]?.approvalRequestedAttendance || 0,
        }))
    }


    renderVacationMonthData = (year, month) => (
        // 연차 차트 데이터 렌더링
        <React.Fragment key={month}>
            <ReportVacationApprovalInfo year={year} month={month}
                                        onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'approvedVacationCount', data)}/>
            <ReportVacationRejectedInfo year={year} month={month}
                                        onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'rejectedVacationCount', data)}/>
            <ReportVacationRequestedInfo year={year} month={month}
                                         onDataLoaded={(data) => this.handleVacationDataLoaded(month, 'requestedVacationCount', data)}/>
        </React.Fragment>
    );

    renderAttendanceMonthData = (year, month) => (
        // 근태 차트 데이터 렌더링
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
        const { classes, year, months } = this.props;
        const { vacationData, attendanceData } = this.state;
        const monthlyChartData = this.aggregateMonthlyData();
        const mark=this.mark;
        return (
            <Container className={classes.root}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {months.map(month => (
                                <React.Fragment key={month}>
                                    <TableRow>
                                        <StyledTableCell colSpan={3} style={{ textAlign: 'center' }} className={classes.subtitle}>
                                            {/* 달의 이름을 사용하여 제목 생성 */}
                                            {`${month}월달 보고서`}
                                        </StyledTableCell>

                                    </TableRow>
                                    {/* 첫 번째 행: 연차 차트 및 정보 */}
                                    <StyledTableCell colSpan={1} style={{ textAlign: 'center' }} className={classes.subtitle}>
                                        {/* 달의 이름을 사용하여 제목 생성 */}
                                        {`${month}월 정보`}
                                    </StyledTableCell>
                                    <StyledTableCell colSpan={1} style={{ textAlign: 'center' }} className={classes.subtitle}>
                                        {/* 달의 이름을 사용하여 제목 생성 */}
                                        {`${month}차트 정보`}
                                    </StyledTableCell>
                                    <StyledTableCell colSpan={1} style={{ textAlign: 'center' }} className={classes.subtitle}>
                                        {/* 달의 이름을 사용하여 제목 생성 */}
                                        {`${month}딜력 정보`}
                                    </StyledTableCell>
                                    <TableRow>
                                        <StyleTableCell className={classes.BackGround} >
                                            {/* 연차 정보 */}
                                            {this.renderVacationMonthData(year, month)}
                                        </StyleTableCell>
                                        <StyledTableCell>
                                            <div style={{display : 'flex' ,justifyContent:'center'}}>
                                                <EmployeeVacationChart
                                                    approvedVacationCount={vacationData[month]?.approvedVacationCount || 0}
                                                    rejectedVacationCount={vacationData[month]?.rejectedVacationCount || 0}
                                                    requestedVacationCount={vacationData[month]?.requestedVacationCount || 0}
                                                />
                                            </div>
                                        </StyledTableCell>
                                        {/* 달력 셀은 여기서 병합을 시작하고 두 번째 행까지 확장 */}
                                        <StyledTableCell rowSpan={2} style={{ width: '45%' }}>
                                            {/* 달력 컴포넌트 */}
                                           <InnerCalendar month={month} year={year}></InnerCalendar>
                                        </StyledTableCell>
                                    </TableRow>

                                    {/* 두 번째 행: 근태 차트 및 정보 */}
                                    <TableRow>
                                        <StyleTableCell className={classes.skyBlueBackGround}>
                                            {/* 근태 정보 */}
                                            {this.renderAttendanceMonthData(year, month)}
                                        </StyleTableCell>
                                        <StyleTableCell>

                                            <div style={{display : 'flex' ,justifyContent:'center'}}>
                                            {/* 근태 차트 */}
                                            <EmployeeAttendanceChart
                                                approvedCount={attendanceData[month]?.approvedCount || 0}
                                                unapprovedVacationCount={attendanceData[month]?.unapprovedVacationCount || 0}
                                                approvalRequestedAttendance={attendanceData[month]?.approvalRequestedAttendance || 0}
                                            />
                                            </div>
                                        </StyleTableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="h4" className={classes.title}>월별 막대차트 현황</Typography>
                <EmployeeBarChart monthlyData={monthlyChartData} />
            </Container>
        );
    }
}

export default withStyles(styles)(EmployeeReport);
