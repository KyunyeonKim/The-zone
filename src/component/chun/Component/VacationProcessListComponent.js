import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";
import TextFieldComponent from "./TextFieldComponent";
import axios from "axios";

class VacationProcessListComponent extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        // props에서 검색 버튼 클릭 여부를 확인하여 리렌더링 결정
        return nextProps.isButtonClicked||nextState.clickRejectBtn !== this.state.clickRejectBtn;
    }
    constructor(props) {
        super(props);
        this.state = {
            vacationRequestKey: "",
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
        {console.log("다시 리렌더링 됨");}
        const {row,keyData,title,onApproveBtnClick,onRejectBtnClick,id} = this.props;
        this.setState({ vacationRequestKey: row.vacationRequestKey });
        const isButtonDisabled = id === row.employeeId;
        console.log("render id :",id );
        console.log("render row.employeeId :",row.employeeId );


        const sendApproveData = async(employeeId, vacationRequestKey)=>{
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

        const sendRejectData = async(employeeId, vacationRequestKey,reason)=>{
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
            sendApproveData(row.employeeId,row.vacationRequestKey);
        };

        const onRejectButtonClick = async(e)=>{
            if(this.state.clickRejectBtn === true){
                this.setState({clickRejectBtn:false},()=>{
                    console.log("this.state.clickRejectBtn : ",this.state.clickRejectBtn);
                });

            }
            else{
                if(this.state.reason === ""|| this.state.reason ===null){
                    alert("반려 사유를 반드시 입력하세요!");
                    return;
                }
                sendRejectData(row.employeeId,row.vacationRequestKey,this.state.reason);
            }

        };

        return (
                <TableRow key={keyData}>
                    {Object.entries(row).map(([key, value]) => (
                        <TableCell key={key}>
                            {console.log('Key:', key, 'Value:', value)}
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
export default VacationProcessListComponent;
