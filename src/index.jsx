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
import GetAttendanceHistory from "./component/kim/component/GetAttendanceHistory";



export const stateStore=[]
document.addEventListener('DOMContentLoaded', function() {
  render(
      //아이디는 123
      //바번은 12345
      // <CreateEmployee/>, //기능 됨 //validation check까지
      //   <UpdateEmployee/>, //기능됨//validation check까지
      <EmployeeMine/>,
      // <GetHistoryOfVacationDefaultSetting/>,//기능됨 데이터가 없으면 빈배열 검색결과가 없습니다 구현
      //근속년수 기준 연차 개수 조정내역
    // <MainEndPoint/>,
    //   <SetWorkTime/>, //기능됨 데이터가 없으면 빈 배열 검색결과가 없습니다 구현
      //정규 츌퇴근시간 설정내역



      // <PostSetWorkTime/>, // 구현완료 사유에대한 벨리데이션 체크와
      // <GetAttendanceHistory/>,
      // <GetVacationHistory/>,//기능 됨
    document.body.appendChild(document.createElement('div'))
  )
})
