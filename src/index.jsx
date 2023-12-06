import React from 'react';
import {render} from "react-dom";


import "./index.css"
import ReportForManager from "./component/chun/Component/Chart/ReportForManager";
import axios from "axios";

export const IntegratedChartOfAttendanceStore= {};
export const IntegratedChartOfVacationStore={};

export const chartDataStore = {store: {
        '1': [], '2': [], '3': [],
        '4': [], '5': [], '6': [],
        '7': [], '8': [], '9': [],
        '10': [], '11': [], '12': []
    }, appendData: (store,data, month) => {
        store[month]={...store[month],...data}//이전에 있던 data, 새로 입력된 data를 merge
    },updateChart:undefined}
//data에는 6가지 종류의 데이터가 담겨 있다
//월에 대해 6가지 종류의 데이터를 담긴 data가 담겨있다
//VacationProcess
document.addEventListener('DOMContentLoaded', function () {
    axios.defaults.withCredentials = true;
    let loginForm = new FormData();
    loginForm.append("loginId", "200001012");
    loginForm.append("password", "test");
    axios.post("http://localhost:8080/login", loginForm);
    render(<ReportForManager/>, document.body.appendChild(document.createElement('div')))
})