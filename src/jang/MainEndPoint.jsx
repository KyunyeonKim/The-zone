// Install required packages
// npm install react-router-dom axios

// App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import EmployeeMain from './main/EmployeeMainContainer';
import AdminMain from './main/EmployeeMainContainer';

class MainEndPoint extends Component {
  loginData;
  loggedIn;
  userType;

  constructor(props) {
    super(props);

    this.state = {
      loggedIn:false, userType:''
    }

  }


  async componentDidMount() {
    await this.checkLoginStatus();
  }

  checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/system/isLogin'); // Adjust the API endpoint
      const {success, userType} = response.data;
      this.loggedIn = success
      this.userType = userType
      console.log(`'response' ${JSON.stringify({success, userType})}`)
      this.loginData = {loggedIn: this.loggedIn, userType: this.userType}
      console.log(`${JSON.stringify(this.loginData)}`)
      this.setState(this.loginData)
      // this.setState({success, userType})
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  handleLoginSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/login', formData); // Adjust the API endpoint
      const {success, userType} = response.data;

      if (success) {
        this.setState({loggedIn: true, userType});
      } else {
        this.setState({loggedIn: false, userType: ''});
      }
    } catch (error) {
      console.error('Error submitting login form:', error);
    }
  };

  render() {

    const {loggedIn, userType} = this.state;
    console.log(`'state' ${JSON.stringify(this.state)}`)
    console.log(`'route' ${JSON.stringify({loggedIn, userType})} ${userType === "employee"} ${loggedIn === "true"}`);

    return (<Router>
        <Routes>
          <Route path="/login" element={loggedIn ==="true"? (userType === "employee" ? <Navigate to="/main"/> : userType === 'manager' ?
            <Navigate to="/manager/main"/> : userType === 'admin' ? <Navigate to="/admin/main"/> : <Login/>) : (<Login/>)}/>
          <Route
            path="/main"
            element={loggedIn ==="true"? (userType === "employee" ? <EmployeeMain/> : userType === 'manager' ?
                <EmployeeMain/> : userType === 'admin' ? <AdminMain/> : (<Navigate to="/login"/>)) : (<Navigate to="/login"/>)}
          />
          <Route path="/" element={<Navigate to="/main"/>}/>
        </Routes>
      </Router>);
  }
}

export default MainEndPoint;
