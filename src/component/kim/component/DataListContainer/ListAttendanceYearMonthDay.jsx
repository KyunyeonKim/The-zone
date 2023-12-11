import React, {Component} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from "@material-ui/core";
import Pagination from "react-js-pagination";

// 스타일 정의
const styles = theme => ({
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        listStyle: "none",
        padding: 0,
    },
    pageItem: {
        margin: theme.spacing(1),
        "& a": {
            textDecoration: "none",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            width: "35px",
            borderRadius: "50%",
        },
        "&:hover": {
            border: "1px solid #ddd",
        },
    },
    activePageItem: {
        "& a": {
            color: theme.palette.primary.main,
        },
        "&:hover": {
            border: "1px solid #ddd",
        },
    },
    titleText:{
        fontSize:'22px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight:'bold'
    },

    TableHead: {
        backgroundColor: '#C2DCF0 !important',
        borderTop: '1.5px solid black',
    },
});

class ListVacationYearMonthDay extends Component {
    render() {
        const {data, totalElement, size, page, onPageChange, classes} = this.props;

        return (
            <div className="some-root-class">
                <TableContainer component={Paper} className="table-container-class">
                    <Table>
                        <TableHead className={classes.TableHead}>
                            <TableRow>
                                <TableCell classNmae={classes.titleText}>사원이름</TableCell>
                                <TableCell classNmae={classes.titleText}>사원번호</TableCell>
                                <TableCell classNmae={classes.titleText}>상태(신청결과)</TableCell>
                                <TableCell classNmae={classes.titleText}>신청사유</TableCell>
                                <TableCell classNmae={classes.titleText}>조정출근시간</TableCell>
                                <TableCell classNmae={classes.titleText}>조정퇴근시간</TableCell>
                                <TableCell classNmae={classes.titleText}>조정요청시간</TableCell>
                                <TableCell classNmae={classes.titleText}>반려이유</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.employeeId}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell>{item.appealedStartTime}</TableCell>
                                    <TableCell>{item.appealedEndTime}</TableCell>
                                    <TableCell>{item.attendanceAppealRequestTime}</TableCell>
                                    <TableCell>{item.reasonForRejection}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={16} align="center">검색 결과가 없습니다.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={totalElement}
                    pageRangeDisplayed={5}
                    onChange={onPageChange}
                    innerClass={classes.pagination}
                    itemClass={classes.pageItem}
                    activeClass={classes.activePageItem}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ListVacationYearMonthDay);
