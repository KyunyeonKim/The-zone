import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";
import AddButtonComponent from "./Button/AddButtonComponent";
import SubstractButtonComponent from "./Button/SubstractButtonComponent";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

class VacationProcessListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacationRequestKey: "",
            clickRejectBtn:false,
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
            rejectReasonSnackbarOpen:false
        };
        this.inputValue=""
        this.row=null
        this.onRejectBtnClick=null
        this.onApprovalBtnClick=null
        this.reasonChange=this.reasonChange.bind(this);
        this.sendApproveData = this.sendApproveData.bind(this);
        this.sendRejectData=this.sendRejectData.bind(this);
        this.onApprovalButtonClick=this.onApprovalButtonClick.bind(this);
        this.onRejectButtonClick=this.onRejectButtonClick.bind(this);
        this.handleRejectReasonOpen=this.handleRejectReasonOpen.bind(this);
        this.handleRejectReasonOpenClose=this.handleRejectReasonOpenClose.bind(this);
    }

    inputValue
    row;
    onRejectBtnClick;
    onApprovalBtnClick;
    reasonChange=(e)=>{
        this.inputValue=e.target.value;
    };

    sendApproveData = async(employeeId, vacationRequestKey)=>{
        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('vacationRequestKey',vacationRequestKey);
        formData.append('vacationRequestStateCategoryKey','연차 요청 승인')

        try{
            const response = await axios.post('http://localhost:8080/manager/vacation/process',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("전송 성공");
            this.onApproveBtnClick();
            this.props.parentRerender()
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
    }

    sendRejectData = async(employeeId, vacationRequestKey,reason)=>{
        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('vacationRequestKey',vacationRequestKey);
        formData.append('vacationRequestStateCategoryKey','연차 요청 반려')
        formData.append('reasonForRejection',reason);

        try{
            const response = await axios.post('http://localhost:8080/manager/vacation/process',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("전송 성공");
            this.onRejectBtnClick();
            this.props.parentRerender()

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
    }
    onApprovalButtonClick =() => {
        this.sendApproveData(this.row.employeeId,this.row.vacationRequestKey);
    };

    handleRejectReasonOpen=()=>{
        this.setState({rejectReasonSnackbarOpen:true})
    }

    handleRejectReasonOpenClose=()=>{
        this.setState({rejectReasonSnackbarOpen:false})
    }
    onRejectButtonClick = async(e)=>{
        if(!this.state.clickRejectBtn){

            this.setState({clickRejectBtn:true},()=>{
                console.log("this.state.clickRejectBtn : ",this.state.clickRejectBtn);
            });

        }
        else{
            if(this.inputValue === ""){
                this.handleRejectReasonOpen();
                // alert("반려 사유를 반드시 입력하세요!");
                return;
            }

            this.sendRejectData( this.row.employeeId, this.row.vacationRequestKey,this.inputValue);
        }

    };

    render() {
        const {row,keyData,title,onApproveBtnClick,onRejectBtnClick,id,className} = this.props;
        const isButtonDisabled = id === row.employeeId;
        this.row=row;
        this.onRejectBtnClick=onRejectBtnClick;
        this.onApproveBtnClick=onApproveBtnClick;
        const { dialogOpen, dialogTitle, dialogMessage } = this.state;
        console.log(JSON.stringify(this.state));

        return (
            <>
                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.rejectReasonSnackbarOpen} autoHideDuration={2000} onClose={this.handleRejectReasonOpenClose}>
                    <Alert onClose={this.handleRejectReasonOpenClose} severity="warning">
                        반려 사유를 반드시 입력하세요!
                    </Alert>
                </Snackbar>

                <TableRow key={keyData}>
                    {Object.entries(row).map(([key, value]) => (
                        <TableCell key={key} className={className} >
                            {value}
                        </TableCell>
                    ))}

                    <TableCell>
                        <AddButtonComponent disabled={isButtonDisabled} onButtonClick={this.onApprovalButtonClick} title={title[0]}  />
                    </TableCell>

                    <TableCell>
                        <SubstractButtonComponent disabled={isButtonDisabled} onButtonClick={this.onRejectButtonClick} title={title[1]} />
                    </TableCell>

                    <TableCell>
                        <TextFieldComponent label={"반려 사유"} onChange={this.reasonChange} disabled={!this.state.clickRejectBtn} ></TextFieldComponent>
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
export default VacationProcessListComponent;
