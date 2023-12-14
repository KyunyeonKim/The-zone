// import React, {Component} from 'react';
// import axios from "axios";
// import {withStyles} from "@material-ui/core/styles";
// import Calendar from "react-calendar";
// import moment from 'moment';
//
// const styles = (theme) => ({
//     dot: {
//     height: "4px",
//     width: "4px",
//     backgroundColor: "#63A1FF",
//     borderRadius: "50%",
//     display: "flex",
//     marginLeft: "1px",
// }
// });
//
// class InnerCalendar extends Component {
//     year
//     month
//     mark
//
//     constructor(props) {
//         super(props);
//         this.month = props.month
//         this.mark = []
//         this.year = props.year
//     }
//
//     async componentDidMount() {
//         axios.defaults.withCredentials = true;
//         let attendanceInfo = await axios.get(`http://localhost:8080/employee/attendance_info/?year=${this.year}&month=${this.month}&page=1&size=32`)
//         alert(`attendanceInfo ${JSON.stringify(attendanceInfo.data.data)}`)
//         let mapped = attendanceInfo.data.data.map(data =>
//             new Date(moment(data.startTime).format("YYYY-MM-DD")))
//         alert(`map attendanceInfo ${JSON.stringify(mapped)}`)
//
//         this.mark = [...mapped]
//     }
//
//     render() {
//         let mark = this.mark
//         let month = this.month
//         let year = this.year
//         let {classes}=this.props;
//         return (<div>
//                 <Calendar
//                     value={new Date(year + '-' + month + '-' + '01')}
//                     formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
//                     minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//                     maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//                     navigationLabel={null}
//                     showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
//                     className="mx-auto w-full text-sm border-b"
//                     tileContent={({ date, view }) => {
//                         // 날짜 타일에 컨텐츠 추가하기 (html 태그)
//                         // 추가할 html 태그를 변수 초기화
//                         const html = [];
//                         // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
//                         if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
//                             html.push(<div className="dot"></div>);
//                         }
//                         // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
//                         return (
//                             <>
//                                 <div className="flex justify-center items-center absoluteDiv">
//                                     {html}
//                                 </div>
//                             </>
//                         );
//                     }}
//                 />)
//             </div>);
//     }
// }
//
// export default withStyles(styles)(InnerCalendar);

import React, {Component} from 'react';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
const styles = (theme) => ({

    normal_attendance: {
        height: '4px',
        width: '4px',
        backgroundColor: '#63A1FF',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    abnormal_attendance: {
        height: '4px',
        width: '4px',
        backgroundColor: '#474698',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    undefined_attendance: {
        height: '4px',
        width: '4px',
        backgroundColor: '#3d8877',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    approved_abnormal_attendance: {
        height: '4px',
        width: '4px',
        backgroundColor: '#54040f',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    permitted_vacation: {
        height: '4px',
        width: '4px',
        backgroundColor: '#39a649',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    request_vacation: {
        height: '4px',
        width: '4px',
        backgroundColor: '#883794',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    rejected_vacation: {
        height: '4px',
        width: '4px',
        backgroundColor: '#ff0000',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },
    undefined_vacation: {
        height: '4px',
        width: '4px',
        backgroundColor: '#fdda00',
        borderRadius: '50%',
        display: 'flex',
        marginLeft: '1px',
    },

});

class InnerCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: [],
        };
        this.month = props.month;
        this.year = props.year;
    }

    async componentDidMount() {
        alert('innerCalendar componentDidMount')
        const {classes} = this.props;
        axios.defaults.withCredentials = true;
        try {
            const attendanceInfo = await axios.get(
                `http://localhost:8080/employee/attendance_info/?year=${this.year}&month=${this.month}&page=1&size=32`
            );
            let mappedAttendance = []
            alert(`attendanceInfo ${JSON.stringify(attendanceInfo)}`)

            if(attendanceInfo.status!==204){
                mappedAttendance = attendanceInfo.data.data.map((data) => {
                        switch (data.attendanceStatusCategory) {
                            case '정상 근태':
                                return {
                                    date: moment(data.attendanceDate).format('YYYY-MM-DD'),
                                    category: classes.normal_attendance
                                }
                            case "이상 근태(결근)":
                            case "이상 근태(조기 퇴근)":
                            case "이상 근태(지각, 조기 퇴근)":
                            case "이상 근태(지각)":
                            case "이상 근태(퇴근 정보 없음)":
                                return {
                                    date: moment(data.attendanceDate).format('YYYY-MM-DD'),
                                    category: classes.abnormal_attendance
                                }
                            case "승인|이상 근태(조기 퇴근)":
                            case "승인|이상 근태(결근)":
                            case "승인|이상 근태(지각, 조기 퇴근)":
                            case "승인|이상 근태(지각)":
                            case "승인|이상 근태(지각, 퇴근 정보 없음)":
                                return {
                                    date: moment(data.attendanceDate).format('YYYY-MM-DD'),
                                    category: classes.approved_abnormal_attendance
                                }

                            case "조정 요청 중":
                                break;
                            default:
                                return {
                                    date: moment(data.attendanceDate).format('YYYY-MM-DD'),
                                    category: classes.undefined_attendance
                                }

                        }
                    }
                );
            }


            alert(`mappedAttendance ${JSON.stringify(mappedAttendance)}`)
            const vacationInfo = await axios.get(
                `http://localhost:8080/system/calendar/vacation_info?year=${this.year}&month=${this.month}`
            );
            alert(`vacationInfo ${JSON.stringify(vacationInfo)}`)

            const mappedVacation = vacationInfo.data.map((data) => {
                    switch (data.extendedProps.status) {
                        case "연차 요청 승인":

                            return {
                                date: moment(data.date).format('YYYY-MM-DD'),
                                category: classes.permitted_vacation
                            }

                        case "연차 요청 중":
                            return {
                                date: moment(data.date).format('YYYY-MM-DD'),
                                category: classes.request_vacation
                            }

                        case "연차 요청 반려":
                            return {
                                date: moment(data.date).format('YYYY-MM-DD'),
                                category: classes.rejected_vacation
                            }

                        default:
                            return {
                                date: moment(data.date).format('YYYY-MM-DD'),
                                category: classes.undefined_vacation
                            }

                    }
                }
            );
            // alert(`mappedVacation ${JSON.stringify(mappedVacation)}`)
            alert(`state mark : ${JSON.stringify(mappedAttendance.concat(mappedVacation))}`)
            this.setState({mark: mappedAttendance.concat(mappedVacation)});


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const {classes} = this.props;
        const {mark} = this.state;
        const month = this.month;
        const year = this.year;
        return (
            <div>
                <Calendar
                    value={new Date(year + '-' + month + '-' + '01')}
                    formatDay={(locale, date) => moment(date).format('DD')}
                    minDetail="month"
                    maxDetail="month"
                    navigationLabel={null}
                    showNeighboringMonth={false}
                    className="mx-auto w-full text-sm border-b"
                    tileContent={({date}) => {
                        const html = [];
                        let find = mark.find((x) => x.date === moment(date).format('YYYY-MM-DD'))
                        if (find) {
                            html.push(<div className={find.category}></div>);
                        }
                        return (
                            <>
                                <div className="flex justify-center items-center absoluteDiv">{html}</div>
                            </>
                        );
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(InnerCalendar);
