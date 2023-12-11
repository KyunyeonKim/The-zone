import React, {Component} from 'react';
import {
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
        let {data} = this.state;
        data = [data]
        return (
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        조정 요청 신청 정보
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}
                                    style={{border: '1px solid #dee2e6', borderRadius: '5px', overflowX: 'auto'}}>
                        <Table size="small" aria-label="a dense table" style={{borderCollapse: 'collapse'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>조정 요청 상태</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>기존 출근 시간</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>기존 퇴근 시간</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>조정 출근 시간</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>조정 퇴근 시간</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>조정 사유</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>조정 작성 시간</TableCell>
                                    <TableCell align="center" style={{border: '1px solid #dee2e6'}}>요청 반려 이유</TableCell>
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
                                                   style={{border: '1px solid #dee2e6'}}>{item.status}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.startTime}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.endTime}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.appealedStartTime}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.appealedEndTime}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.reason}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.attendanceAppealRequestTime}</TableCell>
                                        <TableCell align="center"
                                                   style={{border: '1px solid #dee2e6'}}>{item.reasonForRejection}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );
    }
}

export default AppealInfo;
