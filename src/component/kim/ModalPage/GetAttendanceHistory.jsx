import React, {Component} from "react";
import axios from 'axios';
import SearchYearMonthDay from "../component/SearchComponent/SearchYearMonthDay";
import ListAttendanceYearMonthDay from "../component/DataListContainer/ListAttendanceYearMonthDay";
import {Box, withStyles} from "@material-ui/core";
const styles = theme => ({
    header: {
        margin: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.primary.main,
        width:"1600px",
    },
    container: {
        width: '100%',
        maxWidth: '1920px', // 또는 원하는 최대 너비
    },
    // 기타 스타일 정의
});
// const {closeModal} = this.props
class GetAttendanceHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalElement: 0,
            size: 10,
            page: 1,
            year: '2023',
            month: '1',
            day: '',
            searchParameter: ""
        };
    }
    componentDidMount() {
        this.fetchData(); // 컴포넌트 마운트 시 데이터 로드
    }

    handleSearchSubmit = ({year, month, day, searchParameter}) => {
        this.setState({year, month, day, searchParameter, page: 1}, this.fetchData);
    };

    handlePageChange = (pageNumber) => {
        this.setState({page: pageNumber}, this.fetchData);
    }

    fetchData = async () => {
        const {year, month, day, page, searchParameter} = this.state;
        const url = `http://localhost:8080/manager/attendance/history`;

        try {
            const response = await axios.get(url, {
                params: {
                    year: year,
                    month: month,
                    day: day,
                    page: page,
                    sort: 'attendanceAppealRequestTime',
                    desc: 'desc',
                    searchParameter: searchParameter
                }
            });

            const formattedData = response.data.data.map(item => {
                return {
                    ...item,
                    attendanceAppealRequestTime: item.attendanceAppealRequestTime ? new Date(item.attendanceAppealRequestTime).toISOString().split("T")[0] : ''
                    // 여기서 필요한 다른 필드들도 포매팅할 수 있습니다.
                };
            });

            this.setState({
                data: formattedData,
                totalElement: response.data.totalElement,
                size: response.data.size,
                page: response.data.page
            });
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
                        alert("403 Forbidden 에러!");
                        break;
                    default:
                        alert("An error occurred!");
                        break;
                }
            } else {
                console.error('Error fetching data:', error);
                alert("An error occurred while fetching data!");
            }
        }
    }

    render() {
        const {data, totalElement, size, page} = this.state;
        const { classes } = this.props;
        return (
            <Box className={classes.container}>
                <Box
                    sx={{
                        fontSize: '25px',
                        fontFamily:'IBM Plex Sans KR',
                        fontWeight: 'bold',
                        borderBottom: 'solid 1px black',
                        margin: '20px 0',
                        paddingBottom: '10px'
                    }} >
                    조정 요청 내역 조회
                </Box>
                <Box my={4}>
                <SearchYearMonthDay
                    onSearch={this.handleSearchSubmit}
                />
                </Box>
                <Box my={7}>
                <ListAttendanceYearMonthDay
                    data={data}
                    totalElement={totalElement}
                    size={size}
                    page={page}
                    onPageChange={this.handlePageChange}
                />
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles) (GetAttendanceHistory);
