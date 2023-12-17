import React, {Component} from 'react';
import axios from "axios";
import Icon from "@material-ui/icons/EventNote";
import {Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {chartDataStore, IntegratedChartOfAttendanceStore} from '../../../../../index'
import EmployeeAttendanceChart2 from "./EmployeeAttendanceChart2";

const styles = theme => ({
    paperContainer: {
        padding: 0,
        margin: 0,
        border: '1px solid black',
        borderRadius: 0, // Set border-radius to 0 for square corners
    },
    paper: {
        marginBottom: 0,
        padding: 0,
        borderRight: '1px solid black',
        borderRadius: 0, // Set border-radius to 0 for square corners
        borderTop:'1px solid black'
    },
    titleSection: {
        padding: theme.spacing(2),
        backgroundColor: '#F2F2F2',
        borderBottom:'1px solid black',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        textAlign:'center',

        borderRadius: 0, // Set border-radius to 0 for square corners
    },
    dataSection: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        textAlign:'center',

        borderRadius: 0, // Set border-radius to 0 for square corners
    },
    chartGridItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Add additional styles if needed
    },

    // Other styles...
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

        this.loadApprovedMonthAttendanceData = this.loadApprovedMonthAttendanceData.bind(this);
        IntegratedChartOfAttendanceStore[this.props.month]=(this.loadApprovedMonthAttendanceData);
    }

    componentDidMount() {
        const {year, month} = this.props;
        this.loadApprovedMonthAttendanceData(year,month);
    }

    loadApprovedMonthAttendanceData = async (year, month) => {

        let responseAttendanceNormal = await axios.get(`http://localhost:8080/chart/manager/attendance/normal?year=${year}&month=${month}`)
        this.attendanceNormal = responseAttendanceNormal.data !== undefined ? responseAttendanceNormal.data : 0;

        let responseAttendanceAbnormal =await axios.get(`http://localhost:8080/chart/manager/attendance/abnormal?year=${year}&month=${month}`)
        this.attendanceAbnormal = responseAttendanceAbnormal.data !== undefined ? responseAttendanceAbnormal.data : 0;

        let responseAttendanceRequested = await axios.get(`http://localhost:8080/chart/manager/attendance/requested?year=${year}&month=${month}`)
        this.approvalRequestedAttendance = responseAttendanceRequested.data !== undefined ? responseAttendanceRequested.data : 0;
        chartDataStore.appendData(chartDataStore.store,{attendanceNormal:this.attendanceNormal,attendanceAbnormal:this.attendanceAbnormal, approvalRequestedAttendance:this.approvalRequestedAttendance},month)
        if(chartDataStore.updateChart!==undefined){
            chartDataStore.updateChart('attendance')
        }
        this.setState({})

    }

    render() {
        const { classes, month } = this.props;
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1];

        return (

                <Paper className={classes.paperContainer}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" className={classes.titleSection}>
                            {monthName} 근태 정상
                        </Typography>
                        <Typography variant="h5" className={classes.dataSection}>
                            {this.attendanceNormal !== null ? this.attendanceNormal : 'Loading...'}
                        </Typography>
                    </Paper>

                    {/* 이상 근태 */}
                    <Paper className={classes.paper}>
                        <Typography variant="h6" className={classes.titleSection}>
                            {monthName} 근태 이상
                        </Typography>
                        <Typography variant="h5" className={classes.dataSection}


                        >
                            {this.attendanceAbnormal !== null ? this.attendanceAbnormal : 'Loading...'}
                        </Typography>
                    </Paper>

                    {/* 조정 요청 중 근태 */}
                    <Paper className={classes.paper}>
                        <Typography variant="h6" className={classes.titleSection}>
                            {monthName} 근태 조정 요청중
                        </Typography>
                        <Typography variant="h5" className={classes.dataSection} >
                            {this.approvalRequestedAttendance !== null ? this.approvalRequestedAttendance : 'Loading...'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* 차트 컴포넌트 또는 기타 요소들 */}
                <Grid item xs={12} md={8} className={classes.chartGridItem}>
                    <EmployeeAttendanceChart2
                        attendanceNormal={this.attendanceNormal}
                        attendanceAbnormal={this.attendanceAbnormal}
                        approvalRequestedAttendance={this.approvalRequestedAttendance}
                    />
                </Grid>
                    </Grid>
                </Paper>
        );
    }
}

export default withStyles(styles)(IntegratedChartOfAttendance);