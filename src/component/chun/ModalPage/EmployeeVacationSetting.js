import React, {Component} from "react";
import axios from "axios";
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    IconButton, Snackbar,
    SvgIcon,
} from '@material-ui/core';
import Pagination from "react-js-pagination";
import EmployeeVacationSettingListComponent from "../Component/EmployeeVacationSettingListComponent";
import SearchIcon from '@material-ui/icons/Search';
import {Alert} from "@material-ui/lab";

/*TODO : 리스트 한줄을 컴포넌트로 변경할 것*/


const styles = (theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    text :{
        fontSize:'16px',
        fontFamily:'IBM Plex Sans KR'
    },
    titleText:{
        fontSize:'22px',
        fontFamily:'IBM Plex Sans KR',
        fontWeight:'bold'
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
    tableHead: {
        backgroundColor: '#F2F2F2',
        borderTop: '1.5px solid black',

    }

});

class EmployeeVacationSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empData: null,
            remainVacation: null,
            combineData: [],
            activePage:1,
            empPageData : {},
            addOpen:false,
            deleteOpen:false,
            showPagiNation:'flex',
            desc:'',
            sort:'',
            isSearch:false,
            searchNoContentSnackbarOpen:false,
            inputDataCheckSnackbarOpen:false
        };
        this.searchKeyword="";
        this.desc="";
        this.sort="";
        this.loginId="";

        this.login = this.login.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.AddHandleOpen = this.AddHandleOpen.bind(this);
        this.DeleteHandleOpen = this.DeleteHandleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.searchKeywordChange=this.searchKeywordChange.bind(this);
        this.handleSearchNoContentSnackbarOpen=this.handleSearchNoContentSnackbarOpen.bind(this);
        this.handleSearchNoContentSnackbarOpenClose=this.handleSearchNoContentSnackbarOpenClose.bind(this);
        this.handleInputDataCheckSnackbarOpen=this.handleInputDataCheckSnackbarOpen.bind(this);
        this.handleInputDataCheckSnackbarOpenClose=this.handleInputDataCheckSnackbarOpenClose.bind(this);

    }

    searchKeyword;
    desc;
    sort;
    loginId;

    handleInputDataCheckSnackbarOpen=()=>{
        this.setState({inputDataCheckSnackbarOpen:true});
    }

    handleInputDataCheckSnackbarOpenClose=()=>{
        this.setState({inputDataCheckSnackbarOpen:false});
    }

    handleSearchNoContentSnackbarOpen=()=>{
        this.setState({searchNoContentSnackbarOpen:true});
    }

    handleSearchNoContentSnackbarOpenClose=()=>{
        this.setState({searchNoContentSnackbarOpen:false});
    }


    AddHandleOpen = () => {
        this.setState({addOpen:true});
    };

    DeleteHandleOpen=()=>{
        this.setState({deleteOpen:true});
    }

    handleClose =() => {
        this.fetchData(1);
    };

    searchKeywordChange=(e)=>{
        this.searchKeyword = e.target.value;
    }

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


    showDialog = (title, message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: title,
            dialogMessage: message,
        });
    };


    login=async ()=>{

        // axios.defaults.withCredentials = true;
        // let loginForm = new FormData();
        // loginForm.append('loginId', '200001012');
        // loginForm.append('password', 'test');
        // try{
        //     const login = await axios.post('http://localhost:8080/login', loginForm);
        //
        //     // TODO :  this.loginId에 props로 전달받은 id를 설정해주어야 함
        //     this.loginId=login.data.loginId;
        //
        // }
    //     catch(error){
    //         //console.log("error 발생 !");
    //     }
    }

    fetchData=async(page)=> {
        // //console.log("PageNationStyle",PageNationStyle);

        let getPage = page;

        if (page != '') {
            getPage = '?page=' + getPage
        } else {
            this.desc='';
            this.sort='';
        }

        if (this.desc !== '' && this.sort !== '') {
            getPage = getPage + (getPage.includes('?') ? '&' : '?') + 'desc=' + this.desc + '&sort=' + this.sort;
            //console.log("getPage : ",getPage);
        }

        try {
            const employeeData = await axios.get('http://localhost:8080/manager/employees' + getPage);
            //console.log("employeeData.data : ", employeeData.data)
            const empPageData = employeeData.data //페이지 객체 데이터
            const empData = employeeData.data.data.map(data => ({ employeeId: data.employeeId, name: data.name }));

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
                ...this.state,
                empData: empData,
                remainVacation: remainVacation,
                combineData: combineData,
                empPageData: empPageData,
                activePage: page,
                showPagiNation: 'flex',
                isSearch: false,
                addOpen: false,
                deleteOpen: false,
                desc:this.desc,
                sort:this.sort
            });

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

    // sortChange,descChange 참고해서 정렬 다시 할것
    sortChange =  (e) =>{
        //console.log("sortChange 실행됨")
        //console.log("e.target.value : ",e.target.value);
        this.sort=e.target.value;
        this.setState({...this.state,sort: this.sort,desc:""});
    }

    descChange =  (e) => {
        //console.log("descChange 실행됨");
        // if(this.state.sort==="") {
        //     alert("정렬 기준을 먼저 선택하세요 !");
        //     //console.log("this.desc : ",this.desc);
        // }

        this.desc=e.target.value;
        // if(e.target.value!==0){
        //     this.desc=e.target.value;
        // }


        if (!this.state.isSearch) {
            this.fetchData(1);
        } else {
            let empData = "";

            if (this.desc === "asc") {
                empData = this.state.empData.sort((a, b) => {
                    if (this.sort === "employee_id") {
                        return a.employeeId - b.employeeId;
                    } else {
                        return a.name.localeCompare(b.name);
                    }
                });
                //console.log("empData - asc 정렬 : ", empData);
            } else {
                empData = this.state.empData.sort((a, b) => {
                    if (this.sort === "employee_id") {
                        return b.employeeId - a.employeeId;
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                });
                //console.log("empData - desc 정렬 : ", empData);
            }

            //console.log("정렬 - this.state.remainVacation : ", this.state.remainVacation);
            const combineData = empData.map((first) => ({...first,
                // remainVacation: this.state.remainVacation[first.employeeId],
                remainVacation :this.state.remainVacation.find((data) => Object.keys(data)[0] === first.employeeId)[first.employeeId]

            }));
            //console.log("정렬 - combineData : ", combineData);

            this.setState({ ...this.state,empData: empData, combineData: combineData,desc:this.desc});
        }
    };

    handleSearchButtonClick = async(e) => {
        const searchKeyword = this.searchKeyword;
        //console.log("searchKeyword : ", searchKeyword);

        const regex = /^[a-zA-Z0-9가-힣]{0,12}$/;
        if (!regex.test(searchKeyword)) {
            this.handleInputDataCheckSnackbarOpen();
            return;
        }

        if(searchKeyword === ""){
            const page="";
            // this.sort = "";
            // this.desc = "";
            this.fetchData(page);
        }else{
            try {
                // 가져온 검색 결과에서 데이터가 들어있는 객체 배열만 들고옴
                const searchResponse = (await axios.get(`http://localhost:8080/employee/search?searchParameter=${searchKeyword}`)).data;
                //console.log("searchResponse : ",searchResponse);

                if(searchResponse===""){
                    this.handleSearchNoContentSnackbarOpen();
                    return;
                }

                const empData = searchResponse.map(data => ({ employeeId: data.employeeId, name: data.name }));
                const employeeIds = empData.map((item) => item.employeeId);  //모든 id를 뽑아서 배열로 모음
                //console.log("employeeIds : ",employeeIds);
                const remainVacation = await Promise.all( //id에 대해서 남은 연차 수를 병렬로 모두 계산-> 결과는 배열
                    employeeIds.map(async (employeeId) => {
                        const response = await axios.get(`http://localhost:8080/manager/vacation/remain/${employeeId}`);
                        return {[employeeId]:response.data};
                    })
                );
                //console.log("remainVacation : ",remainVacation);

                const combineData = searchResponse.map((first) => ({
                    ...first,
                    remainVacation :remainVacation.find((data) => Object.keys(data)[0] === first.employeeId)[first.employeeId]
                })); // 사원정보 테이블의 사원명, 사원번호 데이터와 남은연차수 데이터를 합쳐서 또다른 객체 생성

                this.setState({
                    ...this.state,
                    empData: searchResponse,
                    remainVacation: remainVacation,
                    combineData: combineData,
                    showPagiNation:"None",
                    isSearch:true,
                    sort: '',
                    desc: ''
                });
                //console.log("this.state",this.state);

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

    };

    async componentDidMount() {
        // const { employeeId } = this.props; -> 추후 props의 로그인 아이디 들고오기
        await this.login(); //추후 login 함수 대신 session에 로그인 아이디 저장하는 함수로 대체할것(인자로 employeeId 넘겨야함)
        const page='';
        this.fetchData(page);
    }

    render() {
        const { classes } = this.props;
        const { combineData} = this.state; // render() 안에 있는 vacationType를 사용 하는 함수는 render 함수 내에 정의
        const { dialogOpen, dialogTitle, dialogMessage } = this.state;
        // vacationType state 값을 업데이트


        // form 전송에 필요한 데이터를 받아와 sendData 함수에 전달

        return (
            <Box>

                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.inputDataCheckSnackbarOpen} autoHideDuration={2000} onClose={this.handleInputDataCheckSnackbarOpenClose}>
                    <Alert onClose={this.handleInputDataCheckSnackbarOpenClose} severity="warning">
                        입력 값이 올바른 형식이 아닙니다!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}}  open={this.state.searchNoContentSnackbarOpen} autoHideDuration={2000} onClose={this.handleSearchNoContentSnackbarOpenClose}>
                    <Alert onClose={this.handleSearchNoContentSnackbarOpenClose} severity="warning">
                        검색 결과가 없습니다!
                    </Alert>
                </Snackbar>
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


                <Box  style={{ width: '1600px',margin:"10px 30px 30px 30px"}}>
                    <Box
                         sx={{fontSize:'30px', fontFamily:'IBM Plex Sans KR', fontWeight:'bold', borderBottom:'solid 1px black',  margin: '20px 0 20px 0',
                             paddingBottom: '10px'
                         }} >
                        사원 연차 설정
                    </Box>

                    {/*<Box style={{border:'3px solid #1D89DB', padding:'20px 10px 20px 10px',borderRadius:'10px'}} >*/}
                    {/*    <Box component="span" sx={{ marginRight: '10px',flex: 1}}>*/}
                    {/*        <TextField id="outlined-basic" label="사원 명/사원번호(최대 12자리)" variant="outlined" style={{width:"95%"}} onChange={this.searchKeywordChange}/>*/}
                    {/*    </Box>*/}
                    {/*    <Box component="span" >*/}
                    {/*        <SvgIcon style={{borderRadius:'6px' , width: "3.5%",height: 'fit-content',border:'1px solid #c1c1c1'}}*/}
                    {/*        cursor="pointer" component={SearchIcon} onClick={this.handleSearchButtonClick} />*/}
                    {/*            /!*<Button className={classes.button} variant="outlined" onClick={this.handleSearchButtonClick} >검색</Button>*!/*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}

                    <Box style={{border:'1px solid black', padding:'10px',borderRadius:'10px',display:"flex",justifyContent:'space-evenly'}} >
                        <TextField id="outlined-basic" label="사원 명/사원번호(최대 12자리)" variant="outlined" style={{width:"95%",height:"56px"}} onChange={this.searchKeywordChange}/>

                        <IconButton
                            onClick={this.handleSearchButtonClick}
                            style={{
                                borderRadius: '6px',
                                width: "4%",
                                border: '1px solid #c1c1c1',
                                height: "56px"}}>
                            <SearchIcon />
                        </IconButton>

                        {/*<SvgIcon style={{borderRadius:'6px' , width: "4%",border:'1px solid #c1c1c1', height:"56px"}}*/}
                        {/*         cursor="pointer" component={SearchIcon} onClick={this.handleSearchButtonClick} />*/}
                        {/*<Button className={classes.button} variant="outlined" onClick={this.handleSearchButtonClick} >검색</Button>*/}
                    </Box>


                    <Box component="" style={{display:"flex",justifyContent:"flex-end",marginBottom: '10px'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label`}
                                id={`demo-simple-select`}
                                value={this.state.sort}
                                onChange ={this.sortChange}>
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
                                onChange={this.descChange}>
                                <MenuItem value={"asc"}>오름차순</MenuItem>
                                <MenuItem value={"desc"}>내림차순</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>


                    <TableContainer component={Paper} style={{overflowX:'unset'}}>
                        <Table>
                            <TableHead className={classes.tableHead}>
                                <TableRow >
                                    <TableCell align="center" className={classes.titleText}>사원 번호</TableCell>
                                    <TableCell align="center" className={classes.titleText}>사원 명</TableCell>
                                    <TableCell align="center" className={classes.titleText}>남은 연차 개수</TableCell>
                                    {/*<TableCell align="center" className={classes.titleText}>연차 종류</TableCell>*/}
                                    <TableCell align="center" className={classes.titleText}>추가 및 삭제 개수</TableCell>
                                    <TableCell align="center" className={classes.titleText}>사유</TableCell>
                                    <TableCell align="center" className={classes.titleText}>추가</TableCell>
                                    <TableCell align="center" className={classes.titleText}>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combineData.map((row, index) => (
                                    <EmployeeVacationSettingListComponent
                                        className={classes.text}
                                        isButtonDisabled={row.employeeId === this.loginId}
                                        data={row}
                                        key={`${row.employeeId}_${index}`} // Update the key based on the sorting criteria
                                        AddHandleOpen={this.AddHandleOpen}
                                        DeleteHandleOpen={this.DeleteHandleOpen}
                                        title={["추가", "삭제"]}
                                        showErrorDialog={this.showErrorDialog}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box  sx={{ display: this.state.showPagiNation,alignItems: 'center', justifyContent: 'center' }}>
                        <Pagination
                            activePage={parseInt(this.state.activePage)}
                            itemsCountPerPage={this.state.empPageData['size']}
                            totalItemsCount={this.state.empPageData['totalElement']||0}
                            pageRangeDisplayed={10}
                            onChange={(page) => this.fetchData(page)}
                            innerClass={classes.pagination} // 페이징 컨테이너에 대한 스타일
                            itemClass={classes.pageItem} // 각 페이지 항목에 대한 스타일
                            activeClass={classes.activePageItem} // 활성 페이지 항목에 대한 스타일

                        />
                    </Box>
                </Box>
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
            </Box>

        );
    }
}

export default withStyles(styles)(EmployeeVacationSetting);


