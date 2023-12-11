import React, { Component } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Grid } from '@material-ui/core';
import axios from "axios";

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
        let {data} = this.state;
        data = [data]
        return (
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        연차 신청 정보
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper} style={{ border: '1px solid #dee2e6', borderRadius: '5px', overflowX: 'auto' }}>
                        <Table size="small" aria-label="a dense table" style={{ borderCollapse: 'collapse' }}>
                            <TableHead>
                                <TableRow>

                                    <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>사용 개수</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>연차 시작 날짜</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>연차 종료 날짜</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>요청 사유</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>요청 작성 시간</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>{item.vacationQuantity}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>{item.vacationStartDate}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>{item.vacationEndDate}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>{item.reason}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid #dee2e6' }}>{item.vacationRequestTime}</TableCell>
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

export default VacationInfo;
