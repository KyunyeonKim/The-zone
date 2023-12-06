import React, { Component } from 'react';
import { Paper, Typography, Grid, withStyles } from '@material-ui/core';
import ApprovalAttendance2 from "./InnerChart/ApprovalAttendance2";
import VacationApprovalInfo2 from "./InnerChart/VacationApprovalInfo2";
import VacationRejectedInfo2 from "./InnerChart/VacationRejectedInfo2";
import VacationRequestedInfo2 from "./InnerChart/VacationRequestedInfo2";
import UnApprovalAttendance2 from "./InnerChart/UnApprovalAttendance2";
import ApprovalRequestedAttendance2 from "./InnerChart/ApprovalRequestedAttendance2";
import EmployeeAttendanceChart2 from "./InnerChart/EmployeeAttendanceChart2";
import EmployeeVacationChart2 from "./InnerChart/EmployeeVacationChart2";
import axios from "axios";
import OneMonthOutPutForReport from "./InnerChart/OneMonthOutPutForReport";
import SelectAllMonthesOutPutForReport from "./InnerChart/SelectAllMonthesOutPutForReport";
import SelectInfoForManagerReport from "./SelectInfoForManagerReport";
import {summaryChartSetStateStore} from '../../../../index'
// 스타일 정의
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
    },
    // 추가적인 스타일을 여기에 정의할 수 있습니다.
});

class EmployeeReport extends Component {
    constructor(props) {
        super(props);

        this.state={
            allData:{
                '1':[], '2':[], '3':[],
                '4':[], '5':[], '6':[],
                '7':[], '8':[], '9':[],
                '10':[], '11':[], '12':[]
            },
            year:"",
            month:[],
            reportGenerated: false
        }

        // this.allData={
        //             '1':[], '2':[], '3':[],
        //             '4':[], '5':[], '6':[],
        //             '7':[], '8':[], '9':[],
        //             '10':[], '11':[], '12':[]
        // }
        this.appendData=this.appendData.bind(this);
        this.getData=this.getData.bind(this);
        this.doReportGenerated=this.doReportGenerated.bind(this);
        summaryChartSetStateStore.setState = this.appendData
    }


    appendData = (data, month) => {
        this.setState(prevState => ({
            allData: {
                ...prevState.allData,
                [month]: data
            }
        }));
    };

    getData = (year, month)=>{
        alert("getdata : "+year+month);
        this.setState({year:year,month:month,allData:{
                '1':[], '2':[], '3':[],
                '4':[], '5':[], '6':[],
                '7':[], '8':[], '9':[],
                '10':[], '11':[], '12':[]
            },reportGenerated:"true"},()=>{
        });
    }

    doReportGenerated=()=>{
        this.setState({reportGenerated:"true"});
    }


    // appendData=(data,month)=>{
    //     console.log("이전 : ",JSON.stringify(this.state.allData));
    //     this.state.allData[month].push(data);
    // }

    render() {
        const { classes } = this.props;
        alert(`current target year : ${this.state.year}`)
        return (
            <div className={classes.root}>
                <Typography variant="h4" className={classes.title}>
                    전사원에 대한 통계 보고서
                </Typography>
                <SelectInfoForManagerReport getData={this.getData} doReportGenerated={this.doReportGenerated}/>

                {this.state.reportGenerated && this.state.month.map((element) => (
                    <OneMonthOutPutForReport key={element} year={this.state.year} month={element} appendData={this.appendData} />
                ))}
                {this.state.reportGenerated&& <SelectAllMonthesOutPutForReport data={this.state.allData}></SelectAllMonthesOutPutForReport>}

            </div>
        );
    }

}

export default withStyles(styles)(EmployeeReport);
