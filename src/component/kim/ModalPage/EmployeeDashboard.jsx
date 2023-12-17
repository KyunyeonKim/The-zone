import React, {Component} from 'react';

import {Typography, withStyles, Container, Paper, Grid} from "@material-ui/core";
import EmployeeReport from "../component/ReportChart/EmployeeReport";

import SelectInfoForEmployeeReport from "../component/SearchComponent/SelectInfoForEmployeeReport";




const styles = theme => ({
    root: {
      width:"1048px"
    },

    containertitle: {
        height: '100px',
        textAlign: 'center',
        border: '2px solid black',
        fontSize: '35px',
        lineHeight: '100px',
        color: 'white',
        padding: theme.spacing(0, 2),
    }, reportTitle: {
        marginTop: '50px', // 이 값을 조정하여 제목의 위치를 변경
        lineHeight: '100px',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
    }, MainPaper: {
        border: '2px solid black'
    },

    paper: {
        padding: theme.spacing(2), textAlign: 'center', color: theme.palette.text.secondary,

         // 이 값을 조정하여 Paper의 높이 변경 가능
        border: '2px solid black',
    },

    girdName: {
        display: 'flex',
    },

    skyBlueBackGround: {
        backgroundColor: '#719FE4',
        textAlign: 'center',
        margin: '0px',
        padding: '0px',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
    },


    boldBorderTable: {
        border: '2px solid black', marginBottom: theme.spacing(4), // 아래쪽 마진 추가
    },

    spacedTable: {
        marginBottom: theme.spacing(4), // Table 아래쪽 마진 추가
        marginTop: theme.spacing(3), // Table 아래쪽 마진 추가

    }, title: {
        backgroundColor: '#719FE4', height: '100px', textAlign: 'center', border: '2px solid black', fontSize: '35px', // 이 값을 변경하여 글씨 크기 조절
        lineHeight: '100px', // 이 값을 'height'와 동일하게 설정하여 글자를 수직 가운데 정렬
        // Material-UI의 theme.spacing을 사용하여 양 옆에 패딩 추가 (옵션)
        padding: theme.spacing(0, 2), fontFamily: 'IBM Plex Sans KR, sans-serif',
    },

    data: {
        fontFamily: 'IBM Plex Sans KR, sans-serif',

    },

})


class EmployeeDashboard extends Component {
    state = {
        selectedYear: new Date().getFullYear(), selectedMonths: [], // 초기 상태에서는 빈 객체로 설정
    };



    handleSelectionChange = (year, months) => {
        this.setState({ selectedYear: year, selectedMonths: months });
    };



    render() {
        const {selectedYear, selectedMonths} = this.state;
        const {classes} = this.props;
        return (<div className={classes.root}>
            <Container>
                <Typography variant="h2" className={classes.reportTitle} align="center">근태 보고서</Typography>


                    <SelectInfoForEmployeeReport onSelectionChange={this.handleSelectionChange} />


                {selectedMonths.length > 0 && (<EmployeeReport year={selectedYear} months={selectedMonths} />)}


            </Container>
        </div>);
    }
}

export default withStyles(styles)(EmployeeDashboard);