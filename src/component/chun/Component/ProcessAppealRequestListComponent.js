import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";
import RedButtonComponent from "./RedButtonComponent";

class ProcessAppealRequestListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clickRejectBtn:false
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

    sendApproveData = async(employeeId, attendanceAppealRequestId)=>{

        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('attendanceAppealRequestId',attendanceAppealRequestId);
        formData.append('status','approved')

        try{
            const response = await axios.post('http://localhost:8080/manager/appeal/process',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log("전송 성공");
            this.onApproveBtnClick();
        }catch(error) {
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
    }

    sendRejectData = async(employeeId, attendanceAppealRequestId,reason)=>{

        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('attendanceAppealRequestId',attendanceAppealRequestId);
        formData.append('status','rejected')
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

        }catch(error) {
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
    }

    onApprovalButtonClick =() => {
        this.sendApproveData(this.row.employeeId,this.row.attendanceAppealRequestId);
    };

    onRejectButtonClick = async(e)=>{
        if(this.state.clickRejectBtn === false){
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
        const {row,keyData,title,id,onRejectBtnClick,onApproveBtnClick} = this.props;
        const isButtonDisabled = id === row.employeeId;
        this.row=row;
        this.onRejectBtnClick=onRejectBtnClick;
        this.onApproveBtnClick=onApproveBtnClick;

        return (
            <TableRow key={keyData}>
                {console.log(row)}
                {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key} style={{ textAlign: 'center',whiteSpace: 'nowrap' }}  >
                        {value}
                    </TableCell>
                ))}

                <TableCell>
                    <ButtonComponent disabled={isButtonDisabled} onButtonClick={this.onApprovalButtonClick} title={title[0]}  />
                </TableCell>

                <TableCell>
                    <RedButtonComponent disabled={isButtonDisabled} onButtonClick={this.onRejectButtonClick} title={title[1]} />
                </TableCell>

                <TableCell>
                    <TextFieldComponent  label={"반려사유"} onChange={this.reasonChange}  disabled={!this.state.clickRejectBtn||isButtonDisabled} ></TextFieldComponent>
                </TableCell>

            </TableRow>
        );
    }
}
export default ProcessAppealRequestListComponent;