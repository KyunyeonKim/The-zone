import React, {Component} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import EmployeeMain from './EmployeeMainContainer';
import AdminMain from './EmployeeMainContainer';
import NotFoundPage from "./ErrorPage/NotFoundPage";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ExceptionPage from "./ErrorPage/ExceptionPage";


class MainEndPoint extends Component {
    loggedIn;
    userData;

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            userData: {manager: false, admin: false},
            openAlert: false
        }
        console.log(" MainEndPoint constructor" + JSON.stringify(this.state))
        this.setOpenAlert = this.setOpenAlert.bind(this)
        this.handleCloseAlert = this.handleCloseAlert.bind(this)
    }

    async componentDidMount() {
        await this.checkLoginStatus();
        console.log(" MainEndPoint componentDidMount " + JSON.stringify(this.state))
    }

    checkLoginStatus = async () => {
        try {
            console.log(" MainEndPoint checkLoginStatus")
            axios.defaults.withCredentials = true;
            const response = await axios.get('http://localhost:8080/system/isLogin'); // Adjust the API endpoint
            const {success, userData} = response.data;

            this.loggedIn = success
            this.userData = userData
            console.log(`'session login response' ${JSON.stringify({success, userData})}`)
            sessionStorage.setItem('userData', JSON.stringify(userData))
            let userType;
            if (userData.manager) {
                userType = 'manager'
            } else if (userData.admin) {
                userType = 'admin'
            } else {
                userType = 'employee'
            }
            sessionStorage.setItem('userType', userType)

            this.loginData = {loggedIn: this.loggedIn, userData: this.userData, openAlert: true}
            console.log(`${JSON.stringify(this.loginData)}`)
            this.setState(this.loginData)
            // this.state=this.loginData
        } catch (error) {
            // if (error.response.status === 403) {
            //     alert('로그인 정보 검색 실패')
            // }
            console.log(" MainEndPoint error " + JSON.stringify(this.state))
            this.setState({loggedIn: false, userData: {manager: 'dddd'}, openAlert: true})
            // this.state={loggedIn:false,userData: null}
        }
    };

    handleCloseAlert = () => {
        this.setOpenAlert(false);
    };

    setOpenAlert = (input) => {
        this.setState({openAlert: input})
    }


    render() {
        const {loggedIn, userData, openAlert} = this.state;
        const handleCloseAlert = this.handleCloseAlert;

        return (
            <Router>
                <Routes>
                    <Route path="/login" element={loggedIn === "true" ? <Navigate to="/main"/> : <Login/>}/>
                    <Route
                        path="/main"
                        element={loggedIn === "true" ? (userData.admin ?
                                <>
                                    <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}} 
                                        open={openAlert}
                                        autoHideDuration={6000}
                                        onClose={handleCloseAlert}
                                    >
                                        <Alert onClose={handleCloseAlert} severity="info">
                                            '로그인에 성공하였습니다'
                                        </Alert>
                                    </Snackbar>
                                    <AdminMain userType={'admin'}/></>
                                :
                                userData.manager === true ? <>
                                        <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}} 
                                            open={openAlert}
                                            autoHideDuration={6000}
                                            onClose={handleCloseAlert}
                                        >
                                            <Alert onClose={handleCloseAlert} severity="info">
                                                '로그인에 성공하였습니다'
                                            </Alert>

                                        </Snackbar>
                                        <EmployeeMain userType={'manager'}/></>

                                    : !userData.manager && !userData.admin ?
                                        <>
                                            <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}} 
                                                open={openAlert}
                                                autoHideDuration={6000}
                                                onClose={handleCloseAlert}
                                            >
                                                <Alert onClose={handleCloseAlert} severity="info">
                                                    '로그인에 성공하였습니다'
                                                </Alert>

                                            </Snackbar>
                                            <EmployeeMain userType={'employee'}/>
                                        </>

                                        : (<Navigate to="/login"/>)
                        ) : (<>
                            <Navigate to="/login"/></>)}
                    />
                    <Route path="/" element={<Navigate to="/main"/>}/>

                    <Route path="/error" element={<ExceptionPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>

        );
    }
}

export default MainEndPoint;
