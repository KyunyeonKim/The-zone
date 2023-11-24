import React from 'react';

import EmployeeVacationSetting from "./component/chun/Component/EmployeeVacationSetting";
import {render} from "react-dom";
import VacationRequest from "./component/chun/Component/VacationRequest";
import AppealRequest from "./component/chun/Component/AppealRequest";
import VacationDefaultSetting from "./component/chun/Component/VacationDefaultSetting";
import AttendanceApprovalAllEmployees from "./component/chun/Component/AttendanceApprovalAllEmployees";


document.addEventListener('DOMContentLoaded', function () {
    render(<EmployeeVacationSetting/>, document.body.appendChild(document.createElement('div')))
})
