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
import "../static/UpdateEmployee.css";
import PasswordChangeModal from "./PasswordChangeModal";
import { withStyles } from '@material-ui/core/styles';


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
        borderRadius: '50%',
        width: 240,
        height: 1000,
        objectFit: 'cover',
    },
    submitButton: {
        marginTop: theme.spacing(3)
    },
    errorMessage: {
        color: theme.palette.error.main,
        marginTop: theme.spacing(2)
    }

});


class EmployeeMine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: this.props.employeeId,
            passWord: "",
            name: "",
            attendanceManager: false,
            hireYear: "",
            isModalOpen: false,
            isPasswordModalOpen: false, // 비밀번호 변경 모달 상태
            formError: "",
            uploadFile:null,
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    // 비밀번호 변경 모달 열기
    openPasswordModal = () => {
        this.setState({ isPasswordModalOpen: true });
    };

    // 비밀번호 변경 모달 닫기
    closePasswordModal = () => {
        this.setState({ isPasswordModalOpen: false });
    };

    async componentDidMount() {
        try {
            axios.defaults.withCredentials = true;
            let loginForm = new FormData();
            loginForm.append("loginId", "123");
            loginForm.append("password", "123456");
            await axios.post("http://localhost:8080/login", loginForm);

            const response = await axios.get("http://localhost:8080/employee/information");
            const employeeData = response.data;
            const employeeId = response.data.employeeId;

            const hireYear = new Date(employeeData.hireYear);
            hireYear.setDate(hireYear.getDate() + 1);
            const formattedHireYear = hireYear.toISOString().split("T")[0];
            const imageResponse = await axios.get(
                `http://localhost:8080/admin/download/${employeeId}`,
                { responseType: "blob" }
            );
            const uploadFileUrl = URL.createObjectURL(imageResponse.data);


            this.setState({
                employeeId: employeeData.employeeId,
                passWord: employeeData.password,
                name: employeeData.name,
                attendanceManager: employeeData.attendanceManager,
                hireYear: formattedHireYear,
                uploadFile: uploadFileUrl,
            });
        } catch (error) {
            console.error("직원 데이터를 가져오지 못했습니다", error);
        }
    }


    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };
    handleImageClick = (event) => {
        // 기본 이벤트(파일 선택 창 열기)를 막음
        event.preventDefault();
        alert('이미지 변경 기능이 비활성화되었습니다.');
    };



    render() {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            hireYear,
            isPasswordModalOpen,
            formError,
            uploadFile,
        } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                    <Box className={classes.uploadContainer}>
                        {/* 이미지 업로드 부분 */}
                        <input
                            accept="image/*"
                            className={classes.uploadInput}
                            id="upload-file"
                            type="file"
                            onClick={this.handleImageClick} // 이벤트 핸들러 추가
                        />
                        <label htmlFor="upload-file" className={classes.uploadLabel}>
                            {/* 이미지 미리보기 */}
                            {uploadFile ? (
                                <img
                                    src={
                                        uploadFile && uploadFile instanceof File
                                            ? URL.createObjectURL(uploadFile)
                                            : uploadFile
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
                            사원 이미지
                        </Typography>
                    </Box>

                    <Box className={classes.formContainer}>
                        <Typography variant="h6">사원 정보 페이지</Typography>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <FormGroup>
                                {/* 사원번호 */}
                                <TextField
                                    label="사원번호"
                                    variant="outlined"
                                    value={employeeId}
                                    fullWidth
                                    readOnly
                                />

                                {/* 사원이름 */}
                                <TextField
                                    label="사원이름"
                                    variant="outlined"
                                    type="name"
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                    fullWidth
                                    required
                                    readOnly
                                />

                                {/* 입사연도 */}
                                <TextField
                                    label="입사연도"
                                    variant="outlined"
                                    name="hireYear"
                                    type="hireYear"
                                    value={hireYear}
                                    onChange={this.onChange}
                                    fullWidth
                                    required
                                    readOnly
                                />

                                {/* 근태담당자여부 */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={attendanceManager}
                                            name="attendanceManager"
                                            onChange={this.onToggleChange}
                                        />
                                    }
                                    label="근태담당자여부"
                                />
                            </FormGroup>

                            {/* 오류 메시지 */}
                            {formError && (
                                <div style={{ color: "red", marginTop: "8px" }}>{formError}</div>
                            )}

                            {/* 비밀번호 변경 버튼 */}
                            <Button
                                color="secondary"
                                style={{ marginTop: "16px" }}
                                onClick={this.openPasswordModal}
                            >
                                비밀번호 변경
                            </Button>
                        </form>
                    </Box>
                </Paper>


                <PasswordChangeModal
                    isOpen={isPasswordModalOpen}
                    onClose={this.closePasswordModal}
                />
            </div>
        );
    }
    }

export default withStyles(styles)(EmployeeMine);
