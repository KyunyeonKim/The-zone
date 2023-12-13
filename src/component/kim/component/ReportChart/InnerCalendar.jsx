import React, {Component} from 'react';
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import Calendar from "react-calendar";
import moment from 'moment';

const styles = (theme) => ({
    toolbarIcon: {
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', ...theme.mixins.toolbar,
    }, drawerPaper: {
        position: 'relative', whiteSpace: 'nowrap', width: drawerWidth, transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }, drawerPaperClose: {
        overflowX: 'hidden', transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }), width: theme.spacing(7), [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    }, subheader: {
        fontSize: '20px', color: 'white', background: '#5984CE', fontFamily: 'Noto Sans KR,sans-serif', fontWeight:"bold",width:"100%"
    }, forHeight: {
        display: 'flex', height: '100%'
    },
    dot : {
    height: '8px',
    width: '8px',
    background: '#f87171',
    borderRadius: '50%',
    display: 'flex',
    marginLeft: '1px',
    }

});

class InnerCalendar extends Component {
    constructor() {
        super();
        this.month = this.props.month
        this.mark = []
    }
    month
    mark

    async componentDidMount() {
        axios.defaults.withCredentials=true;
        let attendanceInfo = await axios.get(`http://localhost:8080/employee/attendance_info/?year=${new Date().getFullYear()}&month=${new Date().getMonth()+1}&page=1&size=32`)
        alert(`attendanceInfo ${attendanceInfo.data.data}`)
        this.mark = [...attendanceInfo.data.data]
    }

    render() {
        let mark = this.mark
        return (
            <div>
                <Calendar
                    formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                    value={value}
                    minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    navigationLabel={null}
                    showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                    className="mx-auto w-full text-sm border-b"
                    tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                        // 추가할 html 태그를 변수 초기화
                        let html = [];
                        // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                        if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                            html.push(<div className="dot"></div>);
                        }
                        // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                        return (
                            <>
                                <div className="flex justify-center items-center absoluteDiv">
                                    {html}
                                </div>
                            </>
                        );
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(InnerCalendar);