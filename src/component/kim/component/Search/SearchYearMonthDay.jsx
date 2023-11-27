import React, { Component } from "react";
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Button } from "@material-ui/core";

class SearchYearMonthDay extends Component {
    state = {
        year: '',
        month: '',
        day: ''
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let { year, month, day } = this.state;
        const searchParameter = event.target.elements.search.value;

        // 특수문자 검증을 위한 정규 표현식
        const specialCharRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

        if (specialCharRegex.test(searchParameter)) {
            alert("검색어에 특수문자를 사용할 수 없습니다.");
            return;
        }

        if (day === "월별 검색") {
            day = '0';
        }
        if (!year || !month) {
            alert("년도와 월을 선택해주세요.");
            return;
        }

        this.props.onSearch({ year, month, day, searchParameter });
    }

    render() {
        return (
            <Box component="form" onSubmit={this.handleSubmit} display="flex" justifyContent="space-between" alignItems="center" padding={2}>
                <TextField
                    name="search"
                    label="검색"
                    variant="outlined"
                    style={{ marginRight: 8, flex: 1 }}
                />
                <Box display="flex" alignItems="center">
                    {/* 년도 선택 */}
                    <FormControl variant="outlined" style={{ marginRight: 8 }}>
                        <InputLabel>년도</InputLabel>
                        <Select
                            name="year"
                            value={this.state.year}
                            onChange={this.handleChange}
                        >
                            {[2020, 2021, 2022, 2023].map(year => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* 월 선택 */}
                    <FormControl variant="outlined" style={{ marginRight: 8 }}>
                        <InputLabel>월</InputLabel>
                        <Select
                            name="month"
                            value={this.state.month}
                            onChange={this.handleChange}
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <MenuItem key={month} value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* 일 선택 */}
                    <FormControl variant="outlined">
                        <InputLabel>일</InputLabel>
                        <Select
                            name="day"
                            value={this.state.day}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="월별 검색">월별 검색</MenuItem>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <MenuItem key={day} value={day}>{day}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 8 }}>
                        검색
                    </Button>
                </Box>
            </Box>
        );
    }
}

export default SearchYearMonthDay;
