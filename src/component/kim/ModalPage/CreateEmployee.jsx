import React, {Component} from "react";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, TextField, Typography,Grid} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import defaultPersonImage from '../static/defaultPersonImage.png'
import {withStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

const styles = theme => ({

    addButton: {
        marginRight: theme.spacing(1), // 오른쪽 버튼과의 간격
        backgroundColor: '#719FE4', // 추가 버튼의 배경색
        color: '#FFFFFF', // 추가 버튼의 텍스트 색상
        '&:hover': {
            backgroundColor: '#5372C8', // 버튼 호버 시의 배경색
        },
    },
    removeButton: {
        marginLeft: theme.spacing(1), // 왼쪽 버튼과의 간격
        backgroundColor: '#FFFFFF', // 삭제 버튼의 배경색
        color: '#719FE4', // 삭제 버튼의 텍스트 색상
        '&:hover': {
            backgroundColor: '#f3f3f3', // 버튼 호버 시의 배경색
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'height',
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius
    },
    reportTitle: {
        marginTop: '50px', // 이 값을 조정하여 제목의 위치를 변경
        lineHeight: '100px',
    },
    gridContainer: {
        width: '100%',
        margin: 0,
    },
    gridItem: {
        flex: 1,
    },
    formContainer: {
        padding: theme.spacing(11), // padding 조정
        backgroundColor: 'white',
        width: '1000%',
        maxWidth: 'none',// 최대 가로 길이 제한 없음

    },
    uploadContainer: {
        padding: theme.spacing(3),
        backgroundColor:'#719FE4',
        display:'flex',
    },
    uploadInput: {
        display: 'none'
    },
    uploadLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        borderRadius: '50%',
        width: 230,
        height: 230,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    uploadIcon: {
        borderRadius: '50%', // 이미지를 원형으로 만들기 위한 속성
        width: 240,         // 이미지 너비
        height: 1000,        // 이미지 높이
        objectFit: 'cover', // 이미지가 원형 내에 꽉 차도록 조정
    },
        submitButton: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1), // 오른쪽 마진 추가
            backgroundColor: '#719FE4', // 버튼 배경색 지정
            // ... 기타 스타일 ...
        },
        cancelButton: {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1), // 왼쪽 마진 추가
            backgroundColor: 'white', // 버튼 배경색 지정
            // ... 기타 스타일 ...
        },



    errorMessage: {
        color: theme.palette.error.main,
        marginTop: theme.spacing(2)
    },

});

class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: "",
            passWord: "",
            name: "",
            attendanceManager: false,
            hireDate: new Date(),
            uploadFile: null,
            isModalOpen: false,
            formError: "",
            defaultPersonImage: defaultPersonImage,
        };
    }

    // ... 기존 메소드들 (handleDateChange, openModal, closeModal, handleCreateEmployee, etc.)

    handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        this.setState({ uploadFile: imageFile });
    };

    handleImageRemove = () => {
        this.setState({ uploadFile: null });
    };

    handleCreateEmployee = async () => {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            uploadFile,
            hireDate,
        } = this.state;


        if (!name.trim()) {
            this.setState({
                formError: "이름을 입력해주세요.",
                isModalOpen: false,
            });
            return;
        } else if (/\d/.test(name) || /[^a-zA-Z\s가-힣]/.test(name)) {
            this.setState({
                formError: "이름에는 숫자나 특수문자를 입력할 수 없습니다.",
                isModalOpen: false,
            });
            return;
        } else if (name.length > 10) {
            this.setState({
                formError: "이름은 10자 이내로 입력해야 합니다.",
                isModalOpen: false,
            });
            return;
        }

// 사원ID 검증
        if (!employeeId.trim()) {
            this.setState({
                formError: "사원ID를 입력해주세요.",
                isModalOpen: false,
            });
            return;
        } else if (!/^\d+$/.test(employeeId)) {
            this.setState({
                formError: "사원ID는 숫자만 입력할 수 있습니다.",
                isModalOpen: false,
            });
            return;
        } else if (employeeId.length > 10) {
            this.setState({
                formError: "사원ID는 10자 이내로 입력해야 합니다.",
                isModalOpen: false,
            });
            return;
        }

// 비밀번호 검증
        if (!passWord.trim()) {
            this.setState({
                formError: "비밀번호를 입력해주세요.",
                isModalOpen: false,
            });
            return;
        } else if (passWord.length > 10) {
            this.setState({
                formError: "비밀번호는 10자 이내로 입력해야 합니다.",
                isModalOpen: false,
            });
            return;
        } else if (/[^a-zA-Z0-9\s]/.test(passWord)) {
            this.setState({
                formError: "비밀번호에는 특수문자를 입력할 수 없습니다.",
                isModalOpen: false,
            });
            return;
        }

        if (!this.state.uploadFile) {
            this.setState({
                formError: "이미지를 업로드해주세요.",
                isModalOpen: false,
            });
            return;
        }
        const hireYear = hireDate ? `${hireDate.getFullYear()}-${String(hireDate.getMonth() + 1).padStart(2, '0')}-${String(hireDate.getDate()).padStart(2, '0')}` : '';

        try {

            // axios.defaults.withCredentials = true;
            // let loginForm = new FormData();
            // await axios.get("http://localhost:8080/logout");
            // loginForm.append("loginId", "admin");
            // loginForm.append("password", "admin");
            // await axios.post("http://localhost:8080/login", loginForm);

            const employeeAddUrl = "http://localhost:8080/admin/register";
            const createForm = new FormData();
            createForm.append("employeeId", employeeId);
            createForm.append("passWord", passWord);
            createForm.append("name", name);
            createForm.append("attendanceManager", attendanceManager);
            createForm.append("hireYear", hireYear);

            const response = await axios.post(employeeAddUrl, createForm);
            console.log("직원 생성 결과", response.data);

            if (uploadFile instanceof File) {
                const uploadFileUrl = "http://localhost:8080/admin/upload";
                const uploadFormData = new FormData();
                uploadFormData.append("identifier", employeeId);
                uploadFormData.append("uploadFile", uploadFile);

                const uploadResponse = await axios.post(uploadFileUrl, uploadFormData);
                console.log("이미지 업로드 결과", uploadResponse.data);
            }

            alert("요청이 성공적으로 처리되었습니다.");
            this.setState({
                formError: "", // 폼 에러 메시지 초기화
            });

            this.closeModal();
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        alert("400 Bad Request 에러!");
                        break;
                    case 403:
                        alert("403 Forbidden - 권한이 없습니다!");
                        break;
                    case 409:
                        alert("409 Conflict - 중복된 사원번호가 존재합니다.");
                        break;
                    case 500:
                        alert("500 Internal Server Error - 서버 에러 발생!");
                        break;
                    default:
                        alert("An error occurred! - 알 수 없는 에러 발생!");
                        break;
                }
            }
            this.setState({
                isModalOpen: false,
            });

        }
    };




    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
        console.log(value);
    };

    onToggleChange = () => {
        this.setState((prevState) => ({
            attendanceManager: !prevState.attendanceManager,
        }));
    };


    handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        this.setState({uploadFile: imageFile});
    };

    handleCancel = () => {
        // 여기서는 예시로 state의 isModalOpen을 변경하는 것을 보여줍니다.
        // 실제로는 모달을 닫거나 페이지 이동 등의 로직을 구현해야 합니다.
        this.setState({ isModalOpen: false });
        // 모달이 아니라면 페이지를 이전 상태로 되돌리거나 다른 액션을 취해야 합니다.
    };

    render() {
        const { classes } = this.props;
        const { employeeId, passWord, name, attendanceManager, hireDate, uploadFile, formError } = this.state;

        return (
            <Box className={classes.container}>
                <Container>
                    <Typography variant="h2" className={classes.reportTitle} align="center">사원 생성</Typography>

                    <Paper>
                        <Box className={classes.uploadContainer} justifyContent="center" alignItems="center">
                            <input
                                accept="image/*"
                                className={classes.uploadInput}
                                id="upload-file"
                                type="file"
                                onChange={this.handleImageUpload}
                            />
                            <label htmlFor="upload-file" className={classes.uploadLabel}>
                                {uploadFile ? (
                                    <img
                                        src={URL.createObjectURL(uploadFile)}
                                        alt="Employee"
                                        className={classes.uploadIcon}
                                    />
                                ) : (
                                    <img
                                        src={defaultPersonImage}
                                        alt="Default"
                                        className={classes.uploadIcon}
                                    />
                                )}
                            </label>
                            {/* 버튼 컨테이너 */}
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box display="flex" flexDirection="row"  mb={3}>
                                    <Button
                                        variant="contained"
                                        component="span"
                                        className={classes.addButton}
                                        onClick={() => document.getElementById('upload-file').click()}
                                    >
                                        추가
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="span"
                                        className={classes.removeButton}
                                        onClick={this.handleImageRemove}
                                        disabled={!uploadFile}
                                    >
                                        삭제
                                    </Button>
                                </Box>
                                <Typography variant="h5" style={{ color: 'white' }}>
                                    프로필 이미지를 등록해주세요
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>


                    <Paper className={classes.paper}>
                        <TableContainer component={Box} className={classes.formContainer}>
                            <Table>
                                <TableBody>
                                    {/* 사원번호 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">사원번호</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Employee ID"
                                                variant="outlined"
                                                value={employeeId}
                                                onChange={e => this.setState({ employeeId: e.target.value })}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 비밀번호 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">비밀번호</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Password"
                                                variant="outlined"
                                                type="password"
                                                value={passWord}
                                                onChange={e => this.setState({ passWord: e.target.value })}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 이름 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">사원이름</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Name"
                                                variant="outlined"
                                                value={name}
                                                onChange={e => this.setState({ name: e.target.value })}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 근태 관리자 여부 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">근태 관리자 여부</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={attendanceManager}
                                                        onChange={e => this.setState({ attendanceManager: e.target.checked })}
                                                    />
                                                }
                                                label="Attendance Manager"
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 입사 날짜 선택 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">입사 날짜</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    label="Hire Date"
                                                    format="yyyy/MM/dd"
                                                    value={hireDate}
                                                    onChange={date => this.setState({ hireDate: date })}
                                                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
                                                    fullWidth
                                                />
                                            </MuiPickersUtilsProvider>
                                        </TableCell>
                                    </TableRow>

                                    {/* 폼 에러 메시지 표시 */}
                                    {formError && (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Typography className={classes.errorMessage}>{formError}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {/* 등록 및 취소 버튼 */}
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Button
                                                    variant="contained"
                                                    className={classes.submitButton}
                                                    onClick={this.handleCreateEmployee}
                                                >
                                                    등록
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    className={classes.cancelButton}
                                                    onClick={this.handleCancel}
                                                >
                                                    취소
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Box>
        );
    }
}

export default withStyles(styles)(CreateEmployee);