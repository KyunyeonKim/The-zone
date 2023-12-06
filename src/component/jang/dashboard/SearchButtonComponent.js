import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({

    button :{
        height:"90%",
        fontSize:'1rem',
        whiteSpace: 'nowrap'
    }

});

class SearchButtonComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {classes,title,onButtonClick,disabled} = this.props;
        return(
            <Button className={classes.button} variant="outlined" onClick={onButtonClick}> {title} </Button>
        )
    }
}

export default withStyles(styles)(SearchButtonComponent);
