import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";
import BlackButtonComponent from "./BlackButtonComponent";

class ButtonInListComponent extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     employeeId: "",
        // };
        this.employeeId="";
        this.onButtonClick=this.onButtonClick.bind(this);
    }

    employeeId;

    onButtonClick = (e) => {
        /* TODO: 특정 사원의 근태 승인 내역 확인하는 모달 띄우도록 수정해야함 */
        this.employeeId=e.target.value;
    };

    render() {
        const {row,keyData,title} = this.props;

        return (

            <TableRow key={keyData}>
                {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key}>
                        {value}
                    </TableCell>
                ))}

                 <TableCell>
                     <BlackButtonComponent  onButtonClick={this.onButtonClick} title={title}/>
                 </TableCell>
             </TableRow>

        );
    }
}
export default ButtonInListComponent;
