import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({

    button :{
        fontSize:'16px',
        whiteSpace: 'nowrap',
        borderRadius:'20px',
        color:"black",
        // backgroundColor:"#2F79DA",
        fontFamily:'IBM Plex Sans KR',
        height:"45px",
        backgroundColor:"#FFCA6E",
        fontWeight:'bold',
        width:"160px"

    }

});

class AttendanceApproveEmployeeButtonComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {classes,title,onButtonClick,disabled} = this.props;
        return(
            <Button className={classes.button}  onClick={onButtonClick} disabled={disabled}> {title} </Button>
        )
    }
}

export default withStyles(styles)(AttendanceApproveEmployeeButtonComponent);
