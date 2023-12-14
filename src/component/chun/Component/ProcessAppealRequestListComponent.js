import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";
import AddButtonComponent from "./Button/AddButtonComponent";
import SubstractButtonComponent from "./Button/SubstractButtonComponent";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

class ProcessAppealRequestListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clickRejectBtn:false,
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',

        };

        this.inputValue=""
        this.row=null
        this.onRejectBtnClick=null
        this.onApprovalBtnClick=null
        this.reasonChange=this.reasonChange.bind(this);
        this.sendRejectData=this.sendRejectData.bind(this);
        this.onApprovalButtonClick=this.onApprovalButtonClick.bind(this);
        this.onRejectButtonClick=this.onRejectButtonClick.bind(this);

    }
    inputValue;
    row;
    onRejectBtnClick;
    onApprovalBtnClick;

    reasonChange=(e)=>{
        this.inputValue=e.target.value;
    };

    showErrorDialog = (title, message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: title,
            dialogMessage: message,
        });
    };

    // 다이얼로그 닫기 함수
    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };

    sendApproveData = async(employeeId, attendanceAppealRequestId)=>{

        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('attendanceAppealRequestId',attendanceAppealRequestId);
        formData.append('status','조정 요청 승인')

        try{
            const response = await axios.post('http://localhost:8080/manager/appeal/process',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log("전송 성공");
            this.onApproveBtnClick();
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
                        errorMessage = "403 권한 에러!";
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

    sendRejectData = async(employeeId, attendanceAppealRequestId,reason)=>{

        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('attendanceAppealRequestId',attendanceAppealRequestId);
        formData.append('status','조정 요청 반려')
        formData.append('reasonForRejection',reason);

        try{
            const response = await axios.post('http://localhost:8080/manager/appeal/process',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log("전송 성공");
            console.log(this.onRejectBtnClick);
            this.onRejectBtnClick();
            // this.setState({clickRejectBtn:false});
            this.props.parentRerender()
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
                        errorMessage = "403 권한 에러!";
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
        this.sendApproveData(this.row.employeeId,this.row.attendanceAppealRequestId);
    };

    onRejectButtonClick = async(e)=>{
        if(!this.state.clickRejectBtn){
            console.log("onRejectButtonClick");

            this.setState({clickRejectBtn:true},()=>{
            });

        }
        else{
            if(this.inputValue === ""|| this.inputValue ===null){
                alert("반려 사유를 반드시 입력하세요!");
                return;
            }

            this.sendRejectData(this.row.employeeId,this.row.attendanceAppealRequestId,this.inputValue);
        }

    };
    render() {
        const {row,keyData,title,id,onRejectBtnClick,onApproveBtnClick,className} = this.props;
        const isButtonDisabled = id === row.employeeId;
        this.row=row;
        this.onRejectBtnClick=onRejectBtnClick;
        this.onApproveBtnClick=onApproveBtnClick;
        const { dialogOpen, dialogTitle, dialogMessage } = this.state;

        return (
            <TableRow key={keyData}>
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

                {Object.entries(row).map(([key, value]) => {
                    if (key === "startTime") {
                        return Object.entries(row).map(([key1, value1]) => {
                            if (key1 === "endTime") {
                                return (
                                    <TableCell key={key + key1} className={className}>
                                        {value}
                                        <br/>
                                        {value1}
                                    </TableCell>
                                );
                            }
                            return null;
                        });
                    }
                    if(key==="appealedStartTime"){
                        return Object.entries(row).map(([key2,value2])=>{
                            if(key2==="appealedEndTime"){
                                return(
                                    <TableCell key={key + key2} className={className}>
                                        {value}
                                        <br/>
                                        {value2}
                                    </TableCell>
                                )
                            }
                        })
                    }
                    if(key!=="endTime"&&key!="appealedEndTime")
                    {
                        return (
                            <TableCell key={key} className={className}>
                                {value}
                            </TableCell>
                        );
                    }
                })}

                <TableCell>
                    <AddButtonComponent disabled={isButtonDisabled} onButtonClick={this.onApprovalButtonClick} title={title[0]}  />
                </TableCell>

                <TableCell>
                    <SubstractButtonComponent disabled={isButtonDisabled} onButtonClick={this.onRejectButtonClick} title={title[1]} />
                </TableCell>

                <TableCell>
                    <TextFieldComponent  label={"반려사유"} onChange={this.reasonChange}  disabled={!this.state.clickRejectBtn} ></TextFieldComponent>
                </TableCell>

            </TableRow>
        );
    }
}
export default ProcessAppealRequestListComponent;
