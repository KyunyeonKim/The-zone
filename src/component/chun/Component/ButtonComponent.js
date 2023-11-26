import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({

    button :{
        height:"90%",
        fontSize:'1rem'
    }

});

class ButtonComponent extends Component{

    constructor(props){
        super(props);
    }

    buttonClick=(e)=>{
        const {getData,onButtonClick,state} = this.props;
        onButtonClick();

    }
    render(){
        const {classes,title} = this.props;
        return(
                <Button className={classes.button} variant="outlined" color="primary"  onClick={(e)=>this.buttonClick(e)}> {title} </Button>
        )
    }
}

export default withStyles(styles)(ButtonComponent);
