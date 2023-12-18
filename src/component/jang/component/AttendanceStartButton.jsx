import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, Snackbar,} from '@material-ui/core';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import {Alert} from "@material-ui/lab";
import {stateStore} from "../../../index";

class AttendanceStartButton extends Component {




    state = {dialogOn :false ,dialogOff:true,startTime:null,  snackbarOpen:false,
        snackbarMessage:"",}
    dialogOn=false
    dialogOff=true

    dialogShowToggle = () => {
        this.dialogOn=!this.dialogOn
        this.dialogOff=!this.dialogOff
        this.setState({dialogOn :false})
    }
    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return; // 클릭이 아닌 다른 이유로 닫힐 때는 반응하지 않도록 함
        }
        this.setState({ snackbarOpen: false }); // 스낵바 상태를 닫힘으로 설정
    };

    attendanceStarted = async () => {
        this.dialogOn=!this.dialogOn
        this.dialogOff=!this.dialogOff

        try{
            let response = await axios.post('http://localhost:8080/employee/attendance')
            this.setState({
                snackbarOpen:true , snackbarMessage:"업무를 시작합니다!"
            });
            axios.defaults.withCredentials=true;
            let responseOfTodayInfo = await axios.get('http://localhost:8080/employee/attendance/today')
            let {startTime} = responseOfTodayInfo.data;
            if(startTime!=="null")
                this.setState({startTime:startTime,dialogOn :false ,dialogOff:true})
                stateStore.calendarContainerStateSet.setState()
        }catch(error) {
            this.setState({
                snackbarOpen:true , snackbarMessage:"출근 요청 도중 에러 발생"
            })
            axios.defaults.withCredentials=true;
            let response = await axios.get('http://localhost:8080/employee/attendance/today')
            let {startTime} = response.data;
            if(startTime!=="null")
                this.setState({startTime:startTime,dialogOn :false ,dialogOff:true})
        }
    }

    async componentDidMount() {
        axios.defaults.withCredentials=true;
        let response = await axios.get('http://localhost:8080/employee/attendance/today')
        let {startTime} = response.data;
        if(startTime!=="null")
            this.setState({startTime:startTime})
        // else{
        //     alert("출근 정보 없음")
        // }
    }
    render() {
        let startTime=null;

        if(this.state.startTime!==null){
            let currentDate = new Date(this.state.startTime);
            let hours = currentDate.getHours().toString().padStart(2, '0');
            let minutes = currentDate.getMinutes().toString().padStart(2, '0');
            let seconds = currentDate.getSeconds().toString().padStart(2, '0');
            startTime =hours + ':' + minutes + ':' + seconds;
        }


        return (<div>
            {startTime===null?<Button variant="contained" onClick={this.dialogShowToggle} style={{color:"black",backgroundColor:"#FFCA6E",width:'110px',height:'40px',fontFamily:'IBM Plex Sans KR',fontSize:'17px',borderRadius:'20px',fontWeight:'bold'}}>출근 입력</Button>
            :
                <Typography style={{
                    fontFamily:'IBM Plex Sans KR',fontSize:'17px',fontWeight:'bold',textAlign:'center'
                }}>
                    출근 <br/> {startTime}
            </Typography>}
            <Snackbar
                open={this.state.snackbarOpen}
                autoHideDuration={6000}
                onClose={this.handleSnackbarClose}
                anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            >
                <Alert onClose={this.handleSnackbarClose} severity="info">
                    {this.state.snackbarMessage}
                </Alert>
            </Snackbar>

            <Dialog open={this.dialogOn} onClose={this.dialogShowToggle} aria-labelledby="update-modal-title">
                <DialogTitle id="update-modal-title">업무 시작</DialogTitle>
                <DialogContent>
                    <p>업무를 시작하시겠습니까??</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.attendanceStarted} color="primary">
                        확인
                    </Button>
                    <Button onClick={this.dialogShowToggle} color="primary">
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}

export default AttendanceStartButton;