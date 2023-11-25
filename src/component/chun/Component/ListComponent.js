import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    table: {
        minWidth: 650,
    },
});

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: "",
        };
    }

    render() {
        const {row,classes} = this.props;
        const handleSearchButtonClick=async(e)=>{
            await this.setState({employeeId:row.employeeId});
            console.log("employeeId : ",row.employeeId);
        }

        return (
            <TableRow key={row.employeeId}>
                <TableCell>{row.employeeId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                    <Box component="span">
                        <Button className={classes.button} variant="outlined" onClick={(e)=>handleSearchButtonClick (e)}>승인 내역 조회 </Button>
                    </Box>
                </TableCell>
            </TableRow>
        );
    }
}
// await this.setState({employeeId: row.employeeId});
export default withStyles(styles)(ListComponent);
