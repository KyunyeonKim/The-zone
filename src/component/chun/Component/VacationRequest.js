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
import TextFieldComponent from "./TextFieldComponent";
import AddButtonComponent from "./Button/AddButtonComponent";
import BlackButtonComponent from "./Button/BlackButtonComponent";


const styles = (theme) => ({

    formTable: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "45%",
        borderTop:"2px solid black"
    },
    formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        fontSize:'15px',
        fontFamily: 'Noto Sans KR, sans-serif',
        textAlign: 'center'
    },
    formControl: {
        width: "60%",
        marginBottom: theme.spacing(2),

    },
    tableCellIndexText:{
        fontSize:'15px',
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

// 추후 onchange 바꿀 것


class VacationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endDate:"",
            addOpen:false,
            remainVacation:"",
            getData:""
        };

        //TODO : props로 시작날짜 받아와야함
        this.startDate="2023-11-21",
        this.vacationType="";
        this.reason="";
        this.vacationCount="";
        // this.getData="";

        // this.remainVacation="";


        this.login=this.login.bind(this);
        this.getRemainVacationCount = this.getRemainVacationCount.bind(this);
        this.buttonClick=this.buttonClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.changeReason=this.changeReason.bind(this);
        this.vacationTypeChange=this.vacationTypeChange.bind(this);
        this.addDays = this.addDays.bind(this);
        this.inputCountChange=this.inputCountChange.bind(this);

    }
    startDate;
    vacationType;
    reason;
    vacationCount;
    // getData;


    login=async()=> {
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

    getRemainVacationCount = async () => {
        try {
            const getRemainVacation = await axios.get(
                `http://localhost:8080/employee/vacation/remain/request`
            );
            // 데이터를 가져온 후에 상태를 업데이트
            // this.remainVacation=getRemainVacation.data;
            console.log("this.remainVacation : ",getRemainVacation.data);
            this.setState({ remainVacation: getRemainVacation.data }); // 변경된 부분
        } catch (error) {
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
            }
            if (error.response.status === 500) {
                alert("500 Internal Server Error !");
            }
            if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
            }
        }
    };

    buttonClick = ()=>{
        this.setState({addOpen:true});
    }

    handleClose = ()=>{
        this.setState({addOpen:false});
    }

    submitForm = async(e) => {

        if(this.state.getData===""){
            alert("신청 연차 개수를 입력하세요");
            return;
        }

        if(this.vacationType===""||this.vacationType===null){
            alert("신청 연차 종류를 선택하세요");
            return;
        }

        if(this.reason===""||this.reason===null){
            alert("신청 사유를 입력하세요");
            return;
        }

        e.preventDefault();

        const formData = new FormData();
        formData.append("vacationCategoryKey", this.vacationType);
        formData.append("vacationQuantity", this.vacationCount);
        formData.append("reason", this.reason);
        formData.append("vacationStartDate", this.startDate);
        formData.append("vacationEndDate", this.state.endDate);


        console.log("Form data:", this.vacationType,this.vacationCount,this.reason,this.startDate,this.state.endDate);
        //서버 요청 보낼 것

        try{
            const response = await axios.post("http://localhost:8080/employee/vacation",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            this.buttonClick();
        }catch (error){
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
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

   changeReason = (e)=>{
         this.reason=e.target.value;
    };


    vacationTypeChange = (e) => {
        this.vacationType=e.target.value;
    };

    addDays = (date, days) => {
        const addedDate = new Date(date);
        addedDate.setDate(addedDate.getDate() + days-1);

        const year = addedDate.getFullYear();
        const month = String(addedDate.getMonth() + 1).padStart(2, "0");
        const day = String(addedDate.getDate()).padStart(2, "0");

        this.setState({ endDate: `${year}-${month}-${day}` });
        console.log(`${year}-${month}-${day}`);
        return `${year}-${month}-${day}`;
    };

    inputCountChange = (e) => {
        const inputValue = e.target.value;
        // this.state.getData = e.target.value;
        if (inputValue === "") {
            this.vacationCount ="";
            this.setState({
                getData: "",
                endDate: "",
            });
            alert("개수에 0 이상의 정수 데이터를 입력하세요!");
            return;
        }

        const parsedValue = parseInt(inputValue);

        if (isNaN(parsedValue)) {
            this.vacationCount ="";
            this.setState({
                getData: "",
                endDate: "",
            });
            alert("개수에 0 이상의 정수 데이터를 입력하세요!");
            return;
        }
        if (parsedValue > this.state.remainVacation) {
            this.vacationCount ="";
            this.setState({
                getData: "",
                endDate: "",
            });
            alert("존재 연차 개수보다 작게 입력해주세요");
            return;
        }

        if (parsedValue > 0) {
            this.vacationCount = parsedValue;
            this.setState({
                getData: inputValue,
                endDate: this.addDays(this.startDate, parsedValue),
            });
        }
        // } else {
        //     this.setState({
        //         getData: "",
        //         vacationCount: "",
        //         endDate: "",
        //     });
        // }

        //
        // if (inputValue > this.state.remainVacation) {
        //     this.state.getData="";
        //     alert("존재 연차 개수보다 작게 입력해주세요");
        //
        //     return;
        // }
        //
        // if(inputValue>0){
        //     this.vacationCount= inputValue;
        //     this.setState({
        //         endDate: this.addDays(this.startDate, inputValue)
        //     })
        //
        // }
        // else {
        //     this.vacationCount= "";
        //     this.setState({
        //         endDate:""
        //     });
        // }
    };

    async componentDidMount() {
        await this.login();
        console.log("로그인함");
        this.getRemainVacationCount();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 신청</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 신청 완료 하였습니다 </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <BlackButtonComponent onButtonClick={this.handleClose} title={"닫기"}>
                        </BlackButtonComponent>
                    </DialogActions>
                </Dialog>

                <Box>
                    <Box
                        sx={{fontSize:'20px', fontFamily: 'Noto Sans KR, sans-serif', fontWeight:'bold', borderBottom:'solid 1px black',  margin: '20px 0 20px 0',
                            paddingBottom: '10px'
                        }} >
                        연차 신청
                    </Box>

                    <Box>
                        <form onSubmit={this.submitForm}>
                            <table className={classes.formTable}>
                                <tbody>
                                    <tr>
                                        <td className={classes.tableCellIndexText}>연차 종류</td>
                                        <td className={classes.formCell}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="vacation-type-label">연차 종류</InputLabel>
                                                <Select
                                                    style={{height:"50px"}}
                                                    labelId="vacation-type-label"
                                                    id="vacation-type"
                                                    onChange={this.vacationTypeChange}
                                                >
                                                    {/*TODO: 백엔드의 연차 종류 데이터를 value 등에 넣도록 수정할것*/}
                                                    <MenuItem value={"a"}>경조사</MenuItem>
                                                    <MenuItem value={"medical"}>병가</MenuItem>
                                                    <MenuItem value={"vacation"}>휴가</MenuItem>


                                                </Select>
                                            </FormControl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.tableCellIndexText}>연차 개수</td>
                                        <td className={classes.formCell}>
                                            <TextFieldComponent label={"연차 개수"} onChange={this.inputCountChange}
                                             value={this.state.getData}/>
                                            {/*<TextField*/}
                                            {/*    className={classes.textField}*/}
                                            {/*    label="연차 개수"*/}
                                            {/*    value={this.state.vacationCount}*/}
                                            {/*    onChange={(e) => {*/}
                                            {/*        inputCountChange(e, e.target.value);*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.tableCellIndexText}>남은 연차</td>
                                        <td className={classes.formCell}>
                                            {/*{this.state.remainVacation}*/}
                                            {this.state.remainVacation}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.tableCellIndexText}>연차 날짜</td>
                                        <td className={classes.formCell}>
                                            시작 날짜: {this.startDate}&nbsp;&nbsp;&nbsp;
                                            끝 날짜:{this.state.endDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.tableCellIndexText}>사유</td>
                                        <td className={classes.formCell}>
                                            <TextFieldComponent label={"사유"} onChange={this.changeReason}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  colSpan={4}  style={{ textAlign: "center", backgroundColor:"#F9F9F9",padding: "20px 0 20px 0" }}>
                                            <Box style={{display:'flex',justifyContent:'space-evenly'}}>
                                                {/*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*/}
                                                <BlackButtonComponent
                                                    title={"취소"}
                                                />

                                                <AddButtonComponent
                                                    type="submit"
                                                    onButtonClick={this.submitForm}
                                                    title={"신청"}
                                                />

                                            </Box>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(VacationRequest);