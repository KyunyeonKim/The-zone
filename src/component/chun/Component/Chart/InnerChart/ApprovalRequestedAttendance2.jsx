import React, { Component } from 'react';
import axios from 'axios';
import {  Typography, Paper, withStyles } from "@material-ui/core";
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

class ApprovalRequestedAttendance2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approvalRequestedAttendance: null,
        }
        this.approvalRequestedAttendance="";
        this.loadrequestAttendanceCount=this.loadrequestAttendanceCount.bind(this);
    }

    componentDidMount() {
        this. loadrequestAttendanceCount();
    }

    componentDidUpdate() {
        this. loadrequestAttendanceCount();
    }

    loadrequestAttendanceCount = async () => {
        const { year, month } = this.props;

        /*TODO : 로그인은 추후에 없애야함*/
        // axios.defaults.withCredentials = true;
        // let loginForm = new FormData();
        // loginForm.append("loginId", "200001012");
        // loginForm.append("password", "test");
        // await axios.post("http://localhost:8080/login", loginForm);

        let response = axios.get(`http://localhost:8080/chart/manager/attendance/requested?year=${year}&month=${month}`)
        this.approvalRequestedAttendance=response.data;
            // .then(response => {
            //     this.setState({ approvalRequestedAttendance: response.data });
                //if (this.props.onDataLoaded) {
 //                   this.props.onDataLoaded(response.data);
   //             }
            // })
            // .catch(error => {
            //     console.error("Error fetching rejected vacation data: ", error);
            // });
    }

    render() {
        const approvalRequestedAttendance = this.approvalRequestedAttendance;
        const {classes,month} = this.props;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (
            <Paper className={classes.paper}>
                <Icon/>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {monthName} 근태 이상 조정 요청중
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {approvalRequestedAttendance !== null ?   approvalRequestedAttendance : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(ApprovalRequestedAttendance2);
