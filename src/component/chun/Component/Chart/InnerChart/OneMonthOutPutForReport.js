import React, { Component } from 'react';
import { Paper, Typography, Grid, withStyles } from '@material-ui/core';

import axios from "axios";
import VacationRequestedInfo2 from "./VacationRequestedInfo2";
import VacationApprovalInfo2 from "./VacationApprovalInfo2";
import VacationRejectedInfo2 from "./VacationRejectedInfo2";
import EmployeeVacationChart2 from "./EmployeeVacationChart2";
import ApprovalAttendance2 from "./ApprovalAttendance2";
import UnApprovalAttendance2 from "./UnApprovalAttendance2";
import ApprovalRequestedAttendance2 from "./ApprovalRequestedAttendance2";
import EmployeeAttendanceChart2 from "./EmployeeAttendanceChart2";
import {chartDataStore} from "../../../../../index";
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




class OneMonthOutPutForReport extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     oneMonthData:{
        //         approveVacationCount: 0,
        //         rejectedVacationCount: 0,
        //         requestedVacationCount:0,
        //         approvedCount:0,
        //         unapprovedVacationCount:0,
        //         approvalRequestedAttendance:0
        //     }
        //
        // }
        this.oneMonthData={
                approvedVacationCount: "",
                rejectedVacationCount: "",
                requestedVacationCount:"",
                approvedCount:"",
                unapprovedVacationCount:"",
                approvalRequestedAttendance:""
        }

        this.handleApprovedDataLoaded=this.handleApprovedDataLoaded.bind(this);
        this.handleRejectedDataLoaded=this.handleRejectedDataLoaded.bind(this);
        this.handleRequestedDataLoaded=this.handleRequestedDataLoaded.bind(this);
        this.handleAttendanceApproveDataLoaded=this.handleAttendanceApproveDataLoaded.bind(this);
        this.handleAttendanceRejectedDataLoaded=this.handleAttendanceRejectedDataLoaded.bind(this);
        this.handleAttendanceRequestedDataLoaded=this.handleAttendanceRequestedDataLoaded.bind(this);

        this.sendDataToParent=this.sendDataToParent.bind(this);

    }


    sendDataToParent = (data,month) => {
        const { appendData } = this.props;

        // 콜백 함수를 호출하여 데이터를 상위 컴포넌트로 전달
        appendData(data,month);
        // chartDataStore.appendData(chartDataStore.store,data,month)
    };


    handleApprovedDataLoaded = (data) => {
        console.log("this.oneMonth : ",this.oneMonthData);

        this.oneMonthData.approvedVacationCount=data;
        if(this.oneMonthData.approvedVacationCount!==""&&this.oneMonthData.rejectedVacationCount!==""&&this.oneMonthData.requestedVacationCount!==""&&this.oneMonthData.approvedCount!==""&&this.oneMonthData.unapprovedVacationCount!==""&&this.oneMonthData.approvalRequestedAttendance!==""){
            console.log("보냄 : ",this.oneMonthData);
            this.sendDataToParent(this.oneMonthData,this.props.month);
            this.setState({});
        }

        // this.setState((prevState) => ({
        //     oneMonthData: {...prevState.oneMonthData, approvedVacationCount: data || 0}}),()=>{
        //     this.sendDataToParent(this.state.oneMonthData,this.props.month);
        // });
    };

    handleRejectedDataLoaded = (data) => {
        console.log("this.oneMonth : ",this.oneMonthData);

        this.oneMonthData.rejectedVacationCount=data;
        if(this.oneMonthData.approvedVacationCount!==""&&this.oneMonthData.rejectedVacationCount!==""&&this.oneMonthData.requestedVacationCount!==""&&this.oneMonthData.approvedCount!==""&&this.oneMonthData.unapprovedVacationCount!==""&&this.oneMonthData.approvalRequestedAttendance!==""){
            console.log("보냄 : ",this.oneMonthData);
            this.sendDataToParent(this.oneMonthData,this.props.month);
            this.setState({});
        }


        // this.setState((prevState) => ({
        //     oneMonthData: {...prevState.oneMonthData, rejectedVacationCount: data || 0}}),()=>{
        //     this.sendDataToParent(this.state.oneMonthData,this.props.month);
        // });
    };

    handleRequestedDataLoaded = (data) => {
        console.log("this.oneMonth : ",this.oneMonthData);

        this.oneMonthData.requestedVacationCount=data;
        if(this.oneMonthData.approvedVacationCount!==""&&this.oneMonthData.rejectedVacationCount!==""&&this.oneMonthData.requestedVacationCount!==""&&this.oneMonthData.approvedCount!==""&&this.oneMonthData.unapprovedVacationCount!==""&&this.oneMonthData.approvalRequestedAttendance!==""){
            console.log("보냄 : ",this.oneMonthData);
            this.sendDataToParent(this.oneMonthData,this.props.month);
            this.setState({});
        }


        // this.setState((prevState) => ({
        //     oneMonthData: {...prevState.oneMonthData, requestedVacationCount: data || 0}}),()=>{
        //     this.sendDataToParent(this.state.oneMonthData,this.props.month);
        // });
    };

    handleAttendanceApproveDataLoaded = (data) => {
        console.log("this.oneMonth : ",this.oneMonthData);

        this.oneMonthData.approvedCount=data;
        // if(this.oneMonthData.approvedVacationCount!==""&&this.oneMonthData.rejectedVacationCount!==""&&this.oneMonthData.requestedVacationCount!==""&&this.oneMonthData.approvedCount!==""&&this.oneMonthData.unapprovedVacationCount!==""&&this.oneMonthData.approvalRequestedAttendance!==""){
        //     console.log("보냄 : ",this.oneMonthData);
        //     this.sendDataToParent(this.oneMonthData,this.props.month);
        //     this.setState({});
        // }
        console.log("보냄 : ",this.oneMonthData);
            this.sendDataToParent(this.oneMonthData,this.props.month);
            this.setState({});

        // this.setState((prevState) => ({
        //     oneMonthData: {...prevState.oneMonthData, approvedCount: data || 0}}),()=>{
        //     this.sendDataToParent(this.state.oneMonthData,this.props.month);
        // });
    };

    handleAttendanceRejectedDataLoaded = (data) => {
        console.log("this.oneMonth : ",this.oneMonthData);


        this.oneMonthData.unapprovedVacationCount=data;
        if(this.oneMonthData.approvedVacationCount!==""&&this.oneMonthData.rejectedVacationCount!==""&&this.oneMonthData.requestedVacationCount!==""&&this.oneMonthData.approvedCount!==""&&this.oneMonthData.unapprovedVacationCount!==""&&this.oneMonthData.approvalRequestedAttendance!==""){
            console.log("보냄 : ",this.oneMonthData);
            this.sendDataToParent(this.oneMonthData,this.props.month);
            this.setState({});
        }


        // this.setState((prevState) => ({
        //     oneMonthData: {...prevState.oneMonthData, unapprovedVacationCount: data || 0}}),()=>{
        //     this.sendDataToParent(this.state.oneMonthData,this.props.month);
        // });
    };

    handleAttendanceRequestedDataLoaded = (data) => {
        console.log("this.oneMonth : ",this.oneMonthData);

        this.oneMonthData.approvalRequestedAttendance=data;
        if(this.oneMonthData.approvedVacationCount!==""&&this.oneMonthData.rejectedVacationCount!==""&&this.oneMonthData.requestedVacationCount!==""&&this.oneMonthData.approvedCount!==""&&this.oneMonthData.unapprovedVacationCount!==""&&this.oneMonthData.approvalRequestedAttendance!==""){
            console.log("보냄 : ",this.oneMonthData);
            // this.sendDataToParent(this.oneMonthData,this.props.month);
            this.summaryChartSetState()
        }


        this.setState((prevState) => ({
            oneMonthData: {...prevState.oneMonthData, approvalRequestedAttendance: data || 0}}),()=>{
            // this.sendDataToParent(this.state.oneMonthData,this.props.month);
        });
    };


    render() {

        const {classes,year,month} = this.props;
        {alert("render"+year+month)};
        // const { approvedVacationCount, rejectedVacationCount, requestedVacationCount,
        //     approvedCount, unapprovedVacationCount, approvalRequestedAttendance } = this.state.oneMonthData;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            {/*TODO : props로 데이터 받아올 것*/}
                            <VacationApprovalInfo2 year={parseInt(year)} month={parseInt(month)} onDataLoaded={this.handleApprovedDataLoaded} />
                            <VacationRequestedInfo2 year={parseInt(year)} month={parseInt(month)} onDataLoaded={this.handleRequestedDataLoaded}/>
                            <VacationRejectedInfo2 year={parseInt(year)} month={parseInt(month)} onDataLoaded={this.handleRejectedDataLoaded}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <EmployeeVacationChart2
                                approvedVacationCount={this.oneMonthData.approvedVacationCount}
                                rejectedVacationCount={this.oneMonthData.rejectedVacationCount}
                                requestedVacationCount={this.oneMonthData.requestedVacationCount}
                            />
                        </Grid>
                    </Grid>
                </Paper>


                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            {/*TODO : props로 데이터 받아올 것*/}
                            <ApprovalAttendance2 year={parseInt(year)} month={parseInt(month)} onDataLoaded={this.handleAttendanceApproveDataLoaded}/>
                            <UnApprovalAttendance2 year={parseInt(year)} month={parseInt(month)} onDataLoaded={this.handleAttendanceRejectedDataLoaded}/>
                            <ApprovalRequestedAttendance2 year={parseInt(year)} month={parseInt(month)} onDataLoaded={this.handleAttendanceRequestedDataLoaded}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <EmployeeAttendanceChart2
                                approvedCount={this.oneMonthData.approvedCount}
                                unapprovedVacationCount={this.oneMonthData.unapprovedVacationCount}
                                approvalRequestedAttendance={this.oneMonthData.approvalRequestedAttendance}
                            />
                        </Grid>
                    </Grid>
                </Paper>


            </div>
        );
    }
}

export default withStyles(styles)(OneMonthOutPutForReport);
