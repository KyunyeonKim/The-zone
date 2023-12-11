import React, {Component} from "react";
import axios from "axios";
import {Paper, Typography, withStyles} from "@material-ui/core";
import Icon from '@material-ui/icons/EventNote';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: 'white', // Set the background color to white
        borderRadius: 15,
        borderStyle: 'none',
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start', // 아이템을 왼쪽 정렬로 변경
    },
    title: {
        fontWeight: 'bold',
        color: '#FFA000', // Set the text color to the blue shade you were using
        flexGrow: 1,
        fontFamily:'Noto Sans KR,sans-serif',
    },
    infoText: {
        paddingTop: theme.spacing(1),
        fontFamily:'Noto Sans KR,sans-serif',
    },
    monthTitle:{
        fontWeight: 'bold',
        fontFamily:'Noto Sans KR,sans-serif',
        verticalAlign: 'middle', // 수직 가운데 정렬

    }, countMonthTitle:{
        fontWeight: 'bold',
        fontFamily:'Noto Sans KR,sans-serif',
        color:'#2568ac'

    }

    // If you had other styles, make sure they are included here
});


class VacationRequestedInfo extends Component {
    state = {
        requestedVacationCount: null,
    };

    componentDidMount() {
        this.loadRequestedMonthVacationData();
    }

    loadRequestedMonthVacationData = () => {
        const {year, month} = this.props;

        axios.get(`http://localhost:8080/chart/requestedmonthvacation?year=${year}&month=${month}`)
            .then(response => {
                this.setState({requestedVacationCount: response.data});
                if (this.props.onDataLoaded) {
                    this.props.onDataLoaded(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching requested vacation data: ", error);
            });
    }

    render() {
        const {requestedVacationCount} = this.state;
        const {classes, month} = this.props;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (
            <Paper className={classes.paper}>

                <Typography variant="h6" gutterBottom className={classes.countMonthTitle}>
                    {monthName}
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.monthTitle}>
                    &nbsp;연차&nbsp;
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.title}>
                     요청중
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {requestedVacationCount !== null ? requestedVacationCount : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(VacationRequestedInfo);
