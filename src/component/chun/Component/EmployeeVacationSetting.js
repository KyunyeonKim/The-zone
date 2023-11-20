import React, { Component } from "react";
import axios from "axios";
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import Pagination from "react-js-pagination";
import './EmployeeVacationSetting.css';

const styles = (theme) => ({
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }

});

class EmployeeVacationSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empData: null,
            remainVacation: null,
            combineData: [],
            vacationType: {},
            activePage:1,
            empPageData : {},
            addOpen:false,
            deleteOpen:false,
            // open : false,
            showPageNation:'flex',
            searchKeyword:'',
            countInput: {},
            reasonInput:{},
            // sort:''
        };
    }

    AddHandleOpen = (count, employeeId) => {
        this.setState((prevState) => {
            const updatedCombineData = prevState.combineData.map((data) => {
                if (data.employeeId === employeeId) {
                    // 해당하는 employeeId의 데이터를 찾아 count를 더한 값으로 업데이트
                    return {
                        ...data,
                        remainVacation: data.remainVacation + count,
                    };
                }
                return data;
            });

            return {
                ...prevState,
                addOpen: true,
                combineData: updatedCombineData,
                vacationType: { ...prevState.vacationType, [employeeId]: '' },
                countInput: { ...prevState.countInput, [employeeId]: '' },
                reasonInput: { ...prevState.reasonInput, [employeeId]: '' }
            };
        }, () => {

            // 콜백 함수에서 상태가 업데이트된 후의 로그를 출력합니다.
            console.log("state 최종 : ", this.state);

        });

    };



    DeleteHandleOpen = (count, employeeId) => {
        this.setState((prevState) => {
            const updatedCombineData = prevState.combineData.map((data) => {
                if (data.employeeId === employeeId) {
                    // 해당하는 employeeId의 데이터를 찾아 count를 더한 값으로 업데이트
                    return {
                        ...data,
                        remainVacation: data.remainVacation + count,
                    };
                }
                return data;
            });

            return {
                ...prevState,
                deleteOpen: true,
                combineData: updatedCombineData,
                vacationType: { ...prevState.vacationType, [employeeId]: '' },
                countInput: { ...prevState.countInput, [employeeId]: '' },
                reasonInput: { ...prevState.reasonInput, [employeeId]: '' }
            };
        }, () => {
            // 콜백 함수에서 상태가 업데이트된 후의 로그를 출력

            console.log("state 최종 : ", this.state);
        });

    };

    handleClose = (count, employeeId) => {

        this.setState({...this.state,addOpen:false,deleteOpen:false})

    };

    async login(){
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append('loginId', '200001012');
        loginForm.append('password', 'test');
        try{
            const login = await axios.post('http://localhost:8080/login', loginForm);
        }
        catch(error){
            console.log("error 발생 !");
        }
    }

    async fetchData(page) {
        if(page!=''){
            page='?page='+page
        }

        try {
            const employeeData = await axios.get('http://localhost:8080/manager/employees' + page);
            const empPageData = employeeData.data //페이지 객체 데이터
            const empData = employeeData.data.data; //사원정보 데이터

            const employeeIds = empData.map((item) => item.employeeId);  //모든 id를 뽑아서 배열로 모음
            const remainVacation = await Promise.all( //id에 대해서 남은 연차 수를 병렬로 모두 계산-> 결과는 배열
                employeeIds.map(async (employeeId) => {
                    const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
                    return response.data;
                })
            );

            const combineData = empData.map((first, index) => ({
                ...first,
                remainVacation: remainVacation[index],
            })); // 사원정보 테이블의 사원명, 사원번호 데이터와 남은연차수 데이터를 합쳐서 또다른 객체 생성

            this.setState({
                empData: empData,
                remainVacation: remainVacation,
                combineData: combineData,
                empPageData:empPageData,
                activePage: page,
                showPageNation:'flex'
            });

            console.log(this.state);
        }
        catch(error) {
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
            }
            if (error.response.status === 500) {
                alert("500 Internal Server Error !");
            }
            if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
            }
            return;
        }

    }

    async componentDidMount() {
        await this.login();
        const page='';
        this.fetchData(page);
    }

    render() {
        const { classes } = this.props;
        const { combineData,vacationType,searchKeyword,countInput,reasonInput} = this.state; // render() 안에 있는 vacationType를 사용 하는 함수는 render 함수 내에 정의

        // vacationType state 값을 업데이트
        const handleChange = (event, employeeId) => {
            this.setState(prevState => ({
                vacationType: {
                    ...prevState.vacationType,
                    [employeeId]: event.target.value
                }
            }));
        };

        const descChange = (event) =>{

        }

        const handleSearchButtonClick = async(e) => {
            console.log("searchKeyword : ", searchKeyword);
            if(searchKeyword == ""){
                const page="";
                this.fetchData(page);
            }
            else{
                try {
                    // 가져온 검색 결과에서 데이터가 들어있는 객체 배열만 들고옴
                    const searchResponse = (await axios.get(`http://localhost:8080/employee/search?searchParameter=${searchKeyword}`)).data;
                    console.log("searchResponse : ",searchResponse);

                    const employeeIds = searchResponse.map((item) => item.employeeId);  //모든 id를 뽑아서 배열로 모음
                    const remainVacation = await Promise.all( //id에 대해서 남은 연차 수를 병렬로 모두 계산-> 결과는 배열
                        employeeIds.map(async (employeeId) => {
                            const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
                            return response.data;
                        })
                    );

                    const combineData = searchResponse.map((first, index) => ({
                        ...first,
                        remainVacation: remainVacation[index],
                    })); // 사원정보 테이블의 사원명, 사원번호 데이터와 남은연차수 데이터를 합쳐서 또다른 객체 생성

                    this.setState({
                        empData: searchResponse,
                        remainVacation: remainVacation,
                        combineData: combineData,
                        showPageNation:"None",
                    });
                    console.log("this.state",this.state);

                } catch(error) {
                    if (error.response.status === 400) {
                        alert("400 Bad Request Error!");
                    }
                    if (error.response.status === 500) {
                        alert("500 Internal Server Error !");
                    }
                    if (error.response.status === 403) {
                        alert("403 Forbidden - Access denied !");
                    }
                    return;
                }
            }

        };


        // form 전송에 필요한 데이터를 받아와 sendData 함수에 전달
        const handleButtonClick = (event, employeeId,action) => {
            const isAddButton = action === 'add';

            const countValue  = countInput[employeeId];
            // 숫자가 아닌 경우 메시지 표시
            if (!/^\d+$/.test(countValue)) {
                alert("개수에 0이상의 숫자 데이터를 입력하세요!");
                return;
            }
            const count = isAddButton ? parseInt(countValue, 10) : -parseInt(countValue, 10);

            if(reasonInput[employeeId] === ""||reasonInput[employeeId]==null){
                alert("사유를 입력하세요!");
                return;
            }

            const reason = reasonInput[employeeId];

            // 연차 종류 가져오기
            const vacationType = this.state.vacationType[employeeId];
            if(vacationType===""||vacationType==null){
                alert("연차 종류를 입력하세요!");
                return;
            }
            // form 데이터 post 요청하는 함수 호출
            (async () => {
                await sendData(count, reason, vacationType, employeeId,isAddButton);
            })();

        };

        const sendData = async(count,reason,vacationType,employeeId,isAddButton) => {
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

                if(isAddButton===true){
                    this.AddHandleOpen(count,employeeId);
                }

                if(isAddButton===false){
                    this.DeleteHandleOpen(count,employeeId);
                }


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

        return (
            <div>
                <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 개수 추가</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            추가 완료하였습니다!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.deleteOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 개수 삭제</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            삭제 완료하였습니다!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>

                <div className={classes.outerContainer}>
                    <Box component="section" width="80%" >
                        <Typography variant="h3" style={{ margin: '50px', textAlign: 'center' }}>
                            사원의 연차 직접 부여
                        </Typography>
                    </Box>
                    <Box component="section" width="80%"sx={{ marginBottom: '15px',display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Box component="span" sx={{ marginRight: '10px'}}>
                                <TextField id="outlined-basic" label="검색할 사원 명/사원번호" variant="outlined" value={searchKeyword} onChange={(e) => this.setState({ searchKeyword: e.target.value })}/>
                            </Box>
                            <Box component="span">
                                <Button variant="outlined" onClick={(e)=>handleSearchButtonClick(e)}>검색</Button>
                            </Box>
                        </div>

                        <FormControl className={classes.formControl}>
                            <InputLabel id={`demo-simple-select-label`}>연차 종류</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label`}
                                id={`demo-simple-select`}
                                value={this.state.desc}
                                onChange={(e) => descChange(e)}>
                                <MenuItem value={"asc"}>오름차순</MenuItem>
                                <MenuItem value={"내림차순"}>내림차순</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>


                    <Box component="section" width="80%" sx={{ alignItems: 'center',marginBottom:'20px'}}>
                        <Box component="section" sx={{ p: 3, border: '1px solid black', display: 'flex', justifyContent: 'space-between',  textAlign: 'center' }}>
                            <Box component="span" width='10%' margin='auto'> 사원 번호 </Box>
                            <Box component="span" width='10%' margin='auto'> 사원 명 </Box>
                            <Box component="span" width='10%' margin='auto'> 남은 연차 개수 </Box>
                            <Box component="span" width='10%' margin='auto'> 연차 종류 </Box>
                            <Box component="span" width='10%' margin='auto'> 추가 및 삭제 개수 </Box>
                            <Box component="span" width='20%' margin='auto'> 사유</Box>
                            <Box component="span" width='5%' margin='auto'> 추가 버튼</Box>
                            <Box component="span" width='5%' margin='auto'> 삭제 버튼</Box>
                        </Box>

                        {combineData.map((data) => (
                            <div key={data.employeeId}>
                                <Box component="section" sx={{ p: 3, border: '1px solid black', display: 'flex', justifyContent: 'space-between',  textAlign: 'center'}}>
                                    <Box component="span" width='10%' margin='auto' > {data.employeeId} </Box>
                                    <Box component="span" width='10%' margin='auto'> {data.name} </Box>
                                    <Box component="span" width='10%' margin='auto'> {data.remainVacation} </Box>
                                    <Box component="span" width='10%' margin='auto'>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id={`demo-simple-select-label-${data.employeeId}`}>연차 종류</InputLabel>
                                            <Select
                                                labelId={`demo-simple-select-label-${data.employeeId}`}
                                                id={`demo-simple-select-${data.employeeId}`}
                                                value={vacationType[data.employeeId]||''}
                                                onChange={(e) => handleChange(e, data.employeeId)}
                                            >
                                                <MenuItem value={"근태 불량"}>근태 불량</MenuItem>
                                                <MenuItem value={"연차 추가 제공"}>연차 추가 제공</MenuItem>
                                                <MenuItem value={"포상 연차 제공"}>포상 연차 제공</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box component="span" width='10%' margin='auto'>
                                        <TextField id={`standard-basic-${data.employeeId}`} label="추가 및 삭제 개수" value={countInput[data.employeeId]||''} onChange={(e) => {
                                            const updateCountInput={...countInput,[data.employeeId]:e.target.value};
                                            console.log("updateCountInput : ",updateCountInput);
                                            this.setState({countInput: updateCountInput});
                                        }} />
                                    </Box>

                                    <Box component="span" width='20%' margin='auto'>
                                        <TextField id={`standard-basic-reason-${data.employeeId}`} label="사유" value={reasonInput[data.employeeId]||''} onChange={(e) => {
                                            const updateReasonInput={...reasonInput,[data.employeeId]:e.target.value};
                                            console.log("updateReasonInput : ",updateReasonInput);
                                            this.setState({ reasonInput: updateReasonInput });
                                        }}/>
                                    </Box>

                                    <Box component="span" width='5%' margin='auto'>
                                        <Button variant="contained" color="primary" onClick={(e) => handleButtonClick(e, data.employeeId,'add')}>추가</Button>
                                    </Box>

                                    <Box component="span" width='5%' margin='auto'>
                                        <Button variant="contained" color="secondary" onClick={(e) => handleButtonClick(e, data.employeeId,'minus')}>삭제</Button>
                                    </Box>
                                </Box>

                            </div>
                        ))}
                    </Box>
                    <Box component="section" sx={{display: this.state.showPageNation}}>
                        <div>
                            <Pagination
                                activePage={this.state.activePage} //현재 페이지
                                itemsCountPerPage={this.state.empPageData['size']} //한 페이지당 보여줄 리스트 아이템 개수
                                totalItemsCount={this.state.empPageData['totalElement']} //총 아이템 개수
                                pageRangeDisplayed={10} //Paginator 내에서 보여줄 페이지의 범위
                                onChange={(page)=>this.fetchData(page)} //페이지 바뀔때 핸들링할 함수
                            />
                        </div>
                    </Box>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeVacationSetting);


