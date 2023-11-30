import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import ButtonComponent from "./ButtonComponent";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from "react-js-pagination";
import VacationProcessListComponent from "./VacationProcessListComponent";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import vacationRequest from "./VacationRequest";

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
class VacationProcess extends Component{
    constructor(props) {
        super(props);
        this.state = {
            desc:'',
            sort:'',
            isSearch:'',
            activePage:1,
            showPagiNation: 'flex',
            data:[],
            pageData:{},
            approveOpen:false,
            rejectOpen:false

        };

        this.searchKeyword="";
        this.desc="";
        this.sort="";
        this.id=""

        this.login = this.login.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.onApproveBtnClick = this.onApproveBtnClick.bind(this);
        this.onRejectBtnClick = this.onRejectBtnClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    searchKeyword;
    desc;
    sort;
    id;

    searchKeywordChange=(e)=>{
        this.searchKeyword = e.target.value;
    }

    login= async() =>{
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append('loginId', '200001012');
        loginForm.append('password', 'test');
        try{
            const login = await axios.post('http://localhost:8080/login', loginForm);
            console.log("로그인 완료");
        }
        catch(error){
            console.log("error 발생 !");
        }
    }

    fetchData=async(page)=> {

        let getPage = page;

        if (page != '') {
            getPage = '?page=' + getPage
        } else {
            this.desc='';
            this.sort='';        }

        if (this.desc !== '' && this.sort !== '') {
            getPage = getPage + (getPage.includes('?') ? '&' : '?') + 'desc=' + this.desc + '&sort=' + this.sort;
        }

        try {
            const getVacationAllRequest = await axios.get('http://localhost:8080/manager/vacation/all/requested' + getPage);
            console.log("getVacationAllRequest.data.data : ", getVacationAllRequest.data.data);

            const getVacationAllRequestData = getVacationAllRequest.data.data.map(item => {
                return {
                    vacationRequestKey: item.vacationRequestKey,
                    employeeId: item.employeeId,
                    name: item.name,
                    vacationCategoryKey: item.vacationCategoryKey,
                    vacationStartDate: item.vacationStartDate,
                    vacationEndDate: item.vacationEndDate,
                    reason: item.reason,
                    vacationRequestTime: item.vacationRequestTime,
                };
            });

            console.log("1. getVacationAllRequestData : ", getVacationAllRequestData);


            this.setState({
                isSearch: false,
                activePage: page,
                showPagiNation: 'flex',
                data: getVacationAllRequestData,
                pageData: getVacationAllRequest.data,
                desc: this.desc,
                sort: this.sort
            });
        }catch (error) {
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

    handleSearchButtonClick = async(e) => {
        // 검색 버튼 클릭 시 수행할 로직
        const searchKeyword = this.searchKeyword;
        const regex = /^[a-zA-Z0-9가-힣]{0,12}$/;
        if (!regex.test(searchKeyword)) {
            alert("올바르지 않은 입력입니다!");
            return;
        }

        if(searchKeyword === ""){
            const page="";
            this.fetchData(page);
        }else{
            try{
                const searchRawData = await axios.get(`http://localhost:8080/manager/search/vacation/all/requested?searchParameter=${searchKeyword}`);
                console.log("searchRawData :",searchRawData);

                if(searchRawData.data===""){
                    alert("검색 결과가 없습니다!");
                    return;
                }

                const getSearchAllVacationRequest = searchRawData.data.map(item=>{
                    return {
                        vacationRequestKey: item.vacationRequestKey,
                        employeeId: item.employeeId,
                        name: item.name,
                        vacationCategoryKey: item.vacationCategoryKey,
                        vacationStartDate: item.vacationStartDate,
                        vacationEndDate: item.vacationEndDate,
                        reason: item.reason,
                        vacationRequestTime: item.vacationRequestTime,

                    };
                });
                console.log("getSearchAllVacationRequest : ",searchRawData);


                this.setState({

                    data: getSearchAllVacationRequest,
                    showPagiNation:"None",
                    isSearch:true,
                    sort:"",
                    desc:"",

                });

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
            }
        }
    };

    sortChange =  (e) =>{
        this.sort=e.target.value;
        this.setState({...this.state,sort: this.sort,desc:""});


    }

        descChange =  (e) => {
        this.desc = e.target.value;
        if (!this.state.isSearch) {
                this.fetchData(1);
            } else {
                let data = "";

                if (this.state.desc === "asc") {
                    data = this.state.data.sort((a, b) => {

                        const dateA = new Date(a.vacationRequestTime);
                        const dateB = new Date(b.vacationRequestTime);
                        return dateB-dateA;
                    });
                } else {
                    data = this.state.data.sort((a, b) => {

                        const dateA = new Date(a.vacationRequestTime);
                        const dateB = new Date(b.vacationRequestTime);
                        return dateA-dateB;
                    });
                }
                this.setState({data: data,desc:this.desc});
             }
    };


    onApproveBtnClick = () => {
        this.setState({ ...this.state,approveOpen: true }, () => {
            // 상태가 변경된 후에 실행되는 부분
            const page = '';
            this.fetchData(page);
        });
    };

    onRejectBtnClick = () => {
        this.setState({ ...this.state,rejectOpen: true }, () => {
            // 상태가 변경된 후에 실행되는 부분
            const page = '';
            this.fetchData(page);
        });
    };

    handleClose =  (employeeId) => {
        this.setState({...this.state,approveOpen: false, rejectOpen: false})

    };
    componentDidMount() {
        console.log("componentDidMount");
        // const { employeeId } = this.props; -> 추후 props의 로그인 아이디 들고오기
        this.login(); //추후 login 함수 대신 session에 로그인 아이디 저장하는 함수로 대체할것(인자로 employeeId 넘겨야함)
        const page='';
        this.fetchData(page);
    }
    render(){
        const {searchKeyword,data} = this.state;
        const {classes} = this.props;
        return(
            <div>
                <Dialog open={this.state.approveOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 신청 승인</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            승인 완료 하였습니다!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.rejectOpen} onClose={this.handleClose}>
                    <DialogTitle>연차 신청 반려</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            반려 완료 하였습니다!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box component="section" >
                    <Typography variant="h3" style={{ margin: '50px', textAlign: 'center' }}>
                        연차 요청 처리
                    </Typography>
                </Box>
                <div style={{marginBottom: '15px',display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Box component="span" sx={{ marginRight: '10px'}}>
                            <TextField id="outlined-basic" label="검색할 사원 명/사원번호(최대 12자리)" variant="outlined" style={{width:"300px"}} onChange={this.searchKeywordChange}/>
                        </Box>
                        <Box component="span">
                            <ButtonComponent  onButtonClick={this.handleSearchButtonClick} title="검색"></ButtonComponent>
                        </Box>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label`}
                                id={`demo-simple-select`}
                                value={this.state.sort}
                                onChange={this.sortChange}>
                                <MenuItem value={"vacationRequestTime"}>신청 시간</MenuItem>
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
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} stickyHeader="true" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className={classes.text}>일련 번호</TableCell>
                                <TableCell align="center" className={classes.text}>사원 번호</TableCell>
                                <TableCell align="center" className={classes.text}>사원 이름</TableCell>
                                <TableCell align="center" className={classes.text}>연차 종류</TableCell>
                                <TableCell align="center" className={classes.text}>연차 시작 날짜</TableCell>
                                <TableCell align="center" className={classes.text}>연차 종료 날짜</TableCell>
                                <TableCell align="center" className={classes.text}>신청 사유</TableCell>
                                <TableCell align="center" className={classes.text}>신청 시간</TableCell>
                                <TableCell align="center" className={classes.text}>승인</TableCell>
                                <TableCell align="center" className={classes.text}>반려</TableCell>
                                <TableCell align="center" className={classes.text}>반려 사유</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                /* TODO : id는 모달 띄울때 넘겨받은 것으로 수정해야함 */
                                <VacationProcessListComponent id={"200001012"}  onApproveBtnClick={this.onApproveBtnClick} onRejectBtnClick={this.onRejectBtnClick} key={row.vacationRequestKey} row={row} keyData={row.vacationRequestKey} title={["승인","반려"]} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box component="section" sx={{ display: this.state.showPagiNation,alignItems: 'center', justifyContent: 'center' }}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.pageData['size']}
                            totalItemsCount={this.state.pageData['totalElement']}
                            pageRangeDisplayed={10}
                            onChange={(page) => this.fetchData(page)}
                            innerClass={classes.pagination} // 페이징 컨테이너에 대한 스타일
                            itemClass={classes.pageItem} // 각 페이지 항목에 대한 스타일
                            activeClass={classes.activePageItem} // 활성 페이지 항목에 대한 스타일
                        />
                </Box>
            </div>

        )
    }
}
export default withStyles(styles)(VacationProcess);