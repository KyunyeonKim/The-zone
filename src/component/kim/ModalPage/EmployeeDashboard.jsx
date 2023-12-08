import React, {Component} from 'react';
import ReportSelector from "../component/ReportChart/ReportSelector";
import EmployeeReport from "../component/ReportChart/EmployeeReport";
// const {closeModal} = this.props
class EmployeeDashboard extends Component {
    state = {
        selectedYear: new Date().getFullYear(),
        selectedMonths: [],
    };

    handleSelectionChange = (year, months) => {
        this.setState({selectedYear: year, selectedMonths: months});
    };

    render() {
        const {selectedYear, selectedMonths} = this.state;

        return (
            <div>
                <ReportSelector onSelectionChange={this.handleSelectionChange} handleResize={this.props.args[1]}/>
                {selectedMonths.length > 0 && (
                    <EmployeeReport year={selectedYear} months={selectedMonths} />
                )}
            </div>
        );
    }
}

export default EmployeeDashboard;
