import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import React, {Component} from "react";
import axios from "axios";

class PasswordChangeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        };
    }


    submitNewPassword = async () => {
        const {currentPassword, newPassword, confirmPassword} = this.state;

        // Regular expression to check for special characters
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        // Check if the new password contains any special characters
        if (specialCharRegex.test(newPassword)) {
            console.log('비밀번호에 특수문자가 포함되어 있습니다.');
        }

        if (newPassword !== confirmPassword) {
            alert('새 비밀번호와 비밀번호 재확인이 일치하지 않습니다.');
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
                alert('비밀번호가 성공적으로 변경되었습니다.');
                this.props.onClose();
            } else {
                alert('비밀번호 변경에 실패했습니다 현재 비밀번호가 맞는지 확인하세요 .');
            }
        } catch (error) {
            console.error('비밀번호 변경 요청 실패:', error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    render() {
        const {isOpen, onClose} = this.props;
        const {currentPassword, newPassword, confirmPassword} = this.state;

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
            </Dialog>
        );
    }
}

export default PasswordChangeModal;