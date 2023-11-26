import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonComponent from "./ButtonComponent";

class ButtonInListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: "",
        };
    }

    render() {
        const {row,keyData,classes,title} = this.props;

        const onButtonClick=async(e)=>{
            await this.setState({employeeId:row.employeeId});
            console.log("employeeId : ",row.employeeId);
            console.log("this.state : ",this.state);
            /* TODO :  여기서 특정 사원의 근태 승인 내역 확인하는 모달 띄우도록 수정해야함 */
        }


        return (

            <TableRow key={keyData}>
                {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key}>
                        {console.log('Key:', key, 'Value:', value)}
                        {value}
                    </TableCell>
                ))}

                 <TableCell>
                     <ButtonComponent  onButtonClick={onButtonClick} title={title} state={this.state} getData = {row}/>
                 </TableCell>
             </TableRow>

        );
    }
}
export default ButtonInListComponent;
