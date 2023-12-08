import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";


const styles=(theme)=>({
    textField: {
        width: "95%",
        marginBottom: theme.spacing(2),
    },
});

class TextFieldComponent extends Component{

    render(){
        let {id,classes,onChange,value,disabled,label}=this.props;
        return(
            <div>
                <TextField
                    id={id}
                    className={classes.textField}
                    label={label}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                />
            </div>
        )
    }
}

export default withStyles(styles)(TextFieldComponent);