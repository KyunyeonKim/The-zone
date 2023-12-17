import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField
} from "@material-ui/core";
import React, {Component} from "react";
import axios from "axios";
import {Alert} from "@material-ui/lab";

class PasswordChangeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            snackbarOpen:false,
            snackbarMessage:"",
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
        };
    }


    submitNewPassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = this.state;

        // Check for special characters in the new password
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialCharRegex.test(newPassword)) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "비밀번호에 특수문자가 포함되어 있습니다"
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "새 비밀번호와 비밀번호 재확인이 일치하지 않습니다."
            });
            return;
        }

        const formData = new FormData();
        formData.append('oldPassword', currentPassword);
        formData.append('newPassword', newPassword);

        try {
            const response = await axios.post('http://localhost:8080/employee/information', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                this.showSuccessDialog("요청이 성공적으로 처리되었습니다.");
            } else {
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: "비밀번호 변경이 실패하였습니다. 현재 비밀번호와 맞는지 확인하세요."
                });
            }
        } catch (error) {
            let errorMessage = "네트워크 오류 또는 서버 오류가 발생했습니다.";
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
                        errorMessage = "An error occurred!";
                        break;
                }
            }
            this.showErrorDialog(errorMessage);
        }
    };
    showErrorDialog = (message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: 'Error',
            dialogMessage: message,
        });
    };
    showSuccessDialog = (message) => {
        this.setState({
            dialogOpen: true,
            dialogTitle: '비밀번호 변경 요청이 성공적으로 처리되었습니다',
            dialogMessage: message,
        });
    };

    closeDialog = () => {
        this.setState({ dialogOpen: false });
        this.props.onClose();
    };


    render() {
        const {isOpen, onClose} = this.props;
        const {currentPassword, newPassword, confirmPassword} = this.state;
        const {dialogOpen, dialogTitle, dialogMessage} = this.state;

        return (
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>비밀번호 변경</DialogTitle>
                <DialogContent>
                    <TextField
                        label="현재 비밀번호"
                        type="password"
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => this.setState({currentPassword: e.target.value})}
                    />
                    <TextField
                        label="새 비밀번호"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => this.setState({newPassword: e.target.value})}
                    />
                    <TextField
                        label="비밀번호 재확인"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => this.setState({confirmPassword: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>취소</Button>
                    <Button onClick={this.submitNewPassword} color="primary">변경</Button>
                </DialogActions>

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
            </Dialog>

        );
    }
}

export default PasswordChangeModal;