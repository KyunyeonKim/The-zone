import React, {Component} from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Snackbar, Typography,
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import TextFieldComponent from "../Component/TextFieldComponent";
import AddButtonComponent from "../Component/Button/AddButtonComponent";
import BlackButtonComponent from "../Component/Button/BlackButtonComponent";
import Grid from "@material-ui/core/Grid";
import {stateStore} from "../../../index";
import defaultPersonImage from "../../kim/static/defaultPersonImage.png";
import SettingButtonComponent from "../Component/Button/SettingButtonComponent";
import Button from "@material-ui/core/Button";
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
        marginBottom: "40px"
    }, formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        fontSize:'18px',
        fontFamily:'IBM Plex Sans KR',
        textAlign: 'center'
    },
    formControl: {
        width: "30%",
        marginBottom: theme.spacing(2),
        marginRight:"30px",
        height:"50px"
    },
    tableCellIndexText: {
        fontSize: '18px',
        fontFamily:'IBM Plex Sans KR',
        fontWeight: 'bold',
        border: "1px solid gray",
        backgroundColor: "#F2F2F2",
        textAlign: "right",
        paddingRight: '15px',
        width: "35%",
        whiteSpace: 'nowrap'
    },uploadInput: {
        display: 'none'
    },

});



class AppealRequest extends Component {
    attendanceHour;
    attendanceMinute;
    leavingHour;
    leavingMinute;
    reason;

    constructor(props) {
        super(props);

        const date = new Date(this.props.args[0])
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 포맷팅
        const day = String(date.getDate()).padStart(2, '0'); // 일도 두 자리로 포맷팅

        this.state = {
            targetDate: `${year} / ${month} / ${day}`, //TODO : 추후 props 이용
            attendanceInfoId: this.props.args[1],// TODO : 추후 props로 받아오도록 해야함
            addOpen: false,
            selectedYear: year,
            selectedMonth: month,
            selectedDay: day,
            uploadFile: null,
            defaultPersonImage: defaultPersonImage,
            showForm: false,
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
            approveDialogOpen: false,
            mustAllInputSnackbarOpen:false,
            inputTimeSnackbarOpen:false,
        };

        this.attendanceHour = "";
        this.attendanceMinute = "";
        this.leavingHour = "";
        this.leavingMinute = "";
        this.reason = "";

        this.reasonChange = this.reasonChange.bind(this);
        this.attendanceHourChange = this.attendanceHourChange.bind(this);
        this.attendanceMinuteChange = this.attendanceMinuteChange.bind(this);
        this.leavingHourChange = this.leavingHourChange.bind(this);
        this.leavingMinuteChange = this.leavingMinuteChange.bind(this);

        this.buttonClick = this.buttonClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.approveAbnormal = this.approveAbnormal.bind(this);
        this.doApprove = this.doApprove.bind(this);
        this.handleMustAllInputCheck=this.handleMustAllInputCheck.bind(this);
        this.handleMustAllInputCheckClose=this.handleMustAllInputCheckClose.bind(this);
        this.handleInputCheck=this.handleInputCheck.bind(this);
        this.handleInputCheckClose=this.handleInputCheckClose.bind(this);

    }

    approveAbnormal = function () {
        this.setState({
            approveDialogOpen: true,
        });
    };

    doApprove = async function () {

        axios.defaults.withCredentials = true;
        try {
            const response = await axios.post(`http://localhost:8080/employee/approve/${this.state.attendanceInfoId}`);
            stateStore.chartContainerStateSet.setState()
            stateStore.calendarContainerStateSet.setState()
            this.setState({
                dialogOpen: true, dialogTitle: '승인 완료', dialogMessage: '승인이 완료 되었습니다',
            })
        } catch (error) {
            this.setState({
                dialogOpen: true, dialogTitle: '승인 실패', dialogMessage: '승인 요청에 실패하였습니다. 다시 요청 정보를 확인해주세요',
            })
        }
    };

    attendanceHourChange = (e) => {
        this.attendanceHour = e.target.value;
    }

    attendanceMinuteChange = (e) => {
        this.attendanceMinute = e.target.value;
    }

    leavingHourChange = (e) => {
        this.leavingHour = e.target.value;
    }

    leavingMinuteChange = (e) => {
        this.leavingMinute = e.target.value;
    }

    showErrorDialog = (title, message) => {
        this.setState({
            dialogOpen: true, dialogTitle: title, dialogMessage: message,
        });
    };

    // 다이얼로그 닫기 함수
    closeDialog = () => {
        this.setState({dialogOpen: false});
        this.props.args[2]()
    };


    showDialog = (title, message) => {
        this.setState({
            dialogOpen: true, dialogTitle: title, dialogMessage: message,
        });
    };

    // login=async ()=> {
    //     axios.defaults.withCredentials = true;
    //     let loginForm = new FormData();
    //     loginForm.append("loginId", "200001012");
    //     loginForm.append("password", "test");
    //     try {
    //         const login = await axios.post("http://localhost:8080/login", loginForm);
    //     } catch (error) {
    //         console.log("error 발생 !");
    //     }
    // }

    buttonClick = () => {
        this.setState({...this.state, addOpen: true});

    }

    handleClose = () => {
        this.setState({...this.state, addOpen: false});
        this.props.args[2]()
    }

    handleApproveDialogClose = () => {
        this.setState({approveDialogOpen: false});
    }

    handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        this.setState({uploadFile: imageFile});
    };

    handleMustAllInputCheck=()=>{
        this.setState({mustAllInputSnackbarOpen:true});
    }

    handleMustAllInputCheckClose=()=>{
        this.setState({mustAllInputSnackbarOpen:false});
    }

    handleInputCheck=()=>{
        this.setState({inputTimeSnackbarOpen:true});
    }

    handleInputCheckClose=()=>{
        this.setState({inputTimeSnackbarOpen:false});
    }

    submitForm = async (e) => {
        if (this.attendanceHour === "" || this.attendanceMinute === "" || this.leavingHour === "" || this.leavingMinute === "" || this.reason === ""||this.state.uploadFile===null) {
            this.handleMustAllInputCheck();
            // alert("모든 값을 입력해주세요!");
            return;
        }

        if (this.attendanceHour > this.leavingHour || (this.attendanceHour === this.leavingHour && this.attendanceMinute >= this.leavingMinute)) {
            console.log(this.attendanceHour, this.leavingHour, this.attendanceMinute, this.leavingMinute)
            this.handleInputCheck();
            // alert("출근시간은 퇴근시간보다 빨라야 합니다.");
            return;
        }

        e.preventDefault();

        const formData = new FormData();

        formData.append("reason", this.reason);
        formData.append("appealedStartTime", this.attendanceHour + ":" + this.attendanceMinute + ":00");
        formData.append("appealedEndTime", this.leavingHour + ":" + this.leavingMinute + ":00");
        formData.append("attendanceInfoId", this.state.attendanceInfoId);

        console.log("Form data:", this.reason, this.attendanceHour + ":" + this.attendanceMinute + ":00", this.leavingHour + ":" + this.leavingMinute + ":00", this.state.attendanceInfoId);

        try {
            const response = await axios.post("http://localhost:8080/employee/appeal", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (this.state.uploadFile instanceof File) {
                const uploadFileUrl = "http://localhost:8080/admin/upload/appeal";
                const uploadFormData = new FormData();
                uploadFormData.append("identifier", this.props.args[1]);
                uploadFormData.append("uploadFile", this.state.uploadFile);

                console.log("Image data:" , uploadFormData);

                const uploadResponse = await axios.post(uploadFileUrl, uploadFormData);
            }
            this.buttonClick();
        } catch (error) {
            let errorMessage = "An error occurred!";
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "400 Bad Request 에러!";
                        break;
                    case 500:
                        errorMessage = "500 Internal Server 에러!";
                        break;
                    case 403:
                        errorMessage = "403 권한이 없습니다!";
                        break;
                    default:
                        errorMessage = "An error occurred while fetching data!";
                        break;
                }
            } else {
                console.error('Error:', error);
                errorMessage = "An error occurred while fetching data!";
            }
            this.showErrorDialog('Error', errorMessage);
        }

        stateStore.calendarContainerStateSet.setState(this.state.selectedYear.toString(), this.state.selectedMonth.toString(), new Date(this.props.args[0]))
        stateStore.appealRequestStateSet.setState()
    };

    reasonChange = (e) => {
        this.reason = e.target.value;
    }

    componentDidMount() {
        // this.login();
        console.log("로그인함");
    }

    openButtonClick = () => {
        if (this.state.showForm === true) {
            this.setState({showForm: false});
        } else {
            this.setState({showForm: true});
        }

    }
    renderForm = () => {
        const {classes} = this.props;
        const uploadFile = this.state.uploadFile
        return (
            <form onSubmit={this.submitForm}>
                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.mustAllInputSnackbarOpen} autoHideDuration={2000} onClose={this.handleMustAllInputCheckClose}>
                    <Alert onClose={this.handleMustAllInputCheckClose} severity="warning">
                        모든 칸을 채워주세요!
                    </Alert>
                </Snackbar>

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.inputTimeSnackbarOpen} autoHideDuration={2000} onClose={this.handleInputCheckClose}>
                    <Alert onClose={this.handleInputCheckClose} severity="warning">
                        출근 시간은 퇴근 시간보다 빨라야 합니다!
                    </Alert>
                </Snackbar>

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
                                        style={{height: "50px"}}
                                        labelId="attendance-hour-label"
                                        id="attendaceHour"
                                        onChange={this.attendanceHourChange}>
                                        {[...Array(24)].map((_, index) => (<MenuItem key={index}
                                                                                     value={(index).toString().padStart(2, '0')}>
                                                {`${index}시`}
                                            </MenuItem>))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="attendance-minute-label">분</InputLabel>
                                    <Select
                                        style={{height: "50px"}}
                                        labelId="attendance-minute-label"
                                        id="attendanceMinute"
                                        onChange={this.attendanceMinuteChange}>
                                        {[...Array(6)].map((_, index) => (<MenuItem key={index * 10}
                                                                                    value={(index * 10).toString().padStart(2, '0')}>
                                                {`${index * 10}분`}
                                            </MenuItem>))}

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
                                        style={{height: "50px"}} //드롭다운의 크기는 formControl에서 못하고, select에 직접 명시해야함
                                        labelId="leaving-hour-label"
                                        id="leavingHour"
                                        onChange={this.leavingHourChange}>
                                        {[...Array(24)].map((_, index) => (<MenuItem key={index}
                                                                                     value={(index).toString().padStart(2, '0')}>
                                                {`${index}시`}
                                            </MenuItem>))}
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="minute-label">분</InputLabel>
                                    <Select
                                        style={{height: "50px"}}
                                        labelId="minute-label"
                                        id="leavingMinute"
                                        onChange={this.leavingMinuteChange}>
                                        {[...Array(6)].map((_, index) => (<MenuItem key={index * 10}
                                                                                    value={(index * 10).toString().padStart(2, '0')}>
                                                {`${index * 10}분`}
                                            </MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </td>
                    </tr>

                    <tr>
                        <td className={classes.tableCellIndexText}>사유</td>
                        <td className={classes.formCell}>
                            <TextFieldComponent id="reason" label={"사유"} onChange={this.reasonChange}/>

                        </td>
                    </tr>
                    <tr>
                        <td className={classes.tableCellIndexText}>증명 자료</td>
                        <td className={classes.formCell}>
                            <Box className={classes.uploadContainer}>
                                <input
                                    accept="image/*"
                                    className={classes.uploadInput}
                                    id="upload-file"
                                    type="file"
                                    onChange={this.handleImageUpload}
                                />
                                <label htmlFor="upload-file" className={classes.uploadLabel}>
                                    {uploadFile ? (<img
                                            src={URL.createObjectURL(uploadFile)}
                                            alt="Employee"
                                            className={classes.uploadIcon}
                                            style={{width: '100px', height: '100px'}} // 원하는 크기로 조절
                                        />) : (<img
                                            src={this.state.defaultPersonImage}
                                            alt="Default"
                                            className={classes.uploadIcon}
                                            style={{width: '100px', height: '100px'}} // 원하는 크기로 조절
                                        />)}
                                </label>

                            </Box>
                        </td>

                    </tr>
                    <tr>
                        <td colSpan={4} style={{textAlign: "center", padding: "20px 0 20px 0", border: '0px'}}>
                            <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                {/*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*/}
                                <BlackButtonComponent title={"취소"} onButtonClick={this.props.args[2]}/>
                                <SettingButtonComponent type="submit" onButtonClick={this.submitForm} title={"신청"}/>
                            </Box>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>)
    }

    render() {
        {
            console.log("리랜더링")
        }
        // const { classes } = this.props;
        // const uploadFile = this.state.uploadFile
        const {dialogOpen, dialogTitle, dialogMessage} = this.state;
        return (<>
                <Grid item lg={12}>
                    <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                        <DialogTitle>근태 조정 신청</DialogTitle>
                        <DialogContent>
                            <DialogContentText> 신청 완료 하였습니다 </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <BlackButtonComponent onButtonClick={this.handleClose} title={"닫기"}/>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.approveDialogOpen} onClose={this.handleApproveDialogClose}>
                        <DialogTitle>근태 승인 신청</DialogTitle>
                        <DialogContent>
                            <DialogContentText> 해당 근태 이상에 대해 승인 신청을 진행하시겠습니까? </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <BlackButtonComponent onButtonClick={this.doApprove} title={"승인"}/>
                            <BlackButtonComponent onButtonClick={this.handleApproveDialogClose} title={"닫기"}/>
                        </DialogActions>
                    </Dialog>

                    <Box style={{width: '1200px', paddingBottom: "40px"}}>
                        {/*<Box*/}
                {/*            sx={{*/}
                {/*                width: "90%",*/}
                {/*                fontSize: '25px',*/}
                {/*                fontFamily: 'IBM Plex Sans KR',*/}
                {/*                fontWeight: 'bold',*/}
                {/*                borderBottom: 'solid 1px black',*/}
                {/*                margin: 'auto',*/}
                {/*                paddingBottom: '10px'*/}
                {/*            }}>*/}
                {/*            근태 조정 요청*/}
                {/*        </Box>*/}
                {/*        <Box>*/}
                {/*            <Box style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>*/}
                {/*                <Button onClick={this.approveAbnormal} style={{*/}
                {/*                    width: '150px',*/}
                {/*                    height: '45px',*/}
                {/*                    fontFamily: 'IBM Plex Sans KR',*/}
                {/*                    fontSize: '15px',*/}
                {/*                    borderRadius: '5px',*/}
                {/*                    fontWeight: 'bold',*/}
                {/*                    marginRight: "50px",*/}
                {/*                    backgroundColor: "#F2F2F2"*/}
                {/*                }}>*/}
                {/*                    근태 이상 승인*/}
                {/*                </Button>*/}
                {/*                <Button onClick={this.openButtonClick} style={{*/}
                {/*                    width: '150px',*/}
                {/*                    height: '45px',*/}
                {/*                    fontFamily: 'IBM Plex Sans KR',*/}
                {/*                    fontSize: '15px',*/}
                {/*                    borderRadius: '5px',*/}
                {/*                    fontWeight: 'bold',*/}
                {/*                    marginRight: "10px",*/}
                {/*                    backgroundColor: "#9BCAF2"*/}
                {/*                }}>*/}
                {/*                    근태 이상 조정 요청*/}
                {/*                </Button>*/}
                {/*            </Box>*/}
                {/*        </Box>*/}
                {/*<Box style={{width:'1200px'}}>*/}
                {/*    <Box*/}
                {/*        sx={{width:"90%",*/}
                {/*            fontSize:'30px',*/}
                {/*            fontFamily:'IBM Plex Sans KR',*/}
                {/*            fontWeight:'bold',*/}
                {/*            borderBottom:'solid 1px black',*/}
                {/*            margin: 'auto',*/}
                {/*            padding: '10px 0px 10px 0px',*/}

                {/*        }} >*/}
                {/*        근태 조정 요청*/}
                {/*    </Box>*/}
                    <Box>
                        <Box style={{display:"flex", justifyContent:"center",marginTop:"30px"}}>
                            <Button onClick={this.approveAbnormal} style={{width:'150px',height:'45px',fontFamily:'IBM Plex Sans KR',fontSize:'15px',borderRadius:'5px',fontWeight:'bold', marginRight:"50px",backgroundColor:"#9BCAF2"}}>
                                근태 이상 승인
                            </Button>
                            <Button onClick={this.openButtonClick} style={{width:'150px',height:'45px',fontFamily:'IBM Plex Sans KR',fontSize:'15px',borderRadius:'5px',fontWeight:'bold', marginRight:"10px",backgroundColor:"#F2F2F2"}}>
                                근태 이상 조정 요청
                            </Button>
                        </Box>
                    </Box>

                        <Box>
                            {(this.state.showForm) === true ? this.renderForm() : <></>}
                            {/*<form onSubmit={this.submitForm}>*/}
                            {/*    <table className={classes.formTable}>*/}
                            {/*        <tbody>*/}
                            {/*        <tr>*/}
                            {/*            <td className={classes.tableCellIndexText}>대상 날짜</td>*/}
                            {/*            <td className={classes.formCell}>*/}
                            {/*                {this.state.targetDate}*/}
                            {/*            </td>*/}
                            {/*        </tr>*/}
                            {/*        <tr>*/}
                            {/*            <td className={classes.tableCellIndexText}>조정 출근 시간</td>*/}
                            {/*            <td className={classes.formCell}>*/}
                            {/*                <Box>*/}
                            {/*                    <FormControl variant="outlined" className={classes.formControl}>*/}
                            {/*                        <InputLabel id="attendance-hour-label">시</InputLabel>*/}
                            {/*                        <Select*/}
                            {/*                            style={{height:"50px"}}*/}
                            {/*                            labelId="attendance-hour-label"*/}
                            {/*                            id="attendaceHour"*/}
                            {/*                            onChange={this.attendanceHourChange}>*/}
                            {/*                            {[...Array(24)].map((_, index) => (*/}
                            {/*                                <MenuItem key={index }*/}
                            {/*                                          value={(index).toString().padStart(2, '0')}>*/}
                            {/*                                    {`${index}시`}*/}
                            {/*                                </MenuItem>*/}
                            {/*                            ))}*/}
                            {/*                        </Select>*/}
                            {/*                    </FormControl>*/}
                            {/*                    <FormControl variant="outlined" className={classes.formControl}>*/}
                            {/*                        <InputLabel id="attendance-minute-label">분</InputLabel>*/}
                            {/*                        <Select*/}
                            {/*                            style={{height:"50px"}}*/}
                            {/*                            labelId="attendance-minute-label"*/}
                            {/*                            id="attendanceMinute"*/}
                            {/*                            onChange={this.attendanceMinuteChange}>*/}
                            {/*                            {[...Array(6)].map((_, index) => (*/}
                            {/*                                <MenuItem key={index*10}*/}
                            {/*                                          value={(index*10).toString().padStart(2, '0')}>*/}
                            {/*                                    {`${index*10}분`}*/}
                            {/*                                </MenuItem>*/}
                            {/*                            ))}*/}

                        {/*                        </Select>*/}
                        {/*                    </FormControl>*/}
                        {/*                </Box>*/}

                        {/*            </td>*/}
                        {/*        </tr>*/}

                        {/*        <tr>*/}
                        {/*            <td className={classes.tableCellIndexText}>조정 퇴근 시간</td>*/}
                        {/*            <td className={classes.formCell}>*/}
                        {/*                <Box>*/}
                        {/*                    <FormControl variant="outlined" className={classes.formControl}>*/}
                        {/*                        <InputLabel id="leaving-hour-label">시</InputLabel>*/}
                        {/*                        <Select*/}
                        {/*                            style={{height:"50px"}} //드롭다운의 크기는 formControl에서 못하고, select에 직접 명시해야함*/}
                        {/*                            labelId="leaving-hour-label"*/}
                        {/*                            id="leavingHour"*/}
                        {/*                            onChange={this.leavingHourChange}>*/}
                        {/*                            {[...Array(24)].map((_, index) => (*/}
                        {/*                                <MenuItem key={index}*/}
                        {/*                                          value={(index).toString().padStart(2, '0')}>*/}
                        {/*                                    {`${index}시`}*/}
                        {/*                                </MenuItem>*/}
                        {/*                            ))}*/}
                        {/*                        </Select>*/}
                        {/*                    </FormControl>*/}

                        {/*                    <FormControl variant="outlined" className={classes.formControl}>*/}
                        {/*                        <InputLabel id="minute-label">분</InputLabel>*/}
                        {/*                        <Select*/}
                        {/*                            style={{height:"50px"}}*/}
                        {/*                            labelId="minute-label"*/}
                        {/*                            id="leavingMinute"*/}
                        {/*                            onChange={this.leavingMinuteChange}>*/}
                        {/*                            {[...Array(6)].map((_, index) => (*/}
                        {/*                                <MenuItem key={index*10}*/}
                        {/*                                          value={(index*10).toString().padStart(2, '0')}>*/}
                        {/*                                    {`${index*10}분`}*/}
                        {/*                                </MenuItem>*/}
                        {/*                            ))}*/}
                        {/*                        </Select>*/}
                        {/*                    </FormControl>*/}
                        {/*                </Box>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}

                        {/*        <tr>*/}
                        {/*            <td className={classes.tableCellIndexText}>사유</td>*/}
                        {/*            <td className={classes.formCell}>*/}
                        {/*                <TextFieldComponent id="reason" label={"사유"}  onChange={this.reasonChange}/>*/}

                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*        <tr>*/}
                        {/*            <td className={classes.tableCellIndexText}>증명 자료</td>*/}
                        {/*            <td className={classes.formCell}>*/}
                        {/*            <Box className={classes.uploadContainer}>*/}
                        {/*                <input*/}
                        {/*                    accept="image/*"*/}
                        {/*                    className={classes.uploadInput}*/}
                        {/*                    id="upload-file"*/}
                        {/*                    type="file"*/}
                        {/*                    onChange={this.handleImageUpload}*/}
                        {/*                />*/}
                        {/*                <label htmlFor="upload-file" className={classes.uploadLabel}>*/}
                        {/*                    {uploadFile ? (*/}
                        {/*                        <img*/}
                        {/*                            src={URL.createObjectURL(uploadFile)}*/}
                        {/*                            alt="Employee"*/}
                        {/*                            className={classes.uploadIcon}*/}
                        {/*                            style={{ width: '100px', height: '100px' }} // 원하는 크기로 조절*/}
                        {/*                        />*/}
                        {/*                    ) : (*/}
                        {/*                        <img*/}
                        {/*                            src={this.state.defaultPersonImage}*/}
                        {/*                            alt="Default"*/}
                        {/*                            className={classes.uploadIcon}*/}
                        {/*                            style={{ width: '100px', height: '100px' }} // 원하는 크기로 조절*/}
                        {/*                        />*/}
                        {/*                    )}*/}
                        {/*                </label>*/}

                        {/*            </Box>*/}
                        {/*            </td>*/}

                            {/*        </tr>*/}
                            {/*        <tr>*/}
                            {/*            <td  colSpan={4} style={{ textAlign: "center", padding: "20px 0 20px 0" ,border:'0px'}}>*/}
                            {/*                <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>*/}
                            {/*                    /!*TODO : 추후 취소 버튼 클릭시 모달창이 닫히도록 구현*!/*/}
                            {/*                    <BlackButtonComponent title={"취소"} onButtonClick={this.props.args[2]}/>*/}
                            {/*                    <SettingButtonComponent type="submit" onButtonClick={this.submitForm} title={"신청"}/>*/}
                            {/*                </Box>*/}
                            {/*            </td>*/}
                            {/*        </tr>*/}
                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*</form>*/}
                        </Box>

                    </Box>
                    <Dialog
                        open={dialogOpen}
                        onClose={this.closeDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {dialogMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeDialog} color="primary">
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Grid>
            </>);
    }
}

export default withStyles(styles)(AppealRequest);
