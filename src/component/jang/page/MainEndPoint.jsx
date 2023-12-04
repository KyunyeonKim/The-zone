import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import EmployeeMain from './EmployeeMainContainer';
import AdminMain from './EmployeeMainContainer';

class MainEndPoint extends Component {
  loggedIn;
  userData;
  constructor(props) {
    super(props);

    this.state = {
      loggedIn : false,
      userData:{manager:false,admin:false}
    }
    console.log(" MainEndPoint constructor"+JSON.stringify(this.state))
  }

  async componentDidMount() {
    await this.checkLoginStatus();
    console.log(" MainEndPoint componentDidMount "+JSON.stringify(this.state))
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
      sessionStorage.setItem('userData',JSON.stringify(userData))
      let userType;
      if(userData.manager){
        userType='manager'
      }else if(userData.admin){
        userType='admin'
      }else{
        userType='employee'
      }
      sessionStorage.setItem('userType',userType)

      this.loginData = {loggedIn: this.loggedIn, userData: this.userData}
      console.log(`${JSON.stringify(this.loginData)}`)
      this.setState(this.loginData)
      // this.state=this.loginData
    } catch (error) {
      if(error.response.status === 403){
        alert('자동 로그인에 실패하였습니다. ip 변경 혹은 로그인 정보가 없습니다')
      }
      console.log(" MainEndPoint error "+JSON.stringify(this.state))
      this.setState({loggedIn:false,userData: {manager:'dddd'}})
      // this.state={loggedIn:false,userData: null}
    }
  };

  render() {

    const {loggedIn, userData} = this.state;
    alert(`main endPoing ${JSON.stringify(this.state)}`)

    return (
        <Router>
      <Routes>
        <Route path="/login" element={loggedIn ==="true"? <Navigate to="/main"/> : <Login/>}/>
        <Route
            path="/main"
            element={loggedIn ==="true"? (userData.admin ?
                    <AdminMain userType={'admin'}/>
                :
                userData.manager === true?
                <EmployeeMain userType={'manager'}/>
                    : !userData.manager&& !userData.admin ?
                        <EmployeeMain userType={'employee'}/>
                        : (<Navigate to="/login"/>)
            ) : (<Navigate to="/login"/>)}
        />
        <Route path="/" element={<Navigate to="/main"/>}/>
      </Routes>
    </Router>
    );
  }
}

export default MainEndPoint;
