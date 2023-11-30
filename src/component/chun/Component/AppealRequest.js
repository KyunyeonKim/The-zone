
import React, { Component } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Select,
    MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import ButtonComponent from "./ButtonComponent";
import TextFieldComponent from "./TextFieldComponent";
import RedButtonComponent from "./RedButtonComponent";
import TextField from "@material-ui/core/TextField";


const styles = (theme) => ({
    root: {
        padding: theme.spacing(4),
        textAlign: "center",
        background: "#f0f0f0",
        minHeight: "100vh",
        fontSize: "1rem"
    },
    formTable: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "50%",
    },
    formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
    },
    formControl: {
        width: "30%",
        marginBottom: theme.spacing(2),
        marginRight:"30px"
    },
    textField: {
        width: "60%",
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        height:"60px",
        width:"100px",
        fontSize: "1rem", // 원하는 크기로 조정
    },
});



class AppealRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetDate:"2023-11-21", //TODO : 추후 props로 받아오도록 해야함
            attendanceInfoId:13,// TODO : 추후 props로 받아오도록 해야함
            addOpen:false
        };

        this.attendanceHour="";
        this.attendanceMinute="";
        this.leavingHour="";
        this.leavingMinute="";
        this.reason="";

        this.reasonChange=this.reasonChange.bind(this);
        this.attendanceHourChange=this.attendanceHourChange.bind(this);
        this.attendanceMinuteChange=this.attendanceMinuteChange.bind(this);
        this.leavingHourChange=this.leavingHourChange.bind(this);
        this.leavingMinuteChange=this.leavingMinuteChange.bind(this);
        this.login=this.login.bind(this);
        this.buttonClick=this.buttonClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.submitForm=this.submitForm.bind(this);

    }
    attendanceHour;
    attendanceMinute;
    leavingHour;
    leavingMinute;
    reason;

    attendanceHourChange=(e)=>{
        this.attendanceHour=e.target.value;
    }

    attendanceMinuteChange=(e)=>{
        this.attendanceMinute=e.target.value;
    }

    leavingHourChange=(e)=>{
        this.leavingHour=e.target.value;
    }

    leavingMinuteChange=(e)=>{
        this.leavingMinute=e.target.value;
    }

    login=async ()=> {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        try {
            const login = await axios.post("http://localhost:8080/login", loginForm);
        } catch (error) {
            console.log("error 발생 !");
        }
    }

    buttonClick = ()=>{
        // this.attendanceHour="";
        // this.attendanceMinute="";
        // this.leavingHour="";
        // this.leavingMinute="";
        // this.reason="";
        this.setState({...this.state,addOpen:true});
    }

    handleClose = ()=>{
        // document.getElementById("leavingMinute").innerText="";
        // document.getElementById("leavingHour").innerText="";
        // document.getElementById("attendanceMinute").innerText="";
        // document.getElementById("attendaceHour").innerText="";
        // document.getElementById("reason").value="";

        this.setState({...this.state,addOpen:false});
    }

    submitForm = async(e) => {
        if(this.attendanceHour===""|| this.attendanceMinute===""|| this.leavingHour===""|| this.leavingMinute===""||this.reason===""){
            alert("모든 값을 입력해주세요!");
            return;
        }

        if(this.attendanceHour>this.leavingHour||
            (this.attendanceHour===this.leavingHour&&this.attendanceMinute>this.leavingMinute)){
            console.log(this.attendanceHour,this.leavingHour,this.attendanceMinute,this.leavingMinute)
            alert("출근시간은 퇴근시간보다 빨라야 합니다.")
            return;
        }

        e.preventDefault();

        const formData = new FormData();

        formData.append("reason",this.reason);
        formData.append("appealedStartTime", this.attendanceHour+":"+this.attendanceMinute+":00");
        formData.append("appealedEndTime", this.leavingHour+":"+this.leavingMinute+":00");
        formData.append("attendanceInfoId", this.state.attendanceInfoId);

        console.log("Form data:",this.reason,this.attendanceHour+":"+this.attendanceMinute+":00",this.leavingHour+":"+this.leavingMinute+":00",this.state.attendanceInfoId);

        try{
            const response = await axios.post("http://localhost:8080/employee/appeal",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            this.buttonClick();
        }catch (error){
            if (error.response.status === 400) {
                alert("400 Bad Request 잘못된 요청입니다!");
                return;
            }
            if (error.response.status === 500) {
                alert("500 Internal Server Error !");
                return;
            }
            if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
                return;
            }
        }

    };

    reasonChange = (e)=>{
        const regex = /[!@#$%^&*(),.?":{}|<>]/;
        if(regex.test(e.target.value)){
            alert("사유에 특수문자는 불가능합니다.");
            return;
        }
        this.reason=e.target.value;
        this.setState({})
    }

    componentDidMount() {
        this.login();
        console.log("로그인함");
    }

    render() {
        {console.log("리랜더링")}
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                    <DialogTitle>근태 조정 신청</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 신청 완료 하였습니다 </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box component="section">
                    <Typography variant="h3" style={{ margin: "50px", textAlign: "center" }}>
                        근태 조정 신청
                    </Typography>
                </Box>

                <form onSubmit={this.submitForm}>
                    <table className={classes.formTable}>
                        <tbody>
                        <tr>
                            <td className={classes.formCell}>대상 날짜</td>
                            <td className={classes.formCell}>
                                {this.state.targetDate}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell}>조정 출근 시간</td>
                            <td className={classes.formCell}>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="attendance-hour-label">시</InputLabel>
                                        <Select
                                            labelId="attendance-hour-label"
                                            id="attendaceHour"
                                            onChange={this.attendanceHourChange}>
                                            {[...Array(24)].map((_, index) => (
                                                <MenuItem key={index }
                                                          value={(index).toString().padStart(2, '0')}>
                                                    {`${index}시`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="attendance-minute-label">분</InputLabel>
                                        <Select
                                            labelId="attendance-minute-label"
                                            id="attendanceMinute"
                                            onChange={this.attendanceMinuteChange}>
                                            {[...Array(6)].map((_, index) => (
                                                <MenuItem key={index*10}
                                                          value={(index*10).toString().padStart(2, '0')}>
                                                    {`${index*10}분`}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </div>

                            </td>
                        </tr>

                        <tr>
                            <td className={classes.formCell}>조정 퇴근 시간</td>
                            <td className={classes.formCell}>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="leaving-hour-label">시</InputLabel>
                                        <Select
                                            labelId="leaving-hour-label"
                                            id="leavingHour"
                                            onChange={this.leavingHourChange}>
                                            {[...Array(24)].map((_, index) => (
                                                <MenuItem key={index}
                                                          value={(index).toString().padStart(2, '0')}>
                                                    {`${index}시`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="minute-label">분</InputLabel>
                                        <Select
                                            labelId="minute-label"
                                            id="leavingMinute"
                                            onChange={this.leavingMinuteChange}>
                                            {[...Array(6)].map((_, index) => (
                                                <MenuItem key={index*10}
                                                          value={(index*10).toString().padStart(2, '0')}>
                                                    {`${index*10}분`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.formCell}>사유</td>
                            <td className={classes.formCell}>
                                {<TextFieldComponent id="reason" label={"사유"}  onChange={this.reasonChange} value={this.reason}/>}

                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell} colSpan={4} style={{ textAlign: "center" }}>
                                <div>
                                    <ButtonComponent type="submit" onButtonClick={this.submitForm} title={"신청"}/>

                                    {/*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*/}
                                    <RedButtonComponent title={"취소"}/>

                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(AppealRequest);
