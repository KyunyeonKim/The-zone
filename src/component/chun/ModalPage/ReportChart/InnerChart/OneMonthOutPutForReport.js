import React, {Component} from 'react';
import {Grid, Paper, Typography, withStyles} from '@material-ui/core';
import {IntegratedChartOfAttendanceStore, IntegratedChartOfVacationStore} from "../../../../../index";
import IntegratedChartOfAttendance from "./IntegratedChartOfAttendance";
import IntegratedChartOfVacation from "./IntegratedChartOfVacation";
// 스타일 정의
const styles = theme => ({
    root: {},


    paper: {
        padding: theme.spacing(3), border: '2px solid #000000', // 2픽셀 굵기의 검은색 테두리를 추가합니다.
        margin: '0px', marginBottom: '20px',


    }, title: {
        marginBottom: theme.spacing(2), textAlign: 'center',
    }, // 추가적인 스타일을 여기에 정의할 수 있습니다.

    IntegratedChartOfVacation: {
        marginBottom: theme.spacing(2), // You can adjust the spacing value
    },

    Title:{
        textAlign: 'center',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
        fontSize:'30px',
        marginBottom:theme.spacing(3
        ),
    }


});


class OneMonthOutPutForReport extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        IntegratedChartOfAttendanceStore[this.props.month](parseInt(this.props.year), parseInt(this.props.month))

        IntegratedChartOfVacationStore[this.props.month](parseInt(this.props.year), parseInt(this.props.month))
    }


    render() {
        const {classes, year, month} = this.props;

        return (<div className={classes.root}>


            <Paper className={classes.paper}>
                <Typography className={classes.Title}
                >{month}월 현황</Typography>
                <div className={classes.IntegratedChartOfVacation}>
                    <IntegratedChartOfVacation year={parseInt(year)} month={parseInt(month)}/>
                </div>

                <div className={classes.IntegratedChartOfVacation}>
                    <IntegratedChartOfAttendance
                        year={parseInt(year)} month={parseInt(month)}/>
                </div>
            </Paper>
        </div>);
    }
}

export default withStyles(styles)(OneMonthOutPutForReport);
