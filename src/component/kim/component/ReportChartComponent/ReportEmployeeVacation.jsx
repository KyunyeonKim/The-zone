import React, { Component } from "react";
import { Grid, Typography, Paper, withStyles } from '@material-ui/core';
import VacationApprovalInfo from '../Chart/VacationApprovalInfo';
import VacationRequestedInfo from '../Chart/VacationRequestedInfo';
import VacationRejectedInfo from '../Chart/VacationRejectedInfo';

// 스타일 정의
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        marginBottom: theme.spacing(2),
    }
});

class ReportEmployeeVacation extends Component {


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" className={classes.title}>
                        연차 사용 현황
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <VacationApprovalInfo
                                year={2023}
                                month={1}
                                onDataLoaded={this.handleApprovedDataLoaded}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <VacationRejectedInfo year={2023} month={1}
                                                  onDataLoaded={this.handleRejectedDataLoaded}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <VacationRequestedInfo year={2023} month={1} onDataLoaded={this.handleRequestedDataLoaded}/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ReportEmployeeVacation);