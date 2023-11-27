import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const styles=(theme)=>({
    textField: {
        width: "60%",
        marginBottom: theme.spacing(2),
    },
});

class TextFieldComponent extends Component{

    render(){
        const {classes,reasonChange,reasonState,disabled}=this.props;

        return(
            <div>
                {console.log("textfieldcomponent의 disabled : ",disabled)}
                <TextField
                    className={classes.textField}
                    label="반려 사유"
                    // value={this.state.reason}
                    value={reasonState}
                    // onChange={(e) => reasonChange(e)}
                    onChange={reasonChange}
                    disabled={disabled}

                />
            </div>
        )
    }
}

export default withStyles(styles)(TextFieldComponent);