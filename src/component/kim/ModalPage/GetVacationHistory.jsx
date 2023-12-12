import React, {Component} from "react";
import axios from 'axios';
import SearchYearMonthDay from "../component/SearchComponent/SearchYearMonthDay";
import ListVacationYearMonthDay from "../component/DataListContainer/ListVacationYearMonthDay";
import {Box,withStyles} from "@material-ui/core";

// const {closeModal} = this.props


const styles = theme => ({
    header: {
        margin: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.primary.main,
        width:"1900px",
    },
    container: {
        width: '100%',
        maxWidth: '1920px', // 또는 원하는 최대 너비
        // 기타 스타일
    },
    // 기타 스타일 정의
});


class GetVacationHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalElement: 0,
            size: 10,
            page: 1,
            year: '',
            month: '',
            day: '',
            searchParameter: ""
        };
    }


    handleSearchSubmit = ({year, month, day, searchParameter}) => {
        this.setState({year, month, day, searchParameter, page: 1}, this.fetchData);
    };

    handlePageChange = (pageNumber) => {
        this.setState({page: pageNumber}, this.fetchData);
    }

    fetchData = async () => {
        const {year, month, day, page, searchParameter} = this.state;
        const url = `http://localhost:8080/manager/vacation/history`;


        try {
            const response = await axios.get(url, {
                params: {
                    year: year,
                    month: month,
                    day: day,
                    page: page,
                    sort: 'vacationRequestTime',
                    desc: 'desc',
                    searchParameter: searchParameter
                }
            });

            this.setState({
                data: response.data.data,
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
                    연차 사용 요청 이력 조회
                </Box>
                <Box my={4}>
                    <SearchYearMonthDay onSearch={this.handleSearchSubmit} />
                </Box>

                {/* ListVacationYearMonthDay 컴포넌트 상하에 마진 추가 */}
                <Box my={7}>
                    <ListVacationYearMonthDay
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

export default withStyles(styles)(GetVacationHistory);