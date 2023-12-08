import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AttendanceStartButton from "../component/AttendanceStartButton";
import AttendanceEndButton from "../component/AttendanceEndButton";
export default class AttendanceInfoButtonContainer extends React.Component {
    render() {
        return (
            <Grid container spacing={3} lg={12} direction="row" justifyContent="center" alignItems="center" style={{marginTop:"10px",paddingLeft:"15px"}}>
                <Grid item lg={6} >
                    <AttendanceStartButton/>
                </Grid>
                <Grid item lg={6}>
                    <AttendanceEndButton/>
                </Grid>
            </Grid>
        )}
}
