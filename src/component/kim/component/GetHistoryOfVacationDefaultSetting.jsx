import React, { Component } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";
import Pagination from "react-js-pagination"; // react-js-pagination 라이브러리를 import
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    tableContainer: {
        maxWidth: "80%",
        marginTop: theme.spacing(2),
    },
    tableHeaderCell: {
        backgroundColor: "lightblue",
        color: "white",
        fontWeight: "bold",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
    },
});

class GetHistoryOfVacationDefaultSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyOfVacation: [], // 페이지별 데이터를 저장할 배열
            totalElements: 0, // 전체 데이터 개수
            currentPage: 1, // 현재 페이지 번호
            pageSize: 10, // 페이지 크기 (한 페이지에 보여질 아이템 수)
        };

        // 페이지 변경 핸들러 함수 바인딩
        this.handlePageChange = this.handlePageChange.bind(this);
    }




    // 페이지 번호 변경 처리 함수
    async handlePageChange(pageNumber) {
        // 새로운 페이지로 데이터 요청
        await this.fetchPagedData(pageNumber, this.state.pageSize);
    }

    // 서버에서 페이징된 데이터를 요청하는 함수
    async fetchPagedData(pageNumber, pageSize) {
        try {
            axios.defaults.withCredentials = true;
            let loginForm = new FormData();
            // await axios.get("http://localhost:8080/logout");
            loginForm.append("loginId", "200001012");
            loginForm.append("password", "test");
            await axios.post("http://localhost:8080/login", loginForm);

            const response = await axios.get(
                `http://localhost:8080/manager/vacation/setting_history/vacation_default?page=${pageNumber}&size=${pageSize}`
            );
            console.log("페이징 데이터", response);

            const pagedData = response.data.data; // 페이지별 데이터
            const totalElements = response.data.totalElement; // 전체 데이터 개수

            this.setState({
                historyOfVacation: pagedData,
                totalElements: totalElements,
                currentPage: pageNumber, // 현재 페이지 번호 설정
            });
        } catch (error) {
            console.error("데이터를 가져오지 못함", error);
        }
    }

    // 컴포넌트가 처음 마운트될 때 초기 데이터 요청
    async componentDidMount() {
        await this.fetchPagedData(1, this.state.pageSize);
    }

    render() {
        const { historyOfVacation, totalElements, currentPage } = this.state;

        // 전체 페이지 수 계산
        const totalPages = Math.ceil(totalElements / this.state.pageSize);

        return (
            <div>
                <h2>근속년수 기준 연차 개수 조정 내역</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: "lightblue", color: "white" }}>사원이름</TableCell>
                                <TableCell style={{ backgroundColor: "lightblue", color: "white" }}>사원번호</TableCell>
                                <TableCell style={{ backgroundColor: "lightblue", color: "white" }}>1년이하</TableCell>
                                <TableCell style={{ backgroundColor: "lightblue", color: "white" }}>1년이싱</TableCell>
                                <TableCell style={{ backgroundColor: "lightblue", color: "white" }}>설정한시간</TableCell>
                                <TableCell style={{ backgroundColor: "lightblue", color: "white" }}>적용시간</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historyOfVacation.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.employeeId}</TableCell>
                                    <TableCell>{item.freshman}</TableCell>
                                    <TableCell>{item.senior}</TableCell>
                                    <TableCell>{item.settingTime}</TableCell>
                                    <TableCell>{item.targetDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* 페이징 컴포넌트 추가 */}
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={totalElements}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        listStyle: 'none',
                        padding: 0,
                    }}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        );
    }
}

export default GetHistoryOfVacationDefaultSetting;
