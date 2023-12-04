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


export const stateStore=[]
document.addEventListener('DOMContentLoaded', function() {
  render(

    // <MainEndPoint/>,
    //   <GetHistoryOfVacationDefaultSetting/>,
    //   <UpdateEmployee/>,
    //   <SetWorkTime/>,
      // <CreateEmployee/>,

      // <GetVacationHistory/>,
      // <PostSetWorkTime/>,
      // <EmployeeMine/>,
      // <VacationDashboard/>,
      <EmployeeReport/>,
    document.body.appendChild(document.createElement('div'))
  )
})
