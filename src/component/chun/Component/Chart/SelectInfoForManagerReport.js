import React,{Component} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import BlackButtonComponent from "../Button/BlackButtonComponent";

class SelectInfoForManagerReport extends Component{
    constructor(props) {
        super(props);

        this.state={
            inputYear:"",
            // Jan:false, Feb:false, Mar:false, Apr:false, May:false, Jun:false, Jul:false, Aug:false,Sep:false, Oct:false, Nov:false, Dec:false
            Months:{
                1:false,
                2:false,
                3:false,
                4:false,
                5:false,
                6:false,
                7:false,
                8:false,
                9:false,
                10:false,
                11:false,
                12:false
            }

        }
        this.isChecked=false;
        this.currentYear = new Date().getFullYear();
        this.clickMonthChange=this.clickMonthChange.bind(this);
        this.clickYearChange=this.clickYearChange.bind(this)
        this.allMonths=this.allMonths.bind(this);
        this.allClick=this.allClick.bind(this);
        this.makeReport = this.makeReport.bind(this);

    }

    currentYear;
    check;

    clickMonthChange=(e)=>{
        const name=e.target.name;
        const checked=e.target.checked;
        this.setState((prevState)=>({
            Months:{...prevState.Months,[name]:checked}}));
        };


    // clickMonthChange=(e)=>{
    //     this.setState({[e.target.name]:e.target.checked},()=>{
    //         console.log(this.state);
    //     });
    //
    // }

    clickYearChange=(e)=>{
        this.setState({inputYear:String(e.target.value),Months:{1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false,9:false, 10:false, 11:false, 12:false}},()=>{
            console.log(this.state);
        });
    }

    allMonths = () => {
        if(this.state.inputYear==="")
            return null;

        // let months = [{1:"Jan"}, {2:"Feb"}, {3:"Mar"}, {4:"Apr"}, {5:"May"}, {6:"Jun"}, {7:"Jul"}, {8:"Aug"}, {9:"Sep"}, {10:"Oct"}, {11:"Nov"}, {12:"Dec"}];.
        let months = [1,2,3,4,5,6,7,8,9,10,11,12];
        if(this.state.inputYear===this.currentYear){
            const nowMonths =new Date().getMonth(); //이번달
            months =months.slice(0,nowMonths+1);
        }

        return months.map((month) => (
            <FormControlLabel
                key={month}
                control={<Checkbox checked={this.state.Months[month]} onChange={this.clickMonthChange} name={String(month)} />}
                label={`${month}월`}
            />
        ));

        // return months.map((month) => (
        //     <FormControlLabel
        //         key={month}
        //         control={<Checkbox checked={this.state[Object.values(month)[0]]} onChange={this.clickMonthChange} name={Object.values(month)[0]} />}
        //         label={`${index + 1}월`}
        //     />
        // ));
    };

    allClick=()=>{
        if(this.state.inputYear===""){
            alert("년도를 반드시 선택하세요");
            return;
        }

        if(!this.isChecked){
            this.setState({Months:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8:true,9:true, 10:true, 11:true, 12:true}},()=>{
                console.log(this.state);
            });

        }else{
            this.setState({Months:{1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false,9:false, 10:false, 11:false, 12:false}},()=>{
                console.log(this.state);
            });

        }

        // if(!this.isChecked){
        //     this.setState({Jan:true, Feb:true, Mar:true, Apr:true, May:true, Jun:true, Jul:true, Aug:true,Sep:true, Oct:true, Nov:true, Dec:true},()=>{
        //         console.log(this.state);
        //     });
        //
        // }
        // else{
        //     this.setState({Jan:false, Feb:false, Mar:false, Apr:false, May:false, Jun:false, Jul:false, Aug:false,Sep:false, Oct:false, Nov:false, Dec:false},()=>{
        //         console.log(this.state);
        //     });
        //
        // }
        this.isChecked=!this.isChecked;

    }

    makeReport = () => {
        const { getData,doReportGenerated } = this.props;
        const selectedMonths = [];
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        months.forEach((month) => {
            if (this.state.Months[month]) {
                selectedMonths.push(String(month));
            }
        });

        if (selectedMonths.length === 0) {
            return;
        }
        // doReportGenerated();

        getData(this.state.inputYear, selectedMonths);


    };


    // makeReport = () => {
    //     const {getData}=this.props;
    //     const selectedMonths = [];
    //     const months = [1,2,3,4,5,6,7,8,9,10,11,12];
    //
    //     months.map((element)=>{
    //         if(this.state.Months[element]){
    //             selectedMonths.push(String(element));
    //         }
    //     })
    //
    //     // for (const month of months) {
    //     //     if (this.state.Months[month]) {
    //     //         selectedMonths.push(month); //push를 이용해 배열에 month값을 집어넣음
    //     //     }
    //     // }
    //
    //     if (selectedMonths.length === 0) {
    //         return;
    //     } else {
    //         getData(this.state.inputYear,selectedMonths);
    //         this.setState({Months:{1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false,9:false, 10:false, 11:false, 12:false}},()=>{
    //             console.log(this.state);
    //         });
    //     }
    // }

    render(){
        return(
            <>
                <Box>

                    <FormControl variant="outlined">
                        <InputLabel id="attendance-hour-label">년도</InputLabel>
                        <Select
                            style={{height:"50px",width:"150px"}}
                            labelId="attendance-hour-label"
                            id="attendaceHour"
                            onChange={this.clickYearChange}>
                            {[...Array(5)].map((_,index)=>(
                                <MenuItem key={this.currentYear-index} value={this.currentYear-index}>
                                    {`${this.currentYear-index}년`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <BlackButtonComponent title={"전체 선택"} onButtonClick={this.allClick}></BlackButtonComponent>
                    <BlackButtonComponent title={"보고서 생성"} onButtonClick={this.makeReport}></BlackButtonComponent>
                </Box>
                <Box>
                    <FormGroup row>
                        {this.allMonths()}
                    </FormGroup>
                </Box>
            </>
        )
    }

}
export default SelectInfoForManagerReport;