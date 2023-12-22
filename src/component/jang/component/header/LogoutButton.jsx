import React, {Component} from 'react';
import axios from 'axios';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Grid, IconButton, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

class LogoutButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: "",
            snackbarSeverity: "success", // 성공이나 에러에 따라 다른 메시지 타입을 표시
        }
    }

    handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            await axios.get('http://localhost:8080/logout');
            sessionStorage.clear();
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "Logout successful",
                snackbarSeverity: "info",
            });
            setTimeout(() => {
                window.location.href = 'https://douzone-front-server-wonyong92.vercel.app/login';
            }, 1000); // 2초 후에 로그인 페이지로 이동
        } catch (error) {
            console.error('로그아웃 에러:', error);
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "Logout failed",
                snackbarSeverity: "error",
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen: false });
    };

    render() {
        const { snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;
        return (
                <>
                    <ExitToAppIcon onClick={this.handleLogout.bind(this)} fontSize={'large'} style={{cursor:"pointer"}}/>
                    <Snackbar open={snackbarOpen}  anchorOrigin={{ vertical:'top', horizontal: 'center' }} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                        <Alert severity="info" onClose={this.handleSnackbarClose} severity={snackbarSeverity}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </>

        );
    }
}

export default LogoutButton;