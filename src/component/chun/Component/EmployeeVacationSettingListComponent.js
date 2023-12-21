import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import SubstractButtonComponent from "./Button/SubstractButtonComponent";
import AddButtonComponent from "./Button/AddButtonComponent";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
});

class EmployeeVacationSettingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            // vacationType:"",
            countInput:"",
            reasonInput:"",
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',

            processMineSnackbarOpen:false,
            inputRangeSnackbarOpen:false,
            inputVacationCountNotOverSnackbarOpen:false,
            inputReasonSnackbarOpen:false,
            // cantChooseVacationTypeSnackbarOpen:false,
            // cantAddCountVacationTypeSnackbarOpen:false,
            // cantDeleteCountVacationTypeSnackbarOpen:false


        }

        // this.vacationTypeChange = this.vacationTypeChange.bind(this);
        this.countInputChange = this.countInputChange.bind(this);
        this.reasonInputChange = this.reasonInputChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.handleProcessMineSnackbarOpen =this.handleProcessMineSnackbarOpen.bind(this);
        this.handleProcessMineSnackbarOpenClose =this.handleProcessMineSnackbarOpenClose.bind(this);

        this.handleInputRangeSnackbarOpen=this.handleInputRangeSnackbarOpen.bind(this);
        this.handleInputRangeSnackbarOpenClose=this.handleInputRangeSnackbarOpenClose.bind(this);

        this.handleInputVacationCountNotOverSnackbarOpen=this.handleInputVacationCountNotOverSnackbarOpen.bind(this);
        this.handleInputVacationCountNotOverSnackbarOpenClose=this.handleInputVacationCountNotOverSnackbarOpenClose.bind(this);

        this.handleInputReasonSnackbarOpen=this.handleInputReasonSnackbarOpen.bind(this);
        this.handleInputReasonSnackbarOpenClose=this.handleInputReasonSnackbarOpenClose.bind(this);

    }

    handleInputReasonSnackbarOpen=()=>{
        this.setState({inputReasonSnackbarOpen:true});
    }

    handleInputReasonSnackbarOpenClose=()=>{
        this.setState({inputReasonSnackbarOpen:false});
    }


    handleInputVacationCountNotOverSnackbarOpen=()=>{
        this.setState({inputVacationCountNotOverSnackbarOpen:true});
    }

    handleInputVacationCountNotOverSnackbarOpenClose=()=>{
        this.setState({inputVacationCountNotOverSnackbarOpen:false});
    }

    handleInputRangeSnackbarOpen=()=>{
        this.setState({inputRangeSnackbarOpen:true});
    }

    handleInputRangeSnackbarOpenClose=()=>{
        this.setState({inputRangeSnackbarOpen:false});
    }

    handleProcessMineSnackbarOpen=()=>{
        this.setState({processMineSnackbarOpen:true});
    }

    handleProcessMineSnackbarOpenClose=()=>{
        this.setState({processMineSnackbarOpen:false});
    }

    // vacationTypeChange=(e)=>{
    //     this.setState({...this.state,vacationType:e.target.value});
    //     //console.log("vacationTypeChange: ",e.target.value);
    // }

    countInputChange=(e)=>{
        this.setState({countInput:e.target.value});
        //console.log("countInputChange: ",e.target.value);
    }

    reasonInputChange=(e)=>{
        this.setState({reasonInput:e.target.value});
        //console.log("reasonInputChange: ",e.target.value);
    }

    handleButtonClick =  async (employeeId, action) => {
        //console.log("this.props.isButtinDisabled : ",this.props.isButtonDisabled);
        if (this.props.isButtonDisabled) {
            this.handleProcessMineSnackbarOpen();
            return;
        }

        const isAddButton = action === 'add';

        const countValue = this.state.countInput;
        // 숫자가 아닌 경우 메시지 표시
        if (!/^\d{1,3}$/.test(countValue)) {
            this.handleInputRangeSnackbarOpen();
            return;
        }

        if (isAddButton === false && parseInt(countValue, 10) >this.props.data.remainVacation) {
            this.handleInputVacationCountNotOverSnackbarOpen();
            return;
        }

        const count = isAddButton ? parseInt(countValue, 10) : -parseInt(countValue, 10);


        if (this.state.reasonInput === "" || this.state.reasonInput === null) {
            this.handleInputReasonSnackbarOpen();
            return;
        }

        // // 연차 종류 가져오기
        // if (this.state.vacationType === "" || this.state.vacationType == null) {
        //     this.handleCantChooseVacationTypeSnackbarOpen();
        //     // alert("연차 종류를 입력하세요!");
        //     return;
        // }

        // if (isAddButton === true && this.state.vacationType === "근태 불량") {
        //     this.handleCantAddCountVacationTypeSnackbarOpen();
        //     // alert("연차 추가 불가능한 연차 종류입니다.");
        //     return;
        // }
        //
        // if (isAddButton === false && this.state.vacationType !== "근태 불량") {
        //     // alert("연차 삭제 불가능한 연차 종류입니다.");
        //     this.handleCantDeleteCountVacationTypeSnackbarOpen();
        //     return;
        // }

        // sendData 함수 호출
        await this.sendData(count, this.state.reasonInput, employeeId, isAddButton);

        // 상태 초기화
        this.setState({
            countInput: "",
            reasonInput: "",
            // vacationType: ""
        });
    };

    sendData = async(count,reason,employeeId,isAddButton) => {
        const {showErrorDialog} = this.props;
        const formData = new FormData();
        formData.append('adjustQuantity',count);
        formData.append('reason',reason);
        formData.append('adjustType','undefined');

        try{
            const response = await axios.post('http://localhost:8080/manager/vacation/modify/'+employeeId,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            isAddButton===true?this.props.AddHandleOpen(employeeId):this.props.DeleteHandleOpen(employeeId);
            //console.log("전송 성공");
        }catch (error) {
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
            showErrorDialog('Error', errorMessage);
        }
    }
    render() {
        const {isButtonDisabled,data,keyData,classes,title,className} = this.props;
        const { dialogOpen, dialogTitle, dialogMessage } = this.state;

        return (
            <>
                {/*<Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.cantDeleteCountVacationTypeSnackbarOpen} autoHideDuration={2000} onClose={this.handleCantDeleteCountVacationTypeSnackbarOpenClose}>*/}
                {/*    <Alert onClose={this.handleCantDeleteCountVacationTypeSnackbarOpenClose} severity="warning">*/}
                {/*        연차 삭제 불가능한 연차 종류입니다!*/}
                {/*    </Alert>*/}
                {/*</Snackbar>*/}

                {/*<Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.cantAddCountVacationTypeSnackbarOpen} autoHideDuration={2000} onClose={this.handleCantAddCountVacationTypeSnackbarOpenClose}>*/}
                {/*    <Alert onClose={this.handleCantAddCountVacationTypeSnackbarOpenClose} severity="warning">*/}
                {/*        연차 추가 불가능한 연차 종류입니다!*/}
                {/*    </Alert>*/}
                {/*</Snackbar>*/}

                {/*<Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.cantChooseVacationTypeSnackbarOpen} autoHideDuration={2000} onClose={this.handleCantChooseVacationTypeSnackbarOpenClose}>*/}
                {/*    <Alert onClose={this.handleCantChooseVacationTypeSnackbarOpenClose} severity="warning">*/}
                {/*        연차 종류를 입력하세요!*/}
                {/*    </Alert>*/}
                {/*</Snackbar>*/}

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.inputReasonSnackbarOpen} autoHideDuration={2000} onClose={this.handleInputReasonSnackbarOpenClose}>
                    <Alert onClose={this.handleInputReasonSnackbarOpenClose} severity="warning">
                        사유를 입력하세요!
                    </Alert>
                </Snackbar>

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.inputVacationCountNotOverSnackbarOpen} autoHideDuration={2000} onClose={this.handleInputVacationCountNotOverSnackbarOpenClose}>
                    <Alert onClose={this.handleInputVacationCountNotOverSnackbarOpenClose} severity="warning">
                        남은 연차 개수보다 많이 입력할 수 없습니다!
                    </Alert>
                </Snackbar>

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.inputRangeSnackbarOpen} autoHideDuration={2000} onClose={this.handleInputRangeSnackbarOpenClose}>
                    <Alert onClose={this.handleInputRangeSnackbarOpenClose} severity="warning">
                        입력개수는 1에서 세자리 까지 가능합니다!
                    </Alert>
                </Snackbar>

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.processMineSnackbarOpen} autoHideDuration={2000} onClose={this.handleProcessMineSnackbarOpenClose}>
                    <Alert onClose={this.handleProcessMineSnackbarOpenClose} severity="warning">
                        본인에 대한 처리는 불가능합니다!
                    </Alert>
                </Snackbar>



                <TableRow key={keyData} >
                    <TableCell align="center" className={className}>
                        {data.employeeId}
                    </TableCell>
                    <TableCell align="center" className={className}>{data.name}</TableCell>
                    <TableCell align="center" className={className}> {data.remainVacation}</TableCell>
                    {/*<TableCell align="center" className={className}>*/}
                    {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
                    {/*        <InputLabel id={`demo-simple-select-label`}>연차 종류</InputLabel>*/}
                    {/*        <Select*/}
                    {/*            labelId={`demo-simple-select-label`}*/}
                    {/*            id={"vacationType"}*/}
                    {/*            onChange={this.vacationTypeChange}*/}
                    {/*            value={this.state.vacationType}*/}
                    {/*            disabled={isButtonDisabled} // 본인 아이디와 비교하여 비활성화*/}
                    {/*        >*/}
                    {/*            <MenuItem value={"근태 불량"}>근태 불량</MenuItem>*/}
                    {/*            <MenuItem value={"연차 추가 제공"}>연차 추가 제공</MenuItem>*/}
                    {/*            <MenuItem value={"포상 연차 제공"}>포상 연차 제공</MenuItem>*/}

                    {/*        </Select>*/}
                    {/*    </FormControl>*/}
                    {/*</TableCell>*/}
                    <TableCell align="center">
                        <TextField
                            variant="outlined"
                            id={"countInput"}
                            label={isButtonDisabled?"본인의 정보 처리 불가":"추가 및 삭제 개수"}
                            onChange={this.countInputChange}
                            value={this.state.countInput}
                            disabled={isButtonDisabled}/>

                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            id={"reasonInput"}
                            label={isButtonDisabled?"본인의 정보 처리 불가":"사유"}
                            onChange={this.reasonInputChange}
                            value={this.state.reasonInput}
                            disabled={isButtonDisabled} />
                    </TableCell>
                    <TableCell align="center">
                        <AddButtonComponent
                            disabled={isButtonDisabled}
                            onButtonClick={() =>this.handleButtonClick(data.employeeId, 'add')}
                            title={title[0]}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <SubstractButtonComponent
                            disabled={isButtonDisabled}
                            onButtonClick={() =>this.handleButtonClick(data.employeeId, 'minus')}
                            title={title[1]}
                        />
                        {/*<Button className={classes.button} variant="contained" color="secondary" onClick={(e) => handleButtonClick(e, data.employeeId,'minus')}>삭제</Button>*/}
                    </TableCell>
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
                </TableRow>


            </>

        );
    }
}
export default withStyles(styles)(EmployeeVacationSettingListComponent);
