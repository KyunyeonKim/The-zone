import React from 'react'
import { render } from 'react-dom'

import './index.css'

import MainEndPoint from "./jang/MainEndPoint";
import GetHistoryOfVacationDefaultSetting from "./component/kim/component/GetHistoryOfVacationDefaultSetting";
import UpdateEmployee from "./component/kim/component/UpdateEmployee";
import CreateEmployee from "./component/kim/component/CreateEmployee";
import SetWorkTime from "./component/kim/component/SetWorkTime";
import GetVacationHistory from "./component/kim/component/GetVacationHistory";
import PostSetWorkTime from "./component/kim/component/PostSetWorkTime";
import EmployeeMine from "./component/kim/component/EmployeeMine";
import VacationDashboard from "./component/kim/component/DashBoard/VacationDashBoard";
import EmployeeReport from "./component/kim/component/EmployeeReportDashBoard/EmployeeReport";
import ReportSelector from "./component/kim/component/ReportSelector/ReportSelector";
import EmployeeDashboard from "./component/kim/component/EmployeeReportDashBoard/EmployeeDashboard";
import GetAttendanceHistory from "./component/kim/component/GetAttendanceHistory";
import EmployeeBarChart from "./component/kim/component/ReportChart/EmployeeBarChart";

export const stateStore=[]
document.addEventListener('DOMContentLoaded', function() {
    render(

        // <MainEndPoint/>,
          <CreateEmployee/>,
        //   <UpdateEmployee/>,
        // <EmployeeMine/>,
        //   <SetWorkTime/>,
        //   <GetHistoryOfVacationDefaultSetting/>,
        //     <GetAttendanceHistory/>,
        // <GetVacationHistory/>,
        // <PostSetWorkTime/>,
        // <VacationDashboard/>,
        // <EmployeeDashboard/>,
        document.body.appendChild(document.createElement('div'))
    )
})
