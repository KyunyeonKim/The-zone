import React, { Component } from 'react';

import {Typography,withStyles} from "@material-ui/core";
import ReportSelector from "../component/ReportChart/ReportSelector";
import EmployeeReport from "../component/ReportChart/EmployeeReport";

const styles = theme => ({
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
})

class EmployeeDashboard extends Component {
    state = {
        selectedYear: new Date().getFullYear(),
        selectedMonths: [],
    };

    handleSelectionChange = (year, months) => {
        this.setState({ selectedYear: year, selectedMonths: months });
    };

    render() {
        const { selectedYear, selectedMonths } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h4"  className={classes.title} align="center">직원 연차 및 근태 보고서</Typography>
                <ReportSelector onSelectionChange={this.handleSelectionChange} />
                <Typography variant="h4"
                            className={classes.title}>월별 근태정보 목록</Typography>
                {selectedMonths.length > 0 && (
                    <EmployeeReport year={selectedYear} months={selectedMonths} />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeDashboard);
