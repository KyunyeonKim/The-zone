import React, {Component} from 'react';
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
const styles = (theme) => ({


    button :{
        fontSize:'16px',
        whiteSpace: 'nowrap',
        borderRadius:'8px',
        border:'1px solid #2055E8',
        backgroundColor:"cornflowerblue",
        // backgroundColor:"#2F79DA",
        fontFamily:'IBM Plex Sans KR',
        height:"45px",
        fontWeight:'bold'
    }
});

class TableCellContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.toggleEmployeeManagerSetting=this.toggleEmployeeManagerSetting.bind(this)
        this.callToggleModalShow = this.callToggleModalShow.bind(this)
        this.callDeleteDialog=this.callDeleteDialog.bind(this)
        this.reRenderTable = props.reRender
        this.state={
            employeeNumber : props.employeeNumber,
            hire_year:null,
            name:"",
            showDeleteDialog:false,
            isManager: false, // 가정하에 이렇게 변경했습니다.
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
        let response = axios.get(`http://localhost:8080/admin/employee/delete/${this.state.employeeNumber}`)
        this.setState({showDeleteDialog:!this.state.showDeleteDialog})
        this.props.reRender(null,null)
    }

    render() {
        let {classes}=this.props;
        return (<>
            <TableCell align='center'>
                <Typography style={{fontFamily:'IBM Plex Sans KR', fontWeight: 'bold',}} >{this.state.employeeNumber}</Typography>
            </TableCell>
                <TableCell align='center'>
                    <Typography style={{fontFamily:'IBM Plex Sans KR', fontWeight: 'bold',}}>{this.state.isManager ? '근태 관리자' : '사원'}</Typography>
                </TableCell>

            <TableCell align='center'>
                <Typography style={{fontFamily:'IBM Plex Sans KR', fontWeight: 'bold',}}>{this.state.hireYear}</Typography>
            </TableCell>

                <TableCell align='center'>
                <Typography style={{fontFamily:'IBM Plex Sans KR', fontWeight: 'bold',}}>{this.state.name}</Typography>
                </TableCell>

        <TableCell align='center'>
                <Button variant="contained"  className = {classes.button}color="primary" onClick={this.callToggleModalShow}>
                    UPDATE
                </Button>
        </TableCell>


                <TableCell align='center'>
                <Button variant="contained" color="secondary" onClick={this.callDeleteDialog}style={{margin:5}}>
                    DELETE
                </Button></TableCell>



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
            </>
        );
    }
}

export default  withStyles(styles)(TableCellContainer);