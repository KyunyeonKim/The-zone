import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
//variant="outlined" color="primary"
    button :{
        fontSize:'18px',
        whiteSpace: 'nowrap',
        borderRadius:'8px',
        border:'1px solid #2055E8',
        backgroundColor:"cornflowerblue",
        // backgroundColor:"#2F79DA",
        fontFamily: 'Noto Sans KR, sans-serif',
        height:"55px",
        fontWeight:'bold',
        width:"180px"
    }

});

class SettingButtonComponent extends Component{

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

export default withStyles(styles)(SettingButtonComponent);
