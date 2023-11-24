import React, { Component } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Select,
    MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


const styles = (theme) => ({
    root: {
        padding: theme.spacing(4),
        textAlign: "center",
        background: "#f0f0f0",
        minHeight: "100vh",
        fontSize: "1rem"
    },
    formTable: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "40%",
    },

    formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",

    },
    formCellLeft: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        width:"35%"

    },
    formControl: {
        width: "30%",
        marginRight:"5px",
        marginBottom: theme.spacing(2),
    },
    textField: {
        width: "60%",
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        height:"60px",
        width:"100px",
        fontSize: "1rem", // 원하는 크기로 조정
    },
});
class VacationDefaultSetting extends Component{
    constructor(props) {
        super(props);
        this.state = {
            targetYear:"",
            oldFreshManCount:"",
            newFreshManCount:"",
            oldSeniorCount:"",
            newSeniorCount:"",
            open:false

        };
    }

    getDay=(year, month)=>{
        const isLeapYear = (year%4===0&&year%100!==0)||(year%400 ===0);
        const days=[31,isLeapYear?29:28,31,30,31,30,31,31,30,31,30,31];
        return days[month-1];

    }

    async componentDidMount() {
        await this.login();
        console.log("로그인함");

        // 데이터를 가져오는 것은 componentDidMount에서 수행
        await this.oldVacationCountAndYearSetting();

    }

    async login() {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        try {
            const login = await axios.post("http://localhost:8080/login", loginForm);
            this.setState({ startDate:"2023-11-21" }); //startDate를 하드코딩
        } catch (error) {
            console.log("error 발생 !");
        }
    }

    oldVacationCountAndYearSetting= async ()=>{
        try{
            const oldFreshManCount = await axios.get("http://localhost:8080/manager/vacation/defaultSetting/latestInfo", {
                params: {
                    info: "freshman"
                }
            });
            const oldSeniorCount = await axios.get("http://localhost:8080/manager/vacation/defaultSetting/latestInfo",{
                params: {
                    info: "senior"
                }
            });
            const nextYear = new Date().getFullYear()+1;
            await this.setState({targetYear:nextYear,oldFreshManCount:oldFreshManCount.data,oldSeniorCount:oldSeniorCount.data});
        }catch (error) {
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
            }
            if (error.response.status === 500) {
                alert("500 Internal Server Error !");
            }
            if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
            }
        }
    };

    submitForm = async(e) => {

        if (!(/^[1-9]\d*$/).test(this.state.newFreshManCount) || !(/^[1-9]\d*$/).test(this.state.newSeniorCount)) {
            alert("입력된 개수를 다시 확인하세요!");
            return;
        }

        e.preventDefault();

        const formData = new FormData();
        formData.append("freshman", this.state.newFreshManCount);
        formData.append("senior", this.state.newSeniorCount);
        formData.append("targetDate", this.state.targetYear+"-01-01");

        console.log("Form data:", this.state.newFreshManCount,this.state.newSeniorCount,this.state.targetYear+"-01-01");
        //서버 요청 보낼 것

        try{
            const response = await axios.post("http://localhost:8080/manager/setting/vacation_default",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const oldFreshManCount = await axios.get("http://localhost:8080/manager/vacation/defaultSetting/latestInfo",
                {
                params: {
                    info: "freshman"
                }
            });
            const oldSeniorCount = await axios.get("http://localhost:8080/manager/vacation/defaultSetting/latestInfo",{
                params: {
                    info: "senior"
                }
            });
            this.buttonClick();
            this.setState({newFreshManCount:"",newSeniorCount:"",oldFreshManCount:oldFreshManCount.data,oldSeniorCount:oldSeniorCount.data});
        }catch (error){
            if (error.response.status === 400) {
                alert("400 Bad Request Error!");
                return;
            }
            if (error.response.status === 500) {
                alert("500 Internal Server Error !");
                return;
            }
            if (error.response.status === 403) {
                alert("403 Forbidden - Access denied !");
                return;
            }
        }

    };

    buttonClick = ()=>{
        this.setState({open:true});
    }

    handleClose = ()=>{
        this.setState({open:false});
    }

render(){
    const { classes } = this.props;

    return(
        <div className={classes.root}>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>근속 연수에 따른 연차 개수 설정</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        설정 완료 하였습니다!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>

            <Box component="section">
                <Typography variant="h3" style={{ margin: "50px", textAlign: "center" }}>
                    근속 연수 대한 연차 개수 설정
                </Typography>
            </Box>

            <form onSubmit={this.submitForm}>
                <table className={classes.formTable}>
                    <tbody>
                    <tr>
                        <td className={classes.formCell}>설정 적용 년도</td>
                        <td className={classes.formCell}>
                            {this.state.targetYear}
                        </td>

                    </tr>

                    <tr>
                        <td className={classes.formCellLeft}>올해의 1년 미만 연차 개수</td>
                        <td className={classes.formCell}>
                            {this.state.oldFreshManCount}
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.formCellLeft}>변경된 1년 미만 연차 개수</td>
                        <td className={classes.formCell}>
                            <TextField
                                className={classes.textField}
                                label="변경된 1년 미만연차 개수"
                                value={this.state.newFreshManCount}
                                onChange={(e) => {
                                    this.setState({newFreshManCount: e.target.value});
                                }}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={classes.formCellLeft}>올해의 1년 이상 연차 개수</td>
                        <td className={classes.formCell}>
                            {this.state.oldSeniorCount}
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.formCellLeft}>변경된 1년 이상 연차 개수</td>
                        <td className={classes.formCell}>
                            <TextField
                                className={classes.textField}
                                label="변경된 1년 이상 연차 개수"
                                value={this.state.newSeniorCount}
                                onChange={(e) => {
                                    this.setState({newSeniorCount: e.target.value});
                                }}
                            />
                        </td>
                    </tr>

                        <td className={classes.formCell} colSpan={4} style={{ textAlign: "center" }}>
                            <div>
                                <Button
                                    type="submit"
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginRight: "50px" }}
                                >
                                    설정
                                </Button>

                                <Button
                                    type="button"
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                >
                                    취소
                                </Button>
                            </div>
                        </td>

                    </tbody>
                </table>
            </form>
        </div>
    )
}
}
export default withStyles(styles)(VacationDefaultSetting);