import React, {Component} from "react";
import {
    Button,
    createMuiTheme,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider,
    withStyles,
} from "@material-ui/core";
import Pagination from "react-js-pagination";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventNoteIcon from '@material-ui/icons/EventNote';





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
    }, vacationPendingButton: {

        backgroundColor: '#FFFACD', // 부드러운 노란색
        color: '#000',
        '&:hover': {
            backgroundColor: '#FFFACD',
            opacity: 0.9,
        },
        width: '100%', // 버튼의 너비를 부모 컨테이너에 맞춤
        height: '36px', // 버튼의 높이를 고정
        padding: '8px 16px', // 상하, 좌우 패딩 설정
        textOverflow: 'ellipsis', // 긴 텍스트는 말줄임표로 처리
        whiteSpace: 'nowrap', // 텍스트를 줄바꿈 없이 한 줄로 처리
        overflow: 'hidden', // 내용이 넘칠 경우 숨김
        display: 'flex', // 플렉스 박스 모델 적용
        justifyContent: 'center', // 내용을 가로 방향으로 가운데 정렬
        alignItems: 'center', // 내용을 세로 방향으로 가운데 정렬

        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    vacationApprovedButton: {
        backgroundColor: '#ADD8E6', // 부드러운 파란색
        color: '#000',
        '&:hover': {
            backgroundColor: '#ADD8E6',
            opacity: 0.9,
        },
        width: '100%', // 버튼의 너비를 부모 컨테이너에 맞춤
        height: '36px', // 버튼의 높이를 고정
        padding: '8px 16px', // 상하, 좌우 패딩 설정
        textOverflow: 'ellipsis', // 긴 텍스트는 말줄임표로 처리
        whiteSpace: 'nowrap', // 텍스트를 줄바꿈 없이 한 줄로 처리
        overflow: 'hidden', // 내용이 넘칠 경우 숨김
        display: 'flex', // 플렉스 박스 모델 적용
        justifyContent: 'center', // 내용을 가로 방향으로 가운데 정렬
        alignItems: 'center', // 내용을 세로 방향으로 가운데 정렬

        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    vacationDeniedButton: {
        backgroundColor: '#FFB6C1', // 부드러운 분홍색
        color: '#000',
        '&:hover': {
            backgroundColor: '#FFB6C1',
            opacity: 0.9,
        },
        width: '100%', // 버튼의 너비를 부모 컨테이너에 맞춤
        height: '36px', // 버튼의 높이를 고정
        padding: '8px 16px', // 상하, 좌우 패딩 설정
        textOverflow: 'ellipsis', // 긴 텍스트는 말줄임표로 처리
        whiteSpace: 'nowrap', // 텍스트를 줄바꿈 없이 한 줄로 처리
        overflow: 'hidden', // 내용이 넘칠 경우 숨김
        display: 'flex', // 플렉스 박스 모델 적용
        justifyContent: 'center', // 내용을 가로 방향으로 가운데 정렬
        alignItems: 'center', // 내용을 세로 방향으로 가운데 정렬

        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',

    },


    titleText: {
        fontSize: '22px',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    TableHead: {
        backgroundColor: '#F2F2F2 !important',
    },


    text: {
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '16px'
    },
    button: {
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        display: "flex",
        justifyContent: "center",

    }

});

class ListVacationYearMonthDay extends Component {


    getVacationStatusButton = (item) => {
        const {classes} = this.props;
        let buttonProps = {
            className: '',
            startIcon: null,
        };

        switch (item.vacationRequestStateCategoryKey) {
            case '연차 요청 중':
                buttonProps.className = classes.vacationPendingButton;
                buttonProps.startIcon = <EventNoteIcon/>;
                break;
            case '연차 요청 승인':
                buttonProps.className = classes.vacationApprovedButton;
                buttonProps.startIcon = <EventAvailableIcon/>;
                break;
            case '연차 요청 반려':
                buttonProps.className = classes.vacationDeniedButton;
                buttonProps.startIcon = <EventBusyIcon/>;
                break;
            default:
                // 기본적으로는 아이콘 없이 클래스만 적용
                buttonProps.className = '';
        }

        return (
            <Button {...buttonProps}>
                {item.vacationRequestStateCategoryKey}
            </Button>
        );
    }


    render() {
        const {data, totalElement, size, page, onPageChange, classes} = this.props;

        return (
                <div className="some-root-class">
                    <TableContainer component={Paper} className="table-container-class">
                        <Table>
                            <TableHead className={classes.TableHead}>
                                <TableRow>
                                    <TableCell className={classes.titleText}>사원이름</TableCell>
                                    <TableCell className={classes.titleText}>사원번호</TableCell>
                                    <TableCell className={classes.titleText}>상태</TableCell>
                                    <TableCell className={classes.titleText}>연차시작날짜</TableCell>
                                    <TableCell className={classes.titleText}>연차끝날짜</TableCell>
                                    <TableCell className={classes.titleText}>사유</TableCell>
                                    <TableCell className={classes.titleText}>신청한 요청 날짜</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length > 0 ? data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={classes.text}>{item.name}</TableCell>
                                        <TableCell className={classes.text}>{item.employeeId}</TableCell>
                                        <TableCell className={classes.button}>
                                            {this.getVacationStatusButton(item)}
                                        </TableCell>
                                        <TableCell className={classes.text}>{item.vacationStartDate}</TableCell>
                                        <TableCell className={classes.text}>{item.vacationEndDate}</TableCell>
                                        <TableCell className={classes.text}>{item.reason}</TableCell>
                                        <TableCell className={classes.text}>{item.vacationRequestTime}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">검색 결과가 없습니다.</TableCell>
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
