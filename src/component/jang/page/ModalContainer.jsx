import React, {Component} from 'react';
import {stateStore} from "../../../index";
import AppealRequest from "../../chun/ModalPage/AppealRequest";
import Grid from "@material-ui/core/Grid";
import VacationDashBoard from "../../kim/ModalPage/VacationDashBoard";
import UpdateEmployee from "../../kim/ModalPage/UpdateEmployee";
import AttendanceApprovalAllEmployees from "../../chun/ModalPage/AttendanceApprovalAllEmployees";
import AttendanceApprovalEmployee from "../../chun/ModalPage/AttendanceApprovalEmployee";
import ProcessAppealRequest from "../../chun/ModalPage/ProcessAppealRequest";
import VacationDefaultSetting from "../../chun/ModalPage/VacationDefaultSetting";
import VacationProcess from "../../chun/ModalPage/VacationProcess";
import VacationRequest from "../../chun/ModalPage/VacationRequest";
import CreateEmployee from "../../kim/ModalPage/CreateEmployee";
import EmployeeDashboard from "../../kim/ModalPage/EmployeeDashboard";
import EmployeeMine from "../../kim/ModalPage/EmployeeMine";
import GetAttendanceHistory from "../../kim/ModalPage/GetAttendanceHistory";
import GetHistoryOfVacationDefaultSetting from "../../kim/ModalPage/GetHistoryOfVacationDefaultSetting";
import GetVacationHistory from "../../kim/ModalPage/GetVacationHistory";
import PostSetWorkTime from "../../kim/ModalPage/PostSetWorkTime";
import SetWorkTime from "../../kim/ModalPage/SetWorkTime";
import Box from "@material-ui/core/Box";
import {Dialog, DialogContent} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
// const {closeModal} = this.props

const styles = theme => ({
    customDialog: {
        minWidth: '1024px', // 최소 너비 설정
    },
});

class ModalContainer extends Component {
    // constructor() {
    //   super();
    //   console.log(`ModalContainer constructor`)
    //   this.state = {
    //     modalShow : false,
    //     innerContainerName : '',
    //   }
    //   function closeModal(innerContainerName,...args){
    //     this.setState({
    //       modalShow : !this.state.modalShow,
    //       innerContainerName : innerContainerName,
    //       args: args
    //     })
    //   }
    //
    //   stateStore.modalContainerStateSet = {state:this.state,setState:closeModal.bind(this)}
    //   this.toggleModal=closeModal.bind(this)
    //     this.handleInnerContainer = this.handleInnerContainer.bind(this)
    // }

    toggleModal;

    constructor() {
        super();
        this.state = {
            modalShow: false,
            innerContainerName: '',
            args: null,
            modalHeight: '70vh', // 초기 모달 높이 설정
        }

        this.toggleModal = this.closeModal.bind(this);
        stateStore.modalContainerStateSet = {state: this.state, setState: this.closeModal.bind(this)};
        this.handleInnerContainer = this.handleInnerContainer.bind(this);
    }

    componentDidMount() {
        // window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this.handleResize);
    }

    // handleResize = () => {
    //     // 창 크기가 변경될 때 모달 높이를 업데이트
    //     alert('resize')
    //
    //     this.setState({})
    // }
    //
    // updateModalHeight = (height) => {
    //     // 내부 컨텐츠의 높이를 확인하여 모달의 높이 업데이트
    //     const contentHeight = this.modalContentRef?.current?.clientHeight || 0;
    //     const windowHeight = window.innerHeight;
    //     const newModalHeight = Math.min(contentHeight + 40, windowHeight * 0.8); // 40은 padding 및 여백 등을 고려한 값
    //     alert('resize result' + newModalHeight)
    //     this.setState({modalHeight: `${newModalHeight}px`});
    // }

    closeModal(innerContainerName, ...args) {
        this.setState({
            modalShow: !this.state.modalShow,
            innerContainerName: innerContainerName,
            args: args,
        });
    }

    handleInnerContainer = (innerContainerName) => {
        switch (innerContainerName) {
            case 'AppealRequest':
                // 처리 로직
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <AppealRequest args={this.state.args}></AppealRequest>
                    </Grid>
                </>
                break;

            case 'AttendanceApprovalAllEmployees':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <AttendanceApprovalAllEmployees args={this.state.args}></AttendanceApprovalAllEmployees>
                    </Grid>
                </>
                break;

            case 'AttendanceApprovalEmployee':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <AttendanceApprovalEmployee args={this.state.args}></AttendanceApprovalEmployee>
                    </Grid>
                </>
                break;

            case 'ProcessAppealRequest':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <ProcessAppealRequest args={this.state.args}></ProcessAppealRequest>
                    </Grid>
                </>
                break;

            case 'VacationDefaultSetting':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <VacationDefaultSetting args={this.state.args}></VacationDefaultSetting>
                    </Grid>
                </>
                break;

            case 'VacationProcess':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <VacationProcess args={this.state.args}></VacationProcess>
                    </Grid>
                </>
                break;

            case 'VacationRequest':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <VacationRequest args={this.state.args}></VacationRequest>
                    </Grid>
                </>
                break;

            case 'CreateEmployee':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <CreateEmployee args={this.state.args}></CreateEmployee>
                    </Grid>
                </>
                break;

            case 'EmployeeDashboard':
                return <>
                    <Box>
                        <Grid container lg={12} justifyContent={'center'}>
                            <Grid item>
                                <EmployeeDashboard args={this.state.args.concat(this.handleResize)}></EmployeeDashboard>
                            </Grid>
                        </Grid>
                    </Box>
                </>
                break;

            case 'EmployeeMine':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <EmployeeMine args={this.state.args}></EmployeeMine>
                    </Grid>
                </>
                break;

            case 'GetAttendanceHistory':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <GetAttendanceHistory args={this.state.args}></GetAttendanceHistory>
                    </Grid>
                </>
                break;

            case 'GetHistoryOfVacationDefaultSetting':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <GetHistoryOfVacationDefaultSetting args={this.state.args}></GetHistoryOfVacationDefaultSetting>
                    </Grid>
                </>
                break;

            case 'GetVacationHistory':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <GetVacationHistory args={this.state.args}></GetVacationHistory>
                    </Grid>
                </>
                break;

            case 'PostSetWorkTime':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <PostSetWorkTime args={this.state.args}></PostSetWorkTime>
                    </Grid>
                </>
                break;

            case 'SetWorkTime':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <SetWorkTime args={this.state.args}></SetWorkTime>
                    </Grid>
                </>
                break;

            case 'UpdateEmployee':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <UpdateEmployee args={this.state.args}></UpdateEmployee>
                    </Grid>
                </>
                break;

            case 'VacationDashBoard':
                return <>
                    <Grid container lg={12} justifyContent={'center'}>
                        <VacationDashBoard args={this.state.args}></VacationDashBoard>
                    </Grid>
                </>
                break;

            default:
                console.log('지원하지 않는 Inner Container 이름입니다.');
        }
    }

    render() {
        let innerContainerName = this.state.innerContainerName
        let close = this.toggleModal
        const {classes} = this.props;
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000, // 모달이 상위에 나타나도록 함
            },
            content: {
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                zIndex: 1001,
                width: '70%',
                height: '70%'
            },
            close: {
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '20px',
                cursor: 'pointer',
            },
        };


        alert(`handleInnerContainer ${this.state.innerContainerName} ${this.handleInnerContainer(this.state.innerContainerName)}`)

        if (this.state.modalShow) {
            console.log(`modal Toggled. current status : ${this.state.modalShow}`)
            return (
                <Dialog open={true} maxWidth="false" fullWidth='true'>
                    <DialogContent>
                        <span style={modalStyle.close} className="close" onClick={close}>&times;</span>
                        {/*<p>This is {innerContainerName} the modal content.</p>*/}
                        {this.handleInnerContainer(this.state.innerContainerName)}
                    </DialogContent>
                </Dialog>
            );
        }
        return <></>
    }
}

export default withStyles(styles)(ModalContainer)

