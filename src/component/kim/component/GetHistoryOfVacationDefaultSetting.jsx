import React, { Component } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import Pagination from "react-js-pagination";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    title: {
        fontSize: '40px',
        marginBottom: theme.spacing(8),
    },
    tableContainer: {
        maxWidth: "80%",
        marginTop: theme.spacing(2),
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
            color: '#007bff',
        },
        '&:hover': {
            border: '1px solid #ddd',
        },
    },
});

class GetHistoryOfVacationDefaultSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyOfVacation: [],
            totalElements: 0,
            currentPage: 1,
            pageSize: 10,
            orderBy: "settingTime",
            order: "asc",
            searchPerormed:"false",
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
        this.handleChangeOrder = this.handleChangeOrder.bind(this);
    }


    handleChangeOrderBy(event) {
        this.setState({ orderBy: event.target.value, searchPerformed: false, }, () => {
            this.fetchPagedData(this.state.currentPage, this.state.pageSize);
        });
    }

    handleChangeOrder(event) {
        this.setState({ order: event.target.value,searchPerformed: false, }, () => {
            this.fetchPagedData(this.state.currentPage, this.state.pageSize);

        });
    }

    async handlePageChange(pageNumber) {
        await this.fetchPagedData(pageNumber, this.state.pageSize);
    }

    async fetchPagedData(pageNumber, pageSize) {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "123");
        loginForm.append("password", "12345");

        try {
            await axios.post("http://localhost:8080/login", loginForm);

            const response = await axios.get(
                `http://localhost:8080/manager/vacation/setting_history/vacation_default`, {
                    params: {
                        page: pageNumber,
                        size: pageSize,
                        sort: this.state.orderBy,
                        desc: this.state.order === 'asc' ? 'asc' : 'desc'
                    }
                }
            );

            const pagedData = response.data.data.map(item => ({
                ...item,
                settingTime: this.formatDate(item.settingTime),
                targetDate: this.formatDate(item.targetDate)
            }));
            const totalElements = response.data.totalElement;

            this.setState({
                historyOfVacation: pagedData,
                totalElements: totalElements,
                currentPage: pageNumber,
            });
            console.log(response);
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        alert("400 Bad Request 에러!");
                        break;
                    case 500:
                        alert("500 Internal Server 에러!");
                        break;
                    case 403:
                        alert("403 Forbidden - 에러!");
                        break;
                    default:
                        alert("An error occurred!");
                        break;
                }
            } else {
                console.error("Error fetching data: ", error);
                alert("데이터가 존재하지 않습니다!");
            }
        }
    }


    resetSearch = () => {
        this.setState({
            searchPerformed: false,
        });
    };

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('ko-KR', options).format(date);
    }

    async componentDidMount() {
        await this.fetchPagedData(this.state.currentPage, this.state.pageSize);
    }

    render() {
        const { classes } = this.props;
        const { searchPerformed,historyOfVacation, totalElements, currentPage, pageSize, orderBy, order , searchParameter } = this.state;

        return (
            <div className={classes.root}>
                <h2 className={classes.title}>근속년수 기준 연차 개수 조정 내역</h2>
                <Box display="flex" justifyContent="flex-end" width="80%">
                    <Select
                        value={orderBy}
                        onChange={this.handleChangeOrderBy}
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value="settingTime">설정 시간 순</MenuItem>
                        <MenuItem value="targetDate">적용 시간 순</MenuItem>
                    </Select>
                    <Select
                        value={order}
                        onChange={this.handleChangeOrder}
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
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
                                <TableCell>1년이하</TableCell>
                                <TableCell>1년이상</TableCell>
                                <TableCell>설정한 시간</TableCell>
                                <TableCell>적용 시간</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historyOfVacation.length > 0? historyOfVacation.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.employeeId}</TableCell>
                                    <TableCell>{item.freshman}</TableCell>
                                    <TableCell>{item.senior}</TableCell>
                                    <TableCell>{item.settingTime}</TableCell>
                                    <TableCell>{item.targetDate}</TableCell>
                                </TableRow>
                            )): (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">검색 결과가 없습니다.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!searchPerformed && (
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={totalElements}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        innerClass={classes.pagination}
                        itemClass={classes.pageItem}
                        activeClass={classes.activePageItem}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(GetHistoryOfVacationDefaultSetting);
