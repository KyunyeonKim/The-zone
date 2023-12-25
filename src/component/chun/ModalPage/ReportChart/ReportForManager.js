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
    charttitle: {
        backgroundColor: '#f0f0f0', textAlign: 'center', border: '2px solid black', fontSize: '35px', // 이 값을 변경하여 글씨 크기 조절
        lineHeight: '100px', // 이 값을 'height'와 동일하게 설정하여 글자를 수직 가운데 정렬
        // Material-UI의 theme.spacing을 사용하여 양 옆에 패딩 추가 (옵션)
        marginTop: '20px', padding: '0px'

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
                    전 사원에 대한 보고서 생성
                </Typography>
                <SelectInfoForManagerReport saveSelectYearAndMonth={this.saveSelectYearAndMonth}/>
                {this.state.reportGenerated && this.state.month.map((element) => (
                    <OneMonthOutPutForReport key={element} year={this.state.year} month={element} appendData={this.appendData} />
                ))}
                {this.state.reportGenerated && (
                    <>
                        <Typography variant="h4" className={classes.charttitle}>월별 전 사원 막대차트 현황</Typography>
                        <SelectAllMonthesOutPutForReport />
                    </>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeReport);
