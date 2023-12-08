import React, {Component} from "react";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, TextField, Typography,} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import defaultPersonImage from '../static/defaultPersonImage.png'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

    paper: {
        maxWidth: 1000,
        margin: theme.spacing(30),
        display: 'flex',
        flexDirection: 'height',
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius
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
        backgroundColor: '#BBDEFB',
        width: '300%',
        maxWidth: 'none',// 최대 가로 길이 제한 없음

    },
    uploadContainer: {
        padding: theme.spacing(3)
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
        border: `1px dashed ${theme.palette.divider}`,
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
        marginTop: theme.spacing(3)
    },
    errorMessage: {
        color: theme.palette.error.main,
        marginTop: theme.spacing(2)
    }

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

            axios.defaults.withCredentials = true;
            let loginForm = new FormData();
            await axios.get("http://localhost:8080/logout");
            loginForm.append("loginId", "admin");
            loginForm.append("password", "admin");
            await axios.post("http://localhost:8080/login", loginForm);

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
                uploadFormData.append("employeeId", employeeId);
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

    checkFileFormat = (file) => {
        const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedFormats.includes(file.type)) {
            this.setState({
                formError: "올바른 이미지 형식이 아닙니다. (jpeg, png, gif 중 하나를 선택하세요.)",
            });
            return false;
        }
        return true;
    };

    setPreviewImg = (event) => {
        const file = event.target.files[0];
        if (file && this.checkFileFormat(file)) {
            var reader = new FileReader();
            reader.onload = () => {
                this.setState({uploadFile: file, formError: ""}); // 기존 오류 메시지 초기화
            };
            reader.readAsDataURL(file);
        } else {
            this.setState({
                uploadFile: null,
                formError: "올바른 이미지 형식이 아닙니다. (jpeg, png, gif 중 하나를 선택하세요.)",
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

    render() {
        const {classes} = this.props;
        const {employeeId, passWord, name, attendanceManager, hireDate, uploadFile, formError} = this.state;

        return (
            <Box className={classes.container}>
                <Paper className={classes.paper}>
                    <Box className={classes.uploadContainer}>
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
                                    src={this.state.defaultPersonImage}
                                    alt="Default"
                                    className={classes.uploadIcon}
                                />
                            )}
                        </label>
                        <Typography variant="h5" style={{marginLeft: '40px'}}>이미지를 설정하시오</Typography>
                    </Box>

                    <Box className={classes.formContainer}>
                        <Typography variant="h6">사원생성 페이지</Typography>
                        <FormGroup>
                            <TextField
                                label="Employee ID"
                                variant="outlined"
                                value={employeeId}
                                onChange={e => this.setState({employeeId: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={passWord}
                                onChange={e => this.setState({passWord: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={e => this.setState({name: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attendanceManager}
                                        onChange={e => this.setState({attendanceManager: e.target.checked})}
                                    />
                                }
                                label="Attendance Manager"
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Hire Date"
                                    format="yyyy/MM/dd"
                                    value={hireDate}
                                    onChange={date => this.setState({hireDate: date})}
                                    KeyboardButtonProps={{'aria-label': 'change date'}}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                            {formError && (
                                <Typography className={classes.errorMessage}>{formError}</Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                onClick={this.handleCreateEmployee}
                                fullWidth
                            >
                                Submit
                            </Button>
                        </FormGroup>
                    </Box>

                </Paper>
            </Box>
        );
    }
}

export default withStyles(styles)(CreateEmployee);