import React, {Component} from "react";
import {Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

class SearchYearMonthDay extends Component {
    state = {
        year: '',
        month: '',
        day: ''

    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };



    handleSubmit = (event) => {
        event.preventDefault();
        let {year, month, day} = this.state;
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

        this.props.onSearch({year, month, day, searchParameter});
    }

    render() {
        return (
            <Box component="form" onSubmit={this.handleSubmit} style={{ border: '3px solid #1D89DB', padding: '20px', borderRadius: '10px', width:"1400px" }}>
                <Grid container spacing={1} alignItems="center" justify="flex-end">

                    <Grid item xs>
                        <TextField
                            fullWidth
                            name="search"
                            label="사원 명/사원번호(최대 12자리)"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel>년도</InputLabel>
                            <Select
                                name="year"
                                value={this.state.year}
                                onChange={this.handleChange}
                                style={{ minWidth: 80 }}
                            >
                                {[2020, 2021, 2022, 2023].map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel>월</InputLabel>
                            <Select
                                name="month"
                                value={this.state.month}
                                onChange={this.handleChange}
                                style={{ minWidth: 60 }}
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                    <MenuItem key={month} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel>일</InputLabel>
                            <Select
                                name="day"
                                value={this.state.day}
                                onChange={this.handleChange}
                                style={{ minWidth: 60 }}
                            >
                                <MenuItem value="월별 검색">월별 검색</MenuItem>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Box style={{ border: '3px solid #1D89DB', padding: ' 5px ', borderRadius: '10px' }}>
                        <IconButton type="submit" color="primary" style={{ marginLeft: '0px' }}>
                            <SearchIcon />
                        </IconButton>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        );
    }
}

export default SearchYearMonthDay;
