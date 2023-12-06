import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";
import AddButtonComponent from "./Button/AddButtonComponent";
import SubstractButtonComponent from "./Button/SubstractButtonComponent";

class ProcessAppealRequestListComponent extends Component {
/*
* 버튼 동작 결과
* 모달로 수정창 연결
* 삭제는 dialog
* 토글은 별도의 알림 없음
* */
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
    onRejectBtnClick;
    onApprovalBtnClick;

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
        const {row,keyData,title,id,onRejectBtnClick,onApproveBtnClick,className} = this.props;
        const isButtonDisabled = id === row.employeeId;
        this.row=row;
        this.onRejectBtnClick=onRejectBtnClick;
        this.onApproveBtnClick=onApproveBtnClick;

        return (
            <TableRow key={keyData}>
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
                                {console.log("key : ", key)}
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
                    <TextFieldComponent  label={"반려사유"} onChange={this.reasonChange}  disabled={!this.state.clickRejectBtn||isButtonDisabled} ></TextFieldComponent>
                </TableCell>

            </TableRow>
        );
    }
}
export default ProcessAppealRequestListComponent;
