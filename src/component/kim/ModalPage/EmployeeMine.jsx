import React, {Component} from "react";
import {
    Box,
    Button, InputAdornment,
    Paper,
    Dialog, DialogContentText, DialogTitle, DialogActions,
    TextField,
    Typography, DialogContent,
} from "@material-ui/core";
import axios from "axios";
import "../static/UpdateEmployee.css";
import PasswordChangeModal from "../component/PasswordChangeModal";
import {withStyles} from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";


const styles = theme => ({
    container: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,
    },
    formContainer: {
        borderTop: '2px solid black', // 굵기와 색상을 변경
        backgroundColor: 'white',
    },
    grayBackground: {
        textAlign: 'right',
        backgroundColor: '#E4F3FF',
        fontFamily:'IBM Plex Sans KR', // 변경된 글꼴
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
        textColor:'white',
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
            uploadFile: null,
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
        };
    }


    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    // 비밀번호 변경 모달 열기
    openPasswordModal = () => {
        this.setState({isPasswordModalOpen: true});
    };

    // 비밀번호 변경 모달 닫기
    closePasswordModal = () => {
        this.setState({isPasswordModalOpen: false});
    };

    async componentDidMount() {
        try {
            axios.defaults.withCredentials = true;

            const response = await axios.get("http://localhost:8080/employee/information");
            const employeeData = response.data;
            const employeeId = response.data.employeeId;

            const hireYear = new Date(employeeData.hireYear);
            hireYear.setDate(hireYear.getDate() + 1);
            const formattedHireYear = hireYear.toISOString().split("T")[0];
            const imageResponse = await axios.get(
                `http://localhost:8080/admin/download/${employeeId}`,
                {responseType: "blob"}
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
                        errorMessage = "403 Forbidden - 에러!";
                        break;
                    default:
                        errorMessage = "An error occurred!";
                        break;
                }
            } else {
                console.error("Error fetching data: ", error);
                errorMessage = "데이터가 존재하지 않습니다!";
            }
            this.showErrorDialog('Error', errorMessage);
        }
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };
    showErrorDialog = (title, message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: title,
            dialogMessage: message,
        });
    };

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };



    render() {
        const {
            employeeId,  passWord ,name, attendanceManager, hireYear, isPasswordModalOpen, formError, uploadFile
        } = this.state;
        const { classes } = this.props;
        const {dialogOpen, dialogTitle, dialogMessage} = this.state;

        return (
            <Box className={classes.container}>
                <Container>
                <Paper className={classes.paper}>
                    <Box
                        sx={{
                            width:"100%",
                            fontSize:'25px',
                            fontFamily:'IBM Plex Sans KR',
                            fontWeight: 'bold',
                            borderBottom: 'solid 1px black',
                            margin: 'auto',
                            marginBottom: '40px',

                        }}>
                        자기 정보
                    </Box>
                    <Paper>
                        <Box className={classes.uploadContainer} justifyContent="center" alignItems="center">

                            <label htmlFor="upload-file" className={classes.uploadLabel}>
                                    <img
                                        src={uploadFile}
                                        alt="Employee"
                                        className={classes.uploadIcon}
                                    />
                            </label>
                            <Box display="flex" flexDirection="column" alignItems="center" marginTop={'50px'}>
                                <Typography variant="h5" style={{color: 'white', marginTop: '30px',fontFamily:'IBM Plex Sans KR'}}>
                                    프로필 이미지 입니다
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                    <Box
                        sx={{
                            width:"100%",
                            fontSize:'25px',
                            fontFamily:'IBM Plex Sans KR',
                            fontWeight: 'bold',
                            margin: 'auto',
                            marginTop:'40px',
                            marginBottom:'20px',// 여기에 marginBottom 추가
                        }}>
                        기본 정보
                    </Box>

                    <TableContainer component={Box} className={classes.formContainer}>
                        <Table>
                            <TableBody>

                                <TableRow>
                                    <TableCell className={classes.grayBackground}>사원번호</TableCell>
                                    <TableCell>
                                        <TextField
                                            value={employeeId}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className={classes.grayBackground}>사원이름</TableCell>
                                    <TableCell>
                                        <TextField
                                            value={name}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>


                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.grayBackground}>
                                        근태 관리자 여부
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            value={attendanceManager ? "근태 관리자" : "사원"}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                        />
                                    </TableCell>

                                </TableRow>


                                <TableRow>
                                    <TableCell className={classes.grayBackground}>입사연도</TableCell>
                                    <TableCell>
                                        <TextField
                                            value={hireYear}
                                            onChange={this.onChange}
                                            fullWidth
                                            required
                                            readOnly
                                        />

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.grayBackground}>비밀번호</TableCell>
                                    <TableCell>
                                        <TextField
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={passWord}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                    {formError && (
                        <Typography className={classes.errorMessage}>{formError}</Typography>
                    )}


                    <Button
                        color="secondary"
                        style={{marginTop: "16px"}}
                        onClick={this.openPasswordModal}
                    >
                        비밀번호 변경
                    </Button>
                </Paper>


                <PasswordChangeModal isOpen={isPasswordModalOpen} onClose={this.closePasswordModal}/>
                </Container>
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

export default withStyles(styles)(EmployeeMine);

