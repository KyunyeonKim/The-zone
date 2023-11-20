import React from 'react';
import ReactDOM from 'react-dom';
import '../../../../../../../Documents/카카오톡 받은 파일/reactproject/src/index.css';
import reportWebVitals from '../../../../../../../Documents/카카오톡 받은 파일/reactproject/src/reportWebVitals';
import VacationRequest from "./Component/VacationRequest";
import EmployeeVacationSetting from "./Component/EmployeeVacationSetting";


ReactDOM.render(
  <React.StrictMode>
    <EmployeeVacationSetting />
  </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
