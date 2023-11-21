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
// import "../static/CreateEmployee.css";
import CreateModalComponent from "./CreateModalComponent";
// import CreateModalComponent from "./CreateModalComponent";

class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: "",
            passWord: "",
            name: "",
            attendanceManager: false,
            uploadFile: null,
            isModalOpen: false,
            formError: "",
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleCreateEmployee = async () => {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            uploadFile,
        } = this.state;

        axios.defaults.withCredentials = true;
        let loginForm = new FormData();
        loginForm.append("loginId", "admin");
        loginForm.append("password", "admin");
        await axios.post("http://localhost:8080/login", loginForm);

        if (!uploadFile) {
            this.setState({
                formError: "이미지 파일을 선택해주세요.",
                isModalOpen: false,
            });
            return;
        }
        if (/\d/.test(name)) {
            this.setState({
                formError: "이름에는 숫자를 입력할 수 없습니다.",
                isModalOpen: false,
            });
            return;
        }

        if (!/^\d+$/.test(employeeId)) {
            this.setState({
                formError: "사원ID는 숫자만 입력할 수 있습니다.",
                isModalOpen: false,
            });
            return;
        }

        try {
            const employeeAddUrl = "http://localhost:8080/admin/register";
            const createForm = new FormData();
            createForm.append("employeeId", employeeId);
            createForm.append("passWord", passWord);
            createForm.append("name", name);
            createForm.append("attendanceManager", attendanceManager);

            const response = await axios.post(employeeAddUrl, createForm);
            console.log("직원 생성 결과", response.data);

            if (uploadFile instanceof File) {
                const uploadFileUrl = "http://localhost:8080/admin/upload";
                const uploadFormData = new FormData();
                uploadFormData.append("employeeId", employeeId);
                uploadFormData.append("uploadFile", uploadFile);

                const uploadResponse = await axios.post(uploadFileUrl, uploadFormData);
                console.log("이미지 업로드 결과", uploadResponse.data);
            }

            this.closeModal();
        } catch (error) {
            console.error("중복된사원번호가 존재합니다", error);
            this.setState({
                formError: "중복된사원번호가 존재합니다.",
                isModalOpen: false,
            });
        }
    };

    checkFileFormat = (file) => {
        const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedFormats.includes(file.type)) {
            this.setState({
                formError: "올바른 이미지 형식이 아닙니다. (jpeg, png, gif 중 하나를 선택하세요.)",
            });
            return false;
        }
        return true;
    };

    setPreviewImg = (event) => {
        const file = event.target.files[0];
        if (file && this.checkFileFormat(file)) {
            var reader = new FileReader();
            reader.onload = () => {
                this.setState({ uploadFile: file });
            };
            reader.readAsDataURL(file);
        }
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onToggleChange = () => {
        this.setState((prevState) => ({
            attendanceManager: !prevState.attendanceManager,
        }));
    };

    render() {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            uploadFile,
            isModalOpen,
            formError,
        } = this.state;

        return (

            <>
                <style>{`
                    .items-center {
                        align-items: center;
                    }
                    .justify-center {
                        justify-content: center;
                    }
                    .min-h-screen {
                        min-height: 100vh;
                    }
                    .bg-gray-100 {
                        background-color: #f0f0f0;
                    }
                    .bg-white {
                        background-color: #fff;
                    }
                    .shadow-md {
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .rounded {
                        border-radius: 8px;
                    }
                    .px-8 {
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                    .py-10 {
                        padding-top: 2.5rem;
                        padding-bottom: 2.5rem;
                    }
                    .w-96 {
                        width: 24rem;
                    }
                    .py-2 {
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                    }
                    .px-4 {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    .rounded {
                        border-radius: 0.25rem;
                    }
                    .cursor-pointer {
                        cursor: pointer;
                    }
                    .file-upload-container {
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                    }
                    .file-upload-label {
                        display: block;
                        background-color: #3498db;
                        color: #fff;
                        font-weight: bold;
                        padding: 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-top: 16px;
                    }
                    .file-input {
                        display: none;
                    }
                    .placeholder-container {
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 250px;
                        border: 2px dashed #3498db;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 4px;
                        background-color: #fff;
                    }
                    .preview-container {
                        margin-top: 38px;
                        position: relative;
                    }
                    .preview-image {
                        width: 100%;
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;
                        border-radius: 6px;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    }
                `}</style>

            <div className="flex items-center min-h-screen bg-gray-100">
                <div className="flex justify-center w-full">
                    <div className="flex w-1/2">
                        <div className="bg-white shadow-md rounded px-8 py-10 max-w-md w-96">
                            <Typography variant="h5" align="center">
                                직원 생성 페이지
                            </Typography>
                            <form onSubmit={(e) => e.preventDefault()}>
                                {/* 입력 필드 */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="employeeId">사원번호</InputLabel>
                                        <Input
                                            id="employeeId"
                                            name="employeeId"
                                            value={employeeId}
                                            onChange={this.onChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="passWord">비밀번호</InputLabel>
                                        <Input
                                            id="passWord"
                                            name="passWord"
                                            type="password"
                                            value={passWord}
                                            onChange={this.onChange}
                                            fullWidth
                                            required
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
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={attendanceManager}
                                                    onChange={this.onToggleChange}
                                                    name="attendanceManager"
                                                />
                                            }
                                            label="근태담당자여부"
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: "16px" }}
                                    onClick={this.openModal}
                                >
                                    생성
                                </Button>
                            </form>
                            {formError && (
                                <div style={{ color: "red", marginTop: "8px" }}>
                                    {formError}
                                </div>
                            )}
                        </div>

                        <div className="bg-white shadow-md rounded px-8 py-10 max-w-md w-96 file-upload-container">
                            <div className="preview-container">
                                <div className="placeholder-container">
                                    {!uploadFile && <p>파일을 선택해주세요</p>}
                                    {uploadFile && (
                                        <img
                                            src={
                                                uploadFile instanceof File
                                                    ? URL.createObjectURL(uploadFile)
                                                    : uploadFile
                                            }
                                            alt="미리보기"
                                            className="preview-image"
                                        />
                                    )}
                                </div>
                            </div>
                            <label
                                htmlFor="file"
                                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer file-upload-label"
                            >
                                파일 선택해주세요
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={this.setPreviewImg}
                                className="file-input"
                            />
                        </div>
                    </div>
                </div>
                <CreateModalComponent
                    isOpen={isModalOpen}
                    onClose={this.closeModal}
                    onConfirm={this.handleCreateEmployee}
                />
            </div>
            </>
        );
    }
}

export default CreateEmployee;
