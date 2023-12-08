import React, {Component} from "react";
import {Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
// this.props.onSelectionChange(this.state.selectedYear, []);

// const {closeModal} = this.props

const styles = theme => ({
    container: {
        border: '2px solid blue',
        padding: '50px',
        borderRadius: '5px',
        marginBottom: '10px'
    },
    selectorContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px',
    },
    formControl: {
        marginRight: '20px',
    },
    monthsContainer: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', // 체크박스들 사이의 간격을 균등하게 분배
        rowGap: '-10px', // 체크박스들 사이의 상하 간격
    },
    checkboxLabel: {
        marginRight: '10px',
    },
    button: {
        width: '100px',
        height: '30%',
    }
});

class ReportSelector extends Component {
    state = {
        selectedYear: new Date().getFullYear(),
        selectedMonths: Array.from({length: 12}, () => false),
    };

    handleYearChange = (event) => {
        this.setState({
            selectedYear: event.target.value,
            selectedMonths: Array.from({length: 12}, () => false) // 월 선택 초기화
        }, () => {
            // 년도 변경 후 새로운 년도와 초기화된 월 선택 상태를 부모 컴포넌트에 전달
            this.props.onSelectionChange(this.state.selectedYear, []);
        });
    };

    handleMonthChange = (index) => {
        this.setState(prevState => ({
            selectedMonths: prevState.selectedMonths.map((checked, i) => i === index ? !checked : checked),
        }));
    };


    render() {
        const {classes} = this.props;
        const {selectedYear, selectedMonths} = this.state;
        const {onSelectionChange} = this.props;

        const selectedMonthIndices = selectedMonths
            .map((checked, index) => checked ? index + 1 : null)
            .filter(Boolean);

        return (
            <div className={classes.container}>
                <div className={classes.selectorContainer}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="year-selector-label">년도</InputLabel>
                        <Select
                            labelId="year-selector-label"
                            value={selectedYear}
                            onChange={this.handleYearChange}
                            label="년도"
                        >
                            {[...Array(5).keys()].map(offset => {
                                const year = new Date().getFullYear() - offset;
                                return <MenuItem key={year} value={year}>{year}년</MenuItem>;
                            })}
                        </Select>
                    </FormControl>

                    <div className={classes.monthsContainer}>
                        {selectedMonths.map((checked, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={() => this.handleMonthChange(index)}
                                    />
                                }
                                label={`${index + 1}월`}
                                className={classes.checkboxLabel}
                            />
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectionChange(selectedYear, selectedMonthIndices)}
                        className={classes.button}>
                        보고서 생성
                    </Button>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(ReportSelector);
