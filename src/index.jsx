import React from 'react'
import { render } from 'react-dom'

import './index.css'
import MainEndPoint from "./jang/MainEndPoint";
import GetHistoryOfVacationDefaultSetting from "./component/kim/component/GetHistoryOfVacationDefaultSetting";


export const stateStore=[]
document.addEventListener('DOMContentLoaded', function() {
  render(
    // <MainEndPoint/>,
      <GetHistoryOfVacationDefaultSetting/>,
    document.body.appendChild(document.createElement('div'))
  )
})
