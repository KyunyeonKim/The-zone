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
import Pagination from "react-js-pagination";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon} from "@material-ui/core";
import BlackButtonComponent from "../../../../chun/Component/Button/BlackButtonComponent";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import {ToggleButton} from "@material-ui/lab";
import CheckIcon from "@material-ui/icons/Check";
import TablePartContainer from "../TablePartContainer";

const styles = (theme) => ({
    // style={{ textAlign: 'center',whiteSpace: 'nowrap' }}
    formControl: {
        margin: theme.spacing(1), minWidth: 120,
        fontFamily:'IBM Plex Sans KR',
    }, text: {
        fontSize: '20px', fontFamily:'IBM Plex Sans KR', textAlign: 'center', whiteSpace: 'nowrap'
    }, titleText: {
        fontSize: '16px',
        fontFamily:'IBM Plex Sans KR',
        fontWeight: 'bold',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    }, button: {
        height: "90%", fontSize: '1rem'
    }, pagination: {
        display: 'flex', justifyContent: 'center', marginTop: '10px', listStyle: 'none', padding: 0,
    }, pageItem: {
        margin: '0 8px', '& a': {
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            width: '35px',
            borderRadius: '50%',
        }, '&:hover': {
            border: '1px solid #ddd',
        },
    }, activePageItem: {
        '& a': {
            color: '#007bff', // 번호 색상을 파란색으로 변경
        }, '&:hover': {
            border: '1px solid #ddd',
        },
    }, tableHead: {
        backgroundColor: '#C2DCF0', borderTop: '1.5px solid black',
    },
    createbutton :{
        fontSize:'16px',
        whiteSpace: 'nowrap',

        border:'1px solid #2055E8',
        fontFamily:'IBM Plex Sans KR',
        height:"45px",
        fontWeight:'bold',
        width:"160px",
        marginRight:'750px',
        marginTop:'15px',
        backgroundColor:"#FFCA6E", borderTop: '1.5px solid black',
    }


});

class AdminTablePartContainer extends Component {
    page;
    searchKeyword;
    desc;
    sort;
    isManager;

    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: "", employeeNumberList: [], activePage: 1, // showPagiNation: 'flex',
            size: 10, hasNext: false, totalElements: 0, desc: "", sort: "", isManager: false
        };

        this.page = 1
        this.searchKeyword = "";
        this.desc = "";
        this.sort = "";
        this.isManager = false;
        //bind 수행 - 삭제하면 안됨!
        {
            this.fetchData = this.fetchData.bind(this);
            this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
            this.sortChange = this.sortChange.bind(this);
            this.descChange = this.descChange.bind(this);
            this.onApproveBtnClick = this.onApproveBtnClick.bind(this);
            this.onRejectBtnClick = this.onRejectBtnClick.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.searchKeywordChange = this.searchKeywordChange.bind(this);
            this.CreateModalShow = this.CreateModalShow.bind(this);
        }
    }

    searchKeywordChange = (e) => {
        this.searchKeyword = e.target.value;
    }

    //componentDidMount
    //검색
    //페이지네이션된 사원 번호 리스트 반환
    //searchText.trim()
    fetchData = async (searchKeyword, page) => {
        const pagedEmployeeNumberListData = await axios.get(`http://localhost:8080/admin/employee/search?searchText=${this.searchKeyword}&page${this.page}${this.sort !== null && this.sort.trim() !== "" ? '&sort=' + this.sort : ''}${this.desc !== null && this.desc.trim() !== "" ? '&desc=' + this.desc : ''}&isManager=${this.isManager}`);
        alert("pagedEmployeeNumberListData : "+ JSON.stringify(pagedEmployeeNumberListData.data))
        this.page = page!==null?page:this.page;
        this.searchKeyword = searchKeyword!==null?searchKeyword:this.searchKeyword;

        this.setState({
            page: this.page,
            employeeNumberList: pagedEmployeeNumberListData.data.data,
            activePage: pagedEmployeeNumberListData.page, // showPagiNation: 'flex',
            data: pagedEmployeeNumberListData.data,
            size: pagedEmployeeNumberListData.data.size,
            hasNext: pagedEmployeeNumberListData.data.hasNext,
            totalElements: pagedEmployeeNumberListData.data.totalElement,
            desc: pagedEmployeeNumberListData.data.desc,
            sort: pagedEmployeeNumberListData.data.sort,
            isManager: this.state.isManager
        });
    }


    handleSearchButtonClick = async (e) => {
        // 검색 버튼 클릭 시 수행할 로직
        const searchKeyword = this.searchKeyword!==undefined || this.searchKeyword!== null?this.searchKeyword.trim():"";
        const regex = /^[a-zA-Z0-9가-힣]{0,12}$/;
        if (!regex.test(searchKeyword)) {
            alert("올바르지 않은 입력입니다!");
            return;
        }
        this.page = 1;
        const pagedEmployeeNumberListData = await axios.get(`http://localhost:8080/admin/employee/search?searchText=${this.searchKeyword}${this.sort !== null && this.sort.trim() !== "" ? '&sort=' + this.sort : ''}${this.desc !== null && this.desc.trim() !== "" ? '&desc=' + this.desc : ''}&isManager=${this.isManager}`);

        this.setState({
            page: 1,
            employeeNumberList: pagedEmployeeNumberListData.data.data,
            activePage: 1,
            data: pagedEmployeeNumberListData.data,
            size: pagedEmployeeNumberListData.data.size,
            hasNext: pagedEmployeeNumberListData.data.hasNext,
            totalElements: pagedEmployeeNumberListData.data.totalElement,
            desc: pagedEmployeeNumberListData.data.desc,
            sort: pagedEmployeeNumberListData.data.sort,
            isManager: this.state.isManager
        });

    }

    sortChange = (e) => {
        this.sort = e.target.value;
        this.setState({...this.state, sort: this.sort, desc: ""});
    }

    descChange = (e) => {
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
            console.log("this.desc : ", this.desc);
            this.setState({...this.state, data: data, desc: this.desc});
            console.log("data : ", data);
        }
    };


    onApproveBtnClick = () => {
        this.setState({...this.state, approveOpen: true}, () => {
            // 상태가 변경된 후에 실행되는 부분
            const page = '';
            this.fetchData(page);
        });
    };

    onRejectBtnClick = () => {
        this.setState({...this.state, rejectOpen: true}, () => {
            // 상태가 변경된 후에 실행되는 부분
            const page = '';
            this.fetchData(page);
        });
    };

    CreateModalShow = () => {
        this.props.toggleModalShowing('CreateEmployee');
    }


    handleClose = (employeeId) => {
        this.setState({...this.state, approveOpen: false, rejectOpen: false})

    };

    componentDidMount() {
        // const { employeeId } = this.props; -> 추후 props의 로그인 아이디 들고오기
        // this.login(); //추후 login 함수 대신 session에 로그인 아이디 저장하는 함수로 대체할것(인자로 employeeId 넘겨야함)
        this.fetchData(this.searchKeyword, 1);
    }

    isManagerToggle = () => {
        this.page = 1
        this.isManager = !this.isManager
        this.fetchData(this.searchKeyword, this.page)
    }

    render() {

        const {classes} = this.props;
        return (<Grid item>
            <div>
                <Dialog open={this.state.approveOpen} onClose={this.handleClose}>
                    <DialogTitle>사원 관리</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            처리 완료!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <BlackButtonComponent onButtonClick={this.handleClose} title={"닫기"}>
                        </BlackButtonComponent>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.rejectOpen} onClose={this.handleClose}>
                    <DialogTitle>사원 관리</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            변경 완료!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box style={{overflowX: 'hidden', overflowY: 'auto', whiteSpace: 'nowrap'}}>
                    <Box
                        sx={{
                            fontSize: '20px',
                            fontFamily:'IBM Plex Sans KR',
                            fontWeight: 'bold',
                            borderBottom: 'solid 1px black',
                            margin: '20px 0 20px 0',
                            paddingBottom: '10px'
                        }}>
                        사원 관리
                    </Box>

                    <Box id={"사원 검색 입력 필드"} style={{
                        border: '3px solid #1D89DB', padding: '10px 10px 10px 10px', borderRadius: '10px'
                    }}>
                        <Box component="span" sx={{marginRight: '10px', flex: 1}}>
                            <TextField id="outlined-basic" label="사원 명/사원번호(최대 12자리)" variant="outlined"
                                       InputProps={{style: {height: "50px"}}} style={{width: "95%"}}
                                       onChange={this.searchKeywordChange}/>
                        </Box>
                        <Box component="span">
                            <SvgIcon style={{
                                borderRadius: '6px', width: "3.5%", height: 'fit-content', border: '1px solid #c1c1c1'
                            }}
                                     cursor="pointer" component={SearchIcon}
                                     onClick={this.handleSearchButtonClick}/>
                        </Box>
                    </Box>

                    <Box component=""
                         style={{display: "flex", justifyContent: "flex-end", marginBottom: '10px'}}>

                        <Button variant="contained" className={classes.createbutton} onClick={this.CreateModalShow}>사원 생성</Button>

                        <FormControl className={classes.formControl}>
                            <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label`}
                                id={`demo-simple-select`}
                                value={this.state.sort}
                                onChange={this.sortChange}>
                                <MenuItem value={"employee_id"}>사원 번호</MenuItem>
                                <MenuItem value={"name"}>사원 이름</MenuItem>
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

                        <ToggleButton
                            value="check"
                            selected={this.isManager}
                            onChange={this.isManagerToggle}
                        >
                            <CheckIcon/>
                        </ToggleButton>

                    </Box>
                   <TablePartContainer parentState={this.state} reRender={this.fetchData} toggleModalShowing={this.props.toggleModalShowing}>

                   </TablePartContainer>

                    <Box component="section"
                         sx={{alignItems: 'center', justifyContent: 'center'}}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.size}
                            totalItemsCount={this.state.totalElements === 0 ? 1 : this.state.totalElements}
                            pageRangeDisplayed={10}
                            onChange={(page) => this.fetchData(page)}
                            innerClass={classes.pagination} // 페이징 컨테이너에 대한 스타일
                            itemClass={classes.pageItem} // 각 페이지 항목에 대한 스타일
                            activeClass={classes.activePageItem} // 활성 페이지 항목에 대한 스타일
                        />
                    </Box>
                </Box>
            </div>
        </Grid>)
    }
}

export default withStyles(styles)(AdminTablePartContainer);
