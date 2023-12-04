import React, { Component } from "react";
import axios from "axios";
import { Typography, Paper, withStyles } from "@material-ui/core";
import Icon from '@material-ui/icons/EventBusy';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: 'white', // Set the background color to white
        color: 'red', // Set the text color to the blue shade you were using
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
        color: 'red', // Ensure the title text is blue
        flexGrow: 1,
    },
    infoText: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: 'red', // Ensure the info text is blue
    },
    // If you had other styles, make sure they are included here
});

class UnApprovalAttendance extends Component {
    state = {
       UnapprovedVacationCount: null,
    };

    componentDidMount() {
        this.loadUnApprovedMonthVacationData();
    }

    loadUnApprovedMonthVacationData = () => {
        const { year, month } = this.props;
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        axios.post("http://localhost:8080/login", loginForm);

        axios.get(`http://localhost:8080/chart/abnormal?year=${year}&month=${month}`)
            .then(response => {
                this.setState({UnapprovedVacationCount: response.data });
            })
            .catch(error => {
                console.error("Error fetching approved vacation data: ", error);
            });
    }

    render() {
        const { UnapprovedVacationCount } = this.state;
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Icon/>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    1월 근태 이상
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {UnapprovedVacationCount !== null ?   UnapprovedVacationCount : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(UnApprovalAttendance);
