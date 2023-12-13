import React, {Component} from 'react';
import axios from 'axios';
import EmployeeSettingRow from './EmployeeSettingRow';
import Grid from "@material-ui/core/Grid"; // EmployeeSettingRow 컴포넌트를 import
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Dialog, DialogContentText, DialogTitle, DialogActions, DialogContent} from '@material-ui/core';
class EmployeeSettingTableContainer extends Component {
    searchInput = ''

    constructor(props) {
        super(props);
        this.state = {
            employeeNumbers: [], // Axios로 받아온 사원 번호를 저장할 배열
            searchValue: '', // 검색어를 저장할 상태
            currentPage: 1, // 현재 페이지를 저장할 상태
            totalElements: 0, // 전체 요소 수
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
        };
    }

    // 검색 버튼 클릭 시 데이터를 서버에서 가져와서 상태 업데이트
    handleSearchClick = async (event) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get('http://localhost:8080/admin/employee/numbers?page=1', {
                params: {
                    searchValue: this.state.searchValue, page: this.state.currentPage,
                },
            });
            event.target.value = ""
            this.setState({
                employeeNumbers: response.data.data, totalElements: response.data.totalElement,
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
                        errorMessage = "403 Forbidden - 에러!";
                        break;
                    default:
                        errorMessage = "An error occurred!";
                        break;
                }
            } else {
                console.error("Error fetching data: ", error);
                errorMessage = "데이터가 존재하지 않습니다!";
            }
            this.showErrorDialog('Error', errorMessage);
        }
    };

    // 페이지 변경 시 데이터를 서버에서 가져와서 상태 업데이트
    handlePageChange = async (newPage) => {
        this.setState({currentPage: newPage}, () => {
            this.handleSearchClick();
        });
    };

    showErrorDialog = (message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: 'Error',
            dialogMessage: message,
        });
    };

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };

    render() {
        const {dialogOpen, dialogTitle, dialogMessage} = this.state;
        return (
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Paper elevation={3} style={{padding: '20px'}}>
                            <Typography variant="h5" gutterBottom>
                                사원 번호 검색
                            </Typography>
                            <TextField
                                label="사원 번호"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e) => this.searchInput = e.target.value}
                            >
                            </TextField>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={this.handleSearchClick.bind(this)}
                                style={{marginTop: '10px'}}
                            >
                                검색
                            </Button>
                        </Paper>


                        <Grid/>
                        {/* EmployeeSettingRow 컴포넌트를 사용하여 테이블 표시 */}
                        <table>
                            <thead>
                            <tr>
                                <th>Employee Number</th>
                                {/* 추가적인 헤더 컬럼들 */}
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.employeeNumbers.map((employeeNumber) => (<EmployeeSettingRow
                                key={employeeNumber}
                                employeeNumber={employeeNumber}
                            />))}
                            </tbody>
                        </table>

                        {/* 페이지 변경 버튼 */}
                        <Grid item>
                            <button
                                disabled={this.state.currentPage === 1}
                                onClick={() => this.handlePageChange(this.state.currentPage - 1)}
                            >
                                Previous Page
                            </button>
                            <span>Page {this.state.currentPage}</span>
                            <button
                                disabled={!this.state.hasNext}
                                onClick={() => this.handlePageChange(this.state.currentPage + 1)}
                            >
                                Next Page
                            </button>
                        </Grid>
                    </Grid>
                </Grid>
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
            </Grid>
        );
    }
}

export default EmployeeSettingTableContainer;
