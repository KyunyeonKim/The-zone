import React from 'react';
import EmployeeVacationSetting from "./component/chun/Component/EmployeeVacationSetting";
import {render} from "react-dom";


import "./index.css"
import AppealRequest from "./component/chun/Component/AppealRequest";
import AttendanceApprovalAllEmployees from "./component/chun/Component/AttendanceApprovalAllEmployees";
import AttendanceApprovalEmployee from "./component/chun/Component/AttendanceApprovalEmployee";
import ProcessAppealRequest from "./component/chun/Component/ProcessAppealRequest";
import VacationDefaultSetting from "./component/chun/Component/VacationDefaultSetting";
import VacationProcess from "./component/chun/Component/VacationProcess";
import VacationRequest from "./component/chun/Component/VacationRequest";
import ProcessAppealRequestListComponent from "./component/chun/Component/ProcessAppealRequestListComponent";
import SelectInfoForManagerReport from "./component/chun/Component/Chart/SelectInfoForManagerReport";
import ReportForManager from "./component/chun/Component/Chart/ReportForManager";
import SelectAllMonthesOutPutForReport
    from "./component/chun/Component/Chart/InnerChart/SelectAllMonthesOutPutForReport";
import axios from "axios";

export const summaryChartSetStateStore = {};
export const chartDataStore = {store: {
        '1': [], '2': [], '3': [],
        '4': [], '5': [], '6': [],
        '7': [], '8': [], '9': [],
        '10': [], '11': [], '12': []
    }, appendData: (store,data, month) => {
        // this.setState(prevState => ({
        //     allData: {
        //         ...prevState.allData,
        //         [month]: data
        //     }
        // }));
        store[month]=data
    }}
//VacationProcess
document.addEventListener('DOMContentLoaded', function () {
    axios.defaults.withCredentials = true;
    let loginForm = new FormData();
    loginForm.append("loginId", "200001012");
    loginForm.append("password", "test");
    axios.post("http://localhost:8080/login", loginForm);
    render(<ReportForManager/>, document.body.appendChild(document.createElement('div')))
})