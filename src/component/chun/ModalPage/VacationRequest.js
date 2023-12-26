import React, {Component} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import TextFieldComponent from "../Component/TextFieldComponent";
import BlackButtonComponent from "../Component/Button/BlackButtonComponent";
import Grid from "@material-ui/core/Grid";
import {stateStore} from "../../../index";
import SettingButtonComponent from "../Component/Button/SettingButtonComponent";
import {Alert} from "@material-ui/lab";


// const {closeModal} = this.props
const styles = (theme) => ({
    formTable: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "70%",
        borderTop: "2px solid black",
        height: "700px",
        marginTop: "20px",
        marginBottom:"40px"
    },
    formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        fontSize: '18px',
        fontFamily:'IBM Plex Sans KR',
        textAlign: 'center'
    }, formControl: {
        width: "60%", marginBottom: theme.spacing(2),
    }, textField: {
        width: "60%", marginBottom: theme.spacing(2),
    }, button: {
        marginTop: theme.spacing(2), height: "60px", width: "100px", fontSize: "1rem", // 원하는 크기로 조정
    }, text: {
        fontSize: '18px', fontFamily:'IBM Plex Sans KR'
    }, titleText: {
        fontSize: '18px', fontFamily:'IBM Plex Sans KR', fontWeight: 'bold'
    }, tableCellIndexText: {
        fontSize: '18px',
        fontFamily:'IBM Plex Sans KR',
        fontWeight: 'bold',
        border: "1px solid gray",
        backgroundColor: "#F2F2F2",
        textAlign: "right",
        paddingRight: '15px',
        width: "35%",
        whiteSpace: 'nowrap'
    }
});

// 추후 onchange 바꿀 것


class VacationRequest extends Component {
    startDate;
    vacationType;
    reason;
    vacationCount;

    constructor(props) {
        super(props);
        this.state = {
            endDate: "", addOpen: false, remainVacation: "", getData: "", isDialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
            maxCountSnackbarOpen:false,
            canUseCountSnackbarOpen:false,
            canOnlyNumberSnackbarOpen:false,
            mustInputReasonSnackbarOpen:false
        };

        let dateObject = this.props.args[2]
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고 두 자릿수로 만듦
        const day = dateObject.getDate().toString().padStart(2, '0');

        //TODO : props로 시작날짜 받아와야함
        this.startDate = `${year}-${month}-${day}`;
        this.reason = "";
        this.vacationCount = "";
        this.vacationType="";
        // this.getData="";

        // this.remainVacation="";


        // this.login = this.login.bind(this);
        this.getRemainVacationCount = this.getRemainVacationCount.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.changeReason = this.changeReason.bind(this);
        this.vacationTypeChange = this.vacationTypeChange.bind(this);
        this.addDays = this.addDays.bind(this);
        this.inputCountChange = this.inputCountChange.bind(this);

        this.handleMaxCountSnackbarOpen=this.handleMaxCountSnackbarOpen.bind(this);
        this.handleMaxCountSnackbarOpenClose=this.handleMaxCountSnackbarOpenClose.bind(this);
        this.handleCanUseCountSnackbarOpen=this.handleCanUseCountSnackbarOpen.bind(this);
        this.handleCanUseCountSnackbarOpenClose=this.handleCanUseCountSnackbarOpenClose.bind(this);
        this.handleCanOnlyNumberSnackbarOpen=this.handleCanOnlyNumberSnackbarOpen.bind(this);
        this.handleCanOnlyNumberSnackbarOpenClose=this.handleCanOnlyNumberSnackbarOpenClose.bind(this);
        this.handleMustInputReasonSnackbarOpen=this.handleMustInputReasonSnackbarOpen.bind(this);
        this.handleMustInputReasonSnackbarOpenClose=this.handleMustInputReasonSnackbarOpenClose.bind(this);
    }

    handleMustInputReasonSnackbarOpen=()=>{
        this.setState({mustInputReasonSnackbarOpen:true})
    }

    handleMustInputReasonSnackbarOpenClose=()=>{
        this.setState({mustInputReasonSnackbarOpen:false})
    }

    handleMaxCountSnackbarOpen=()=>{
        this.setState({maxCountSnackbarOpen:true, getData: "", endDate: ""});
    }

    handleMaxCountSnackbarOpenClose=()=>{
        this.setState({maxCountSnackbarOpen:false});
    }

    handleCanUseCountSnackbarOpen=()=>{
        this.setState({canUseCountSnackbarOpen:true,getData: "", endDate: "" });
    }

    handleCanUseCountSnackbarOpenClose=()=>{
        this.setState({canUseCountSnackbarOpen:false});
    }

    handleCanOnlyNumberSnackbarOpen=()=>{
        this.setState({canOnlyNumberSnackbarOpen:true, getData: "", endDate: ""});
    }

    handleCanOnlyNumberSnackbarOpenClose=()=>{
        this.setState({canOnlyNumberSnackbarOpen:false});
    }
    // getData;

    showDialog = (title, message) => {
        this.setState({
            isDialogOpen: true,
            dialogTitle: title,
            dialogMessage: message,
        });
    };

    handleDialogClose = () => {
        // this.setState({
        //     isDialogOpen: false,
        //     dialogTitle: '',
        //     dialogMessage: '',
        // });
        this.props.args[0]();
    };

    getRemainVacationCount = async () => {
        try {
            const getRemainVacation = await axios.get(`http://localhost:8080/employee/vacation/remain/request`);
            // 데이터를 가져온 후에 상태를 업데이트
            // this.remainVacation=getRemainVacation.data;
            //console.log("this.remainVacation : ", getRemainVacation.data);
            this.setState({remainVacation: getRemainVacation.data}); // 변경된 부분
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 500) {
                this.setState({
                    isDialogOpen: true, dialogMessage: "신청에 실패하였습니다. 나중에 다시 신청해주세요",
                });
                return;
            }
            if (error.response.status === 403) {
                this.setState({
                    isDialogOpen: true, dialogMessage: "권한이 없는 작업 요청입니다. 로그인 정보를 다시 확인해주세요",
                });
                return;
            }
        }
    };

    buttonClick = () => {
        this.setState({addOpen: true});
    }

    handleClose = () => {
        this.props.args[0]()
        stateStore.chartContainerStateSet.setState({...stateStore.chartContainerStateSet.state})
        stateStore.vacationChartStateSet.setState({...stateStore.vacationChartStateSet.state})
        this.setState({addOpen: false});
    }

    submitForm = async (e) => {
        e.preventDefault();

        if(!/^[1-9][0-9]*$/.test(this.state.getData)){
            this.handleCanOnlyNumberSnackbarOpen();
            return;
        }

        if (this.reason === "" || this.reason === null) {
            this.handleMustInputReasonSnackbarOpen();
            return;
        }

        if (this.state.getData > this.state.remainVacation) {
            this.handleMaxCountSnackbarOpen();
            return;
        }

        if (this.state.getData > this.props.args[1]) {
            this.handleCanUseCountSnackbarOpen();
            return;
        }


        const formData = new FormData();
        formData.append("vacationCategoryKey", 'undefined');
        formData.append("vacationQuantity", this.state.getData);
        formData.append("reason", this.reason);
        formData.append("vacationStartDate", this.startDate);
        formData.append("vacationEndDate", this.state.endDate);


        //console.log("Form data:", this.vacationType, this.vacationCount, this.reason, this.startDate, this.state.endDate);
        //서버 요청 보낼 것

        try {
            const response = await axios.post("http://localhost:8080/employee/vacation", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            stateStore.calendarContainerStateSet.setState(this.props.args[2].getFullYear(), (this.props.args[2].getMonth() + 1).toString().padStart(2, '0'), new Date(this.props.args[2]))
            this.buttonClick();
        } catch (error) {
            let errorMessage = "Error";
            if (error.response) {
                switch (error.response.status) {
                    case 400: errorMessage = "400 잘못된 요청입니다"; break;
                    case 500: errorMessage = "500 Internal Server Error!"; break;
                    case 403: errorMessage = "403 Forbidden - Access denied!"; break;
                    case 409: errorMessage = "이미 진행 중인 요청이 있습니다(409)"; break;
                }
            } else {
                errorMessage = "An unexpected error occurred!";
            }
            this.showDialog("Error", errorMessage);
        }

    };

    changeReason = (e) => {
        this.reason = e.target.value;
    };


    vacationTypeChange = (e) => {
        this.vacationType = e.target.value;
    };

    addDays = (date, days) => {
        if(isNaN(days)||days===0){
            return "";
        }
        else{
            const addedDate = new Date(date);
            addedDate.setDate(addedDate.getDate() + days - 1);

            const year = addedDate.getFullYear();
            const month = String(addedDate.getMonth() + 1).padStart(2, "0");
            const day = String(addedDate.getDate()).padStart(2, "0");

            // this.setState({endDate: `${year}-${month}-${day}`});

            return `${year}-${month}-${day}`;
        }

    };

    inputCountChange = (e) => {
        const inputValue = e.target.value;
        const parsedValue = parseInt(inputValue);


        this.setState({
            getData: parsedValue,
            endDate: this.addDays(this.startDate, parsedValue)
        });

    };

    async componentDidMount() {
        // await this.login();
        // //console.log("로그인함");
        this.getRemainVacationCount();
    }

    render() {
        const {classes} = this.props;
        const {dialogOpen, dialogTitle, dialogMessage} = this.state;
        return (
            <Grid item lg={12}>

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.mustInputReasonSnackbarOpen} autoHideDuration={2000} onClose={this.handleMustInputReasonSnackbarOpenClose}>
                    <Alert onClose={this.handleMustInputReasonSnackbarOpenClose} severity="warning">
                        신청 사유를 입력하세요!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.canOnlyNumberSnackbarOpen} autoHideDuration={2000} onClose={this.handleCanOnlyNumberSnackbarOpenClose}>
                    <Alert onClose={this.handleCanOnlyNumberSnackbarOpenClose} severity="warning">
                        개수에 0보다 큰 정수 데이터를 입력하세요!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.maxCountSnackbarOpen} autoHideDuration={2000} onClose={this.handleMaxCountSnackbarOpenClose}>
                    <Alert onClose={this.handleMaxCountSnackbarOpenClose} severity="warning">
                        존재 연차 개수보다 작게 입력해주세요!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.canUseCountSnackbarOpen} autoHideDuration={2000} onClose={this.handleCanUseCountSnackbarOpenClose}>
                    <Alert onClose={this.handleCanUseCountSnackbarOpenClose} severity="warning">
                        최대 사용 연차 개수보다 작게 입력해주세요!
                    </Alert>
                </Snackbar>

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

                <Box style={{width:'1200px'}}>
                    <Box
                        sx={{
                            width:"90%",
                            fontSize: '30px',
                            fontFamily:'IBM Plex Sans KR',
                            fontWeight: 'bold',
                            borderBottom: 'solid 1px black',
                            margin: 'auto',
                            padding: '10px 0px 10px 0px',

                        }}>
                        연차 신청
                    </Box>

                    <Box>
                        <form onSubmit={this.submitForm}>
                            <table className={classes.formTable}>
                                <tbody>
                                {/*<tr>*/}
                                {/*    <td className={classes.tableCellIndexText}>연차 종류</td>*/}
                                {/*    <td className={classes.formCell}>*/}
                                {/*        <FormControl className={classes.formControl}>*/}
                                {/*            <InputLabel id="vacation-type-label">연차 종류</InputLabel>*/}
                                {/*            <Select*/}
                                {/*                labelId="vacation-type-label"*/}
                                {/*                id="vacation-type"*/}
                                {/*                onChange={this.vacationTypeChange}*/}
                                {/*            >*/}
                                {/*                /!*TODO: 백엔드의 연차 종류 데이터를 value 등에 넣도록 수정할것*!/*/}
                                {/*                <MenuItem value={"a"}>경조사</MenuItem>*/}
                                {/*                <MenuItem value={"medical"}>병가</MenuItem>*/}
                                {/*                <MenuItem value={"vacation"}>휴가</MenuItem>*/}


                                {/*            </Select>*/}
                                {/*        </FormControl>*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td className={classes.tableCellIndexText}>연차 개수</td>*/}
                                {/*    <td className={classes.formCell}>*/}
                                {/*        <TextFieldComponent label={"연차 개수"} onChange={this.inputCountChange}*/}
                                {/*                            value={this.state.getData}/>*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td className={classes.tableCellIndexText}>남은 연차 / 최대 사용 가능 개수</td>*/}
                                {/*    <td className={classes.formCell}>*/}
                                {/*        /!*{this.state.remainVacation}*!/*/}
                                {/*        {this.state.remainVacation} / {this.props.args[1] > this.state.remainVacation ? this.props.args[1] : this.state.remainVacation}*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td className={classes.tableCellIndexText}>연차 날짜</td>*/}
                                {/*    <td className={classes.formCell}>*/}
                                {/*        시작 날짜: {this.startDate}&nbsp;&nbsp;&nbsp;*/}
                                {/*        끝 날짜:{this.state.endDate}*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td className={classes.tableCellIndexText}>사유</td>*/}
                                {/*    <td className={classes.formCell}>*/}
                                {/*        <TextFieldComponent label={"사유"} onChange={this.changeReason}/>*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td colSpan={4} style={{*/}
                                {/*        textAlign: "center",*/}
                                {/*        padding: "20px 0 20px 0"*/}
                                {/*    }}>*/}
                                {/*    <FormControl>*/}
                                {/*    <Select>*/}
                                {/*        <Box style={{display: 'flex', justifyContent: 'space-evenly'}}/>*/}
                                {/*            /!*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*!/*/}
                                {/*            <BlackButtonComponent onButtonClick={() => {this.props.args[0]()}} title={"취소"}/>*/}
                                {/*        </Select>*/}
                                {/*    </FormControl>*/}
                                {/*</td>*/}
                                {/*</tr>*/}
                                <tr>
                                    <td className={classes.tableCellIndexText}>연차 개수</td>
                                    <td className={classes.formCell}>
                                        <TextFieldComponent label={"연차 개수"} onChange={this.inputCountChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.tableCellIndexText}>남은 연차 / 최대 사용 가능 개수</td>
                                    <td className={classes.formCell}>
                                        {/*{this.state.remainVacation}*/}
                                        {/*{this.state.remainVacation} / {this.props.args[1] < this.state.remainVacation ?this.props.args[1]:this.state.remainVacation}*/}
                                        {this.state.remainVacation} / {this.props.args[1]}
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
                                    <td colSpan={4} style={{
                                        textAlign: "center",  padding: "20px 0 20px 0",border:'0px'
                                    }}>
                                        <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                            {/*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*/}
                                            <BlackButtonComponent onButtonClick={() => {
                                                this.props.args[0]()
                                            }}
                                                                  title={"취소"}
                                            />

                                            <SettingButtonComponent
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
                <Dialog open={this.state.isDialogOpen} onClose={this.handleDialogClose}>
                    <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.dialogMessage}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>)
            ;
    }
}

export default withStyles(styles)(VacationRequest);