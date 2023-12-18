import React, {Component} from "react";
import axios from "axios";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Snackbar,
    TableBody,
    TableCell,
    TableRow,
    TextField
} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import BlackButtonComponent from "../../chun/Component/Button/BlackButtonComponent";
import {Alert} from "@material-ui/lab";


const styles = (theme) =>({

        // tableContainer: {
        //     width:"1200px",
        //     display: 'flex',
        //     maxHeight: '1100px', // 기존보다 높이 증가
        //     height: '100%',
        //     borderTop: '2px solid black', // 굵기와 색상을 변경
        // },
        subText:{
            fontSize: '18px',
            fontFamily:'IBM Plex Sans KR',
            fontWeight: 'bold',
            backgroundColor: "#F2F2F2",
            textAlign: "right",
            paddingRight: '15px',
            width: "35%",
            whiteSpace: 'nowrap',
            height:"120px"

        },
         reasonText:{
             fontSize: '18px',
             fontFamily:'IBM Plex Sans KR',
             fontWeight: 'bold',
             backgroundColor: "#F2F2F2",
             textAlign: "center",
             paddingRight: '15px',
             width: "35%",
             whiteSpace: 'nowrap',
             height:"80px"
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

         formTable: {
             margin: "0 auto",
             borderCollapse: "collapse",
             width: "70%",
             borderTop: "2px solid black",
             marginTop:"20px",
             marginBottom:"100px"
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
                snackbarOpen:false,
                snackbarMessage:"",

            };
        }

        handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };


        handleSubmit = async (e) => {
            e.preventDefault();
            const { adjustedStartHour, adjustedStartMinute, adjustedEndHour, adjustedEndMinute, reason, targetDate } = this.state;

            // 형식에 맞게 날짜와 시간을 조정
            const formattedDate = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
            const formattedStartTime = `${adjustedStartHour.toString().padStart(2, '0')}:${adjustedStartMinute.toString().padStart(2, '0')}:00`;
            const formattedEndTime = `${adjustedEndHour.toString().padStart(2, '0')}:${adjustedEndMinute.toString().padStart(2, '0')}:00`;

            // 데이터 검증
            if (/[^a-zA-Z0-9가-힣\s]/.test(reason)) {
                this.setState({ snackbarOpen:true, snackbarMessage :"사유에 특수 문자를 포함할 수 없습니다."});
                return;
            }
            if (formattedStartTime >= formattedEndTime) {
                this.setState({ snackbarOpen:true, snackbarMessage :"시작출근시간보다 퇴근시간이 시간이 더 큽니다. 다시 입력해주세요"});
                return;
            }
            if (!adjustedStartHour ||  !adjustedEndHour) {
                this.setState({ snackbarOpen:true, snackbarMessage :"시작 및 종료시간을 모두 선택해주세요"});
                return;
            }
            if (!(targetDate instanceof Date && !isNaN(targetDate))) {
                this.setState({ snackbarOpen:true, snackbarMessage :"유효한 날짜를 선택해주세요"});
                return;
            }


            // FormData 객체 생성
            const formData = new FormData();
            formData.append("adjustedStartTime", formattedStartTime);
            formData.append("adjustedEndTime", formattedEndTime);
            formData.append("reason", reason);
            formData.append("targetDate", formattedDate);

            try {
                const response = await axios.post('http://localhost:8080/manager/adjustment', formData);

                // 성공한 경우 다이얼로그 표시
                if (response.status === 200 || response.status === 201) {
                    this.showDialog("Success", "근무 시간이 성공적으로 조정되었습니다.");
                } else {
                    this.showDialog("Error", "Unexpected server response");
                }
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
                            errorMessage = "403 권한이 없습니다!";
                            break;
                        default:
                            errorMessage = "An error occurred while fetching data!";
                            break;
                    }
                } else {
                    console.error('Error:', error);
                    errorMessage = "An error occurred while fetching data!";
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
            this.props.args[0]()
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
            const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 변환
            const { hireYear } = this.state; // 기존 상태 사용
            return (
                <Box style={{width:"1200px"}}>

                    <Box
                        sx={{
                            width:"90%",
                            fontSize:'30px',
                            fontFamily:'IBM Plex Sans KR',
                            fontWeight: 'bold',
                            borderBottom: 'solid 1px black',
                            margin: 'auto',
                            padding: '10px 0px 10px 0px', // 여기에 marginBottom 추가
                        }}>
                        근무 시간 조정
                    </Box>


                    <form onSubmit={this.handleSubmit}className={classes.formTable}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TableContainer className={classes.tableContainer}>
                                <Table style={{height:"600px"}}>
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
                                                근무 시간 적용 날짜
                                            </TableCell>
                                            <TableCell colSpan={4}>
                                                <TextField
                                                    label="Hire Year"
                                                    type="date"
                                                    variant="outlined"
                                                    value={hireYear}
                                                    onChange={e => this.setState({hireYear: e.target.value})}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: today // 오늘 날짜 이후만 선택 가능
                                                    }}
                                                    fullWidth
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className={classes.reasonText} align="center" colSpan={3}>
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
                                                            variant={'outlined'}
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
                                            <TableCell colSpan={4} align="center" style={{padding: "20px 0 20px 0",border:'0px'}}>
                                                <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                                                <BlackButtonComponent title={"취소"} onButtonClick={this.props.args[0]}/>
                                                                <Button type="submit" color="#007bff" variant="contained"
                                                                        style={{fontSize:'16px', whiteSpace: 'nowrap', borderRadius:'8px', border:'1px solid #2055E8',backgroundColor:"cornflowerblue", fontFamily:'IBM Plex Sans KR', height:"45px", fontWeight:'bold', width:"160px"}}>
                                                                    설정
                                                                </Button>
                                                </Box>

                                            </TableCell>
                                        </TableRow>


                                        {/*<tr>*/}
                                        {/*    <td className={classes.formCell} colSpan={4} style={{*/}
                                        {/*        textAlign: "center",*/}

                                        {/*        padding: "20px 0 20px 0",border:'0px'*/}
                                        {/*    }}>*/}
                                        {/*        <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>*/}
                                        {/*            <BlackButtonComponent title={"취소"} onButtonClick={this.props.args[0]}/>*/}
                                        {/*            <SettingButtonComponent type="submit" onButtonClick={this.submitForm}*/}
                                        {/*                                    title={"설정"}/>*/}
                                        {/*        </Box>*/}
                                        {/*    </td>*/}
                                        {/*</tr>*/}

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
                    <Snackbar
                        open={this.state.snackbarOpen}
                        autoHideDuration={6000}
                        onClose={this.handleSnackbarClose}
                        anchorOrigin={{ vertical:'top', horizontal: 'center' }}
                    >
                        <Alert onClose={this.handleSnackbarClose} severity="warning">
                            {this.state.snackbarMessage}
                        </Alert>
                    </Snackbar>

                </Box>
            );
        }
    }

    export default  withStyles(styles)(PostSetWorkTime);
