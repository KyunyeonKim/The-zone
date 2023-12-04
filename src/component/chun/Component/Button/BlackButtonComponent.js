import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({

    button :{
        fontSize:'15px',
        whiteSpace: 'nowrap',
        borderRadius:'8px',
        border:'1px solid black',
        color:"black",
        fontWeight:"bold",
        // backgroundColor:"#2F79DA",
        fontFamily: 'Noto Sans KR, sans-serif'
    }

});

class BlackButtonComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {classes,title,onButtonClick,disabled} = this.props;
        return(
            <Button className={classes.button} variant="outlined"   onClick={onButtonClick} disabled={disabled}> {title} </Button>
        )
    }
}

export default withStyles(styles)(BlackButtonComponent);
