import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import axios from "axios";

class AttendanceStartButton extends Component {
    state = {dialogOn :false ,dialogOff:true}
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
            this.setState({dialogOn :false ,dialogOff:true})
        }catch(error) {
            alert(`출근 요청 도중 문제 발생 : ${error.response.data.message}`)
            this.setState({dialogOn :false ,dialogOff:true})
        }
    }

    render() {
        return (<div>
            <Button variant="contained" color="primary" onClick={this.dialogShowToggle} style={{width:'120px',height:'40px',fontFamily:'Gowun Dodum, sans-serif',fontSize:'17px',borderRadius:'20px',fontWeight:'bold'}}>
                출근 입력
            </Button>
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