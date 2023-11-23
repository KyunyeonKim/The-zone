import React from 'react';

import EmployeeVacationSetting from "./component/chun/Component/EmployeeVacationSetting";
import {render} from "react-dom";
import VacationRequest from "./component/chun/Component/VacationRequest";
import AppealRequest from "./component/chun/Component/AppealRequest";


document.addEventListener('DOMContentLoaded', function () {
    render(<AppealRequest/>, document.body.appendChild(document.createElement('div')))
})
