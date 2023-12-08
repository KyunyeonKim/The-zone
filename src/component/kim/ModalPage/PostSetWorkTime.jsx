import React, {Component} from "react";
import axios from "axios";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// const {closeModal} = this.props

class PostSetWorkTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adjustedStartHour: "",
            adjustedStartMinute: "",
            adjustedEndHour: "",
            adjustedEndMinute: "",
            reason: "",
            targetDate: new Date(),
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleDateChange = (date) => {
        this.setState({targetDate: date});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        await axios.post("http://localhost:8080/login", loginForm);
        const {
            adjustedStartHour,
            adjustedStartMinute,
            adjustedEndHour,
            adjustedEndMinute,
            reason,
            targetDate
        } = this.state;
        const formattedDate = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;

        // 형식에 맞게 시간을 조정
        const formattedStartTime = `${adjustedStartHour.toString().padStart(2, '0')}:${adjustedStartMinute.toString().padStart(2, '0')}:00`;
        const formattedEndTime = `${adjustedEndHour.toString().padStart(2, '0')}:${adjustedEndMinute.toString().padStart(2, '0')}:00`;

        // FormData 객체 생성
        const formData = new FormData();
        const employeeId = "200001012";
        formData.append("employeeId", employeeId);
        formData.append("adjustedStartTime", formattedStartTime);
        formData.append("adjustedEndTime", formattedEndTime);
        formData.append("reason", reason);
        formData.append("targetDate", formattedDate);
        if (/[^a-zA-Z0-9가-힣\s]/.test(reason)) {
            alert("사유에 특수 문자를 포함할 수 없습니다.");
            return;
        }

        if (formattedStartTime > formattedEndTime) {
            alert("시작출근시간보다 퇴근시간이 시간이 더 큽니다. 다시 입력해주세요")
            return;
        }
        if (!adjustedStartHour || !adjustedStartMinute || !adjustedEndHour || !adjustedEndMinute) {
            alert("시작 및 종료 시간을 모두 선택해주세요.");
            return;
        }


        try {
            const response = await axios.post('http://localhost:8080/manager/adjustment', formData, {});
            console.log("근무 시간 조정 결과", response.data);
            alert("근무 시간이 성공적으로 조정되었습니다.");
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
                console.error('Error:', error);
                alert("An error occurred while fetching data!");
            }
        }
    };

    renderHourOptions = () => {
        let hours = [];
        for (let i = 1; i <= 24; i++) {
            hours.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        return hours;
    };

    renderMinuteOptions = () => {
        const minutes = [0, 10, 20, 30, 40, 50];

        return minutes.map(minute => (
            <MenuItem key={minute} value={minute}>{minute}</MenuItem>

        ));

    };


    render() {
        const {
            adjustedStartHour,
            adjustedStartMinute,
            adjustedEndHour,
            adjustedEndMinute,
            reason,
            targetDate
        } = this.state;

        return (
            <div style={{padding: "20px"}}>
                <Typography variant="h4" gutterBottom>
                    근무 시간 조정
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={3}>
                            {/* 시간 및 분 선택 필드 */}
                            <Grid item xs={6} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel>시작 시</InputLabel>
                                    <Select name="adjustedStartHour" value={adjustedStartHour}
                                            onChange={this.handleChange}>
                                        {this.renderHourOptions()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel>시작 분</InputLabel>
                                    <Select name="adjustedStartMinute" value={adjustedStartMinute}
                                            onChange={this.handleChange}>
                                        {this.renderMinuteOptions()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel>종료 시</InputLabel>
                                    <Select name="adjustedEndHour" value={adjustedEndHour} onChange={this.handleChange}>
                                        {this.renderHourOptions()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel>종료 분</InputLabel>
                                    <Select name="adjustedEndMinute" value={adjustedEndMinute}
                                            onChange={this.handleChange}>
                                        {this.renderMinuteOptions()}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* 날짜 선택 필드 */}
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="날짜 선택"
                                    format="yyyy-MM-dd"
                                    value={targetDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    fullWidth
                                />
                            </Grid>

                            {/* 근무 시간 변경 사유 입력 필드 */}
                            <Grid item xs={12}>
                                <TextField
                                    label="근무 시간 변경 사유"
                                    name="reason"
                                    value={reason}
                                    onChange={this.handleChange}
                                    multiline
                                    minRows={4}
                                    fullWidth
                                />
                            </Grid>

                            {/* 제출 버튼 */}
                            <Grid item xs={12}>
                                <Button type="submit" color="primary" variant="contained" fullWidth>
                                    변경 사항 저장
                                </Button>
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </form>
            </div>
        );
    }
}

export default PostSetWorkTime;
