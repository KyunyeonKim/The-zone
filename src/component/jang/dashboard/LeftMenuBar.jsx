import React, {Component} from 'react';
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import clsx from "clsx"
import {withStyles} from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListItemText from "@material-ui/core/ListItemText";

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
        fontSize: '1.2rem', color: 'white', background: '#3F51B5'
    }
});

class LeftMenuBar extends Component {


    render() {
        const {classes, open, handleDrawerClose, toggleModalShowing} = this.props;
        const firstMenuHandler = () => {
            toggleModalShowing('GetVacationHistory', 'ddd', 'fff')
        }
        const EmployeeReportModalHandler = () => {
            toggleModalShowing('EmployeeDashboard', this.props.toggleModalShowing)
        }
        const thirdMenuHandler = () => {
            toggleModalShowing('thirdMenuHandler', 'ddd', 'fff')
        }
        const fourthMenuHandler = () => {
            toggleModalShowing('fourthMenuHandler', 'ddd', 'fff')
        }
        const fifthMenuHandler = () => {
            toggleModalShowing('fifthMenuHandler', 'ddd', 'fff')
        }
        const sixthMenuHandler = () => {
            toggleModalShowing('sixthMenuHandler', 'ddd', 'fff')
        }
        return (<Drawer
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
                    <div style={{display : sessionStorage.getItem('userType')!=='admin'?'block':'none'}}>
                        <Divider/>
                        <ListSubheader inset className={classes.subheader}>사원 메뉴</ListSubheader>
                        <ListItem button onClick={firstMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="firstMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={EmployeeReportModalHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="개인용 근태 정보 보고서 모달"/>
                        </ListItem>
                        <ListItem button onClick={thirdMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="thirdMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={fourthMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="fourthMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={fifthMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="fifthMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={sixthMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="sixthMenuHandler"/>
                        </ListItem>
                    </div>
                </List>
                <Divider/>
                <List>
                    <div style={{display: sessionStorage.getItem('userType') === 'manager' ? 'block' : 'none'}}>
                        <ListSubheader inset className={classes.subheader}>관리자 메뉴</ListSubheader>
                        <ListItem button onClick={firstMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="firstMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={EmployeeReportModalHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="secondMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={thirdMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="thirdMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={fourthMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="fourthMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={fifthMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="fifthMenuHandler"/>
                        </ListItem>
                        <ListItem button onClick={sixthMenuHandler}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="sixthMenuHandler"/>
                        </ListItem>
                        <Divider/>
                    </div>
                    <div style={{display : sessionStorage.getItem('userType')==='admin'?'block':'none'}}>
                        <ListSubheader inset className={classes.subheader}>ADMIN 메뉴</ListSubheader>
                        <ListItem button onClick={firstMenuHandler} >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="firstMenuHandler" />
                        </ListItem>
                        <ListItem button onClick={EmployeeReportModalHandler} >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="secondMenuHandler" />
                        </ListItem>
                        <ListItem button onClick={thirdMenuHandler} >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="thirdMenuHandler" />
                        </ListItem>
                        <ListItem button onClick={fourthMenuHandler} >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="fourthMenuHandler" />
                        </ListItem>
                        <ListItem button onClick={fifthMenuHandler} >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="fifthMenuHandler" />
                        </ListItem>
                        <ListItem button onClick={sixthMenuHandler} >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="sixthMenuHandler" />
                        </ListItem>
                        <Divider/>
                    </div>
                </List>

            </Drawer>);
    }
}

export default withStyles(styles)(LeftMenuBar);
