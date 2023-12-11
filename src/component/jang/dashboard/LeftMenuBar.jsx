import React, {Component} from 'react';
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import clsx from "clsx"
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = (theme) => ({
    toolbarIcon: {
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', ...theme.mixins.toolbar,
    }, drawerPaper: {
        position: 'relative', whiteSpace: 'nowrap', width: drawerWidth, transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }, drawerPaperClose: {
        overflowX: 'hidden', transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }), width: theme.spacing(7), [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    }, subheader: {
        fontSize: '1.2rem', color: 'white', background: '#5984CE', fontFamily: 'Noto Sans KR,sans-serif'
    }, forHeight: {
        display: 'flex', height: '100%'
    },

});

class LeftMenuBar extends Component {


    render() {
        const {classes, open, handleDrawerClose, toggleModalShowing} = this.props;

        const EmployeeReportModalHandler = () => {
            toggleModalShowing('EmployeeDashboard', this.props.toggleModalShowing)
        }
        const AttendanceApprovalAllEmployeesHandler = () => {
            toggleModalShowing('AttendanceApprovalAllEmployees', 'ddd', 'fff')
        }
        const AttendanceApprovalEmployeeHandler = () => {
            toggleModalShowing('AttendanceApprovalEmployee', 'ddd', 'fff')
        }
        const ProcessAppealRequestHandler = () => {
            toggleModalShowing('ProcessAppealRequest', 'ddd', 'fff')
        }
        const VacationDefaultSettingHandler = () => {
            toggleModalShowing('VacationDefaultSetting', this.props.toggleModalShowing)
        }
        const VacationProcessHandler = () => {
            toggleModalShowing('VacationProcess', this.props.toggleModalShowing, 'fff')
        }

        const GetVacationHistoryHandler = () => {
            toggleModalShowing('GetVacationHistory', this.props.toggleModalShowing, 'fff')
        }
        const GetAttendanceHistoryHandler = () => {
            toggleModalShowing('GetAttendanceHistory', this.props.toggleModalShowing, 'fff')
        }
        const GetHistoryOfVacationDefaultSettingHandler = () => {
            toggleModalShowing('GetHistoryOfVacationDefaultSetting', this.props.toggleModalShowing, 'fff')
        }
        const PostSetWorkTimeHandler = () => {
            toggleModalShowing('PostSetWorkTime', this.props.toggleModalShowing, 'fff')
        }
        const CreateEmployeeHandler = () => {
            toggleModalShowing('CreateEmployee', this.props.toggleModalShowing, 'fff')
        }

        return (
            <div className={classes.forHeight}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <List>
                        <div style={{display: sessionStorage.getItem('userType') === 'manager' ? 'block' : 'none'}}>
                            <ListSubheader inset className={classes.subheader}>관리자 메뉴</ListSubheader>
                            <ListItem button onClick={GetVacationHistoryHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="전사원 연차 사용 내역 검색"/>
                            </ListItem>
                            <ListItem button onClick={EmployeeReportModalHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="전사원에 대한 보고서 출력"/>
                            </ListItem>
                            <ListItem button onClick={AttendanceApprovalAllEmployeesHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="전사원 근태 이상 승인 내역 검색"/>
                            </ListItem>

                            <ListItem button onClick={ProcessAppealRequestHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근태 이상 조정 요청 처리"/>
                            </ListItem>
                            <ListItem button onClick={VacationDefaultSettingHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근속 년수에 따른 연차 개수 조정"/>
                            </ListItem>
                            <ListItem button onClick={VacationProcessHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="연차 요청 처리"/>
                            </ListItem>
                            <Divider/>
                        </div>

                        <div>
                            <ListItem button onClick={GetAttendanceHistoryHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="조정 요청 내역 조회"/>
                            </ListItem>

                            <ListItem button onClick={GetHistoryOfVacationDefaultSettingHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="연차 요청 처리"/>
                            </ListItem>
                            <ListItem button onClick={PostSetWorkTimeHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근무 시간 조정"/>
                            </ListItem>
                            <Divider/>
                        </div>
                        <div style={{display: sessionStorage.getItem('userType') === 'admin' ? 'block' : 'none'}}>
                            <ListSubheader inset className={classes.subheader}>ADMIN 메뉴</ListSubheader>
                            <ListItem button onClick={CreateEmployeeHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="사원 정보 생성"/>
                            </ListItem>
                            <Divider/>
                        </div>
                    </List>

                </Drawer>
            </div>
        )


    }
}
export default withStyles(styles)(LeftMenuBar);

