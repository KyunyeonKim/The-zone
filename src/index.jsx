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

//VacationProcess
document.addEventListener('DOMContentLoaded', function () {
    render(<VacationDefaultSetting/>, document.body.appendChild(document.createElement('div')))
})
