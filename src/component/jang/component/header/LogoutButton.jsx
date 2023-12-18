import React, {Component} from 'react';
import axios from 'axios';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Snackbar} from "@material-ui/core";
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
            alert('logout success')
            window.location.href = 'http://localhost:3000/login';
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
    };

    render() {
        return (<ExitToAppIcon onClick={this.handleLogout.bind(this)} fontSize={'large'}/>);
    }
}

export default LogoutButton;
