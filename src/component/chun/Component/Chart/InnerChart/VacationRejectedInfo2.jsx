import React, { Component } from 'react';
import axios from 'axios';
import {  Typography, Paper, withStyles } from "@material-ui/core";
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


class VacationRejectedInfo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectedVacationCount: null,
        }
        this.rejectedVacationCount="";
        this.loadRejectedMonthVacationData=this.loadRejectedMonthVacationData.bind(this);
    }
    rejectedVacationCount
    componentDidMount() {
        this.loadRejectedMonthVacationData();
    }

    componentDidUpdate() {
        this.loadRejectedMonthVacationData();
    }

    loadRejectedMonthVacationData = async () => {
        const { year, month } = this.props;

        /*TODO : 로그인은 추후에 없애야함*/
        // axios.defaults.withCredentials = true;
        // let loginForm = new FormData();
        // loginForm.append("loginId", "200001012");
        // loginForm.append("password", "test");
        // await axios.post("http://localhost:8080/login", loginForm);

        let response = await axios.get(`http://localhost:8080/chart/manager/vacation/rejected?year=${year}&month=${month}`)
        this.rejectedVacationCount=response.data;

        if(this.props.onDataLoaded){
            this.props.onDataLoaded(this.rejectedVacationCount);
        }
            // .then(response => {
            //     this.setState({ rejectedVacationCount: response.data });
                //if (this.props.onDataLoaded) {
 //                   this.props.onDataLoaded(response.data);
   //             }
            // })
            // .catch(error => {
            //     console.error("Error fetching rejected vacation data: ", error);
            // });
    }

    render() {
        const rejectedVacationCount = this.rejectedVacationCount;
        const {classes,month} = this.props;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1];

        return (
            <Paper className={classes.paper}>
                <Icon/>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {monthName} 연차 반려
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {rejectedVacationCount !== null ?   rejectedVacationCount : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(VacationRejectedInfo2);
