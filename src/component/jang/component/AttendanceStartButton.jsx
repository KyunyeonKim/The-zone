import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import axios from "axios";
import Typography from "@material-ui/core/Typography";

class AttendanceStartButton extends Component {
    state = {dialogOn :false ,dialogOff:true,startTime:null}
    dialogOn=false
    dialogOff=true
    dialogShowToggle = () => {
        this.dialogOn=!this.dialogOn
        this.dialogOff=!this.dialogOff
        this.setState({dialogOn :false})
    }

    attendanceStarted = async () => {
        this.dialogOn=!this.dialogOn
        this.dialogOff=!this.dialogOff

        try{
            let response = await axios.post('http://localhost:8080/employee/attendance')
            alert("업무 시작!!")
            axios.defaults.withCredentials=true;
            let responseOfTodayInfo = await axios.get('http://localhost:8080/employee/attendance/today')
            let {startTime} = responseOfTodayInfo.data;
            alert('startTime '+ responseOfTodayInfo.data.startTime)
            if(startTime!=="null")
                this.setState({startTime:startTime,dialogOn :false ,dialogOff:true})

        }catch(error) {
            alert(`출근 요청 도중 문제 발생 : ${error.response.data.message}`)
            axios.defaults.withCredentials=true;
            let response = await axios.get('http://localhost:8080/employee/attendance/today')
            let {startTime} = response.data;
            alert('startTime '+ response.data.startTime)
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
        else{
            alert("출근 정보 없음")
        }
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
        alert(`start time ${this.state.startTime}`)


        return (<div>
            {startTime===null?<Button variant="contained" onClick={this.dialogShowToggle} style={{color:"black",backgroundColor:"#FFCA6E",width:'110px',height:'40px',fontFamily:'IBM Plex Sans KR',fontSize:'17px',borderRadius:'20px',fontWeight:'bold'}}>출근 입력</Button>
            :
                <Typography style={{
                    fontFamily:'IBM Plex Sans KR',fontSize:'17px',fontWeight:'bold',textAlign:'center'
                }}>
                    출근 <br/> {startTime}
            </Typography>}


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