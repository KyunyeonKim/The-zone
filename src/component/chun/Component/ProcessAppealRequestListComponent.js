import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";

class ProcessAppealRequestListComponent extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        // props에서 검색 버튼 클릭 여부를 확인하여 리렌더링 결정
        return nextProps.isButtonClicked||nextState.clickRejectBtn !== this.state.clickRejectBtn;
    }
    constructor(props) {
        super(props);
        this.state = {
            attendanceAppealRequestId: "",
            reason:"",
            clickRejectBtn:true

        };
    }

    reasonChange=(e)=>{
        this.setState({reason:e.target.value},()=>{
            console.log("state : ",this.state);
        });
    };

    render() {
        const {row,keyData,title,onApproveBtnClick,onRejectBtnClick,id} = this.props;
        this.setState({ attendanceAppealRequestId: row.attendanceAppealRequestId });
        const isButtonDisabled = id === row.employeeId;


        const sendApproveData = async(employeeId, attendanceAppealRequestId)=>{

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
                onApproveBtnClick();
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

        const sendRejectData = async(employeeId, attendanceAppealRequestId,reason)=>{

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
                onRejectBtnClick();
                this.setState({clickRejectBtn:true});

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

        const onApprovalButtonClick =() => {
            sendApproveData(row.employeeId,row.attendanceAppealRequestId);
        };

        const onRejectButtonClick = async(e)=>{
            if(this.state.clickRejectBtn === true){
                this.setState({clickRejectBtn:false},()=>{
                });

            }
            else{
                if(this.state.reason === ""|| this.state.reason ===null){
                    alert("반려 사유를 반드시 입력하세요!");
                    return;
                }
                sendRejectData(row.employeeId,row.attendanceAppealRequestId,this.state.reason);
            }

        };

        return (
            <TableRow key={keyData}>
                {console.log(row)}
                {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key} style={{ textAlign: 'center',whiteSpace: 'nowrap' }}  >
                        {value}
                    </TableCell>
                ))}

                <TableCell>
                    <ButtonComponent disabled={isButtonDisabled} onButtonClick={onApprovalButtonClick} title={title[0]}  />
                </TableCell>

                <TableCell>
                    <ButtonComponent disabled={isButtonDisabled} onButtonClick={onRejectButtonClick} title={title[1]} />
                </TableCell>

                <TableCell>
                    <TextFieldComponent  reasonChange={this.reasonChange} value={this.state.reason} disabled={this.state.clickRejectBtn||isButtonDisabled} ></TextFieldComponent>
                </TableCell>

            </TableRow>
        );
    }
}
export default ProcessAppealRequestListComponent;
