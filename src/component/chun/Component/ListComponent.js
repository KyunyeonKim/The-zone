import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from "@material-ui/core/styles";


const styles = (theme) => ({
    tableCell:{
        fontSize:'1.2rem',
        textAlign: 'center'
    }

});

class ListComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*고유적으로 식별할 수 있는 keyData의 데이터를 받아옴*/
        const {row,keyData,classes} = this.props;
        return (
            <TableRow key={keyData}>
                {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key} className={classes.tableCell}>
                        {value}
                    </TableCell>
                ))}
            </TableRow>

        );
    }
}
export default withStyles(styles)(ListComponent);
