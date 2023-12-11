import React, {Component} from 'react';
import {stateStore} from "../../../index";
import Grid from "@material-ui/core/Grid";
import VacationDashBoard from "../../kim/ModalPage/VacationDashBoard";

class ChartContainer extends Component {

    constructor() {
        super();
        this.state={year:new Date().getFullYear(),month:new Date().getMonth()+1}
        stateStore.chartContainerStateSet={state:this.state,setState:this.changeState.bind(this)}
        console.log(`chart Container constructor ${JSON.stringify(stateStore)}`)
    }

    changeState(value){
        this.setState(value)
    }

    render() {
        return (
            <Grid item>
                {`chart of ${JSON.stringify(this.state)}`}
                <VacationDashBoard currentYear={this.state.year} currentMonth={this.state.month}></VacationDashBoard>
            </Grid>
        );
    }
}

export default ChartContainer;