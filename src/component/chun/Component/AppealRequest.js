
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
    TextField,
    Select,
    MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


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

// 추후 onchange 바꿀 것


class AppealRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetDate:"", //추후 props로 받아오도록 해야함
            attendanceInfoId:"",// 추후 props로 받아오도록 해야함
            reason:"",
            inputAttendanceHour:"",
            inputAttendanceMinute:"",
            inputLeavingHour:"",
            inputLeavingMinute:""
        };
    }

    login=async ()=> {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        try {
            const login = await axios.post("http://localhost:8080/login", loginForm);
            this.setState({ targetDate:"2023-11-21" ,attendanceInfoId:13}); //targetDate,attendanceInfoId 하드코딩
        } catch (error) {
            console.log("error 발생 !");
        }
    }

    buttonClick = ()=>{
        this.setState({addOpen:true});
    }

    handleClose = ()=>{
        this.setState({addOpen:false});
    }

    submitForm = async(e) => {

        if(this.state.inputAttendanceHour===""||
            this.state.inputAttendanceMinute===""||
            this.state.inputLeavingHour===""||
            this.state.inputLeavingMinute===""||
            this.state.reason===""){
            alert("모든 값을 입력해주세요!");
            return;
        }

        if(this.state.inputAttendanceHour>this.state.inputLeavingHour||
            (this.state.inputAttendanceHour===this.state.inputLeavingHour&&this.state.inputAttendanceMinute>this.state.inputLeavingMinute)){
            console.log(this.state.inputAttendanceHour,this.state.inputLeavingHour,this.state.inputAttendanceMinute,this.state.inputLeavingMinute)
            alert("출근시간은 퇴근시간보다 빨라야 합니다.")
            return;
        }


        e.preventDefault();

        const formData = new FormData();

        formData.append("reason", this.state.reason);
        formData.append("appealedStartTime", this.state.inputAttendanceHour+":"+this.state.inputAttendanceMinute+":00");
        formData.append("appealedEndTime", this.state.inputLeavingHour+":"+this.state.inputLeavingMinute+":00");
        formData.append("attendanceInfoId", this.state.attendanceInfoId);


        console.log("Form data:",this.state.reason,this.state.inputAttendanceHour+":"+this.state.inputAttendanceMinute+":00",this.state.inputLeavingHour+":"+this.state.inputLeavingMinute+":00",this.state.attendanceInfoId);
        //서버 요청 보낼 것

        try{
            const response = await axios.post("http://localhost:8080/employee/appeal",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            this.buttonClick();
            this.setState({reason:"",inputAttendanceHour:"",inputAttendanceMinute:"",inputLeavingHour:"",inputLeavingMinute: ""});

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

    componentDidMount() {
        this.login();
        console.log("로그인함");
    }

    render() {

        const { classes } = this.props;

        const reasonChange = (e)=>{
            const regex = /[!@#$%^&*(),.?":{}|<>]/;
            if(regex.test(e.target.value)){
                alert("사유에 특수문자는 불가능합니다.");
                return;
            }
            this.setState({ reason: e.target.value },()=>{
                console.log(this.state);
            });




        }

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
                                            value={this.state.inputAttendanceHour}
                                            onChange={(e) => {
                                                this.setState({inputAttendanceHour:e.target.value})
                                            }}
                                        >
                                            {[...Array(24)].map((_, index) => (
                                                <MenuItem key={index + 1}
                                                          value={(index + 1).toString().padStart(2, '0')}>
                                                    {`${index + 1}시`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="attendance-minute-label">분</InputLabel>
                                        <Select
                                            labelId="attendance-minute-label"
                                            id="attendanceMinute"
                                            value={this.state.inputAttendanceMinute}
                                            onChange={(e) =>{
                                                this.setState({inputAttendanceMinute:e.target.value})
                                            }}
                                        >
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
                                        <InputLabel id="leving-hour-label">시</InputLabel>
                                        <Select
                                            labelId="leaving-hour-label"
                                            id="levingHour"
                                            value={this.state.inputLeavingHour}
                                            onChange={(e) => {
                                                this.setState({inputLeavingHour:e.target.value})
                                            }}
                                        >
                                            {[...Array(24)].map((_, index) => (
                                                <MenuItem key={index + 1}
                                                          value={(index + 1).toString().padStart(2, '0')}>
                                                    {`${index + 1}시`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="minute-label">분</InputLabel>
                                        <Select
                                            labelId="minute-label"
                                            id="minute"
                                            value={this.state.inputLeavingMinute}
                                            onChange={(e) => {
                                                this.setState({inputLeavingMinute:e.target.value})
                                            }}
                                        >
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
                                <TextField
                                    className={classes.textField}
                                    label="사유"
                                    value={this.state.reason}
                                    onChange={(e) => reasonChange(e)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell} colSpan={4} style={{ textAlign: "center" }}>
                                <div>
                                    <Button
                                        type="submit"
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: "50px" }}
                                    >
                                        신청
                                    </Button>

                                    <Button
                                        type="button"
                                        className={classes.button}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        취소
                                    </Button>
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