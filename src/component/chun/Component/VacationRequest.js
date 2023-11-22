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
            vacationType: "",
            vacationCount: "",
            remainVacation: "",
            startDate:"", //추후 props로 시작 날짜 받아와야함
            endDate:"",
            reason:"",
            addOpen:false

        };
    }

    async componentDidMount() {
        await this.login();
        console.log("로그인함");

        // 데이터를 가져오는 것은 componentDidMount에서 수행
        await this.getRemainVacationCount();

    }

    async login() {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        try {
            const login = await axios.post("http://localhost:8080/login", loginForm);
            this.setState({ startDate:"2023-11-21" }); //startDate를 하드코딩
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
            return;
        }
    };

    buttonClick = ()=>{
        this.setState({addOpen:true});
    }

    handleClose = ()=>{
        this.setState({addOpen:false});
    }

    submitForm = async(e) => {

        if(this.state.vacationCount===""){
            alert("신청 연차 개수를 입력하세요");
            return;
        }

        if(this.state.vacationType===""||this.state.vacationType===null){
            alert("신청 연차 종류를 선택하세요");
            return;
        }

        if(this.state.reason===""||this.state.reason===null){
            alert("신청 사유를 입력하세요");
            return;
        }

        e.preventDefault();

        const formData = new FormData();
        formData.append("vacationCategoryKey", this.state.vacationType);
        formData.append("vacationQuantity", this.state.vacationCount);
        formData.append("reason", this.state.reason);
        formData.append("vacationStartDate", this.state.startDate);
        formData.append("vacationEndDate", this.state.endDate);


        console.log("Form data:", this.state.vacationType,this.state.vacationCount,this.state.reason,this.state.startDate,this.state.endDate);
        //서버 요청 보낼 것

        try{
            const response = await axios.post("http://localhost:8080/employee/vacation",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            this.buttonClick();
            this.setState({vacationType:"",vacationCount:"",reason:"",endDate:"",remainVacation:this.state.remainVacation-this.state.vacationCount});
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

    render() {
        const { classes } = this.props;
        const vacationTypeChange = async (event) => {
            await this.setState({ vacationType: event.target.value });
        };

        const addDays = (date, days) => {
            const addedDate = new Date(date);
            addedDate.setDate(addedDate.getDate() + days);

            const year = addedDate.getFullYear();
            const month = String(addedDate.getMonth() + 1).padStart(2, "0");
            const day = String(addedDate.getDate() - 1).padStart(2, "0");

            this.setState({ endDate: `${year}-${month}-${day}` });
            return `${year}-${month}-${day}`;
        };

        const inputCountChange = (e, data) => {
            const inputValue = data !== "" ? parseInt(data) : "";

            if (isNaN(inputValue)) {
                alert("개수에 0 이상의 정수 데이터를 입력하세요!");
                return;
            }

            if (inputValue > this.state.remainVacation) {
                alert("존재 연차 개수보다 작게 입력해주세요");
            }

            if(inputValue>0){
                this.setState({
                    vacationCount: inputValue,
                    endDate: addDays(this.state.startDate, inputValue)
                })
            }
            else {
                this.setState({
                    vacationCount: "",
                    endDate:""
                });
            }
        };

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
                                        value={this.state.vacationType}
                                        onChange={(e) => vacationTypeChange(e)}
                                    >
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
                                <TextField
                                    className={classes.textField}
                                    label="연차 개수"
                                    value={this.state.vacationCount}
                                    onChange={(e) => {
                                        inputCountChange(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell}>남은 연차</td>
                            <td className={classes.formCell}>
                                {this.state.remainVacation}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell}>연차 날짜</td>
                            <td className={classes.formCell}>
                                시작 날짜: {this.state.startDate}&nbsp;&nbsp;&nbsp;
                                끝 날짜:{this.state.endDate}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.formCell}>사유</td>
                            <td className={classes.formCell}>
                                <TextField
                                    className={classes.textField}
                                    label="사유"
                                    value={this.state.reason}
                                    onChange={(e) => {
                                        this.setState({ reason: e.target.value });
                                    }}
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

export default withStyles(styles)(VacationRequest);