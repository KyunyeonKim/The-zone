import React, {Component} from 'react';
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

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
        this.setState(
            {
                employeeNumber : responseData.employeeNumber,
                isManager : responseData.attendanceManager,
                hireYear:responseData.hireYear,
                name:"",
                showDeleteDialog:false,
            }
        )
    }

    callToggleModalShow = () => {
        this.props.toggleModalShowing(this.state.employeeNumber,'update')
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

        this.props.reRender(null,null)
        this.setState({showDeleteDialog:!this.state.showDeleteDialog})
    }

    render() {
        return (
            <TableCell>
                <TextField value={this.state.employeeNumber}/>
                <TextField value={this.state.isManager}/>
                <TextField value={this.state.hireYear}/>
                <TextField value={this.state.name}/>

                <Button variant="contained" color="primary" onClick={this.callToggleModalShow}>
                    UPDATE
                </Button>

                <Button variant="contained" color="secondary" onClick={this.callDeleteDialog}>
                    DELETE
                </Button>
                <Dialog open={this.state.showDeleteDialog} onClose={this.handleClose}>
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

export default TableCellContainer;