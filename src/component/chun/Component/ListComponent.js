import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class ListComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*고유적으로 식별할 수 있는 keyData의 데이터를 받아옴*/
        const {row,keyData,className} = this.props;
        return (
            <TableRow key={keyData}>
                {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key} className={className}>
                        {value}
                    </TableCell>
                ))}
            </TableRow>

        );
    }
}
export default ListComponent;
