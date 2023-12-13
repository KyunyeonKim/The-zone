import React, {Component} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import axios from "axios";
import Pagination from "react-js-pagination";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

// const {closeModal} = this.props

const styles = (theme) => ({
    root: {
        display: "flex", flexDirection: "column", alignItems: "center", padding: theme.spacing(2),
    }, title: {
        fontSize: "40px", marginBottom: theme.spacing(8),
    }, tableContainer: {
        maxWidth: "80%", marginTop: theme.spacing(2),
    }, pagination: {
        display: "flex", justifyContent: "center", marginTop: "10px", listStyle: "none", padding: 0,
    }, pageItem: {
        margin: "0 8px", "& a": {
            textDecoration: "none",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            width: "35px",
            borderRadius: "50%",
        }, "&:hover": {
            border: "1px solid #ddd",
        },
    }, activePageItem: {
        "& a": {
            color: "#007bff",
        }, "&:hover": {
            border: "1px solid #ddd",
        },
    },
});

class SetWorkTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workTime: [],
            totalElements: 0,
            currentPage: 1,
            pageSize: 10,
            orderBy: "targetDate",
            order: "asc",
            searchPerformed: false,
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChangedOrderBy = this.handleChangedOrderBy.bind(this);
        this.handleChangeOrder = this.handleChangeOrder.bind(this);
    }

    async componentDidMount() {
        await this.fetchPagedDataWorkTime(this.state.currentPage, this.state.pageSize);
    }

    async fetchPagedDataWorkTime(pageNumber, pageSize) {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "123");
        loginForm.append("password", "12345");

        try {
            await axios.post("http://localhost:8080/login", loginForm);

            const response = await axios.get("http://localhost:8080/manager/setting_history/work_time", {
                params: {
                    page: pageNumber,
                    size: pageSize,
                    sort: this.state.orderBy,
                    desc: this.state.order === "asc" ? "asc" : "desc",
                },
            });

            const pagedData = response.data.data.map((item) => ({
                ...item,
                targetDate: this.formatDate(item.targetDate),
                regularTimeAdjustmentTime: this.formatDate(item.regularTimeAdjustmentTime),
            }));

            const totalElements = response.data.totalElement;


            this.setState({
                workTime: pagedData, totalElements: totalElements, currentPage: pageNumber,
            });
        } catch (error) {
            let errorMessage = "error";
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "400 Bad Request 에러!";
                        break;
                    case 500:
                        errorMessage = "500 Internal Server에러";
                        break;
                    case 403:
                        errorMessage = "403 Forbidden - 에러!";
                        break;
                    case 409:
                        errorMessage = "409 Conflict - 에러!";
                        break;
                    default:
                        errorMessage = "An error occurred!";
                        break;
                }
            }
            this.showErrorDialog(errorMessage);

            this.setState({isModalOpen: false});

        }
    }

    handleChangedOrderBy(event) {
        this.setState({orderBy: event.target.value, searchPerformed: false}, () => {
            this.fetchPagedDataWorkTime(this.state.currentPage, this.state.pageSize);
        });
    }

    handleChangeOrder(event) {
        this.setState({order: event.target.value, searchPerformed: false}, () => {
            this.fetchPagedDataWorkTime(this.state.currentPage, this.state.pageSize);
        });
    }

    async handlePageChange(pageNumber) {
        await this.fetchPagedDataWorkTime(pageNumber, this.state.pageSize);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
        };
        return new Intl.DateTimeFormat('ko-KR', options).format(date);
    }


// 오류 다이얼로그를 표시하는 함수
    showErrorDialog = (message) => {
        this.setState({
            dialogOpen: true, dialogTitle: 'Error', dialogMessage: message,
        });
    };


    // 다이얼로그 닫기 함수
    closeDialog = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const {classes} = this.props;
        const {
            searchPerformed, workTime, totalElements, currentPage, pageSize, orderBy, order,
        } = this.state;
        const {dialogOpen, dialogTitle, dialogMessage} = this.state;

        return (<div className={classes.root}>
                <h2 className={classes.title}>정규출퇴근시간 설정내역</h2>
                <Box display="flex" justifyContent="flex-end" width="80">
                    <Select
                        value={orderBy}
                        onChange={this.handleChangedOrderBy}
                        displayEmpty
                        inputProps={{"aria-label": "Without label"}}
                    >
                        <MenuItem value="regularTimeAdjustmentTime">조정수행날짜</MenuItem>
                        <MenuItem value="targetDate">설정날짜</MenuItem>
                    </Select>
                    <Select
                        value={order}
                        onChange={this.handleChangeOrder}
                        displayEmpty
                        inputProps={{"aria-label": "Without label"}}
                        style={{marginLeft: 10}}
                    >
                        <MenuItem value="asc">오름차순</MenuItem>
                        <MenuItem value="desc">내림차순</MenuItem>
                    </Select>
                </Box>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table stickyHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell>사원이름</TableCell>
                                <TableCell>사원번호</TableCell>
                                <TableCell>출근시간</TableCell>
                                <TableCell>퇴근시간</TableCell>
                                <TableCell>사유</TableCell>
                                <TableCell>조정수행날짜</TableCell>
                                <TableCell>설정날짜</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workTime.length > 0 ? workTime.map((item, index) => (<TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.employeeId}</TableCell>
                                    <TableCell>{item.adjustedStartTime}</TableCell>
                                    <TableCell>{item.adjustedEndTime}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell>{item.regularTimeAdjustmentTime}</TableCell>
                                    <TableCell>{item.targetDate}</TableCell>
                                </TableRow>)) : (<TableRow>
                                    <TableCell colSpan={7} align="center">검색 결과가 없습니다.</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!searchPerformed && (<Pagination
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={totalElements}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        innerClass={classes.pagination}
                        itemClass={classes.pageItem}
                        activeClass={classes.activePageItem}
                    />)}

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
            </div>


        );
    }
}

export default withStyles(styles)(SetWorkTime);
