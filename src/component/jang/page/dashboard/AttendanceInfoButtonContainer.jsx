import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AttendanceStartButton from "../../component/AttendanceStartButton";
import AttendanceEndButton from "../../component/AttendanceEndButton";
export default class AttendanceInfoButtonContainer extends React.Component {
    render() {
        return (
            <Grid container style={{padding:"4px 0px 9px 0px",display:"flex",justifyContent:"space-evenly"}}  >
                <Grid item  style={{display:"flex",justifyContent:"center"}} >
                    <AttendanceStartButton/>
                </Grid>
                <Grid item  style={{display:"flex",justifyContent:"center"}}>
                    <AttendanceEndButton/>
                </Grid>
            </Grid>
        )}
}
