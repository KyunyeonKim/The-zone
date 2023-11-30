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
import ButtonComponent from "./ButtonComponent";
import RedButtonComponent from "./RedButtonComponent";
import TextFieldComponent from "./TextFieldComponent";


const styles = (theme) => ({
    root: {
        padding: theme.spacing(4),
        textAlign: "center",
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
        width: "60%",
        marginBottom: theme.spacing(2),
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


class VacationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endDate:"",
            addOpen:false,
            remainVacation:""
        };

        //TODO : props로 시작날짜 받아와야함
        this.startDate="2023-11-21",
        this.vacationType="";
        this.reason="";
        this.vacationCount="";
        this.getData="";

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
    getData;

    remainVacation


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
            console.log("this.remainVacation : ",this.remainVacation);
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

        if(this.vacationCount===""){
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
        const regex = /[!@#$%^&*(),.?":{}|<>]/;
        if(regex.test(e.target.value)){
            alert("사유에 특수문자는 불가능합니다.");
            return;
        }
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
        this.getData = e.target.value;
        const inputValue = this.getData !== "" ? parseInt(this.getData) : "";

        if (isNaN(inputValue)) {
            alert("개수에 0 이상의 정수 데이터를 입력하세요!");
            return;
        }

        if (inputValue > this.state.remainVacation) {
            alert("존재 연차 개수보다 작게 입력해주세요");
            return;
        }

        if(inputValue>0){
            this.vacationCount= inputValue;
            this.setState({
                endDate: this.addDays(this.startDate, inputValue)
            })

        }
        else {
            this.vacationCount= "";
            this.setState({
                endDate:""
            });
        }
    };

    async componentDidMount() {
        await this.login();
        console.log("로그인함");
        this.getRemainVacationCount();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 신청</DialogTitle>
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
                        연차 신청
                    </Typography>
                </Box>
                <form onSubmit={this.submitForm}>
                    <table className={classes.formTable}>
                        <tbody>
                        <tr>
                            <td className={classes.formCell}>연차 종류</td>
                            <td className={classes.formCell}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="vacation-type-label">연차 종류</InputLabel>
                                    <Select
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
                            <td className={classes.formCell}>연차 개수</td>
                            <td className={classes.formCell}>
                                <TextFieldComponent label={"연차 개수"} onChange={this.inputCountChange}/>
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
                            <td className={classes.formCell}>남은 연차</td>
                            <td className={classes.formCell}>
                                {/*{this.state.remainVacation}*/}
                                {console.log("안에있는 함수 : ",this.remainVacation)}
                                {this.state.remainVacation}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell}>연차 날짜</td>
                            <td className={classes.formCell}>
                                시작 날짜: {this.startDate}&nbsp;&nbsp;&nbsp;
                                끝 날짜:{this.state.endDate}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell}>사유</td>
                            <td className={classes.formCell}>
                                <TextFieldComponent label={"사유"} onChange={this.changeReason}/>

                                {/*<TextField*/}
                                {/*    className={classes.textField}*/}
                                {/*    label="사유"*/}
                                {/*    value={this.state.reason}*/}
                                {/*    onChange={(e) => changeReason(e)}*/}
                                {/*/>*/}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell} colSpan={4} style={{ textAlign: "center" }}>
                                <div>
                                    {/*<Button*/}
                                    {/*    type="submit"*/}
                                    {/*    className={classes.button}*/}
                                    {/*    variant="contained"*/}
                                    {/*    color="primary"*/}
                                    {/*    style={{ marginRight: "50px" }}*/}
                                    {/*>*/}
                                    {/*    신청*/}
                                    {/*</Button>*/}

                                    <ButtonComponent
                                        type="submit"
                                        onButtonClick={this.submitForm}
                                        title={"신청"}
                                    />

                                    {/*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*/}
                                    <RedButtonComponent
                                        title={"취소"}
                                    />

                                    {/*<Button*/}
                                    {/*    type="button"*/}
                                    {/*    className={classes.button}*/}
                                    {/*    variant="contained"*/}
                                    {/*    color="secondary"*/}
                                    {/*>*/}
                                    {/*    취소*/}
                                    {/*</Button>*/}
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

export default withStyles(styles)(VacationRequest);