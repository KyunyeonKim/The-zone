import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx'
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import CalendarContainer from "./CalendarContainer";
import DigitalClock from "./DigitalClock";
import {Card, CardMedia} from "@material-ui/core";
import TopBarUserInfo from "../component/header/TopBarUserInfo";
import Copyright from "./Copyright";
import NotificationListForEmployee from "../component/header/NotificationListForEmployee";
import LogoutButton from "../component/header/LogoutButton";
import LeftMenuBar from "./LeftMenuBar";
import ChartContainer from "./ChartContainer";
import NotificationListForManager from "../component/header/NotificationListForManager";
import AttendanceInfoButtonContainer from "./AttendanceInfoButtonContainer";
import EmployeeSettingTableContainer from "../page/EmployeeSettingTableContainer";
import ProcessAppealRequest from "./admin/AdminTablePartContainer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }, toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    }, toolbarIcon: {
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', ...theme.mixins.toolbar,
    }, appBar: {
        zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }),
    }, appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }, menuButton: {
        marginRight: 36,
    }, menuButtonHidden: {
        display: 'none',
    }, title: {
        flexGrow: 1,
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
    }, appBarSpacer: theme.mixins.toolbar, content: {
        flexGrow: 1, height: '100vh', overflow: 'auto',
    }, container: {
        paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4),
    }, paper: {
        padding: theme.spacing(2), display: 'flex', overflow: 'auto', flexDirection: 'column',
    }, fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (<div className={classes.root}>
        <CssBaseline/>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    근태 관리 시스템
                </Typography>

                <Grid container spacing={0} xs={2} md={2} lg={2}>
                    <Grid item xs={6} md={6} lg={6}>
                        <Grid>
                            <TopBarUserInfo employeeNumber={JSON.parse(sessionStorage.getItem('userData')).loginId}
                                            employeeName={JSON.parse(sessionStorage.getItem('userData')).employeeName}
                                            profilePicture={sessionStorage.getItem('userType') === 'admin' ? '../src/component/jang/images/logo.png' : 'http://localhost:8080/admin/download/' + JSON.parse(sessionStorage.getItem('userData')).loginId}
                                            toggleModalShowing={props.toggleModalShowing}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Grid item>
                            <LogoutButton onLogout={() => alert('logout success')}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={10}>
                        {sessionStorage.getItem('userType') !== 'admin' ? <Grid item xs={1} md={1} lg={1}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <IconButton color="inherit">
                                        <NotificationListForEmployee/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid> : <></>}
                        {sessionStorage.getItem('userType') === 'manager' ? <Grid item xs={1} md={1} lg={1}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <IconButton color="inherit">
                                        <NotificationListForManager/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid> : <></>}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <LeftMenuBar handleDrawerClose={handleDrawerClose} setOpen={setOpen} open={open}
                     toggleModalShowing={props.toggleModalShowing} userType={props.userType}/>
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            {/*contents container*/}
            <Container maxWidth="lg" className={classes.container} >
                {/* inernal container*/}
                <Grid container spacing={3} xs={12} md={12} lg={12} justifyContent="space-evenly"
                      alignItems="center">
                    {/* logo-clock-chart-requestList container*/}
                    <Grid item spacing={2} xs={6} md={6} lg={6}>
                        <Grid container spacing={3} xs={12} md={12} lg={12}>
                            {/*logo-clock limit grid */}
                            <Grid item xs={12} md={12} lg={12}>
                                {/*logo-clock container grid */}
                                <Grid container spacing={3} xs={12} md={12} lg={12}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Grid container spacing={3} xs={12} md={12} lg={12}>
                                            <Grid>
                                                <Card>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Sample Image"
                                                        height="100%"
                                                        image="../src/component/jang/images/logo.png" // 이미지 URL을 여기에 입력하세요
                                                    />
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/*clock*/}
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Grid container spacing={3} xs={12} md={12} lg={12}>
                                            <Paper>
                                                <Grid>
                                                    <DigitalClock style={{margin: '0px'}}/>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {sessionStorage.getItem('userType') !== 'admin' ? <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={3} xs={12} md={12} lg={12}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper>
                                            <ChartContainer/>
                                        </Paper>
                                    </Grid>

                                </Grid>
                            </Grid> : <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={3} xs={12} md={12} lg={12}>
                                    <Grid item xs={12} md={12} lg={12}>
                                    </Grid>

                                </Grid>
                            </Grid>}
                        </Grid>

                    </Grid>
                    {sessionStorage.getItem('userType') !== 'admin' ? <Grid item xs={6} md={6} lg={6}>
                        <Grid container direction="column" justifyContent="space-around" xs={12} md={12} lg={12}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={3} xs={12} md={12} lg={12}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper>
                                            <AttendanceInfoButtonContainer/>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* isManager container */}
                            <Grid item>
                                <Grid container spacing={3} xs={12} md={12} lg={12} direction="row"
                                      justifyContent="space-evenly"
                                      alignItems="baseline">
                                    <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
                                    </Grid>
                                    <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
                                        <Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> : <></>}
                    {/* attendanceButtonContainer container*/}
                    {sessionStorage.getItem('userType') !== 'admin' ?
                        <Grid item xs={12} md={12} lg={12} alignItems="center">
                            <Paper>
                                <CalendarContainer toggleModalShowing={props.toggleModalShowing}></CalendarContainer>
                            </Paper>
                        </Grid> :

                        <Grid item xs={12} md={12} lg={12} >
                                {/*<CalendarContainer toggleModalShowing={props.toggleModalShowing}></CalendarContainer>*/}
                                {/*<EmployeeSettingTableContainer  toggleModalShowing={props.toggleModalShowing}></EmployeeSettingTableContainer>*/}
                                <ProcessAppealRequest toggleModalShowing={props.toggleModalShowing}></ProcessAppealRequest>
                            </Grid>
                        }
                </Grid>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </Container>

        </main>
    </div>);
}
