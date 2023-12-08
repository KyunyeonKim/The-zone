import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AttendanceStartButton from "../component/AttendanceStartButton";
import AttendanceEndButton from "../component/AttendanceEndButton";

export default class AttendanceInfoButtonContainer extends React.Component {
    render() {
        return <Grid container spacing={3} xs={12} md={12} lg={12} direction="row"
                     justifyContent="space-evenly"
                     alignItems="baseline">
            <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                <Paper>
                    <Grid item>
                        <AttendanceStartButton/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                <Paper>
                    <Grid item>
                        <AttendanceEndButton/>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>;
    }
}
