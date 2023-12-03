import React, {Component} from "react";
import {Box, SvgIcon, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from "react-js-pagination";
import axios from "axios";
import ListComponent from "./ListComponent";
import {withStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    text :{
        fontSize:'1rem',
        fontFamily: 'Noto Sans KR, sans-serif',
        textAlign: 'center'
    },
    titleText:{
        fontSize:'1.2rem',
        fontFamily: 'Noto Sans KR, sans-serif',
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
    },table: {
        minWidth: 650,
        fontSize: "1rem"
    },
    // sort:{
    //     marginBottom: '15px',display: 'flex', justifyContent: "right"
    // },
    // tableCell:{
    //     fontSize:'1.2rem',
    //     textAlign: 'center'
    // },
    tableHead: {
        backgroundColor: '#C2DCF0',
        borderTop: '1.5px solid black'
    }

});
class AttendanceApprovalEmployee extends Component{
    constructor(props) {
        super(props);

        this.state={
            /*TODO : 모달 적용시 아래 주석 풀어야함*/
            // employeeId : props.employeeId
            employeeId:"200001013",
            activePage:1,
            showPagiNation: 'flex',
            data:[],
            pageData:{},
            desc:'',
            sort:''

        }
        this.desc="";
        this.sort="";

        this.login = this.login.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.descChange = this.descChange.bind(this);

    }

    desc;
    sort;


    login = async() =>{
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
            this.desc='';
            this.sort='';
        }


        if (this.desc !== '' && this.sort !== '') {
            getPage = getPage + (getPage.includes('?') ? '&' : '?') + 'desc=' + this.desc + '&sort=' + this.sort;
        }

        try {
            const getData = await axios.get('http://localhost:8080/manager/approve/' + this.state.employeeId);
            console.log("employeeData.data : ", getData.data)
            const pageData = getData.data //페이지 객체 데이터
            const approvalData = getData.data.data;
            console.log("approvalData : ",approvalData);
            const newData = approvalData.map(({employeeId,attendanceDate,attendanceApprovalDate})=>({employeeId,attendanceDate,attendanceApprovalDate}))
            console.log("newData : ",newData);


             this.setState({
                ...this.state,
                pageData:pageData,
                data: newData,
                activePage: page,
                showPagiNation: 'flex',
                isSearch: false,
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

    sortChange =  (e) =>{
        this.sort=e.target.value;
        this.setState({...this.state,sort: this.sort,desc:""});
    }

    descChange =  (e) => {
        this.desc=e.target.value;

        let approvalData = "";

        if (this.desc === "asc") {
            approvalData = this.state.data.sort((a, b) => {

                if (this.sort === "attendanceDate") {
                    const dateA = new Date(a.attendanceDate);
                    const dateB = new Date(b.attendanceDate);
                    return dateA - dateB;

                } else {
                    const dateA = new Date(a.attendanceApprovalDate);
                    const dateB = new Date(b.attendanceApprovalDate);
                    console.log(dateA);
                    return dateA - dateB;

                }
            });
            console.log("approvalData - asc 정렬 : ", approvalData);
        } else {
            approvalData = this.state.data.sort((a, b) => {
                if (this.sort === "attendanceDate") {
                    const dateA = new Date(a.attendanceDate);
                    const dateB = new Date(b.attendanceDate);
                    return dateB-dateA;

                } else {
                    const dateA = new Date(a.attendanceApprovalDate);
                    const dateB = new Date(b.attendanceApprovalDate);
                    console.log(dateA);
                    return dateB-dateA;


                }
            });
            console.log("approvalData - desc 정렬 : ", approvalData);
        }
        this.setState({...this.state,data: approvalData,desc:this.desc});

    };



    componentDidMount() {
        console.log("componentDidMount");
        // const { employeeId } = this.props; -> 추후 props의 로그인 아이디 들고오기
        this.login(); //추후 login 함수 대신 session에 로그인 아이디 저장하는 함수로 대체할것(인자로 employeeId 넘겨야함)
        const page='';
        this.fetchData(page);

    }

    render() {
        const {data} = this.state;
        const {classes} = this.props;



        return(
            <div>
                <Box  style={{ width: '80%', margin: 'auto' }}>
                    <Box
                        sx={{fontSize:'1.5rem', fontFamily: 'Noto Sans KR, sans-serif', fontWeight:'bold', borderBottom:'solid 1px black',  margin: '20px 0 20px 0',
                            paddingBottom: '10px'
                        }} >
                        근태 승인 내역
                    </Box>
                    <Box component="" style={{display:"flex",justifyContent:"flex-end",marginBottom: '10px'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id={`demo-simple-select-label`}>정렬 기준</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label`}
                                id={`demo-simple-select`}
                                value={this.state.sort}
                                onChange ={this.sortChange}>
                                <MenuItem value={"attendanceDate"}>근태 정보 날짜</MenuItem>
                                <MenuItem value={"attendanceApprovalDate"}>승인 날짜</MenuItem>
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

                    <TableContainer component={Paper} >
                        <Table className={classes.table} >
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell align="center" className={classes.titleText}> 사원 ID </TableCell>
                                    <TableCell align="center" className={classes.titleText}> 근태 정보 날짜 </TableCell>
                                    <TableCell align="center" className={classes.titleText}> 승인 날짜</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <ListComponent  className={classes.text} key={row.employeeId} row={row} keyData={row.employeeId} />
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
            </div>
        )
    }
}
export default withStyles(styles)(AttendanceApprovalEmployee);
