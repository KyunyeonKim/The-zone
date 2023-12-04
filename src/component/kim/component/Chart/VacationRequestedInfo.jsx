import React, { Component } from "react";
import axios from "axios";
import { Box, Grid, Typography, Paper, withStyles } from "@material-ui/core";
import Icon from '@material-ui/icons/EventNote';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: 'white', // Set the background color to white
        color: '#FFA000', // Set the text color to the blue shade you were using
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
        fontWeight: theme.typography.fontWeightMedium,
        color: '#FFA000', // Set the text color to the blue shade you were using
        flexGrow: 1,
    },
    infoText: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: '#FFA000', // Set the text color to the blue shade you were using
    },
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
        const { year, month } = this.props;
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        axios.post("http://localhost:8080/login", loginForm);
        axios.get(`http://localhost:8080/chart/requestedmonthvacation?year=${year}&month=${month}`)
            .then(response => {
                this.setState({ requestedVacationCount: response.data });
            })
            .catch(error => {
                console.error("Error fetching requested vacation data: ", error);
            });
    }

    render() {
        const {  requestedVacationCount} = this.state;
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <Icon/>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    1월 연차 요청중
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {requestedVacationCount !== null ?   requestedVacationCount : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(VacationRequestedInfo);
