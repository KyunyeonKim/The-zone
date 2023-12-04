
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
import TextFieldComponent from "./TextFieldComponent";
import AddButtonComponent from "./Button/AddButtonComponent";
import BlackButtonComponent from "./Button/BlackButtonComponent";


const styles = (theme) => ({
    formTable: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "45%",
        borderTop:"2px solid black",
        height:"600px"

    },
    formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        fontSize:'18px',
        fontFamily: 'Noto Sans KR, sans-serif',
        textAlign: 'center'
    },
    formControl: {
        width: "30%",
        marginBottom: theme.spacing(2),
        marginRight:"30px",
        height:"50px"
    },
    tableCellIndexText:{
        fontSize:'18px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight:'bold',
        border: "1px solid gray",
        backgroundColor:"#C2DCF0",
        textAlign: "right",
        paddingRight: '15px',
        width:"30%",
        whiteSpace: 'nowrap'
    }

});



class AppealRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetDate:"2023-11-21", //TODO : 추후 props 이용
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
        this.setState({...this.state,addOpen:true});
    }

    handleClose = ()=>{
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
        this.reason=e.target.value;
    }

    componentDidMount() {
        this.login();
        console.log("로그인함");
    }

    render() {
        {console.log("리랜더링")}
        const { classes } = this.props;
        return (
            <>
                <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                    <DialogTitle>근태 조정 신청</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 신청 완료 하였습니다 </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <BlackButtonComponent onButtonClick={this.handleClose} title={"닫기"} />
                    </DialogActions>
                </Dialog>

                <Box>
                    <Box
                        sx={{fontSize:'20px', fontFamily: 'Noto Sans KR, sans-serif', fontWeight:'bold', borderBottom:'solid 1px black',  margin: '20px 0 20px 0',
                            paddingBottom: '10px'
                        }} >
                        근태 조정 요청
                    </Box>

                    <Box>
                        <form onSubmit={this.submitForm}>
                            <table className={classes.formTable}>
                                <tbody>
                                <tr>
                                    <td className={classes.tableCellIndexText}>대상 날짜</td>
                                    <td className={classes.formCell}>
                                        {this.state.targetDate}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.tableCellIndexText}>조정 출근 시간</td>
                                    <td className={classes.formCell}>
                                        <Box>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="attendance-hour-label">시</InputLabel>
                                                <Select
                                                    style={{height:"50px"}}
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
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="attendance-minute-label">분</InputLabel>
                                                <Select
                                                    style={{height:"50px"}}
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
                                        </Box>

                                    </td>
                                </tr>

                                <tr>
                                    <td className={classes.tableCellIndexText}>조정 퇴근 시간</td>
                                    <td className={classes.formCell}>
                                        <Box>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="leaving-hour-label">시</InputLabel>
                                                <Select
                                                    style={{height:"50px"}} //드롭다운의 크기는 formControl에서 못하고, select에 직접 명시해야함
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

                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="minute-label">분</InputLabel>
                                                <Select
                                                    style={{height:"50px"}}
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
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={classes.tableCellIndexText}>사유</td>
                                    <td className={classes.formCell}>
                                        <TextFieldComponent id="reason" label={"사유"}  onChange={this.reasonChange}/>

                                    </td>
                                </tr>
                                <tr>
                                    <td  colSpan={4} style={{ textAlign: "center", backgroundColor:"#F9F9F9",padding: "20px 0 20px 0" }}>
                                        <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                            {/*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*/}
                                            <BlackButtonComponent title={"취소"}/>
                                            <AddButtonComponent type="submit" onButtonClick={this.submitForm} title={"신청"}/>
                                        </Box>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </Box>
                </Box>
        </>
        );
    }
}

export default withStyles(styles)(AppealRequest);
