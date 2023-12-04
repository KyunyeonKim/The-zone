import React from 'react'
import {formatDate} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from "axios";
import {stateStore} from "../../../index";

export default class CalendarContainer extends React.Component {

  constructor() {
    super();
    console.log("constructor")
    this.state = {
      weekendsVisible: true,
      //초기화를 위하여  axios에서 공휴일 정보 받아오기

      currentEvents: []
    };
    let totalEvents = []
    let currentMonth = ''
    let currentYear = ''
    // 현재 날짜를 가져오기
    //[{"title":"임시공휴일","date":"2023-10-02","backgroundColor":"red","extendedProps":{"kind":"holiday"}}]
    // stateStore.push(this.state,this.setState)
    stateStore.calendarContainerStateSet = {state:this.state,setState:this.setState}
    console.log(`current stateStore : ${JSON.stringify(stateStore)}`)
  }
    // initDate = this.props===undefined?new Date():this.props.initDate
    initDate = new Date()
    vacationableData = []

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today', center: 'title', right: ''
            }}
            initialView='dayGridMonth'
            // editable={true}
            // selectable={true}
            // selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={this.state.currentEvents} // alternatively, use the `events` setting to fetch from a feed
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
            // eventAdd={function (e) {
            //   console.log(e.event.title)
            // }} // 이벤트 추가 후 수행되는 콜백
            // eventChange={function () {
            // }} // 이벤트 변경 후 수행되는 콜백
            // eventRemove={function () {
            // }} // 이벤트 삭제 후 수행되는 콜백
            events={this.state.currentEvents}
            //TODO : 동적 처리가 필요한 부분 - 올해로 한정
            validRange={{start: '2023-01-01', end: '2024-01-01'}}
            viewDidMount={this.calendarMountedEventHandler.bind(this)}
            initialDate={this.initDate}
          />
        </div>
        {/*<div onClick={this.props.toggleModalShowing}>modal ON!</div>*/}
      </div>)
  }
  toggleModalShowingWithCurrentDate(){
    console.log(`currentYear = ${this.currentYear} currentMonth = ${this.currentMonth}  new initDate = ${new Date(this.currentYear+'-'+this.currentMonth)}`)
    // this.props.toggleModalShowing(new Date(this.currentYear+'-'+this.currentMonth))
    this.props.toggleModalShowing()
  }
  async calendarMountedEventHandler() {
    this.refreshCurrentDate.bind(this)()
    console.log("calendar loaded!")
    //TODO: 로그인 로직 분리하기
    axios.defaults.withCredentials = true;

    let loginForm = new FormData()
    loginForm.append('loginId', '200001011')
    loginForm.append('password', 'test')
    const login = await axios.post('http://localhost:8080/login', loginForm)

    //최초 1회 데이터 삽입 수행
    this.refreshData.bind(this)()
    // prev 버튼에 이벤트 등록
    document.querySelector('.fc-prev-button').addEventListener('click', this.refreshData.bind(this));

    //next 버튼에 이벤트 등록
    document.querySelector('.fc-next-button').addEventListener('click', this.refreshData.bind(this));
  }


  async refreshData() {
    console.log("===================================================================================================")
    console.log("refreshData")
    this.refreshCurrentDate.bind(this)()
    this.vacationableData = []
    //연차 요청 버튼 활성화를 위하여 이벤트 생성
    const today = new Date();
    const year = today.getFullYear();
    const month = this.currentMonth;
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    // console.log(`lastDayOfMonth ${lastDayOfMonth}`)
    const lastDate = new Date(year, month - 1, lastDayOfMonth)
    // console.log(`lastDate ${lastDate}`)
    let currentDate = new Date(today.getFullYear(), this.currentMonth - 1, 1);
    //현재날짜 +3일보다 더 빠른 날짜에 대해서는 연차 요청 불가능
    if (currentDate < today) {
      currentDate = today
      currentDate.setDate(currentDate.getDate() + 3);
    }
    //정확한 비교 연산을 위하여 시간 초기화
    currentDate.setHours(0, 0, 0, 0)
    while (currentDate <= lastDate) {
      // console.log(`currentDate ${currentDate}`)
      const year = currentDate.getFullYear();
      const month = String(this.currentMonth).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      //토, 일요일에 대해서는 연차 요청 불가능
      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        this.vacationableData.push({
          "title": "연차요청", "date": formattedDate, "backgroundColor": "green", "extendedProps": {"kind": "vacationable"}
        })
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // console.log(`while result ${JSON.stringify(this.vacationableData)}`)
    // console.log(`check ${currentDate} ${lastDate} ${currentDate===lastDate}`)
    //휴일 데이터와 ,근태 기록 불러우기
    axios.defaults.withCredentials = true;
    const holidayData = await axios.get(`http://localhost:8080/system/calendar/holiday?year=${this.currentYear}&month=${this.currentMonth}`)
    const attendanceInfo = await axios.get(`http://localhost:8080/system/calendar/attendance_info?year=${this.currentYear}&month=${this.currentMonth}`)
    const vacationRequestedInfo = await axios.get(`http://localhost:8080/system/calendar/vacation_info?year=${this.currentYear}&month=${this.currentMonth}`)
    const newVacationableData = []
    //TODO : 기 연차요청이 있는 날 데이터 출력 필요

    console.log('vacationInfo' + JSON.stringify(vacationRequestedInfo.data))

    //this.vacationableData에서 유효한 데이터만 다시 추출하여 이벤트 생성
    outloop : for (let i = 0; i < this.vacationableData.length; i++) {
      // 휴일에 대해서는 연차 요청 불가능
      for (const holiday of holidayData.data) {
        if (holiday.date === this.vacationableData[i].date) {
          continue outloop;
        }
      }

      for (const vacation of vacationRequestedInfo.data) {
        if (vacation.date === this.vacationableData[i].date) {
          continue outloop;
        }
      }

      newVacationableData.push(this.vacationableData[i])
    }

    this.totalEvents = holidayData.data.concat(attendanceInfo.data).concat(newVacationableData).concat(vacationRequestedInfo.data)
    console.log("total events " + JSON.stringify(this.totalEvents))
    stateStore.chartContainerStateSet.setState({year:this.currentYear.toString(),month:this.currentMonth.toString()})
    this.setState({
      weekendsVisible: true,
      //초기화를 위하여  axios에서 공휴일 정보 받아오기
      currentEvents: this.totalEvents
    })
  }

  refreshCurrentDate() {
    this.currentYear = document.querySelector('.fc-toolbar-title')===null?new Date().getFullYear(): document.querySelector('.fc-toolbar-title').textContent.split(' ')[1]
    this.currentMonth = document.querySelector('.fc-toolbar-title')===null?new Date().getMonth():document.querySelector('.fc-toolbar-title').textContent.split(' ')[0]
    this.currentMonth = new Date(`${this.currentMonth} 1, 2000`).getMonth() + 1
  }

  getClosestSaturday(eventDate) {
    const today = new Date(eventDate);
    alert(`${today}`)
    const currentDayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    if(currentDayOfWeek === 6 || currentDayOfWeek === 0 ){
      return 0;
    }
    const sortByDate = (a, b) => a - b;
    let daysUntilSaturday = 6 - currentDayOfWeek; // 토요일까지 남은 일 수. -1을 해주어 사용 가능한 연차 갯수를 정확하게 구한다
    ;

    let mappedCurrentEventsOfHoliday = this.state.currentEvents.filter((event) => event.extendedProps.kind ==='holiday').map((holiday)=>new Date(holiday.date))
    let mappedCurrentEventsOfVacationRequested = this.state.currentEvents.filter((event) => event.extendedProps.kind ==='vacationRequested').map((event)=>new Date(event.date))
    mappedCurrentEventsOfHoliday = mappedCurrentEventsOfHoliday.concat(mappedCurrentEventsOfVacationRequested)
    mappedCurrentEventsOfHoliday = mappedCurrentEventsOfHoliday.sort(sortByDate).filter((event) => event-today>0)
    alert(`mappedCurrentEventsOfHoliday : ${mappedCurrentEventsOfHoliday}`)

    let countVacationRequestLimit = mappedCurrentEventsOfHoliday===null || mappedCurrentEventsOfHoliday===undefined ? -1:mappedCurrentEventsOfHoliday[0]-today>0?Math.floor((mappedCurrentEventsOfHoliday[0]-today)/24/3600/1000):-1;

    if(countVacationRequestLimit !== -1){
      daysUntilSaturday = daysUntilSaturday > countVacationRequestLimit ? 'countVacationRequestLimit'+countVacationRequestLimit : 'daysUntilSaturday'+daysUntilSaturday
      alert(`limit ${daysUntilSaturday}`)
      return daysUntilSaturday
    }

    alert(`no additional holiday event, vacationRequest. so get saturday limit ${daysUntilSaturday}`)
    return daysUntilSaturday;
  }

  handleEventClick = (clickInfo) => {
    let eventKind = `${clickInfo.event.extendedProps.kind}`


    // alert(`${eventKind}`)
    switch (eventKind) {
      case 'holiday':
        alert(`event handler requested ${eventKind}`)

        break;
      case 'vacationable':
        alert(`event handler requested ${clickInfo.event.start}`)

        this.props.toggleModalShowing(eventKind,'some','args','add',this.getClosestSaturday(clickInfo.event.start))

        break;
      case 'vacationRequested':
        alert(`event handler requested ${eventKind} quantity ${clickInfo.event.extendedProps.quantity} ${new Date(clickInfo.event.date)}`)

        break;
      default:
        alert(`kind of no handler event ${eventKind}`)
    }

  }

  handleEvents = async (events) => {
    if (this.state.currentEvents !== this.totalEvents) {

    }
  }
}

function renderEventContent(eventInfo) {
  return (<>
    <b>{eventInfo.timeText}</b>
    <i>{eventInfo.event.title}</i>
  </>)
}

function renderSidebarEvent(event) {
  return (<li key={event.id}>
    <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
    <i>{event.title}</i>
  </li>)
}
