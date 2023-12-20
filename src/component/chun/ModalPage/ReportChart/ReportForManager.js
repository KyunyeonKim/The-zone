import React, {Component} from 'react';
import {Typography, withStyles} from '@material-ui/core';
import OneMonthOutPutForReport from "./InnerChart/OneMonthOutPutForReport";
import SelectAllMonthesOutPutForReport from "./InnerChart/SelectAllMonthesOutPutForReport";
import SelectInfoForManagerReport from "./SelectInfoForManagerReport";
// 스타일 정의
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width:"1000px"
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        fontSize:'50px'
    },
    reportTitle: {
        marginTop: '50px', // 이 값을 조정하여 제목의 위치를 변경
        lineHeight: '100px',
        fontFamily: 'IBM Plex Sans KR, sans-serif',
    },
    // 추가적인 스타일을 여기에 정의할 수 있습니다.
});

class EmployeeReport extends Component {
    constructor(props) {
        super(props);

        this.state={
            year:"",
            month:[],
            reportGenerated: false
        }

        // this.allData={
        //             '1':[], '2':[], '3':[],
        //             '4':[], '5':[], '6':[],
        //             '7':[], '8':[], '9':[],
        //             '10':[], '11':[], '12':[]
        // }
        this.appendData=this.appendData.bind(this);
        this.saveSelectYearAndMonth=this.saveSelectYearAndMonth.bind(this);
        // this.doReportGenerated=this.doReportGenerated.bind(this);
        // summaryChartSetStateStore.setState = this.appendData
    }


    appendData = (data, month) => {
        this.setState(prevState => ({
            allData: {
                ...prevState.allData,
                [month]: data
            }
        }));
    };

    saveSelectYearAndMonth = (year, month)=>{

        this.setState({year:year,month:month,reportGenerated:true});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.title}>
                    전 사원에 대한 통계 보고서
                </Typography>
                <SelectInfoForManagerReport saveSelectYearAndMonth = {this.saveSelectYearAndMonth}/>
                {this.state.reportGenerated && this.state.month.map((element) => (
                    <OneMonthOutPutForReport key={element} year={this.state.year} month={element} appendData={this.appendData} />
                ))}
                {this.state.reportGenerated&& <SelectAllMonthesOutPutForReport />}
            </div>
        );
    }

}

export default withStyles(styles)(EmployeeReport);
