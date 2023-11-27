import React, { Component } from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Input,
    InputLabel,
    Typography,
} from "@material-ui/core";
import axios from "axios";
import "../static/UpdateEmployee.css";
import PasswordChangeModal from "./PasswordChangeModal";



class EmployeeMine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: this.props.employeeId,
            passWord: "",
            name: "",
            attendanceManager: false,
            hireYear: "",
            isModalOpen: false,
            isPasswordModalOpen: false, // 비밀번호 변경 모달 상태
            formError: "",
            uploadFile:null,
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    // 비밀번호 변경 모달 열기
    openPasswordModal = () => {
        this.setState({ isPasswordModalOpen: true });
    };

    // 비밀번호 변경 모달 닫기
    closePasswordModal = () => {
        this.setState({ isPasswordModalOpen: false });
    };

    async componentDidMount() {
        try {
            axios.defaults.withCredentials = true;
            await axios.get("http://localhost:8080/logout");
            let loginForm = new FormData();
            loginForm.append("loginId", "123");
            loginForm.append("password", "12345");
            await axios.post("http://localhost:8080/login", loginForm);

            const response = await axios.get("http://localhost:8080/employee/information");
            const employeeData = response.data;
            const employeeId = response.data.employeeId;

            const hireYear = new Date(employeeData.hireYear);
            hireYear.setDate(hireYear.getDate() + 1);
            const formattedHireYear = hireYear.toISOString().split("T")[0];
            const imageResponse = await axios.get(
                `http://localhost:8080/admin/download/${employeeId}`,
                { responseType: "blob" }
            );
            const uploadFileUrl = URL.createObjectURL(imageResponse.data);


            this.setState({
                employeeId: employeeData.employeeId,
                passWord: employeeData.password,
                name: employeeData.name,
                attendanceManager: employeeData.attendanceManager,
                hireYear: formattedHireYear,
                uploadFile: uploadFileUrl,
            });
        } catch (error) {
            console.error("직원 데이터를 가져오지 못했습니다", error);
        }
    }


    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };


    render() {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            hireYear,
            isPasswordModalOpen,
            formError,
            uploadFile,
        } = this.state;

        return (
            <div className="flex items-center min-h-screen bg-gray-100">
                <div className="flex justify-center w-full">
                    <div className="flex w-1/2">
                        <div className="bg-white shadow-md rounded px-8 py-10 max-w-md w-96">
                            <Typography variant="h5" align="center">
                                사원 정보 페이지
                            </Typography>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="employeeId">사원번호</InputLabel>
                                        <Input
                                            id="employeeId"
                                            name="employeeId"
                                            value={employeeId}
                                            readOnly
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>



                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="name">사원이름</InputLabel>
                                        <Input
                                            id="name"
                                            type="name"
                                            name="name"
                                            value={name}
                                            onChange={this.onChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                            readOnly
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="hireYear">입사연도</InputLabel>
                                        <Input
                                            id="hireYear"
                                            name="hireYear"
                                            type="hireYear"
                                            value={hireYear}
                                            onChange={this.onChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                            readOnly
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={attendanceManager}
                                                    name="attendanceManager"
                                                />
                                            }
                                            label="근태담당자여부"
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                            {formError && (
                                <div style={{ color: "red", marginTop: "8px" }}>
                                    {formError}
                                </div>
                            )}
                            <Button
                                color="secondary"
                                style={{ marginTop: "16px" }}
                                onClick={this.openPasswordModal} // 비밀번호 변경 모달 열기
                            >
                                비밀번호 변경
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center min-h-screen bg-gray-150">
                    {uploadFile && (
                        <div className="image-preview">
                            <img src={uploadFile} alt="미리보기" />
                        </div>
                    )}
                </div>
                <PasswordChangeModal
                    isOpen={isPasswordModalOpen}
                    onClose={this.closePasswordModal}

                />
            </div>
        );
    }
}

export default EmployeeMine;
