import React, { Component } from 'react';
import ReportSelector from "../ReportSelector/ReportSelector";
import EmployeeReport from "./EmployeeReport";
import EmployeeBarChart from "../ReportChart/EmployeeBarChart";

class EmployeeDashboard extends Component {
    state = {
        selectedYear: new Date().getFullYear(),
        selectedMonths: [],
    };

    handleSelectionChange = (year, months) => {
        this.setState({ selectedYear: year, selectedMonths: months });
    };

    render() {
        const { selectedYear, selectedMonths } = this.state;

        return (
            <div>
                <ReportSelector onSelectionChange={this.handleSelectionChange} />
                {selectedMonths.length > 0 && (
                    <EmployeeReport year={selectedYear} months={selectedMonths} />
                )}
            </div>
        );
    }
}

export default EmployeeDashboard;
