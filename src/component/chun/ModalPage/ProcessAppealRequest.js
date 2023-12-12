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
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from "react-js-pagination";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, SvgIcon} from "@material-ui/core";
import ProcessAppealRequestListComponent from "../Component/ProcessAppealRequestListComponent";
import SearchIcon from "@material-ui/icons/Search";
// const { employeeId } = this.props;
// const {closeModal} = this.props
const styles = (theme) => ({
 // style={{ textAlign: 'center',whiteSpace: 'nowrap' }}
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    text :{
        fontSize:'16px',
        fontFamily: 'Noto Sans KR, sans-serif',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },
    titleText:{
        fontSize:'20px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight:'bold',
        textAlign: 'center',
        whiteSpace: 'nowrap'
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
        backgroundColor: '#C2DCF0',
        borderTop: '1.5px solid black',

    }


});
class ProcessAppealRequest extends Component{
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


        this.fetchData = this.fetchData.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.onApproveBtnClick = this.onApproveBtnClick.bind(this);
        this.onRejectBtnClick = this.onRejectBtnClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.searchKeywordChange=this.searchKeywordChange.bind(this);
    }

    searchKeyword;
    desc;
    sort;
    id;

    searchKeywordChange=(e)=>{
        this.searchKeyword = e.target.value;
    }


    fetchData=async(page)=> {

        let getPage = page;

        if (page != '') {
            getPage = '?page=' + getPage
        }
        else {
            this.desc='';
            this.sort='';
        }

        if (this.desc !== '' && this.sort !== '') {
            getPage = getPage + (getPage.includes('?') ? '&' : '?') + 'desc=' + this.desc + '&sort=' + this.sort;
        }

        try {
            const getRawAppealAllRequest = await axios.get('http://localhost:8080/manager/appeal/all/requested' + getPage);
            const getAppealAllRequestPageData = getRawAppealAllRequest.data //페이지 객체 데이터

            console.log("getAppealAllRequestPageData : ",getAppealAllRequestPageData)
            const getAppealAllRequest = getAppealAllRequestPageData.data.map(item => {
                return {
                    attendanceAppealRequestId: item.attendanceAppealRequestId,
                    name: item.name,
                    employeeId: item.employeeId,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    appealedStartTime: item.appealedStartTime,
                    appealedEndTime: item.appealedEndTime,
                    attendanceDate: item.attendanceDate,
                    attendanceAppealRequestTime: item.attendanceAppealRequestTime,
                    reason: item.reason
                };
            });
            console.log("1. getAppealAllRequest : ",getAppealAllRequest);
            this.setState({
                ...this.state,
                isSearch:false,
                activePage:page,
                showPagiNation: 'flex',
                data:getAppealAllRequest,
                pageData:getAppealAllRequestPageData,
                desc:this.desc,
                sort:this.sort
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
                const searchRawData = await axios.get(`http://localhost:8080/manager/search/appeal/all/requested?searchParameter=${searchKeyword}`);
                console.log("searchRawData : ",searchRawData);
                if(searchRawData.data===""){
                    alert("검색 결과가 없습니다!");
                    return;
                }

                const getSearchAppealAllRequest = searchRawData.data.map(item => {
                    return {
                        attendanceAppealRequestId: item.attendanceAppealRequestId,
                        name: item.name,
                        employeeId: item.employeeId,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        appealedStartTime: item.appealedStartTime,
                        appealedEndTime: item.appealedEndTime,
                        attendanceDate: item.attendanceDate,
                        attendanceAppealRequestTime: item.attendanceAppealRequestTime,
                        reason: item.reason
                    };
                });
                this.setState({
                    ...this.state,
                    data: getSearchAppealAllRequest,
                    showPagiNation:"None",
                    isSearch:true,
                    sort:"",
                    desc:""
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

            if (this.desc === "asc") {
                data = this.state.data.sort((a, b) => {
                    const dateA = new Date(a.attendanceAppealRequestTime);
                    const dateB = new Date(b.attendanceAppealRequestTime);
                    return dateA - dateB;
                });
            } else {
                data = this.state.data.sort((a, b) => {
                    const dateA = new Date(a.attendanceAppealRequestTime);
                    const dateB = new Date(b.attendanceAppealRequestTime);
                    return dateB - dateA;
                });
            }
            console.log("this.desc : ",this.desc);
            this.setState({...this.state,data: data,desc:this.desc});
            console.log("data : ", data);
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
        const page='';
        this.fetchData(page);
    }
    render(){
        const {searchKeyword,data} = this.state;
        const {classes} = this.props;
        return(
            <div>
                <Dialog open={this.state.approveOpen} onClose={this.handleClose}>
                    <DialogTitle>근태 조정 신청 승인</DialogTitle>
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
                    <DialogTitle>근태 조정 신청 반려</DialogTitle>
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
                <Grid item lg={12}>
                    <Box style={{width:"1600px", margin:"40px 40px 40px 40px"}}>
                        <Box
                            sx={{fontSize:'25px', fontFamily: 'Noto Sans KR, sans-serif', fontWeight:'bold', borderBottom:'solid 1px black',  margin: '20px 0 20px 0',
                                paddingBottom: '10px'
                            }} >
                            근태 조정 신청 처리
                        </Box>

                        <Box style={{border:'3px solid #1D89DB', padding:'20px 10px 20px 10px',borderRadius:'10px'}} >
                            <Box component="span" sx={{ marginRight: '10px',flex: 1}}>
                                <TextField id="outlined-basic" label="사원 명/사원번호(최대 12자리)" variant="outlined" style={{width:"95%", height:"60px"}} onChange={this.searchKeywordChange}/>
                            </Box>
                            <Box component="span" >
                                <SvgIcon style={{borderRadius:'6px' , width: "3.5%",border:'1px solid #c1c1c1', height:"60px"}}
                                         cursor="pointer" component={SearchIcon} onClick={this.handleSearchButtonClick} />
                            </Box>
                        </Box>

                        <Box component="" style={{display:"flex",justifyContent:"flex-end",marginBottom: '10px'}}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                                <Select
                                    labelId={`demo-simple-select-label`}
                                    id={`demo-simple-select`}
                                    value={this.state.sort}
                                    onChange ={this.sortChange}>
                                    <MenuItem value={"attendance_appeal_request_time"}>신청 시간</MenuItem>
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
                        <TableContainer component={Paper}>
                            <Table className={classes.table} >
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell align="center" className={classes.titleText}>번호</TableCell>
                                        <TableCell align="center" className={classes.titleText}>이름</TableCell>
                                        <TableCell align="center" className={classes.titleText}>사원 번호</TableCell>
                                        <TableCell align="center" className={classes.titleText}>출근 시간<br/>퇴근 시간</TableCell>
                                        {/*<TableCell align="center" className={classes.titleText}>퇴근 시간</TableCell>*/}
                                        <TableCell align="center" className={classes.titleText}>조정 출근 시간<br/>조정 퇴근 시간</TableCell>
                                        {/*<TableCell align="center" className={classes.titleText}>조정 퇴근 시간</TableCell>*/}
                                        <TableCell align="center" className={classes.titleText}>조정 대상 날짜</TableCell>
                                        <TableCell align="center" className={classes.titleText}>조정 신청 시간</TableCell>
                                        <TableCell align="center" className={classes.titleText}>신청 사유</TableCell>
                                        <TableCell align="center" className={classes.titleText}>승인</TableCell>
                                        <TableCell align="center" className={classes.titleText}>반려</TableCell>
                                        <TableCell align="center" className={classes.titleText}>반려 사유</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => (
                                        /* TODO : id는 모달 띄울때 넘겨받은 것으로 수정해야함 */
                                        <ProcessAppealRequestListComponent className={classes.text} parentRerender = {this.setState} id={JSON.parse(sessionStorage.getItem('userData')).loginId} onApproveBtnClick={this.onApproveBtnClick} onRejectBtnClick={this.onRejectBtnClick} key={row.attendanceAppealRequestId} row={row} keyData={row.attendanceAppealRequestId} title={["승인","반려"]} />
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
                    </Box>
                </Grid>
            </div>

        )
    }
}
export default withStyles(styles)(ProcessAppealRequest);