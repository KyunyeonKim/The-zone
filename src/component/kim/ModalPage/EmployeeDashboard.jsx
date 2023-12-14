import React, {Component} from 'react';

import {Container, Paper, Typography, withStyles} from "@material-ui/core";
import ReportSelector from "../component/ReportChart/ReportSelector";
import EmployeeReport from "../component/ReportChart/EmployeeReport";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
        border: `1px solid ${theme.palette.divider}`, // 셀 테두리 추가
    },
}))(TableCell);

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    containertitle: {
        height: '100px',
        textAlign: 'center',
        border: '2px solid black',
        fontSize: '35px',
        lineHeight: '100px',
        color: 'white',
        padding: theme.spacing(0, 2),
    },
    reportTitle: {
        marginTop: '50px', // 이 값을 조정하여 제목의 위치를 변경
        lineHeight: '100px',
    },
    MainPaper:{
        border: '2px solid black'
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 30, // 이 값을 조정하여 Paper의 높이 변경 가능
        border: '2px solid black',
    },
    namepaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#719FE4',
        height: 30, // 이 값을 조정하여 Paper의 높이 변경 가능
        border: '2px solid black',

    },

    girdName:  {
        display: 'flex',
    },

    gridContainer:{
        flexGrow: 1,
        textAlign:'center',
        margin:'0px',
        padding:'0px'
    },

    skyBlueBackGround:{
      backgroundColor:'#719FE4',
        textAlign:'center',
        margin:'0px',
        padding:'0px'
,    },

    boldBorderTable:{
        border:'2px solid black', marginBottom: theme.spacing(4), // 아래쪽 마진 추가
    },spacedTable: {
        marginBottom: theme.spacing(4), // Table 아래쪽 마진 추가
        marginTop: theme.spacing(10), // Table 아래쪽 마진 추가

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


})


class EmployeeDashboard extends Component {
    state = {
        selectedYear: new Date().getFullYear(),
        selectedMonths: [],
        userData: {} // 초기 상태에서는 빈 객체로 설정
    };


    componentDidMount() {
        this.loadEmployeeDataFromSession();
    }

    loadEmployeeDataFromSession = () => {
        // 세션에서 직원 데이터를 가져옵니다.
        const employeeDataString = sessionStorage.getItem('userData');
        if (employeeDataString) {
            const userData = JSON.parse(employeeDataString);
            this.setState({ userData });
        }
    };



    handleSelectionChange = (year, months) => {
        this.setState({ selectedYear: year, selectedMonths: months });
    };


    render() {
        const { selectedYear, selectedMonths, userData } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant="h4" className={classes.reportTitle} align="center">근태 보고서</Typography>
                    <Table className={classes.spacedTable}>
                        <TableBody className={classes.boldBorderTable}>
                            {/* 첫 번째 행 */}
                            <TableRow>
                                <StyledTableCell className={classes.skyBlueBackGround}>이름</StyledTableCell>
                                <StyledTableCell align="right">{userData.employeeName}</StyledTableCell>
                                <StyledTableCell align="right" className={classes.skyBlueBackGround}>사번</StyledTableCell>
                                <StyledTableCell align="right">{userData.loginId}</StyledTableCell>
                            </TableRow>
                            {/* 두 번째 행 */}
                            <TableRow>
                                <StyledTableCell className={classes.skyBlueBackGround}>직급</StyledTableCell>
                                <StyledTableCell align="right">{userData.manager ? "근태관리자" : "사원"}</StyledTableCell>
                                <StyledTableCell align="right" className={classes.skyBlueBackGround}>
                                    현재날짜
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {new Date().toLocaleDateString()}
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="h4" className={classes.title}>월별 근태 정보</Typography>
                    <Paper className={classes.MainPaper}>
                        <ReportSelector onSelectionChange={this.handleSelectionChange} />
                        {selectedMonths.length > 0 && (
                            <EmployeeReport year={selectedYear} months={selectedMonths} />
                        )}
                    </Paper>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeDashboard);