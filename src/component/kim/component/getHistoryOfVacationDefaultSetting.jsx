import React,{Component} from "react";
import {




} from "@material-ui/core" ;

import axios from "axios";

class GetHistoryOfVacationDefaultSetting extends Component{
    constructor(props) {
        super(props);
        this.state ={
            name : "",
            employeeId:"",
            freshman:"",
            senior:"",
            settingTime:"",
            targetDate:"",
        };
    }

    async GetHistoryOfVacationDidMount() {
        try
        {
            axios.defaults.withCredentials = true;
            let loginForm = new FormData();
            loginForm.append("loginId", "admin");
            loginForm.append("password", "admin");
            await axios.post("http://localhost:8080/login", loginForm);

            const pagenum = "1";
            const response = await axios.get(
                `http://localhost:8080/vacation/setting_history/vacation_default?page=${pagenum}}`
            )

            const historyOfVacation = response.data;

            this.setstate({
                name: historyOfVacation.name,
                employeeId: historyOfVacation.employeeId,
                freshman: historyOfVacation.freshman,
                senior: historyOfVacation.senior,
                settingTime: historyOfVacation.settingTime,
                targetDate: historyOfVacation.targetDate
            });
        } catch (error){
            console.error("데이터를 가져오지 못함" , error);
        }
    }

}