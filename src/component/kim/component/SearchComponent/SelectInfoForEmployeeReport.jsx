import React, {Component} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@material-ui/core";
import BlackButtonComponent from "../../../chun/Component/Button/BlackButtonComponent";
import {Typography, withStyles} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5),
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
    },
    gridContainer: {
        // border: '1px solid #000', // 이 줄을 제거하거나 주석 처리
        padding: theme.spacing(2), // 안쪽 여백은 유지
        // 기타 필요한 스타일
    },
    // 추가적인 스타일을 여기에 정의할 수 있습니다.
});

class SelectInfoForEmployeeReport extends Component {
    currentYear;
    check;

    constructor(props) {
        super(props);

        this.state = {
            inputYear: "", // Jan:false, Feb:false, Mar:false, Apr:false, May:false, Jun:false, Jul:false, Aug:false,Sep:false, Oct:false, Nov:false, Dec:false
            Months: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
                8: false,
                9: false,
                10: false,
                11: false,
                12: false
            }

        }
        this.isChecked = false;
        this.currentYear = new Date().getFullYear();
        this.clickMonthChange = this.clickMonthChange.bind(this);
        this.clickYearChange = this.clickYearChange.bind(this)
        this.allMonths = this.allMonths.bind(this);
        this.allClick = this.allClick.bind(this);
        this.makeReport = this.makeReport.bind(this);
        // this.getData = this.getData.bind(this)
    }

    clickMonthChange = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        this.setState((prevState) => ({
            Months: {...prevState.Months, [name]: checked}
        }));
    };

    clickYearChange = (e) => {
        this.setState({
            inputYear: String(e.target.value), Months: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
                8: false,
                9: false,
                10: false,
                11: false,
                12: false
            }
        }, () => {
            console.log(this.state);
        });
    }

    allMonths = () => {
        if (this.state.inputYear === "") return null;

        // let months = [{1:"Jan"}, {2:"Feb"}, {3:"Mar"}, {4:"Apr"}, {5:"May"}, {6:"Jun"}, {7:"Jul"}, {8:"Aug"}, {9:"Sep"}, {10:"Oct"}, {11:"Nov"}, {12:"Dec"}];.
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        if (this.state.inputYear === this.currentYear) {
            const nowMonths = new Date().getMonth(); //이번달
            months = months.slice(0, nowMonths + 1);
        }

        return months.map((month) => (<FormControlLabel
            key={month}
            control={<Checkbox checked={this.state.Months[month]} onChange={this.clickMonthChange}
                               name={String(month)}/>}
            label={`${month}월`}
        />));
    };

    allClick = () => {
        if (this.state.inputYear === "") {
            alert("년도를 반드시 선택하세요");
            return;
        }

        if (!this.isChecked) {
            this.setState({
                Months: {
                    1: true,
                    2: true,
                    3: true,
                    4: true,
                    5: true,
                    6: true,
                    7: true,
                    8: true,
                    9: true,
                    10: true,
                    11: true,
                    12: true
                }
            }, () => {

            });

        } else {
            this.setState({
                Months: {
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                    6: false,
                    7: false,
                    8: false,
                    9: false,
                    10: false,
                    11: false,
                    12: false
                }
            }, () => {

            });

        }

        this.isChecked = !this.isChecked;
    }


    makeReport = () => {
        const { inputYear, Months } = this.state;
        const selectedMonths = Object.keys(Months).filter(month => Months[month]);

        if (selectedMonths.length === 0) {
            alert("한 개 이상의 월을 선택해야 합니다.");
            return;
        }

        this.props.onSelectionChange(inputYear, selectedMonths);
    };


    render() {
        return (<>

                <Grid container spacing={4} alignItems="center">
                    <Grid >
                        <FormControl variant="outlined">
                            <InputLabel id="attendance-hour-label">년도</InputLabel>
                            <Select
                                style={{height: "50px", width: "150px"}}
                                labelId="attendance-hour-label"
                                id="attendaceHour"
                                onChange={this.clickYearChange}>
                                {[...Array(5)].map((_, index) => (
                                    <MenuItem key={this.currentYear - index} value={this.currentYear - index}>
                                        {`${this.currentYear - index}년`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <BlackButtonComponent title={"전체 선택"} onButtonClick={this.allClick} />
                    </Grid>
                    <Grid item>
                        <BlackButtonComponent title={"보고서 생성"} onButtonClick={this.makeReport} />
                    </Grid>
                </Grid>



                    {this.allMonths()}


        </>)
    }

}

export default withStyles(styles) (SelectInfoForEmployeeReport);