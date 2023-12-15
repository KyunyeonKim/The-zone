import React, {Component} from 'react';
import axios from "axios";
import Icon from "@material-ui/icons/EventNote";
import {Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {chartDataStore, IntegratedChartOfVacationStore} from '../../../../../index'
import EmployeeVacationChart2 from "./EmployeeVacationChart2";

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
        borderTop:'1px solid black' ,
    },
    titleSection: {
        padding: theme.spacing(2),
        backgroundColor: '#F2F2F2',
        borderRadius: 0, // Set border-radius to 0 for square corners
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        textAlign:'center',
        borderBottom:'1px solid black',
    },
    dataSection: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderRadius: 0, // Set border-radius to 0 for square corners
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        textAlign:'center',
    },
    chartGridItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Add additional styles if needed
    },
    // Other styles...
});


class IntegratedChartOfVacation extends Component {

    responseVacationNormal
    responseVacationRejected
    responseVacationRequested

    constructor(props) {
        super(props);
        this.state = {
            approvedCount: null,
        }

        this.loadApprovedMonthVacationData = this.loadApprovedMonthVacationData.bind(this);
        IntegratedChartOfVacationStore[this.props.month]=(this.loadApprovedMonthVacationData);
    }

    componentDidMount() {
        const {year, month} = this.props;
        this.loadApprovedMonthVacationData(year,month);
    }

    loadApprovedMonthVacationData = async (year, month) => {

        let responseVacationNormal= await axios.get(`http://localhost:8080/chart/manager/vacation/approval?year=${year}&month=${month}`)
        this.responseVacationNormal = responseVacationNormal.data !== undefined ? responseVacationNormal.data : 0;

        let responseVacationRejected = await axios.get(`http://localhost:8080/chart/manager/vacation/rejected?year=${year}&month=${month}`)
        this.responseVacationRejected = responseVacationRejected.data !== undefined ? responseVacationRejected.data : 0;

        let responseVacationRequested = await axios.get(`http://localhost:8080/chart/manager/vacation/requested?year=${year}&month=${month}`);
        this.responseVacationRequested = responseVacationRequested.data !== undefined ? responseVacationRequested.data : 0;
        chartDataStore.appendData(chartDataStore.store,{vacationNormal:this.responseVacationNormal,vacationRejected:this.responseVacationRejected, vacationRequested:this.responseVacationRequested},month)
        if(chartDataStore.updateChart!==undefined){
            chartDataStore.updateChart('vacation')
        }
        this.setState({})

    }

    render() {
        const {classes, month} = this.props;
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (
            <Paper className={classes.paperContainer}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom className={classes.titleSection}>
                                {monthName} 연차 승인
                            </Typography>
                            <Typography variant="h5" className={classes.dataSection}>
                                {this.responseVacationNormal !== null ? this.responseVacationNormal : 'Loading...'}
                            </Typography>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom className={classes.titleSection}>
                                {monthName} 연차 요청
                            </Typography>
                            <Typography variant="h5" className={classes.dataSection}>
                                {this.responseVacationRequested !== null ? this.responseVacationRequested : 'Loading...'}
                            </Typography>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom className={classes.titleSection}>
                                {monthName} 연차 반려
                            </Typography>
                            <Typography variant="h5" className={classes.dataSection}>
                                {this.responseVacationRejected !== null ? this.responseVacationRejected : 'Loading...'}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.chartGridItem}>
                        <EmployeeVacationChart2
                            approvedVacationCount={this.responseVacationNormal}
                            rejectedVacationCount={this.responseVacationRejected}
                            requestedVacationCount={this.responseVacationRequested}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(IntegratedChartOfVacation);