import React, {Component} from "react";
import axios from "axios";
import {Paper, Typography, withStyles} from "@material-ui/core";
import Icon from '@material-ui/icons/EventAvailable';


const styles = theme => ({
    paper: {
        padding: "15px",
        backgroundColor: 'white', // Set the background color to white
        borderRadius: '10px',
        borderStyle: 'none',
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start', // 아이템을 왼쪽 정렬로 변경
        width:"220px",
        height:"50px"
    },
    title: {
        fontWeight: 'bold',
        color: '#1976D2', // Ensure the title text is blue
        flexGrow: 1,
        fontFamily:'IBM Plex Sans KR',
        fontSize:"16px"
    },
    infoText: {
        fontFamily:'IBM Plex Sans KR',
        fontSize:"18px"
    },
    monthTitle:{
        fontWeight: 'bold',
        fontFamily:'IBM Plex Sans KR',
        verticalAlign: 'middle', // 수직 가운데 정렬
        fontSize:"16px"

    }, countMonthTitle:{
        fontWeight: 'bold',
        fontFamily:'IBM Plex Sans KR',
        color:'#2568ac',
        fontSize:"16px"

    }

    // If you had other styles, make sure they are included here
});

class ApprovalAttendance extends Component {
    state = {
        approvedCount: null,
    };

    componentDidMount() {
        this.loadApprovedMonthVacationData();
    }
    loopStop=false;
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.loopStop){
            this.loadApprovedMonthVacationData();
        }
    }

    loadApprovedMonthVacationData = () => {
        const {year, month} = this.props;
        //TODO: 로그인 기능 삭제


        axios.get(`http://localhost:8080/chart/normal?year=${year}&month=${month}`)
            .then(response => {
                this.setState({approvedCount: response.data});
                if (this.props.onDataLoaded) {
                    this.props.onDataLoaded(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching approved vacation data: ", error);
            });
    }

    render() {
        const {approvedCount} = this.state;
        const {classes, month} = this.props;
        this.loopStop=!this.loopStop
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const monthName = monthNames[month - 1]; // JavaScript에서 월은 0에서 시작하므로 1을 빼줍니다.

        return (

            <Paper className={classes.paper}>
                <span style={{ marginRight: '8px', verticalAlign: 'middle' }}>•</span>
                <Typography variant="h6"  className={classes.countMonthTitle}>
                    {monthName}
                </Typography>
                <Typography variant="h6"  className={classes.monthTitle}>
                    &nbsp;근태&nbsp;
                </Typography>
                <Typography variant="h6"  className={classes.title}>
                    정상
                </Typography>
                <Typography variant="h5" className={classes.infoText}>
                    {approvedCount !== null ? approvedCount : 'Loading...'}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(ApprovalAttendance);
