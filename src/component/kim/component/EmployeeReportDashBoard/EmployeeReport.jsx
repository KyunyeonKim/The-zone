import React, { Component } from 'react';
import { Paper, Typography, Grid, withStyles } from '@material-ui/core';
import VacationApprovalInfo from "../Chart/VacationApprovalInfo";
import VacationRejectedInfo from "../Chart/VacationRejectedInfo";
import VacationRequestedInfo from "../Chart/VacationRequestedInfo";
import ApprovalAttendance from "../Chart/ApprovalAttendance";
import ApprovalRequestedAttendance from "../Chart/ApprovalRequestedAttendance";
import UnApprovalAttendance from "../Chart/UnApprovalAttendance";
import EmployeeVacationChart from "../ReportChart/EmployeeVacationChart";
import EmployeeAttendanceChart from "../ReportChart/EmployeeAttendanceChart";


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
    state = {
        approveVacationCount: 0,
        rejectedVacationCount: 0,
        requestedVacationCount:0,
        approvedCount:0,
        unapprovedVacationCount:0,
        approvalRequestedAttendance:0 ,
    };

    handleApprovedDataLoaded = (data) => {
        this.setState({ approvedVacationCount: data || 0 });
    };

    handleRejectedDataLoaded = (data) => {
        this.setState({ rejectedVacationCount: data || 0 });
    };

    handleRequestedDataLoaded = (data) => {
        this.setState({ requestedVacationCount: data || 0 });
    };

    handleAttendanceApproveDataLoaded = (data)=> {
        this.setState({approvedCount: data || 0});
    };

    handleAttendanceRejectedDataLoaded = (data) =>{
        this.setState({unapprovedVacationCount: data || 0});
    };

    handleAttendanceRequestedDataLoaded = (data) => {
        this.setState({approvalRequestedAttendance:data || 0});
    };


    render() {
        const { classes } = this.props;
        const { approvedVacationCount, rejectedVacationCount, requestedVacationCount,
            approvedCount, unapprovedVacationCount, approvalRequestedAttendance } = this.state;

        return (
            <div className={classes.root}>
                <Typography variant="h4" className={classes.title}>
                    직원 연차 보고서
                </Typography>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" className={classes.title}>
                                월에 대한 연차정보
                            </Typography>
                            <VacationApprovalInfo year={2023} month={1} onDataLoaded={this.handleApprovedDataLoaded} />
                            <VacationRejectedInfo year={2023} month={1} onDataLoaded={this.handleRejectedDataLoaded}/>
                            <VacationRequestedInfo year={2023} month={1} onDataLoaded={this.handleRequestedDataLoaded}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <EmployeeVacationChart
                                approvedVacationCount={approvedVacationCount}
                                rejectedVacationCount={rejectedVacationCount}
                                requestedVacationCount={requestedVacationCount}
                            />
                        </Grid>
                    </Grid>
                </Paper>


                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" className={classes.title}>
                                월에 대한 근태정보
                            </Typography>
                            <ApprovalAttendance year={2023} month={1} onDataLoaded={this.handleAttendanceApproveDataLoaded}/>
                            <UnApprovalAttendance year={2023} month={1} onDataLoaded={this.handleAttendanceRejectedDataLoaded}/>
                            <ApprovalRequestedAttendance year={2023} month={1} onDataLoaded={this.handleAttendanceRequestedDataLoaded}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <EmployeeAttendanceChart
                                approvedCount={approvedCount}
                                unapprovedVacationCount={unapprovedVacationCount}
                                approvalRequestedAttendance={approvalRequestedAttendance}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeReport);
