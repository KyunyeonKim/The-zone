import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import RedButtonComponent from "./RedButtonComponent";
import {withStyles} from "@material-ui/core/styles";


const styles = (theme) => ({
    text :{
        fontSize:'1.2rem'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
});

class EmployeeVacationSettingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            vacationType:"",
            countInput:"",
            reasonInput:""
        }

        this.vacationTypeChange = this.vacationTypeChange.bind(this);
        this.countInputChange = this.countInputChange.bind(this);
        this.reasonInputChange = this.reasonInputChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    vacationTypeChange=(e)=>{
        this.setState({...this.state,vacationType:e.target.value});
        console.log("vacationTypeChange: ",e.target.value);
    }

    countInputChange=(e)=>{
        this.setState({countInput:e.target.value});
        console.log("countInputChange: ",e.target.value);
    }

    reasonInputChange=(e)=>{
        this.setState({reasonInput:e.target.value});
        console.log("reasonInputChange: ",e.target.value);
    }

    handleButtonClick =  async (employeeId, action) => {
        console.log("this.props.isButtinDisabled : ",this.props.isButtonDisabled);
        if (this.props.isButtonDisabled) {
            alert("본인에 대한 처리는 불가능합니다.");
            return;
        }

        const isAddButton = action === 'add';

        const countValue = this.state.countInput;
        // 숫자가 아닌 경우 메시지 표시
        if (!/^\d{1,3}$/.test(countValue)) {
            console.log("countValue:", countValue); // 디버깅을 위한 콘솔 로그 추가
            alert("입력개수는 1에서 세자리 까지 가능합니다!");
            return;
        }

        if (isAddButton === false && parseInt(countValue, 10) >this.props.data.remainVacation) {
            console.log("남은 연차 개수보다 많은 개수입니다!");
            alert("남은 연차 개수보다 많이 입력할 수 없습니다!");
            return;
        }

        const count = isAddButton ? parseInt(countValue, 10) : -parseInt(countValue, 10);


        if (this.state.reasonInput === "" || this.state.reasonInput === null) {
            alert("사유를 입력하세요!");
            return;
        }

        // 연차 종류 가져오기
        if (this.state.vacationType === "" || this.state.vacationType == null) {
            alert("연차 종류를 입력하세요!");
            return;
        }

        if (isAddButton === true && this.state.vacationType === "근태 불량") {
            alert("연차 추가 불가능한 연차 종류입니다.");
            return;
        }

        if (isAddButton === false && this.state.vacationType !== "근태 불량") {
            alert("연차 삭제 불가능한 연차 종류입니다.");
            return;
        }

        // sendData 함수 호출
        await this.sendData(count, this.state.reasonInput, this.state.vacationType, employeeId, isAddButton);

        // 상태 초기화
        this.setState({
            countInput: "",
            reasonInput: "",
            vacationType: ""
        });
    };

    sendData = async(count,reason,vacationType,employeeId,isAddButton) => {
        const formData = new FormData();
        formData.append('adjustQuantity',count);
        formData.append('reason',reason);
        formData.append('adjustType',vacationType);

        try{
            const response = await axios.post('http://localhost:8080/manager/vacation/modify/'+employeeId,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            isAddButton===true?this.props.AddHandleOpen(employeeId):this.props.DeleteHandleOpen(employeeId);
            console.log("전송 성공");
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
    render() {
        const {isButtonDisabled,data,keyData,classes,title} = this.props;

        return (
            <TableRow key={keyData}>
                <TableCell align="center" className={classes.text}>
                    {data.employeeId}
                </TableCell>
                <TableCell align="center" className={classes.text}>{data.name}</TableCell>
                <TableCell align="center" className={classes.text}> {data.remainVacation}</TableCell>
                <TableCell align="center" className={classes.text}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id={`demo-simple-select-label`}>연차 종류</InputLabel>
                        <Select
                            labelId={`demo-simple-select-label`}
                            id={"vacationType"}
                            onChange={this.vacationTypeChange}
                            value={this.state.vacationType}
                            disabled={isButtonDisabled} // 본인 아이디와 비교하여 비활성화
                        >
                            <MenuItem value={"근태 불량"}>근태 불량</MenuItem>
                            <MenuItem value={"연차 추가 제공"}>연차 추가 제공</MenuItem>
                            <MenuItem value={"포상 연차 제공"}>포상 연차 제공</MenuItem>

                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="center">
                    <TextField id={"countInput"} label={isButtonDisabled?"본인의 정보 처리 불가":"추가 및 삭제 개수"}
                               onChange={this.countInputChange}
                               value={this.state.countInput}
                               disabled={isButtonDisabled}/>

                </TableCell>
                <TableCell align="center">
                    <TextField id={"reasonInput"} label={isButtonDisabled?"본인의 정보 처리 불가":"사유"}
                               onChange={this.reasonInputChange}
                               value={this.state.reasonInput}
                               disabled={isButtonDisabled} />
                </TableCell>
                <TableCell align="center">
                    <ButtonComponent
                        disabled={isButtonDisabled}
                        onButtonClick={() =>this.handleButtonClick(data.employeeId, 'add')}
                        title={title[0]}
                    />

                </TableCell>
                <TableCell align="center">
                    {/*<Button className={classes.button} variant="contained" color="secondary" onClick={(e) => handleButtonClick(e, data.employeeId,'minus')}>삭제</Button>*/}
                    <RedButtonComponent disabled={isButtonDisabled} onButtonClick={() =>this.handleButtonClick(data.employeeId, 'minus')} title={title[1]}  />
                </TableCell>
            </TableRow>

        );
    }
}
export default withStyles(styles)(EmployeeVacationSettingListComponent);
