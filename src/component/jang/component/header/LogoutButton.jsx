import React, {Component} from 'react';
import axios from 'axios';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class LogoutButton extends Component {
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
