import React, {Component} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    Typography,
    withStyles
} from "@material-ui/core";
import axios from "axios";
import "../static/CreateEmployee.css";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
// const {closeModal} = this.props
const styles = theme => ({
    container: {

        width:"900px",
        displa:'flex',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
    },
    formContainer: {
        borderTop: '2px solid black', // 굵기와 색상을 변경
        backgroundColor: 'white',
    },
    grayBackground: {
        textAlign: 'right',
        backgroundColor: '#E4F3FF',
        fontFamily:'IBM Plex Sans KR', // 변경된 글꼴
        fontSize:'18px'
    },
    tableCell: {
        padding: theme.spacing(1),
    },
    uploadContainer: {
        padding: theme.spacing(3),
        backgroundColor: '#719FE4',
        display: 'flex',
        justifyContent: 'flex-start', // 요소들을 왼쪽으로 정렬
        alignItems: 'center', // 교차 축에서 중앙 정렬 (필요에 따라 조정)
    },
    uploadInput: {
        display: 'none',
    },
    uploadLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    submitButton: {
        marginRight: theme.spacing(1),
        backgroundColor: '#719FE4',
        color: '#FFFFFF',
        textColor: 'white',
        '&:hover': {
            backgroundColor: '#5372C8',
        },
    },
    cancelButton: {
        marginLeft: theme.spacing(1),
        backgroundColor: 'white',
        color: '#719FE4',
        '&:hover': {
            backgroundColor: '#f3f3f3',
        },
    },
    errorMessage: {
        color: theme.palette.error.main,
        marginTop: theme.spacing(1),
    },

});

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: props.args[0],
            passWord: "",
            name: "",
            attendanceManager: false,
            hireYear: "",
            formError: "",
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
            uploadFile: null, // 실제 파일 객체를 위한 상태
            previewUrl: null, // 이미지 미리보기 URL을 위한 상태
        };

    }

    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    async componentDidMount() {
        try {
            const response = await axios.get(
                `http://localhost:8080/admin/employee/information/${this.state.employeeId}`
            );

            const image = await axios.get(
                `http://localhost:8080/admin/download/${this.state.employeeId}`,
                { responseType: "arraybuffer" }
            );

            const employeeData = response.data;
            const imageData = new Uint8Array(image.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
            );

            const employeeImagedata = btoa(imageData);
            const hireYear = new Date(employeeData.hireYear);
            hireYear.setDate(hireYear.getDate() + 1);
            const formattedHireYear = hireYear.toISOString().split("T")[0];

            this.setState({
                passWord: employeeData.password,
                name: employeeData.name,
                attendanceManager: employeeData.attendanceManager,
                hireYear: formattedHireYear,
                uploadFile: `data:${image.headers["content-type"]};base64,${employeeImagedata}`,
                previewUrl: `data:${image.headers["content-type"]};base64,${employeeImagedata}`,
            });
        } catch (error) {
            let errorMessage = "error";
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "400 Bad Request 에러!";
                        break;
                    case 403:
                        errorMessage = "403 Forbidden - 권한이 없습니다!";
                        break;
                    case 409:
                        errorMessage = "409 Conflict - 중복된 사원번호가 존재합니다.";
                        break;
                    case 500:
                        errorMessage = "500 Internal Server Error - 서버 에러 발생!";
                        break;

                    default:
                        // errorMessage 변수에 기본 에러 메시지가 이미 설정되어 있습니다.
                        break;
                }
            }
            this.showErrorDialog(errorMessage);

            // 상태 초기화 또는 업데이트
            this.setState({isModalOpen: false});
        }
    };

    updateChanges = async () => {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            uploadFile,
            hireYear,
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

            if (this.state.formError) {
                this.setState({isModalOpen: false});
                return;
            }


            // 이름 유효성 검사: 문자열만 허용
            if (!/^\p{L}+$/u.test(name)) {
                this.setState({
                    formError: '올바른 이름 형식이 아닙니다. (숫자와 특수기호를 제외한 문자만 허용됩니다.)',
                });
                return;
            }

            const employeeUpdateUrl = `http://localhost:8080/admin/update/${employeeId}`;
            const updateForm = new FormData();
            updateForm.append("passWord", passWord);
            updateForm.append("name", name);
            updateForm.append("attendanceManager", attendanceManager);

            if (hireYear) {
                const yearMonthDayRegex = /^\d{4}-\d{2}-\d{2}$/;

                if (yearMonthDayRegex.test(hireYear)) {
                    const formattedHireYear = new Date(hireYear).toISOString().split("T")[0];
                    updateForm.append("hireYear", formattedHireYear);
                } else {
                    this.setState({
                        formError: "유효하지 않은 입사연도 형식입니다. (예: YYYY-MM-dd)",
                    });
                    return;
                }
            } else {
                this.setState({
                    formError: "입사연도를 입력해주세요.",
                });
                return;
            }

            // 모든 유효성 검사가 통과되면 오류 메시지 초기화
            this.setState({
                formError: "",
            });

            const response = await axios.post(employeeUpdateUrl, updateForm);
            if (response.status === 200 || response.status === 201) {
                this.showSuccessDialog("요청이 성공적으로 처리되었습니다.");
            } else {
                this.showErrorDialog(`Unexpected server response: ${response.status}`);
            }

            // 이미지를 수정한 경우에만 파일 업로드 수행
            if (uploadFile && uploadFile instanceof File) {
                const uploadFileData = new FormData();
                uploadFileData.append("identifier", employeeId); // Change the key to 'identifier'
                uploadFileData.append("uploadFile", uploadFile);

                const uploadResponse = await axios.post(
                    "http://localhost:8080/admin/upload",
                    uploadFileData
                );
                console.log("파일 업로드 성공", uploadResponse.data);
            }
            this.showSuccessDialog("요청이 성공적으로 처리되었습니다.");

            // 상태 초기화 또는 업데이트
            this.setState({
                formError: "",
                // 다른 상태 업데이트 (생략됨)
            });

        } catch (error) {
            let errorMessage = "error";
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "400 Bad Request 에러!";
                        break;
                    case 403:
                        errorMessage = "403 Forbidden - 권한이 없습니다!";
                        break;
                    case 409:
                        errorMessage = "409 Conflict - 중복된 사원번호가 존재합니다.";
                        break;
                    case 500:
                        errorMessage = "500 Internal Server Error - 서버 에러 발생!";
                        break;

                    default:
                        // errorMessage 변수에 기본 에러 메시지가 이미 설정되어 있습니다.
                        break;
                }
            }
            this.showErrorDialog(errorMessage);

            // 상태 초기화 또는 업데이트
            this.setState({isModalOpen: false});
        }
    };

    setPreviewImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            this.setState({
                uploadFile: file, // 파일 객체 저장
                previewUrl: previewUrl // 미리보기 URL 저장
            });
        }
    };



    handleAttendanceManagerChange = (event) => {
        this.setState({attendanceManager: event.target.value === 'true'});
    };
    showSuccessDialog = (message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: '사원 생성 완료했습니다',
            dialogMessage: message,
        });
    };

// 오류 다이얼로그를 표시하는 함수
    showErrorDialog = (message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: 'Error',
            dialogMessage: message,
        });
    };


    // 다이얼로그 닫기 함수
    closeDialog = () => {
        this.setState({dialogOpen: false});
    };

    render() {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            hireYear,
            previewUrl,

            formError,
        } = this.state;
        const {classes} = this.props;
        const { dialogOpen, dialogTitle, dialogMessage } = this.state;



        return (
            <Box className={classes.container}>

                    <Box className={classes.paper}>
                        <Box
                            sx={{
                                width: "100%",
                                fontSize:'30px',
                                fontFamily:'IBM Plex Sans KR',
                                fontWeight: 'bold',
                                borderBottom: 'solid 1px black',
                                margin: 'auto',
                                marginBottom: '40px', // 여기에 marginBottom 추가
                            }}>
                            사원 정보 수정
                        </Box>
                        <Paper>
                            <Box className={classes.uploadContainer} justifyContent="center" alignItems="center">
                                <input
                                    accept="image/*"
                                    className={classes.uploadInput}
                                    id="upload-file"
                                    type="file"
                                    onChange={this.setPreviewImg}
                                />
                                <label htmlFor="upload-file" className={classes.uploadLabel}>
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Employee"
                                            className={classes.uploadIcon}
                                        />
                                    ) : (
                                        <Box>이미지를 선택해주세요</Box>
                                    )}
                                </label>
                                <Box display="flex" flexDirection="column" alignItems="center" marginTop={'50px'}>
                                    <Box display="flex" flexDirection="row" mb={3} marginRight={'140px'}>
                                        <Button
                                            variant="contained"
                                            component="span"
                                            className={classes.submitButton}
                                            onClick={() => document.getElementById('upload-file').click()}
                                        >
                                            수정
                                        </Button>
                                    </Box>
                                    <Typography variant="h5" style={{color: 'white', marginLeft:'50px',marginTop: '20px'}}>
                                        프로필 이미지를 수정해주세요
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                        <Box
                            sx={{
                                width: "100%",
                                fontSize: '25px',
                                fontFamily:'IBM Plex Sans KR',
                                fontWeight: 'bold',
                                margin: 'auto',
                                marginTop: '40px',
                                marginBottom: '20px',// 여기에 marginBottom 추가
                            }}>
                            기본 정보
                        </Box>
                        <TableContainer component={Box} className={classes.formContainer}>
                            <Table>
                                <TableBody>
                                    {/* 사원번호 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row" className={classes.grayBackground}>
                                            사원번호
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Employee ID"
                                                variant="outlined"
                                                value={employeeId}
                                                margin="normal"
                                                fullWidth
                                                InputProps={{readOnly: true}}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 비밀번호 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row" className={classes.grayBackground}>
                                            비밀번호
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Password"
                                                type="password"
                                                variant="outlined"
                                                value={passWord}
                                                onChange={e => this.setState({passWord: e.target.value})}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 사원이름 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row" className={classes.grayBackground}>
                                            사원이름
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Name"
                                                variant="outlined"
                                                value={name}
                                                onChange={e => this.setState({name: e.target.value})}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {/* 근태 관리자 여부 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row" className={classes.grayBackground}>
                                            근태 관리자 여부
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={attendanceManager.toString()}
                                                onChange={this.handleAttendanceManagerChange}
                                                fullWidth
                                            >
                                                <MenuItem value="true">근태 관리자</MenuItem>
                                                <MenuItem value="false">사원</MenuItem>
                                            </Select>
                                        </TableCell>
                                    </TableRow>

                                    {/* 입사연도 입력 */}
                                    <TableRow>
                                        <TableCell component="th" scope="row" className={classes.grayBackground}>
                                            입사연도
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                label="Hire Year"
                                                type="date"
                                                variant="outlined"
                                                value={hireYear}
                                                onChange={e => this.setState({hireYear: e.target.value})}
                                                margin="normal"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* 폼 에러 메시지 표시 */}
                        {formError && (
                            <Typography className={classes.errorMessage}>{formError}</Typography>
                        )}

                        {/* 등록 및 취소 버튼 */}
                        <Box className={classes.buttonContainer}>
                            <Button
                                variant="contained"
                                className={classes.submitButton}
                                onClick={this.updateChanges}
                            >
                                저장
                            </Button>

                        </Box>
                    </Box>
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
            </Box>


        );
    }
}

export default withStyles(styles)(UpdateEmployee);
