import React, { Component } from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    text: {
        fontSize: '1rem',
        fontFamily:'IBM Plex Sans KR',
        textAlign: 'center'
    },
    titleText: {
        fontSize: '1.2rem',
        fontFamily:'IBM Plex Sans KR',
        fontWeight: 'bold'
    },
    button: {
        height: "90%",
        fontSize: '1rem'
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
    }, table: {
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

class VacationInfo extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
        this.identifier = this.props.args[0]
    }
    identifier
    async componentDidMount() {
        axios.defaults.withCredentials = true;
        let response = await axios.get(`http://localhost:8080/employee/vacation/historyOf/${this.identifier}`);
        alert(JSON.stringify(response.data))
        this.setState({data:response.data})
    }


    render() {
        const {classes}=this.props;
        let {data} = this.state;
        data = [data]
        return (
            <Box style={{width:"1400px",paddingBottom:'50px'}}>
                <Box
                    sx={{
                        fontSize: '1.5rem',
                        fontFamily:'IBM Plex Sans KR',
                        fontWeight: 'bold',
                        borderBottom: 'solid 1px black',
                        margin: '20px 0 20px 0',
                        paddingBottom: '10px'
                    }}>
                    근태 승인 내역
                </Box>

                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>

                                <TableCell align="center" className={classes.titleText}>사용 개수</TableCell>
                                <TableCell align="center" className={classes.titleText}>연차 시작 날짜</TableCell>
                                <TableCell align="center" className={classes.titleText}>연차 종료 날짜</TableCell>
                                <TableCell align="center" className={classes.titleText}>요청 사유</TableCell>
                                <TableCell align="center" className={classes.titleText}>요청 작성 시간</TableCell>
                                <TableCell align="center" className={classes.titleText}>신청 상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" className={classes.text}>{item.vacationQuantity}</TableCell>
                                    <TableCell align="center" className={classes.text}>{item.vacationStartDate}</TableCell>
                                    <TableCell align="center" className={classes.text}>{item.vacationEndDate}</TableCell>
                                    <TableCell align="center" className={classes.text}>{item.reason}</TableCell>
                                    <TableCell align="center" className={classes.text}>{item.vacationRequestTime}</TableCell>
                                    <TableCell align="center" className={classes.text}>{item.vacationRequestStateCategoryKey}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        );
    }
}

export default withStyles(styles)(VacationInfo);

