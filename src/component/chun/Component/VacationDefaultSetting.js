import React, { Component } from "react";
import {
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import AddButtonComponent from "./Button/AddButtonComponent";
import BlackButtonComponent from "./Button/BlackButtonComponent";
import TextFieldComponent from "./TextFieldComponent";


const styles = (theme) => ({
    formTable: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "45%",
        borderTop:"2px solid black"
    },

    formCell: {
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        fontSize:'13px',
        fontFamily: 'Noto Sans KR, sans-serif',
        textAlign: 'center'

    },
    tableCellIndexText:{
        fontSize:'15px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight:'bold',
        border: "1px solid gray",
        backgroundColor:"#C2DCF0",
        textAlign: "right",
        paddingRight: '15px',
        width:"35%",
        whiteSpace: 'nowrap'
    }
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
        if (this.state.newSeniorCount===""||this.state.newFreshManCount===""){
            alert("모든 값을 입력하세요!");
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
        const newFreshManChange = e.target.value;
        if(!(/^[1-9]\d*$/).test(newFreshManChange)){
            alert("0이상 숫자만 입력가능합니다!");
            this.setState({...this.state,newFreshManCount:""});
            return;
        }
        this.setState({...this.state,newFreshManCount:newFreshManChange});

    }
    getNewSeniorChange = (e)=>{
        const newSeniorChange=e.target.value;
        if(!(/^[1-9]\d*$/).test(newSeniorChange)){
            alert("0이상 숫자만 입력가능합니다!");
            this.setState({...this.state,newSeniorCount:""});
            return;
        }
        this.setState({...this.state,newSeniorCount:newSeniorChange});
    }


render(){
    const { classes } = this.props;

    return(
        <div>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>근속 연수에 따른 연차 개수 설정</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        설정 완료 하였습니다!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BlackButtonComponent onButtonClick={this.handleClose} title={"닫기"}>
                        닫기
                    </BlackButtonComponent>
                </DialogActions>
            </Dialog>


            <Box>
                <Box
                    sx={{fontSize:'20px', fontFamily: 'Noto Sans KR, sans-serif', fontWeight:'bold', borderBottom:'solid 1px black',  margin: '20px 0 20px 0',
                        paddingBottom: '10px'
                    }} >
                    근속 연수에 따른 연차 개수 설정
                </Box>

                <Box>
                    <form onSubmit={this.submitForm}>
                        <table className={classes.formTable}>
                            <tbody>
                                <tr>
                                    <td className={classes.tableCellIndexText}>설정 적용 년도</td>
                                    <td className={classes.formCell}>
                                        {this.targetYear}
                                    </td>

                                </tr>

                                <tr>
                                    <td className={classes.tableCellIndexText}>올해의 1년 미만 연차 개수</td>
                                    <td className={classes.formCell}>
                                        {this.state.oldFreshManCount}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.tableCellIndexText}>변경된 1년 미만 연차 개수</td>
                                    <td className={classes.formCell}>
                                        <TextFieldComponent id="getNewFreshManData"value={this.state.newFreshManCount} label={"변경된 1년 미만연차 개수"}  onChange={this.getNewFreshManChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={classes.tableCellIndexText}>올해의 1년 이상 연차 개수</td>
                                    <td className={classes.formCell}>
                                        {this.state.oldSeniorCount}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.tableCellIndexText}>변경된 1년 이상 연차 개수</td>
                                    <td className={classes.formCell}>
                                        <TextFieldComponent id="getNewSeniorData"value={this.state.newSeniorCount} label={"변경된 1년 이상 연차 개수"}  onChange={this.getNewSeniorChange}/>

                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.formCell} colSpan={4} style={{ textAlign: "center" ,backgroundColor:"#F9F9F9",padding: "20px 0 20px 0"}}>
                                        <Box style={{display:'flex',justifyContent:'space-evenly'}}>
                                            <BlackButtonComponent title={"취소"}/>
                                            <AddButtonComponent type="submit" onButtonClick={this.submitForm} title={"설정"}/>
                                        </Box>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </Box>
            </Box>
        </div>
    )
}
}
export default withStyles(styles)(VacationDefaultSetting);