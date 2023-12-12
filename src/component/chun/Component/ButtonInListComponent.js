import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import BlackButtonComponent from "./Button/BlackButtonComponent";
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AttendanceApprovalEmployee from "../ModalPage/AttendanceApprovalEmployee";

class ButtonInListComponent extends Component {

    employeeId;

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            employeeId: this.props.row.employeeId,
        };
        this.employeeId = "";
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick = (e) => {
        /* TODO: 특정 사원의 근태 승인 내역 확인하는 모달 띄우도록 수정해야함 */
        this.setState({isDialogOpen: true});
    };


    handleCloseDialog = () => {
        this.setState({isDialogOpen: false});
    };

    render() {
        const {row, keyData, title, className} = this.props;

        return (<>
                <Dialog open={this.state.isDialogOpen} onClose={this.handleCloseDialog} maxWidth="false">
                    <DialogContent>
                        {/* Customize the content of the dialog as needed */}
                        <AttendanceApprovalEmployee employeeId={this.state.employeeId}></AttendanceApprovalEmployee>
                        {/* Add more details if needed */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
                <TableRow key={keyData}>
                    {Object.entries(row).map(([key, value]) => (
                        <TableCell key={key} className={className}>
                            {value}
                        </TableCell>
                    ))}

                    <TableCell style={{textAlign: "center",padding:'10px'}}>
                        <BlackButtonComponent onButtonClick={this.onButtonClick} title={title}/>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

export default ButtonInListComponent;
