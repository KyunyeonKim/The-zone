    import React, { Component } from "react";
    import axios from "axios";
    import {
    Button,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    TableRow,
    TableCell,
    TableBody,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
    } from "@material-ui/core";
    import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
    import DateFnsUtils from "@date-io/date-fns";
    import TableContainer from "@material-ui/core/TableContainer";
    import Table from "@material-ui/core/Table";
    import Paper from "@material-ui/core/Paper";
    import {withStyles} from "@material-ui/core/styles";



     const styles = (theme) =>({

        tableContainer: {
            width:"1000px",
            display: 'flex',
            maxHeight: '1100px', // 기존보다 높이 증가
            height: '100%',
            borderTop: '2px solid black', // 굵기와 색상을 변경
        },
        subText:{
            textAlign:'center',
            border: '1px solid #ddd',
            backgroundColor: "#E4F3FF",
        },
        subTextRow:{
            textAlign:'center',
            border: '1px solid #ddd',
            height: '100px',
            verticalAlign: 'middle',
        },
        centeredText: {
            display: 'inline-block',
            verticalAlign: 'middle', // 가상 요소와 같이 중앙 정렬
            width: '100%', // 전체 너비
        },
        centeredRow: {
            // 가상 요소를 사용하지 않고, 수직 정렬을 위해 flexbox를 사용합니다.
            display: 'flex',
            alignItems: 'center', // 수직 정렬을 위해
            height: '100px', // 또는 적절한 높이
        },
         container: {
             width: '100%',
             // 기타 스타일
         },

         form:{
           height:'800px',
         },

    });


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
                dialogOpen: false,
                dialogTitle: '',
                dialogMessage: '',

            };
        }

        handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

        handleDateChange = (date) => {
            this.setState({ targetDate: date });
        };

        handleSubmit = async (e) => {
            e.preventDefault();
            const { adjustedStartHour, adjustedStartMinute, adjustedEndHour, adjustedEndMinute, reason, targetDate } = this.state;
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

            if(formattedStartTime>formattedEndTime){
                alert("시작출근시간보다 퇴근시간이 시간이 더 큽니다. 다시 입력해주세요")
                return;
            }
            if (!adjustedStartHour || !adjustedStartMinute || !adjustedEndHour || !adjustedEndMinute) {
                alert("시작 및 종료 시간을 모두 선택해주세요.");
                return;
            }


            try {
                const response = await axios.post('http://localhost:8080/manager/adjustment', formData, {
                });
                this.showDialog("Success", "근무 시간이 성공적으로 조정되었습니다.");
                this.props.args[0](); // 추가적인 처리 (예: 상태 업데이트)
            } catch (error) {
                let errorMessage = "An error occurred!";
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            errorMessage = "400 Bad Request 에러!";
                            break;
                        case 500:
                            errorMessage = "500 Internal Server 에러!";
                            break;
                        case 403:
                            errorMessage = "403 Forbidden 에러!";
                            break;
                        default:
                            errorMessage = "An error occurred while fetching data!";
                            break;
                    }
                } else {
                    console.error('Error:', error);
                }
                this.showErrorDialog('Error', errorMessage);
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

        showErrorDialog = (title, message) => {
            this.setState({
                dialogOpen: true,
                dialogTitle: title,
                dialogMessage: message,
            });
        };

        // 다이얼로그 닫기 함수
        closeDialog = () => {
            this.setState({ dialogOpen: false });
        };


        showDialog = (title, message) => {
            this.setState({
                dialogOpen: true,
                dialogTitle: title,
                dialogMessage: message,
            });
        };


        render() {
            const { adjustedStartHour, adjustedStartMinute, adjustedEndHour, adjustedEndMinute, reason, targetDate } = this.state;
            const {classes} = this.props;
            const { dialogOpen, dialogTitle, dialogMessage } = this.state;
            return (
                <div className={classes.container}>

                    <Box
                        sx={{
                            width:"90%",
                            fontSize:'25px',
                            fontFamily: 'Noto Sans KR, sans-serif',
                            fontWeight: 'bold',
                            borderBottom: 'solid 1px black',
                            margin: 'auto',
                            marginBottom: '40px', // 여기에 marginBottom 추가
                        }}>
                        근무 시간 조정
                    </Box>


                    <form onSubmit={this.handleSubmit}className={classes.form}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.subText}>
                                               정규 출근 시간
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>정규 출근 시간</InputLabel>
                                                    <Select name="adjustedStartHour" value={adjustedStartHour} onChange={this.handleChange}>
                                                        {this.renderHourOptions()}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>시작 분</InputLabel>
                                                    <Select name="adjustedStartMinute" value={adjustedStartMinute} onChange={this.handleChange}>
                                                        {this.renderMinuteOptions()}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.subText}>
                                                정규 퇴근 시간
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>종료 시</InputLabel>
                                                    <Select name="adjustedEndHour" value={adjustedEndHour} onChange={this.handleChange}>
                                                        {this.renderHourOptions()}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>종료 분</InputLabel>
                                                    <Select name="adjustedEndMinute" value={adjustedEndMinute} onChange={this.handleChange}>
                                                        {this.renderMinuteOptions()}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            </TableRow>



                                        {/* 날짜 선택 필드 */}
                                        <TableRow>
                                            <TableCell className={classes.subText}>
                                                정규 퇴근 시간
                                            </TableCell>
                                            <TableCell colSpan={4}>
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
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className={classes.subText} align="center" colSpan={3}>
                                                사유
                                            </TableCell>
                                        </TableRow>

                                        <TableRow >
                                            <TableCell colSpan={6}>
                                                <Box display="flex" justifyContent="center">
                                                    <div style={{ textAlign: 'center', maxWidth: '1000px', width: '100%' }}>
                                                        <TextField
                                                            name="reason"
                                                            value={reason}
                                                            onChange={this.handleChange}
                                                            multiline
                                                            minRows={3}
                                                            fullWidth
                                                            InputProps={{
                                                                style: {
                                                                    textAlign: 'center',
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        {/* 제출 버튼 */}
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <Button type="submit" color="#007bff" variant="contained">
                                                    변경 사항 저장
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MuiPickersUtilsProvider>
                    </form>


                    <Dialog
                        open={dialogOpen}
                        onClose={this.closeDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {dialogMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeDialog} color="primary">
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }

    export default  withStyles(styles)(PostSetWorkTime);
