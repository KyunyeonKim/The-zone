import React, {Component} from "react";
import {Button, Checkbox, FormControlLabel, Grid, Input, InputLabel, Typography,} from "@material-ui/core";
import axios from "axios";
import "../static/CreateEmployee.css";
import UpdateModalComponent from "../component/UpdateModalComponent";

// const {closeModal} = this.props

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: "",
            passWord: "",
            name: "",
            attendanceManager: false,
            uploadFile: null,
            hireYear: "",
            isModalOpen: false,
            formError: "",
        };
    }

    openModal = () => {
        this.setState({isModalOpen: true});
    };

    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    async componentDidMount() {
        try {
            axios.defaults.withCredentials = true;
            let loginForm = new FormData();
            loginForm.append("loginId", "admin");
            loginForm.append("password", "admin");
            await axios.post("http://localhost:8080/login", loginForm);

            //더미데이터
            const employeeId = "123";
            const response = await axios.get(
                `http://localhost:8080/admin/employee/information/${employeeId}`
            );

            const image = await axios.get(
                `http://localhost:8080/admin/download/${employeeId}`,
                {responseType: "arraybuffer"}
            );

            const employeeData = response.data;
            const imageData = new Uint8Array(image.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
            );

            const employeeImagedata = btoa(imageData);
            const hireYear = new Date(employeeData.hireYear);
            hireYear.setDate(hireYear.getDate() + 1);
            const formattedHireYear = hireYear.toISOString().split("T")[0];

            this.setState({
                employeeId: employeeData.employeeId,
                passWord: employeeData.password,
                name: employeeData.name,
                attendanceManager: employeeData.attendanceManager,
                hireYear: formattedHireYear,
                uploadFile: `data:${image.headers["content-type"]};base64,${employeeImagedata}`,
            });
        } catch (error) {
            console.error("직원 데이터를 가져오지 못했습니다", error);
        }
    }

    updateChanges = async () => {
        const {
            employeeId,
            passWord,
            name,
            attendanceManager,
            uploadFile,
            hireYear,
        } = this.state;

        try {

            this.setState({formError: ""});
            axios.defaults.withCredentials = true;

            // 파일 형식 체크
            if (uploadFile && uploadFile instanceof File) {
                const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
                const fileType = uploadFile.type;

                if (!allowedFormats.includes(fileType)) {
                    this.setState({
                        formError: '올바른 이미지 형식이 아닙니다. (jpeg, png, gif 중 하나를 선택하세요.)',
                    });
                    return;
                }
            }

            if (this.state.formError) {
                this.setState({isModalOpen: false});
                return;
            }


            // 이름 유효성 검사: 문자열만 허용
            if (!/^\p{L}+$/u.test(name)) {
                this.setState({
                    formError: '올바른 이름 형식이 아닙니다. (숫자와 특수기호를 제외한 문자만 허용됩니다.)',
                });
                return;
            }

            const employeeUpdateUrl = `http://localhost:8080/admin/update/${employeeId}`;
            const updateForm = new FormData();
            updateForm.append("passWord", passWord);
            updateForm.append("name", name);
            updateForm.append("attendanceManager", attendanceManager);

            if (hireYear) {
                const yearMonthDayRegex = /^\d{4}-\d{2}-\d{2}$/;

                if (yearMonthDayRegex.test(hireYear)) {
                    const formattedHireYear = new Date(hireYear).toISOString().split("T")[0];
                    updateForm.append("hireYear", formattedHireYear);
                } else {
                    this.setState({
                        formError: "유효하지 않은 입사연도 형식입니다. (예: YYYY-MM-dd)",
                    });
                    return;
                }
            } else {
                this.setState({
                    formError: "입사연도를 입력해주세요.",
                });
                return;
            }

            // 모든 유효성 검사가 통과되면 오류 메시지 초기화
            this.setState({
                formError: "",
            });

            const response = await axios.post(employeeUpdateUrl, updateForm);
            console.log("업데이트 로그", response.data);

            // 이미지를 수정한 경우에만 파일 업로드 수행
            if (uploadFile && uploadFile instanceof File) {
                const uploadFileAdd = "http://localhost:8080/admin/upload";
                const uploadFileData = new FormData();
                uploadFileData.append("employeeId", employeeId);
                uploadFileData.append("uploadFile", uploadFile);

                const uploadResponse = await axios.post(
                    uploadFileAdd,
                    uploadFileData
                );
                console.log("파일 업로드 성공", uploadResponse.data);
            }

            // 모달 닫기
            this.closeModal();
        } catch (error) {
            console.error("업데이트 실패", error);
            this.setState({
                formError: "직원 생성에 실패하였습니다.",
                isModalOpen: false,
            });
        }
    };

    checkFileFormat = (file) => {
        const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedFormats.includes(file.type)) {
            this.setState({
                formError:
                    "올바른 이미지 형식이 아닙니다. (jpeg, png, gif 중 하나를 선택하세요.)",
            });
            return false;
        }
        return true;
    };

    setPreviewImg = (event) => {
        const file = event.target.files[0];

        if (file instanceof Blob) {
            var reader = new FileReader();

            reader.onload = () => {
                this.setState({
                    uploadFile: file,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
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
            hireYear,
            isModalOpen,
            formError,
        } = this.state;

        return (
            <div className="flex items-center min-h-screen bg-gray-100">
                <div className="flex justify-center w-full">
                    <div className="flex w-1/2">
                        <div className="bg-white shadow-md rounded px-8 py-10 max-w-md w-96">
                            <Typography variant="h5" align="center">
                                직원 수정 페이지
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
                            </form>
                            {formError && (
                                <div style={{color: "red", marginTop: "8px"}}>
                                    {formError}
                                </div>
                            )}
                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                style={{marginTop: "16px"}}
                                onClick={this.openModal} // 모달 열기
                            >
                                저장
                            </Button>
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
                                onChange={(event) => {
                                    this.setPreviewImg(event);
                                }}
                                className="file-input"
                            />
                        </div>
                    </div>
                </div>
                {/* "저장" 버튼 클릭 시 모달 열도록 변경 */}
                <UpdateModalComponent
                    isOpen={isModalOpen}
                    onClose={this.closeModal}
                    onConfirm={this.updateChanges}
                />
            </div>
        );
    }
}

export default UpdateEmployee;
