import React, {Component} from 'react';
import {stateStore} from "../../../index";
import Grid from "@material-ui/core/Grid";

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
            <Grid>
                {`chart of ${JSON.stringify(this.state)}`}
            </Grid>
        );
    }
}

export default ChartContainer;