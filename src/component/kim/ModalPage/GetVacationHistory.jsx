import React, {Component} from "react";
import axios from 'axios';
import SearchYearMonthDay from "../component/SearchComponent/SearchYearMonthDay";
import ListVacationYearMonthDay from "../component/DataListContainer/ListVacationYearMonthDay";
import {Typography} from "@material-ui/core";

// const {closeModal} = this.props

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
        return (
            <div>
                <Typography variant="h4" align="center" gutterBottom>
                    연차사용요청이력조회
                </Typography>
                <SearchYearMonthDay
                    onSearch={this.handleSearchSubmit}
                />
                <ListVacationYearMonthDay
                    data={data}
                    totalElement={totalElement}
                    size={size}
                    page={page}
                    onPageChange={this.handlePageChange}
                />
            </div>
        );
    }
}

export default GetVacationHistory;
