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
        margin: theme.spacing(1),
    }, text: {
        fontSize: '12px', fontFamily:'IBM Plex Sans KR', textAlign: 'center', whiteSpace: 'nowrap'
    }, titleText: {
        fontSize: '15px',
        fontFamily:'IBM Plex Sans KR',
        fontWeight: 'bold',
        textAlign: 'center',
        whiteSpace: 'nowrap',
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
        backgroundColor: '#F2F2F2', borderTop: '1.5px solid black',
    },

});

class TablePartContainer extends Component {

    render() {
        let {classes}=this.props;
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="center" style={{ width: '24%' }} className={classes.titleText}>사원 번호</TableCell>
                            <TableCell align="center"style={{ width: '24%' }} className={classes.titleText}>직급</TableCell>
                            <TableCell align="center"style={{ width: '24%' }} className={classes.titleText}>입사 년도</TableCell>
                            <TableCell align="center" style={{ width: '24%' }}className={classes.titleText}>사원 이름</TableCell>
                            <TableCell align="center" style={{ width: '23%' }}className={classes.titleText}>사원 수정</TableCell>
                            <TableCell align="center" style={{ width: '23%' }}className={classes.titleText}>사원 삭제</TableCell>
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