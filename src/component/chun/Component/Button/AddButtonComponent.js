import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
//variant="outlined" color="primary"
    button :{
        fontSize:'15px',
        whiteSpace: 'nowrap',
        borderRadius:'8px',
        border:'1px solid #2055E8',
        color:"#2055E8",
        fontWeight:"bold",
        // backgroundColor:"#2F79DA",
        fontFamily: 'Noto Sans KR, sans-serif',
    }

});

class AddButtonComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {classes,title,onButtonClick,disabled} = this.props;
        return(
            <Button className={classes.button} onClick={onButtonClick} disabled={disabled} > {title} </Button>
        )
    }
}

export default withStyles(styles)(AddButtonComponent);
