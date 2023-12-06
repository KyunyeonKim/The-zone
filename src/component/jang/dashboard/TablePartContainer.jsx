import React, {Component} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableCellContainer from "./TableCellContainer";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1), minWidth: 120,
    }, text: {
        fontSize: '12px', fontFamily: 'Noto Sans KR, sans-serif', textAlign: 'center', whiteSpace: 'nowrap'
    }, titleText: {
        fontSize: '15px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    }, button: {
        height: "90%", fontSize: '1rem'
    }, pagination: {
        display: 'flex', justifyContent: 'center', marginTop: '10px', listStyle: 'none', padding: 0,
    }, pageItem: {
        margin: '0 8px', '& a': {
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            width: '35px',
            borderRadius: '50%',
        }, '&:hover': {
            border: '1px solid #ddd',
        },
    }, activePageItem: {
        '& a': {
            color: '#007bff', // 번호 색상을 파란색으로 변경
        }, '&:hover': {
            border: '1px solid #ddd',
        },
    }, tableHead: {
        backgroundColor: '#C2DCF0', borderTop: '1.5px solid black',
    }
});

class TablePartContainer extends Component {

    render() {
        let {classes}=this.props;
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="center" className={classes.titleText}>사원 번호</TableCell>
                            <TableCell align="center" className={classes.titleText}>사원 이름</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.parentState.employeeNumberList.filter((value) => value!==null && value!==undefined && value.trim()!=="").map((employeeNumber) =>
                            // {alert(employeeNumber)
                        {
                            return <TableRow key={employeeNumber}>
                                <TableCellContainer employeeNumber = {employeeNumber} toggleModalShowing={this.props.toggleModalShowing} reRender={this.props.reRender} />
                            </TableRow>})}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withStyles(styles)(TablePartContainer);