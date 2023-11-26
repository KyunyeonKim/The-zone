import React from 'react';

import EmployeeVacationSetting from "./component/chun/Component/EmployeeVacationSetting";
import {render} from "react-dom";
import VacationRequest from "./component/chun/Component/VacationRequest";
import AppealRequest from "./component/chun/Component/AppealRequest";
import VacationDefaultSetting from "./component/chun/Component/VacationDefaultSetting";
import AttendanceApprovalAllEmployees from "./component/chun/Component/AttendanceApprovalAllEmployees";
import AttendanceApprovalEmployee from "./component/chun/Component/AttendanceApprovalEmployee";


document.addEventListener('DOMContentLoaded', function () {
    render(<AttendanceApprovalEmployee/>, document.body.appendChild(document.createElement('div')))
})
