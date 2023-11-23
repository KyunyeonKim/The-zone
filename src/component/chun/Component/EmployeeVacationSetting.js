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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import Pagination from "react-js-pagination";

/*TODO : 리스트 한줄을 컴포넌트로 변경할 것*/
const styles = (theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    text :{
        fontSize:'1.2rem'
    },
    button :{
        height:"90%",
        fontSize:'1rem'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        listStyle: 'none',
        padding: 0,
    },
    pageItem: {
        margin: '0 8px',
        '& a': {
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            width: '35px',
            borderRadius: '50%',
        },
        '&:hover': {
            border: '1px solid #ddd',
        },
    },
    activePageItem: {
        '& a': {
            color: '#007bff', // 번호 색상을 파란색으로 변경
        },
        '&:hover': {
            border: '1px solid #ddd',
        },
    },

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
            showPagiNation:'flex',
            searchKeyword:'',
            countInput: {},
            reasonInput:{},
            desc:'',
            sort:'',
            isSearch:false
        };
    }

    AddHandleOpen = async(employeeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
            this.setState(prevState => {
                const updatedCombineData = prevState.combineData.map(data => {
                    if (data.employeeId === employeeId) {
                        return {
                            ...data,
                            remainVacation: response.data // assuming response is an object and you want to access its data property
                        };
                    }
                    return data; // if employeeId doesn't match, return the original data
                });
                console.log("updateCombineData : ",updatedCombineData);

                return {
                    ...prevState,
                    combineData: updatedCombineData,
                    addOpen:true,
                    vacationType: { ...prevState.vacationType, [employeeId]: '' },
                    countInput: { ...prevState.countInput, [employeeId]: '' },
                    reasonInput: { ...prevState.reasonInput, [employeeId]: '' }
                };
            });
        } catch (error) {
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
            } else if (error.response.status === 500) {
                alert("500 Internal Server Error !");
            } else if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
            }
        }
    };



    DeleteHandleOpen = async(employeeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
            this.setState(prevState => {
                const updatedCombineData = prevState.combineData.map(data => {
                    if (data.employeeId === employeeId) {
                        return {
                            ...data,
                            remainVacation: response.data // assuming response is an object and you want to access its data property
                        };
                    }
                    return data; // if employeeId doesn't match, return the original data
                });
                console.log("updateCombineData : ",updatedCombineData);

                return {
                    ...prevState,
                    combineData: updatedCombineData,
                    deleteOpen:true,
                    vacationType: { ...prevState.vacationType, [employeeId]: '' },
                    countInput: { ...prevState.countInput, [employeeId]: '' },
                    reasonInput: { ...prevState.reasonInput, [employeeId]: '' }
                };
            });
        } catch (error) {
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
            } else if (error.response.status === 500) {
                alert("500 Internal Server Error !");
            } else if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
            }
        }
    };

    handleClose = async (employeeId) => {
        this.setState({addOpen: false, deleteOpen: false})

    };


    async login(){

        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append('loginId', '200001012');
        loginForm.append('password', 'test');
        try{
            const login = await axios.post('http://localhost:8080/login', loginForm);
            const loginId = login.data.loginId; // 추후, 로그인과 관련된 내용 제거후 props로 받아온 employeeId를 sessionstorage에 저장하도록 대체해야함
            sessionStorage.setItem('loginId',loginId);
        }
        catch(error){
            console.log("error 발생 !");
        }
    }

    async fetchData(page) {
        // console.log("PageNationStyle",PageNationStyle);

        let getPage = page;
        console.log("page : ", page);

        if (page != '') {
            getPage = '?page=' + getPage
        } else {
            await this.setState({sort: '', desc: ''});
        }
        console.log("합치기 전 getPage : ", getPage);
        console.log("this.state.desc : ", this.state.desc);

        if (this.state.desc !== '' && this.state.sort !== '') {
            getPage = getPage + (getPage.includes('?') ? '&' : '?') + 'desc=' + this.state.desc + '&sort=' + this.state.sort;
            console.log("getPage : ", getPage);
        }

        try {
            const employeeData = await axios.get('http://localhost:8080/manager/employees' + getPage);
            console.log("employeeData.data : ", employeeData.data)
            const empPageData = employeeData.data //페이지 객체 데이터
            const empData = employeeData.data.data; //사원정보 데이터

            const employeeIds = empData.map((item) => item.employeeId);  //모든 id를 뽑아서 배열로 모음
            const remainVacation = await Promise.all( //id에 대해서 남은 연차 수를 병렬로 모두 계산-> 결과는 배열
                employeeIds.map(async (employeeId) => {
                    const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
                    return {[employeeId]:response.data};
                })
            );

            const combineData = empData.map((first) => ({
                ...first,
                remainVacation :remainVacation.find((data) => Object.keys(data)[0] === first.employeeId)[first.employeeId]
            })); // 사원정보 테이블의 사원명, 사원번호 데이터와 남은연차수 데이터를 합쳐서 또다른 객체 생성



            this.setState({
                empData: empData,
                remainVacation: remainVacation,
                combineData: combineData,
                empPageData: empPageData,
                activePage: page,
                showPagiNation: 'flex',
                isSearch: false
            });

            console.log(this.state);
        } catch (error) {
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
        // const { employeeId } = this.props; -> 추후 props의 로그인 아이디 들고오기
        await this.login(); //추후 login 함수 대신 session에 로그인 아이디 저장하는 함수로 대체할것(인자로 employeeId 넘겨야함)
        const page='';
        this.fetchData(page);
    }

    render() {
        const { classes } = this.props;
        const { combineData,vacationType,searchKeyword,countInput,reasonInput} = this.state; // render() 안에 있는 vacationType를 사용 하는 함수는 render 함수 내에 정의

        // vacationType state 값을 업데이트
        const handleChange = async (event, employeeId) => {
            await this.setState(prevState => ({
                vacationType: {
                    ...prevState.vacationType,
                    [employeeId]: event.target.value
                }
            }));
        };

        const sortChange = async (event) =>{
            await this.setState(prevState=>({
                    sort:event.target.value
                })
            );

        }

        const descChange = async (event) => {
            await this.setState((prevState) => ({
                desc: event.target.value,
            }), () => {
                if (!this.state.isSearch) {
                    this.fetchData(1);
                } else {
                    let empData = "";

                    if (this.state.desc === "asc") {
                        empData = this.state.empData.sort((a, b) => {
                            if (this.state.sort === "employee_id") {
                                return a.employeeId - b.employeeId;
                            } else {
                                return a.name.localeCompare(b.name);
                            }
                        });
                        console.log("empData - asc 정렬 : ", empData);
                    } else {
                        empData = this.state.empData.sort((a, b) => {
                            if (this.state.sort === "employee_id") {
                                return b.employeeId - a.employeeId;
                            } else {
                                return b.name.localeCompare(a.name);
                            }
                        });
                        console.log("empData - desc 정렬 : ", empData);
                    }

                    console.log("정렬 - this.state.remainVacation : ", this.state.remainVacation);
                    const combineData = empData.map((first) => ({
                        ...first,
                        // remainVacation: this.state.remainVacation[first.employeeId],
                        remainVacation :this.state.remainVacation.find((data) => Object.keys(data)[0] === first.employeeId)[first.employeeId]

                    }));
                    console.log("정렬 - combineData : ", combineData);

                    this.setState({ empData: empData, combineData: combineData });
                }
            });
        };


        const handleSearchButtonClick = async(e) => {
            console.log("searchKeyword : ", searchKeyword);

            const regex = /^[a-zA-Z0-9]{0,12}$/;
            if (!regex.test(searchKeyword)) {
                alert("검색어는 영,숫자 12글자 이하로 가능합니다.");
                return;
            }

            if(searchKeyword === ""){
                const page="";
                this.fetchData(page);
            }else{
                try {
                    // 가져온 검색 결과에서 데이터가 들어있는 객체 배열만 들고옴
                    const searchResponse = (await axios.get(`http://localhost:8080/employee/search?searchParameter=${searchKeyword}`)).data;
                    console.log("searchResponse : ",searchResponse);

                    const employeeIds = searchResponse.map((item) => item.employeeId);  //모든 id를 뽑아서 배열로 모음
                    const remainVacation = await Promise.all( //id에 대해서 남은 연차 수를 병렬로 모두 계산-> 결과는 배열
                        employeeIds.map(async (employeeId) => {
                            const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
                            return {[employeeId]:response.data};
                        })
                    );
                    console.log("remainVacation : ",remainVacation);

                    const combineData = searchResponse.map((first) => ({
                        ...first,
                        remainVacation :remainVacation.find((data) => Object.keys(data)[0] === first.employeeId)[first.employeeId]
                    })); // 사원정보 테이블의 사원명, 사원번호 데이터와 남은연차수 데이터를 합쳐서 또다른 객체 생성

                    this.setState({
                        empData: searchResponse,
                        remainVacation: remainVacation,
                        combineData: combineData,
                        showPagiNation:"None",
                        isSearch:true
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
        const handleButtonClick =  async (event, employeeId, action) => {
            if (employeeId === sessionStorage.getItem("loginId")) {
                alert("본인에 대한 처리는 불가능합니다.");
                return;
            }

            const isAddButton = action === 'add';
            console.log("combine : ", this.state.combineData);

            const countValue = countInput[employeeId];

            // 숫자가 아닌 경우 메시지 표시
            if (!/^\d{1,3}$/.test(countValue)) {
                alert("입력개수는 0에서 세자리 까지 가능합니다!");
                return;
            }

            const remainingVacation = this.state.combineData.find(data => data.employeeId === employeeId)?.remainVacation;
            console.log("countValue:", parseInt(countValue, 10));
            console.log("Remaining Vacation:", remainingVacation);

            if (isAddButton === false && parseInt(countValue, 10) > remainingVacation) {
                console.log("남은 연차 개수보다 많은 개수입니다!");
                alert("남은 연차 개수보다 많이 입력할 수 없습니다!");
                return;
            }

            const count = isAddButton ? parseInt(countValue, 10) : -parseInt(countValue, 10);


            if (reasonInput[employeeId] === "" || reasonInput[employeeId] == null) {
                alert("사유를 입력하세요!");
                return;
            }

            const reason = reasonInput[employeeId];

            // 연차 종류 가져오기
            const vacationType = this.state.vacationType[employeeId];
            if (vacationType === "" || vacationType == null) {
                alert("연차 종류를 입력하세요!");
                return;
            }

            if (isAddButton === true && vacationType === "근태 불량") {
                alert("연차 추가 불가능한 연차 종류입니다.");
                return;
            }

            if (isAddButton === false && vacationType !== "근태 불량") {
                alert("연차 삭제 불가능한 연차 종류입니다.");
                return;
            }

            await sendData(count, reason, vacationType, employeeId, isAddButton);




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
                    this.AddHandleOpen(employeeId);

                }

                if(isAddButton===false){
                    this.DeleteHandleOpen(employeeId);
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

        const PagiNationStyle = {
            pagination: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
            },
            ul: {
                listStyle: 'none',
                padding: '0',
            },
            'ul.pagination li': {
                width: '35px',
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1rem',
            },
            'ul.pagination li a': {
                textDecoration: 'none',
                color: 'black',
                fontSize: '1rem',
            },
            'ul.pagination li.active a': {
                fontWeight: 'bold',
                color: '#87b8e3',
            },
            'ul.pagination li:hover, ul.pagination li.active': {
                border: '1px solid grey',
            },
            MuiButtonRoot: {
                height: '55px',
            },
        };


        return (
            <div>
                <Dialog open={this.state.addOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 개수 추가</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            추가 완료 하였습니다!
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
                            삭제 완료 하였습니다!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>


                <div  style={{ width: '80%', margin: 'auto' }}>
                    <Box component="section" >
                        <Typography variant="h3" style={{ margin: '50px', textAlign: 'center' }}>
                            사원의 연차 직접 부여
                        </Typography>
                    </Box>
                    <div style={{marginBottom: '15px',display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Box component="span" sx={{ marginRight: '10px'}}>
                                <TextField id="outlined-basic" label="검색할 사원 명/사원번호" variant="outlined" value={searchKeyword} onChange={(e) => this.setState({ searchKeyword: e.target.value })}/>
                            </Box>
                            <Box component="span">
                                <Button className={classes.button} variant="outlined" onClick={(e)=>handleSearchButtonClick(e)}>검색</Button>
                            </Box>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                                <Select
                                    labelId={`demo-simple-select-label`}
                                    id={`demo-simple-select`}
                                    value={this.state.sort}
                                    onChange={(e) => sortChange(e)}>
                                    <MenuItem value={"employee_id"}>사원 번호</MenuItem>
                                    <MenuItem value={"name"}>사원 명</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel id={`demo-simple-select-label`}>정렬 방식</InputLabel>
                                <Select
                                    labelId={`demo-simple-select-label`}
                                    id={`demo-simple-select`}
                                    value={this.state.desc}
                                    onChange={(e) => descChange(e)}>
                                    <MenuItem value={"asc"}>오름차순</MenuItem>
                                    <MenuItem value={"desc"}>내림차순</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} stickyHeader="true" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className={classes.text}>사원 번호</TableCell>
                                    <TableCell align="center" className={classes.text}>사원 명</TableCell>
                                    <TableCell align="center" className={classes.text}>남은 연차 개수</TableCell>
                                    <TableCell align="center" className={classes.text}>연차 종류</TableCell>
                                    <TableCell align="center" className={classes.text}>추가 및 삭제 개수</TableCell>
                                    <TableCell align="center" className={classes.text}>사유</TableCell>
                                    <TableCell align="center" className={classes.text}>추가</TableCell>
                                    <TableCell align="center" className={classes.text}>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combineData.map((data) => (
                                    <TableRow key={data.employeeId}>
                                        <TableCell align="center" className={classes.text}>
                                            {data.employeeId}
                                        </TableCell>
                                        <TableCell align="center" className={classes.text}>{data.name}</TableCell>
                                        <TableCell align="center" className={classes.text}> {data.remainVacation}</TableCell>
                                        <TableCell align="center" className={classes.text}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id={`demo-simple-select-label-${data.employeeId}`}>연차 종류</InputLabel>
                                                <Select
                                                    labelId={`demo-simple-select-label-${data.employeeId}`}
                                                    id={`demo-simple-select-${data.employeeId}`}
                                                    // value={vacationType[data.employeeId]||''}
                                                    value={vacationType[data.employeeId] || ''}
                                                    onChange={(e) => handleChange(e, data.employeeId)}
                                                    disabled={data.employeeId === sessionStorage.getItem("loginId")} // 본인 아이디와 비교하여 비활성화
                                                >
                                                    <MenuItem value={"근태 불량"}>근태 불량</MenuItem>
                                                    <MenuItem value={"연차 추가 제공"}>연차 추가 제공</MenuItem>
                                                    <MenuItem value={"포상 연차 제공"}>포상 연차 제공</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField id={`standard-basic-${data.employeeId}`} label={data.employeeId === sessionStorage.getItem("loginId")===true?"본인의 정보 처리 불가":"추가 및 삭제 개수"} value={countInput[data.employeeId]||''} onChange={(e) => {
                                                const updateCountInput={...countInput,[data.employeeId]:e.target.value};
                                                console.log("updateCountInput : ",updateCountInput);
                                                this.setState({countInput: updateCountInput});

                                            }} disabled={data.employeeId === sessionStorage.getItem("loginId")} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField id={`standard-basic-reason-${data.employeeId}`} label={data.employeeId === sessionStorage.getItem("loginId")===true?"본인의 정보 처리 불가":"사유"} value={reasonInput[data.employeeId]||''} onChange={(e) => {
                                                const updateReasonInput={...reasonInput,[data.employeeId]:e.target.value};
                                                console.log("updateReasonInput : ",updateReasonInput);
                                                this.setState({ reasonInput: updateReasonInput });
                                            }} disabled={data.employeeId === sessionStorage.getItem("loginId")} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button className={classes.button} variant="contained" color="primary" onClick={(e) => handleButtonClick(e, data.employeeId,'add')}>추가</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => handleButtonClick(e, data.employeeId,'minus')}>삭제</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box component="section" sx={{ display: this.state.showPagiNation,alignItems: 'center', justifyContent: 'center' }}>
                        <div style={PagiNationStyle.pagination}>
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.empPageData['size']}
                                totalItemsCount={this.state.empPageData['totalElement']}
                                pageRangeDisplayed={10}
                                onChange={(page) => this.fetchData(page)}
                                innerClass={classes.pagination} // 페이징 컨테이너에 대한 스타일
                                itemClass={classes.pageItem} // 각 페이지 항목에 대한 스타일
                                activeClass={classes.activePageItem} // 활성 페이지 항목에 대한 스타일

                            />
                        </div>
                    </Box>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeVacationSetting);


