import React, {Component} from 'react';
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
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

class AppealInfo extends Component {


    identifier

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
        this.identifier = this.props.args[0]
    }

    async componentDidMount() {
        axios.defaults.withCredentials = true;
        let response = await axios.get(`http://localhost:8080/employee/appeal/historyOf/${this.identifier}`);
        alert(JSON.stringify(response.data))
        this.setState({data: response.data})
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
                                <TableCell align="center" className={classes.titleText}>조정 요청 상태</TableCell>
                                <TableCell align="center" className={classes.titleText}>기존 출근 시간</TableCell>
                                <TableCell align="center" className={classes.titleText}>기존 퇴근 시간</TableCell>
                                <TableCell align="center" className={classes.titleText}>조정 출근 시간</TableCell>
                                <TableCell align="center" className={classes.titleText}>조정 퇴근 시간</TableCell>
                                <TableCell align="center" className={classes.titleText}>조정 사유</TableCell>
                                <TableCell align="center" className={classes.titleText}>조정 작성 시간</TableCell>
                                <TableCell align="center" className={classes.titleText}>요청 반려 이유</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                /*
                                * {
                                        "attendanceAppealRequestId": null,
                                        "status": "requested",
                                        "reason": "123213",
                                        "attendanceInfoId": null,
                                        "appealedStartTime": "02:40:00",
                                        "appealedEndTime": "10:30:00",
                                        "employeeId": null,
                                        "attendanceAppealRequestTime": "2023-12-10T16:42:08",
                                        "reasonForRejection": "empty",
                                        "message": null,
                                        "name": null,
                                        "startTime": null,
                                        "attendanceDate": null,
                                        "endTime": null
                                    }
                                * */
                                <TableRow key={index}>
                                    <TableCell align="center"
                                              className={classes.text}>{item.status}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.startTime}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.endTime}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.appealedStartTime}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.appealedEndTime}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.reason}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.attendanceAppealRequestTime}</TableCell>
                                    <TableCell align="center"
                                              className={classes.text}>{item.reasonForRejection}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}
export default withStyles(styles)(AppealInfo);
