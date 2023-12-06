import React, {Component} from 'react';
import axios from "axios";
import Icon from "@material-ui/icons/EventNote";
import {Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {chartDataStore, IntegratedChartOfAttendanceStore} from '../../../../../index'
import EmployeeAttendanceChart2 from "./EmployeeAttendanceChart2";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: 'white', // Set the background color to white
        color: '#1976D2', // Set the text color to the blue shade you were using
        borderRadius: 15,
        borderStyle: 'none',
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start', // 아이템을 왼쪽 정렬로 변경
    },
    titleOfNormal: {
        fontWeight: theme.typography.fontWeightMedium,
        color: '#1976D2', // Set the text color to the blue shade you were using
        flexGrow: 1,
    },

    infoTextOfNormal: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: '#1976D2', // Ensure the info text is blue
    },
    infoTextOfAbnormal: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: 'red', // Ensure the info text is blue
    }
    ,titleOfAbnormal: {
        fontWeight: theme.typography.fontWeightMedium,
        color: 'red', // Set the text color to the blue shade you were using
        flexGrow: 1,
    },

    infoTextOfRequested: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: '#FFA000', // Set the text color to the blue shade you were using
    },
    titleOfRequested: {
        fontWeight: theme.typography.fontWeightMedium,
        color: '#FFA000', // Set the text color to the blue shade you were using
        flexGrow: 1,
    },
    // If you had other styles, make sure they are included here
});

class IntegratedChartOfAttendance extends Component {

    attendanceNormal
    attendanceAbnormal
    approvalRequestedAttendance

    constructor(props) {
        super(props);
        this.state = {
            approvedCount: null,

        }

        this.loadApprovedMonthVacationData = this.loadApprovedMonthVacationData.bind(this);
        IntegratedChartOfAttendanceStore[this.props.month]=(this.loadApprovedMonthVacationData);
    }

    componentDidMount() {
        const {year, month} = this.props;
        this.loadApprovedMonthVacationData(year,month);
    }

    loadApprovedMonthVacationData = async (year, month) => {
        alert(`loadApprovedMonthVacationData ${year + '' + month}`)
        let responseAttendanceNormal = await axios.get(`http://localhost:8080/chart/manager/attendance/normal?year=${year}&month=${month}`)
        this.attendanceNormal = responseAttendanceNormal.data !== undefined ? responseAttendanceNormal.data : 0;

        let responseAttendanceAbnormal = axios.get(`http://localhost:8080/chart/manager/attendance/abnormal?year=${year}&month=${month}`)
        this.attendanceAbnormal = responseAttendanceAbnormal.data !== undefined ? responseAttendanceAbnormal.data : 0;

        let responseAttendanceRequested = axios.get(`http://localhost:8080/chart/manager/attendance/requested?year=${year}&month=${month}`)
        this.approvalRequestedAttendance = responseAttendanceRequested.data !== undefined ? responseAttendanceRequested.data : 0;
        chartDataStore.appendData(chartDataStore.store,{attendanceNormal:this.attendanceNormal,attendanceAbnormal:this.attendanceAbnormal, approvalRequestedAttendance:this.approvalRequestedAttendance},month)
        if(chartDataStore.updateChart!==undefined){
            chartDataStore.updateChart('attendance')
        }
        this.setState({})
        alert(`${this.approvedCount} ${this.unapprovedVacationCount} ${this.approvalRequestedAttendance}`)
    }

    render() {
        const {classes, month} = this.props;
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (
            <>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Icon/>
                        <Typography variant="h6" gutterBottom className={classes.titleOfNormal}>
                            {monthName} 근태 정상
                        </Typography>
                        <Typography variant="h5" className={classes.infoTextOfNormal}>
                            {this.attendanceNormal !== null ? this.attendanceNormal : 'Loading...'}
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Icon/>
                        <Typography variant="h6" gutterBottom className={classes.titleOfRequested}>
                            {monthName} 근태 이상 조정 요청중
                        </Typography>
                        <Typography variant="h5" className={classes.infoTextOfRequested}>
                            {this.approvalRequestedAttendance !== null ? this.approvalRequestedAttendance : 'Loading...'}
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Icon/>
                        <Typography variant="h6" gutterBottom className={classes.titleOfAbnormal}>
                            {monthName} 근태 이상
                        </Typography>
                        <Typography variant="h5" className={classes.infoTextOfAbnormal}>
                            {this.attendanceAbnormal !== null ? this.attendanceAbnormal : 'Loading...'}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EmployeeAttendanceChart2
                        approvedCount={this.attendanceNormal}
                        unapprovedVacationCount={this.attendanceAbnormal}
                        approvalRequestedAttendance={this.approvalRequestedAttendance}
                    />
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(IntegratedChartOfAttendance);