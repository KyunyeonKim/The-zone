import {Box, Typography} from "@material-ui/core";
import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import ButtonInListComponent from "./ButtonInListComponent";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "react-js-pagination";
import ButtonComponent from "./ButtonComponent";


const styles = (theme) => ({
        root: {
            padding: theme.spacing(4),
            textAlign: "center",
            minHeight: "100vh",
            fontSize: "1rem",

        },
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
        },table: {
        minWidth: 650
    },
    searchAndSort:{
        marginBottom: '15px',display: 'flex', justifyContent: 'space-between'
    }

    });

class AttendanceApprovalAllEmployees extends Component{

    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            desc:'',
            sort:'',
            isSearch:false,
            activePage:1,
            showPagiNation: 'flex',
            data:[],
            empPageData:{},
            isSearchBtn:false
        };
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

            const newData = empData.map(({employeeId,name})=>({employeeId,name}))
            console.log("newData : ",newData);


            await this.setState({
                empPageData:empPageData,
                data: newData,
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
        }

    }

    handleSearchButtonClick = async(e) => {
        // 검색 버튼 클릭 시 수행할 로직
        const searchKeyword = this.state.searchKeyword;
        console.log("searchKeyword : ", searchKeyword);

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
                const searchResponse = (await axios.get(`http://localhost:8080/employee/search?searchParameter=${searchKeyword}`)).data;
                const newData = searchResponse.map(({employeeId,name})=>({employeeId,name}))

                console.log("newData : ",newData);

                this.setState({
                    data: newData,
                    showPagiNation:"None",
                    isSearch:true,
                    isSearchBtn:true
                });
                console.log("this.state",this.state);
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

    sortChange = async (event) =>{
        await this.setState({
                sort:event.target.value
            });

    }

    descChange = async (event) => {
        await this.setState((prevState) => ({
            desc: event.target.value,
            isSearchBtn:true
        }), () => {
            if (!this.state.isSearch) {
                this.fetchData(1);
            } else {
                let empData = "";

                if (this.state.desc === "asc") {
                    empData = this.state.data.sort((a, b) => {
                        if (this.state.sort === "employee_id") {
                            return a.employeeId - b.employeeId;
                        } else {
                            return a.name.localeCompare(b.name);
                        }
                    });
                    console.log("empData - asc 정렬 : ", empData);
                } else {
                    empData = this.state.data.sort((a, b) => {
                        if (this.state.sort === "employee_id") {
                            return b.employeeId - a.employeeId;
                        } else {
                            return b.name.localeCompare(a.name);
                        }
                    });
                    console.log("empData - desc 정렬 : ", empData);
                }
                this.setState({data: empData});
            }
        });
    };

    componentDidMount() {
        // const { employeeId } = this.props; -> 추후 props의 로그인 아이디 들고오기
        this.login(); //추후 login 함수 대신 session에 로그인 아이디 저장하는 함수로 대체할것(인자로 employeeId 넘겨야함)
        const page='';
        this.fetchData(page);
        console.log("fetchData");
    }


    render() {
        const {searchKeyword,data,isSearchBtn} = this.state;
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                {/*리스트 컴포넌트 내부에 검색 컴포넌트 존재*/}
                {/*리스트 컴포넌트 전체의 state를 검색 컴포넌트에 전달*/}
                {/*검색 컴포넌트에서 데이터 switch로 받아와서 리스트 컴포넌트 전체의 state에 setstate*/}
                {/*이렇게 가져온 데이터를 map으로 뿌리기*/}

                <Box component="section">
                    <Typography variant="h3" style={{ margin: "50px", textAlign: "center" }}>
                        전 사원 근태 승인 내역
                    </Typography>
                </Box>
                <Box component="section">
                    <div className={classes.searchAndSort}>
                        <div>
                            <Box component="span" sx={{ marginRight: '10px'}}>
                                <TextField id="outlined-basic" label="검색할 사원 명/사원번호(최대 12자리)" variant="outlined" style={{width:"300px"}} value={searchKeyword} onChange={(e) => this.setState({ searchKeyword: e.target.value,isSearchBtn: false })}/>
                            </Box>
                            <Box component="span">
                                <ButtonComponent onButtonClick={this.handleSearchButtonClick} title="검색"></ButtonComponent>
                                {/*<Button className={classes.button} variant="outlined" onClick={(e)=>handleSearchButtonClick (e)}>검색</Button>*/}
                            </Box>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                                <Select
                                    labelId={`demo-simple-select-label`}
                                    id={`demo-simple-select`}
                                    value={this.state.sort}
                                    onChange={(e) => this.sortChange(e)}>
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
                                    onChange={(e) => this.descChange(e)}>
                                    <MenuItem value={"asc"}>오름차순</MenuItem>
                                    <MenuItem value={"desc"}>내림차순</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>사원 번호</TableCell>
                                    <TableCell>사원 이름</TableCell>
                                    <TableCell>승인 내역 조회</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {console.log("this.state.isSearchBtn : ",isSearchBtn)}
                                {data.map((row) => (
                                    <ButtonInListComponent isButtonClicked={isSearchBtn} key={row.employeeId} row={row} keyData={row.employeeId} title="승인 내역 조회" />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box component="section" sx={{ display: this.state.showPagiNation,alignItems: 'center', justifyContent: 'center' }}>
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
                    </Box>
                </Box>
            </div>
        )
    }
}
export default withStyles(styles)(AttendanceApprovalAllEmployees);

