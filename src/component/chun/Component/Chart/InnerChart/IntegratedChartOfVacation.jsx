import React, {Component} from 'react';
import axios from "axios";
import Icon from "@material-ui/icons/EventNote";
import {Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {chartDataStore, IntegratedChartOfVacationStore} from '../../../../../index'
import EmployeeVacationChart2 from "./EmployeeVacationChart2";

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
    infoTextOfRejected: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: 'red', // Ensure the info text is blue
    }
    ,titleOfRejected: {
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
        alert(`loadApprovedMonthVacationData ${year + '' + month}`)
        let responseVacationNormal=await axios.get(`http://localhost:8080/chart/manager/vacation/approval?year=${year}&month=${month}`)
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
        alert(`${this.responseVacationNormal} ${this.responseVacationRejected} ${this.responseVacationRequested}`)
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
                            {monthName} 연차 승인
                        </Typography>
                        <Typography variant="h5" className={classes.infoTextOfNormal}>
                            {this.responseVacationNormal !== null ? this.responseVacationNormal : 'Loading...'}
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Icon/>
                        <Typography variant="h6" gutterBottom className={classes.titleOfRequested}>
                            {monthName} 연차 요청
                        </Typography>
                        <Typography variant="h5" className={classes.infoTextOfRequested}>
                            {this.responseVacationRequested !== null ? this.responseVacationRequested : 'Loading...'}
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Icon/>
                        <Typography variant="h6" gutterBottom className={classes.titleOfRejected}>
                            {monthName} 연차 반려
                        </Typography>
                        <Typography variant="h5" className={classes.infoTextOfRejected}>
                            {this.responseVacationRejected !== null ? this.responseVacationRejected : 'Loading...'}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EmployeeVacationChart2
                    approvedVacationCount={this.responseVacationNormal}
                    rejectedVacationCount={this.responseVacationRejected}
                    requestedVacationCount={this.responseVacationRequested}
                    />
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(IntegratedChartOfVacation);