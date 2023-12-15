import React, {Component} from 'react';
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
const styles = (theme) => ({});

class TableCellContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.toggleEmployeeManagerSetting=this.toggleEmployeeManagerSetting.bind(this)
        this.callToggleModalShow = this.callToggleModalShow.bind(this)
        this.callDeleteDialog=this.callDeleteDialog.bind(this)
        this.reRenderTable = props.reRender
        this.state={
            employeeNumber : props.employeeNumber,
            isManager : false,
            hire_year:null,
            name:"",
            showDeleteDialog:false,
        }
    }


    reRenderTable
    toggleEmployeeManagerSetting = (event) => {

    }

    async componentDidMount() {
        let response = await axios.get(`http://localhost:8080/admin/employee/${this.state.employeeNumber}`)
        let responseData = response.data
        alert(`${JSON.stringify(responseData)}`)
        this.setState(
            {
                employeeNumber: responseData.employeeId,
                isManager: responseData.attendanceManager,
                hireYear: responseData.hireYear,
                name: responseData.name, // 이름 설정
                showDeleteDialog:false,
            }
        )
    }

    callToggleModalShow = () => {
        this.props.toggleModalShowing('UpdateEmployee',this.state.employeeNumber,'update')
    }

    callDeleteDialog = () => {
        this.setState({showDeleteDialog:!this.state.showDeleteDialog,
        })
    }
    handleClose = () => {
        this.setState({showDeleteDialog:!this.state.showDeleteDialog,
        })
    }

    deleteEmployee = async () => {
        alert(`called delete ${this.state.employeeNumber}`)
        let response = axios.get(`http://localhost:8080/admin/employee/delete/${this.state.employeeNumber}`)
        alert(`${JSON.stringify(response)}`);
        this.setState({showDeleteDialog:!this.state.showDeleteDialog})
        this.props.reRender(null,null)
    }

    render() {
        let {classes}=this.props;
        return (
            <TableCell className={classes.table}>

                <TextField value={this.state.employeeNumber} style={{ width: '100%' , textAlign:'center' }}/>
                <TextField value={this.state.isManager} style={{ width: '100%', textAlign:'center' }}/>
                <TextField value={this.state.hireYear} style={{ width: '100%', textAlign:'center' }}/>
                <TextField value={this.state.name} style={{ width: '100%', textAlign:'center' }}/>

                <Button variant="contained" color="primary" onClick={this.callToggleModalShow}style={{margin:5}}>
                    UPDATE
                </Button>

                <Button variant="contained" color="secondary" onClick={this.callDeleteDialog}style={{margin:5}}>
                    DELETE
                </Button>
                <Dialog open={this.state.showDeleteDialog} onClose={this.handleClose} >
                    <DialogTitle>사원 정보 삭제</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            삭제하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteEmployee} color="primary">
                            삭제
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            취소
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
        );
    }
}

export default  withStyles(styles)(TableCellContainer);