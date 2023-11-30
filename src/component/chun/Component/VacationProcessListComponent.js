import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";
import RedButtonComponent from "./RedButtonComponent";

class VacationProcessListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacationRequestKey: "",
            clickRejectBtn:false
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
        formData.append('vacationRequestStateCategoryKey','permitted')

        try{
            const response = await axios.post('http://localhost:8080/manager/vacation/process',formData,{
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

    sendRejectData = async(employeeId, vacationRequestKey,reason)=>{
        const formData= new FormData();
        formData.append('employeeId',employeeId);
        formData.append('vacationRequestKey',vacationRequestKey);
        formData.append('vacationRequestStateCategoryKey','rejected')
        formData.append('reasonForRejection',reason);

        try{
            const response = await axios.post('http://localhost:8080/manager/vacation/process',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log("전송 성공");
            this.onRejectBtnClick();

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
        this.sendApproveData(this.row.employeeId,this.row.vacationRequestKey);
    };

    onRejectButtonClick = async(e)=>{
        if(this.state.clickRejectBtn === false){
            this.setState({clickRejectBtn:true},()=>{
                console.log("this.state.clickRejectBtn : ",this.state.clickRejectBtn);
            });

        }
        else{
            if(this.inputValue === ""|| this.inputValue ===null){
                alert("반려 사유를 반드시 입력하세요!");
                return;
            }
            this.sendRejectData( this.row.employeeId, this.row.vacationRequestKey,this.inputValue);
        }

    };

    render() {
        const {row,keyData,title,onApproveBtnClick,onRejectBtnClick,id} = this.props;
        const isButtonDisabled = id === row.employeeId;
        this.row=row;
        this.onRejectBtnClick=onRejectBtnClick;
        this.onApproveBtnClick=onApproveBtnClick;

        console.log(JSON.stringify(this.state));
        return (
                <TableRow key={keyData}>
                    {Object.entries(row).map(([key, value]) => (
                        <TableCell key={key} style={{ textAlign: 'center',whiteSpace: 'nowrap'}} >
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
                        <TextFieldComponent label={"반려 사유"} onChange={this.reasonChange} disabled={!this.state.clickRejectBtn} ></TextFieldComponent>
                    </TableCell>

                </TableRow>
        );
    }
}
export default VacationProcessListComponent;
