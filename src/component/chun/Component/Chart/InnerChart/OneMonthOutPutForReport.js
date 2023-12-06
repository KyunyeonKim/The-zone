import React, {Component} from 'react';
import {Grid, Paper, withStyles} from '@material-ui/core';
import {IntegratedChartOfAttendanceStore, IntegratedChartOfVacationStore} from "../../../../../index";
import IntegratedChartOfAttendance from "./IntegratedChartOfAttendance";
import IntegratedChartOfVacation from "./IntegratedChartOfVacation";
// 스타일 정의
const styles = theme => ({
    root: {
        flexGrow: 1, padding: theme.spacing(3),
    }, paper: {
        padding: theme.spacing(3), margin: theme.spacing(3),
    }, title: {
        marginBottom: theme.spacing(2), textAlign: 'center',
    }, // 추가적인 스타일을 여기에 정의할 수 있습니다.
});


class OneMonthOutPutForReport extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        alert(`OneMonthOutPutForReport updated - IntegratedChartOfAttendanceStore[${this.props.month}] called`)
        IntegratedChartOfAttendanceStore[this.props.month](parseInt(this.props.year), parseInt(this.props.month))
        alert(`OneMonthOutPutForReport updated - IntegratedChartOfVacationStore[${this.props.month}] called`)
        IntegratedChartOfVacationStore[this.props.month](parseInt(this.props.year), parseInt(this.props.month))
    }


    render() {
        const {classes, year, month} = this.props;

        return (<div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <IntegratedChartOfVacation year={parseInt(year)} month={parseInt(month)}/>
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <IntegratedChartOfAttendance year={parseInt(year)} month={parseInt(month)}/>
                </Grid>
            </Paper>
        </div>);
    }
}

export default withStyles(styles)(OneMonthOutPutForReport);
