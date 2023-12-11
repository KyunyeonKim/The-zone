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
import ListIcon from '@material-ui/icons/List';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BuildIcon from '@material-ui/icons/Build';
import PrintIcon from '@material-ui/icons/Print';
import {Grid} from "@material-ui/core";

const drawerWidth = 340;

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
        fontSize: '20px', color: 'white', background: '#5984CE', fontFamily: 'Noto Sans KR,sans-serif', fontWeight:"bold",width:"100%"
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
                    {/*<div className={classes.toolbarIcon}>*/}
                    {/*        <ListSubheader inset className={classes.subheader}>근태 담당자 메뉴</ListSubheader>*/}

                    {/*        <IconButton onClick={handleDrawerClose}>*/}
                    {/*            <ChevronLeftIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*</div>*/}

                    <div className={classes.toolbarIcon}>
                        <ListSubheader inset className={classes.subheader}>
                            <Grid container>
                                <Grid item xs={10}>
                                    근태 담당자 메뉴
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={handleDrawerClose}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </ListSubheader>
                    </div>

                    <List>
                            <ListItem button onClick={GetVacationHistoryHandler}>
                                <ListItemIcon>
                                    <ListIcon/>
                                </ListItemIcon>
                                <ListItemText primary="전사원 연차 사용 내역"/>
                            </ListItem>
                            <ListItem button onClick={AttendanceApprovalAllEmployeesHandler}>
                                <ListItemIcon>
                                    <ListIcon/>
                                </ListItemIcon>
                                <ListItemText primary="전사원 근태 이상 승인 내역"/>
                            </ListItem>
                            <ListItem button onClick={GetAttendanceHistoryHandler}>
                                <ListItemIcon>
                                    <ListIcon/>
                                </ListItemIcon>
                                <ListItemText primary="조정 요청 내역"/>
                            </ListItem>
                            <ListItem button onClick={GetHistoryOfVacationDefaultSettingHandler}>
                                <ListItemIcon>
                                    <ListIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근속년수 기준 연차 개수 조정 내역"/>
                            </ListItem>
                            <br/>
                            <Divider/>
                            <br/>
                            <ListItem button onClick={ProcessAppealRequestHandler}>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근태 이상 조정 요청 처리"/>
                            </ListItem>
                            <ListItem button onClick={VacationProcessHandler}>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText primary="연차 요청 처리"/>
                            </ListItem>
                            <br/>
                            <Divider/>
                            <br/>
                            <ListItem button onClick={VacationDefaultSettingHandler}>
                                <ListItemIcon>
                                    <BuildIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근속 년수에 따른 연차 개수 조정"/>
                            </ListItem>
                            <ListItem button onClick={PostSetWorkTimeHandler}>
                                <ListItemIcon>
                                    <BuildIcon/>
                                </ListItemIcon>
                                <ListItemText primary="근무 시간 조정"/>
                            </ListItem>
                            <br/>
                            <Divider/>
                            <br/>
                            <ListItem button onClick={EmployeeReportModalHandler}>
                                <ListItemIcon>
                                    <PrintIcon/>
                                </ListItemIcon>
                                <ListItemText primary="전사원에 대한 보고서 출력"/>
                            </ListItem>
                        <div style={{display: sessionStorage.getItem('userType') === 'admin' ? 'block' : 'none'}}>
                            <ListSubheader inset className={classes.subheader}>ADMIN 메뉴</ListSubheader>
                            <ListItem button onClick={CreateEmployeeHandler}>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="사원 정보 생성"/>
                            </ListItem>
                        </div>
                    </List>

                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(LeftMenuBar);

