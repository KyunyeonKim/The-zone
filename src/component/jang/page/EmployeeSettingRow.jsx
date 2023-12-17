import React, {Component} from 'react';

class EmployeeSettingRow extends Component {
    render() {
        return (
            <div>
                {this.props.employeeNumber}
            </div>
        );
    }
}

export default EmployeeSettingRow;