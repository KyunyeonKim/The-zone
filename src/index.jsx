import React from 'react'
import { render } from 'react-dom'

import './index.css'

import MainEndPoint from "./jang/MainEndPoint";
import GetHistoryOfVacationDefaultSetting from "./component/kim/component/GetHistoryOfVacationDefaultSetting";
import UpdateEmployee from "./component/kim/component/UpdateEmployee";
import CreateEmployee from "./component/kim/component/CreateEmployee";
import SetWorkTime from "./component/kim/component/SetWorkTime";
import GetVacationHistory from "./component/kim/component/GetVacationHistory";



export const stateStore=[]
document.addEventListener('DOMContentLoaded', function() {
  render(

    // <MainEndPoint/>,
    //   <GetHistoryOfVacationDefaultSetting/>,
    //   <UpdateEmployee/>,
    //   <SetWorkTime/>,

      // <CreateEmployee/>,
      <GetVacationHistory/>,
    document.body.appendChild(document.createElement('div'))
  )
})
