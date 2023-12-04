import React, { Component } from "react";
import {
    Button,
    Checkbox,
    FormControlLabel, FormGroup,
    Paper, TextField,
    Typography,
    Box,
} from "@material-ui/core";
import axios from "axios";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    paper: {
        maxWidth: 1000,
        margin: theme.spacing(60),
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
        width:'300%',
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

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: this.props.employeeId,
            passWord: "",
            name: "",
            attendanceManager: false,
            uploadFile: null,
            hireDate: new Date(),
            isModalOpen: false,
            formError: "",
            selectedImage: null,
        };
    }


    async componentDidMount() {
        try {
            axios.defaults.withCredentials = true;
            await axios.get("http://localhost:8080/logout");
            let loginForm = new FormData();
            loginForm.append("loginId", "admin");
            loginForm.append("password", "admin");
            await axios.post("http://localhost:8080/login", loginForm);

            //더미데이터
            const employeeId = "123";
            const response = await axios.get(
                `http://localhost:8080/admin/employee/information/${employeeId}`
            );

            const image = await axios.get(
                `http://localhost:8080/admin/download/${employeeId}`,
                {responseType: "arraybuffer"}
            );

            const employeeData = response.data;
            const imageData = new Uint8Array(image.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
            );

            const employeeImagedata = btoa(imageData);
            const hireDate = new Date(employeeData.hireYear); // 이름을 hireDate로 변경
            hireDate.setDate(hireDate.getDate() + 1);

            this.setState({
                employeeId: employeeData.employeeId,
                passWord: employeeData.password,
                name: employeeData.name,
                attendanceManager: employeeData.attendanceManager,
                hireDate: hireDate.toISOString().split("T")[0], // 이름을 hireDate로 변경
                uploadFile: `data:${image.headers["content-type"]};base64,${employeeImagedata}`,
            });
        } catch (error) {
            console.error("직원 데이터를 가져오지 못했습니다", error);
        }
    }

    updateChanges = async () => {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            uploadFile,
            hireDate,
        } = this.state;

        try {

            this.setState({formError: ""});
            axios.defaults.withCredentials = true;

            // 파일 형식 체크
            if (uploadFile && uploadFile instanceof File) {
                const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
                const fileType = uploadFile.type;

                if (!allowedFormats.includes(fileType)) {
                    this.setState({
                        formError: '올바른 이미지 형식이 아닙니다. (jpeg, png, gif 중 하나를 선택하세요.)',
                    });
                    return;
                }
            }

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
            const hireYear = hireDate ? `${hireDate.getFullYear()}-${String(hireDate.getMonth() + 1).padStart(2, '0')}-${String(hireDate.getDate()).padStart(2, '0')}` : '';
            const employeeUpdateUrl = `http://localhost:8080/admin/update/${employeeId}`;
            const updateForm = new FormData();
            updateForm.append("passWord", passWord);
            updateForm.append("name", name);
            updateForm.append("attendanceManager", attendanceManager);
            updateForm.append("hireYear", hireYear);


            this.setState({
                formError: "",
            });

            const response = await axios.post(employeeUpdateUrl, updateForm);
            console.log("업데이트 로그", response.data);

            if (uploadFile && uploadFile instanceof File) {
                const uploadFileAdd = "http://localhost:8080/admin/upload";
                const uploadFileData = new FormData();
                uploadFileData.append("employeeId", employeeId);
                uploadFileData.append("uploadFile", uploadFile);

                const uploadResponse = await axios.post(
                    uploadFileAdd,
                    uploadFileData
                );
                console.log("파일 업로드 성공", uploadResponse.data);
            }


        } catch (error) {
            console.error("업데이트 실패", error);
            this.setState({
                formError: "직원 생성에 실패하였습니다.",
                isModalOpen: false,
            });
        }
    };


    handleDateChange = (date) => {
        this.setState({hireDate: date});
    }
    setPreviewImg = (event) => {
        const file = event.target.files[0];

        if (file instanceof Blob) {
            var reader = new FileReader();

            reader.onload = () => {
                this.setState({
                    uploadFile: file,
                });
            };

            // 파일 로드 중에 오류가 발생할 수 있으므로 try-catch 블록을 추가
            try {
                reader.readAsDataURL(file);
            } catch (error) {
                console.error("파일 로드 오류", error);
            }
        }
    };

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };

    onToggleChange = () => {
        this.setState((prevState) => ({
            attendanceManager: !prevState.attendanceManager,
        }));
    };

    render() {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            hireDate,
            uploadFile,
            formError,
        } = this.state;

        const { classes } = this.props;

        return (
            <Box className={classes.container}>
                <Paper className={classes.paper}>
                    <Box className={classes.uploadContainer}>
                        <input
                            accept="image/*"
                            className={classes.uploadInput}
                            id="upload-file"
                            type="file"
                            onChange={this.setPreviewImg} // 이미지 업로드 핸들러 업데이트
                        />
                        <label htmlFor="upload-file" className={classes.uploadLabel}>
                            {uploadFile ? (
                                <img
                                    src={
                                        uploadFile && uploadFile instanceof File
                                            ? URL.createObjectURL(uploadFile)
                                            : uploadFile
                                                ? uploadFile // 이미지 업로드한 경우
                                                : this.state.defaultPersonImage // 아무 이미지도 업로드하지 않은 경우
                                    }
                                    alt="Employee"
                                    className={classes.uploadIcon}
                                    onError={() => {
                                        this.setState({ uploadFile: null });
                                    }}
                                />
                            ) : (
                                <img
                                    src={this.state.defaultPersonImage}
                                    alt="Default"
                                    className={classes.uploadIcon}
                                />
                            )}
                        </label>
                        <Typography variant="h5" style={{ marginLeft: "40px" }}>
                            이미지를 설정하시오
                        </Typography>
                    </Box>

                    <Box className={classes.formContainer}>
                        <Typography variant="h6">사원업데이트 페이지</Typography>
                        <FormGroup>


                            <TextField
                                label={"사원id"}
                                variant="outlined"
                                value={employeeId}
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                                fullWidth
                                required
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={passWord}
                                onChange={(e) =>
                                    this.setState({ passWord: e.target.value })
                                }
                                margin="normal"
                                fullWidth

                            />
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) =>
                                    this.setState({ name: e.target.value })
                                }
                                margin="normal"
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attendanceManager}
                                        onChange={(e) =>
                                            this.setState({
                                                attendanceManager: e.target.checked,
                                            })
                                        }
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
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{ "aria-label": "change date" }}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                            {formError && (
                                <Typography className={classes.errorMessage}>
                                    {formError}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                onClick={this.updateChanges}
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

export default withStyles(styles)(UpdateEmployee);

