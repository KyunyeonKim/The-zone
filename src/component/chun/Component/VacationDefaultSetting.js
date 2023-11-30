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
        this.targetYear=""


        this.login=this.login.bind(this);
        this.oldVacationCountAndYearSetting=this.oldVacationCountAndYearSetting.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.buttonClick=this.buttonClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.getNewFreshManChange=this.getNewFreshManChange.bind(this);
        this.getNewSeniorChange=this.getNewSeniorChange.bind(this);
    }
    targetYear


    componentDidMount() {
        this.login();
        console.log("로그인함");

        // 데이터를 가져오는 것은 componentDidMount에서 수행
        this.oldVacationCountAndYearSetting();

    }

    login=async()=> {
        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "200001012");
        loginForm.append("password", "test");
        try {
            const login = await axios.post("http://localhost:8080/login", loginForm);
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
            this.targetYear = new Date().getFullYear()+1;
            console.log("이전 oldFreshManCount : ",oldFreshManCount);
            await this.setState({...this.state,oldFreshManCount:oldFreshManCount.data,oldSeniorCount:oldSeniorCount.data});
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
        formData.append("targetDate", this.targetYear+"-01-01");

        console.log("Form data:", this.state.newFreshManCount,this.state.newSeniorCount,this.targetYear+"-01-01");
        //서버 요청 보낼 것

        try{
            const response = await axios.post("http://localhost:8080/manager/setting/vacation_default",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("response : ",response);

            const oldFreshManCount = await axios.get("http://localhost:8080/manager/vacation/defaultSetting/latestInfo",
                {
                params: {
                    info: "freshman"
                }
            });

            console.log("oldFreshManCount입니다 : ",oldFreshManCount);

            const oldSeniorCount = await axios.get("http://localhost:8080/manager/vacation/defaultSetting/latestInfo",{
                params: {
                    info: "senior"
                }
            });

            // this.newFreshManCount=""
            // this.newSeniorCount=""
            // document.getElementById("getNewFreshManData").value="";
            // document.getElementById("getNewSeniorData").value="";

            this.buttonClick();
            // console.log("oldFreshManCount : ",oldFreshManCount);
            // console.log("oldSeniorCount : ",oldSeniorCount);
            this.setState({...this.state,oldFreshManCount:oldFreshManCount.data,oldSeniorCount:oldSeniorCount.data,newFreshManCount:"",newSeniorCount:""});
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
        this.setState({...this.state,open:true});
    }

    handleClose = ()=>{
        this.setState({...this.state,open:false});
    }

    getNewFreshManChange = (e)=>{
        this.setState({...this.state,newFreshManCount:e.target.value});
    }
    getNewSeniorChange = (e)=>{
        this.setState({...this.state,newSeniorCount:e.target.value});
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
                            {this.targetYear}
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
                                id={"getNewFreshManData"}
                                className={classes.textField}
                                value={this.state.newFreshManCount}
                                label="변경된 1년 미만연차 개수"
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
                                id={"getNewSeniorData"}
                                className={classes.textField}
                                value={this.state.newSeniorCount}
                                label="변경된 1년 이상 연차 개수"
                                onChange={this.getNewSeniorChange}
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