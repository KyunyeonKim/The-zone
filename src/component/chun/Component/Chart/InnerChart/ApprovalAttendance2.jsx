import React, { Component } from "react";
import axios from "axios";
import { Box, Grid, Typography, Paper, withStyles } from "@material-ui/core";
import Icon from '@material-ui/icons/EventAvailable';


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
    title: {
        fontWeight: theme.typography.fontWeightMedium,
        color: '#1976D2', // Ensure the title text is blue
        flexGrow: 1,
    },
    infoText: {
        paddingTop: theme.spacing(1),
        fontWeight: 'bold',
        color: '#1976D2', // Ensure the info text is blue
    },
    // If you had other styles, make sure they are included here
});

class ApprovalAttendance2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvedCount:null,

        }
        this.approvedCount=null;
        this.loadApprovedMonthVacationData=this.loadApprovedMonthVacationData.bind(this);
    }
    approvedCount
    goRender = false;
    goUpdate =  false;
    componentDidMount() {
        this.loadApprovedMonthVacationData();
    }

    componentDidUpdate() {
            this.loadApprovedMonthVacationData2();
    }

     loadApprovedMonthVacationData = async() => {
        const { year, month } = this.props;

        /*TODO : 로그인은 추후에 없애야함*/
        // axios.defaults.withCredentials = true;
        // let loginForm = new FormData();
        // loginForm.append("loginId", "200001012");
        // loginForm.append("password", "test");
        // await axios.post("http://localhost:8080/login", loginForm);

            let response = await axios.get(`http://localhost:8080/chart/manager/attendance/normal?year=${year}&month=${month}`)
             this.approvedCount=response.data;
            // .then(response => {
            //     this.setState({ approvedCount: response.data });
            //     if (this.props.onDataLoaded) {
            //        this.props.onDataLoaded(response.data);
            //    }
            // })
            // .catch(error => {
            //     console.error("Error fetching approved vacation data: ", error);
            // });
         this.updated=true
         this.setState({goRender:false})
         this.props.onDataLoaded(response.data);
         //여기서 전역에 데이터 저장
    }

    loadApprovedMonthVacationData2 = async() => {
        const { year, month } = this.props;

        /*TODO : 로그인은 추후에 없애야함*/
        // axios.defaults.withCredentials = true;
        // let loginForm = new FormData();
        // loginForm.append("loginId", "200001012");
        // loginForm.append("password", "test");
        // await axios.post("http://localhost:8080/login", loginForm);

        // let response = await axios.get(`http://localhost:8080/chart/manager/attendance/normal?year=${year}&month=${month}`)
        // this.approvedCount=response.data;
        // alert(`handler ${year} ${month} ${this.approvedCount=response.data}`)
        // .then(response => {
        //     this.setState({ approvedCount: response.data });
        //     if (this.props.onDataLoaded) {
        //        this.props.onDataLoaded(response.data);
        //    }
        // })
        // .catch(error => {
        //     console.error("Error fetching approved vacation data: ", error);
        // });
        this.updated=true
        if(this.goRender){
            this.goUpdate = !this.goUpdate
            let response = await axios.get(`http://localhost:8080/chart/manager/attendance/normal?year=${year}&month=${month}`)
            this.approvedCount=response.data;
            this.setState({goRender:false})
            alert('final')
            if(this.goUpdate){
                this.props.onDataLoaded(response.data);
                this.goUpdate = !this.goUpdate
            }
            //여기서 전역에 데이터 저장
        }
    }

    render() {
        const approvedCount = this.approvedCount;
        const { classes ,month} = this.props;
        alert(`render`)
        this.goRender = !this.goRender

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.


        return (
            <Paper className={classes.paper}>
                <Icon/>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {monthName} 근태 정상
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {approvedCount !== null ? approvedCount : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(ApprovalAttendance2);
