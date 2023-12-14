import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle,} from '@material-ui/core';
import axios from "axios";
import Typography from "@material-ui/core/Typography";

class AttendanceEndButton extends Component {
    state = {dialogOn :false ,dialogOff:true,endTime:null}
    dialogOn=false
    dialogOff=true
    dialogShowToggle = () => {
        this.dialogOn=!this.dialogOn
        this.dialogOff=!this.dialogOff
        this.setState({dialogOn :false})
    }

    attendanceEnded = async () => {
        this.dialogOn=!this.dialogOn
        this.dialogOff=!this.dialogOff

        try{
            let response = await axios.post('http://localhost:8080/employee/leave')
            alert("업무 종료!!")
            axios.defaults.withCredentials=true;
            let responseOfTodayInfo = await axios.get('http://localhost:8080/employee/attendance/today')
            let {endTime} = responseOfTodayInfo.data;
            alert('endTime '+ responseOfTodayInfo.data.endTime)
            if(endTime!=="null")
                this.setState({endTime:endTime,dialogOn :false ,dialogOff:true})

        }catch(error) {
            alert(`출근 요청 도중 문제 발생 : ${error.response.data.message}`)
            axios.defaults.withCredentials=true;
            let response = await axios.get('http://localhost:8080/employee/attendance/today')
            let {endTime} = response.data;
            alert('endTime '+ response.data.endTime)
            if(endTime!=="null")
                this.setState({endTime:endTime,dialogOn :false ,dialogOff:true})
        }
    }

    async componentDidMount() {
        axios.defaults.withCredentials=true;
        let response = await axios.get('http://localhost:8080/employee/attendance/today')
        let {endTime} = response.data;
        alert(`endTime ${endTime}`)
        if(endTime!=="null")
            this.setState({endTime:endTime})
        else{
            alert("퇴근 정보 없음")
        }
    }

    render() {
        let endTime=null;
        if(this.state.endTime!==null){
            let currentDate = new Date(this.state.endTime);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();
            endTime =hours + ':' + minutes + ':' + seconds;
        }

        return (<div>
            {endTime===null?<Button variant="outlined" color="primary" onClick={this.dialogShowToggle} style={{border:"1px solid #FF9933",width:'110px',height:'40px',fontFamily:'IBM Plex Sans KR',fontSize:'17px',borderRadius:'20px',fontWeight:'bold'}} >
                퇴근 입력
            </Button>:<Typography>
                {
                    endTime
                }
            </Typography>}
            <Dialog open={this.dialogOn} onClose={this.dialogShowToggle} aria-labelledby="update-modal-title">
                <DialogTitle id="update-modal-title">업무 종료</DialogTitle>
                <DialogContent>
                    <p>업무를 종료하시겠습니까??</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.attendanceEnded} color="primary">
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

export default AttendanceEndButton;