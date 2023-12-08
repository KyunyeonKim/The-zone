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
import {Card, CardMedia, SvgIcon} from "@material-ui/core";
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
import AccessTimeIcon from '@material-ui/icons/AccessTime';




export default function Dashboard(props) {
    let drawerWidth = sessionStorage.getItem('userType') === 'manager' ? 240 : 0;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        }, toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
            background: '#5984CE',
            height:'75px'
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
            fontFamily:'Gowun Dodum, sans-serif',
            fontSize:'30px'
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
            flexGrow: 1, height: '100vh'
        }, container: {
            paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4),
        }, paper: {
            padding: theme.spacing(2), display: 'flex', overflow: 'auto', flexDirection: 'column',
        }, fixedHeight: {
            height: 240,
        },paperTitle:{
            fontFamily:'Gowun Dodum, sans-serif',
            fontSize:'25px',
            color:"white",
            paddingLeft:'15px',
            backgroundColor:'steelblue',
            marginBottom:'10px',
            borderTopLeftRadius:'10px',
            borderTopRightRadius:'10px'

        }
    }));
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
                <SvgIcon component={AccessTimeIcon} inheritViewBox style={{marginLeft:"10px",marginRight:"10px",fontSize:"xx-large"}}/>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    근태 관리 시스템
                </Typography>

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

                        <Grid item xs={1} md={1} lg={1}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <IconButton color="inherit">
                                        <LogoutButton onLogout={() => alert('logout success')}/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>



                </Grid>
            </Toolbar>
        </AppBar>
        <div style={{display : sessionStorage.getItem('userType')==='employee'?'none':'block'}}>
            <LeftMenuBar handleDrawerClose={handleDrawerClose} setOpen={setOpen} open={open}
                         toggleModalShowing={props.toggleModalShowing} userType={props.userType}/>
        </div>
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            {/*contents container*/}
            <Container maxWidth="lg" className={classes.container} >
                {/* inernal container*/}
                {sessionStorage.getItem('userType') !== 'admin' ?
                    <Grid container xs={12} md={12} lg={12}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper style={{height:"300px"}}>
                                {/*<ChartContainer/>*/}
                            </Paper>
                        </Grid>
                    </Grid>:<></>}

                <Grid container xs={12} md={12} lg={12} style={{flexDirection:'row', marginTop:'10px'}}>
                    {sessionStorage.getItem('userType') !== 'admin' ?
                        <Grid item xs={3} md={3} lg={3}>
                            <Grid container  spacing={2} xs={12} md={12} lg={12} style={{flexDirection:'column'}}>
                                <Grid item  xs={12} md={12} lg={12}>
                                    {/*<Paper style={{height:"300px"}}>*/}
                                    <Paper>
                                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.paperTitle}>
                                            출근 정보
                                        </Typography>

                                        <Grid container xs={12} me={12}  lg={12} justifyContent={"center"} style={{paddingTop:"10px"}}>

                                            <Box style={{ borderRadius: '50%', width: '150px', height: '150px',border:"1px solid #EFEFEF" }}>
                                                <DigitalClock/>
                                                {/*<Paper elevation={0} style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%'}}>*/}
                                                {/*    <DigitalClock/>*/}
                                                {/*</Paper>*/}
                                            </Box>
                                        </Grid>
                                        {sessionStorage.getItem('userType') !== 'admin' ?
                                            <AttendanceInfoButtonContainer/>: <></>}
                                    </Paper>
                                </Grid>
                                <Grid item   xs={12} md={12} lg={12}>
                                    {/*<Paper style={{height:"300px"}}>*/}
                                    <Paper style={{marginTop:"8px"}}>
                                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.paperTitle}>
                                            사용자 정보
                                        </Typography>

                                        <TopBarUserInfo employeeNumber={JSON.parse(sessionStorage.getItem('userData')).loginId}
                                                        employeeName={JSON.parse(sessionStorage.getItem('userData')).employeeName}
                                                        profilePicture={sessionStorage.getItem('userType') === 'admin' ? '../src/component/jang/images/logo.png' : 'http://localhost:8080/admin/download/' + JSON.parse(sessionStorage.getItem('userData')).loginId}
                                                        toggleModalShowing={props.toggleModalShowing}/>

                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>:<></>}
                    <Grid item xs={9} md={9} lg={9}>
                        <Grid container  spacing={2} xs={12} md={12} lg={12}>
                            {sessionStorage.getItem('userType') !== 'admin' ?
                                <Grid item xs={12} md={12} lg={12} >
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
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>

                </Grid>

            </Container>
            <Grid container  spacing={2} xs={12} md={12} lg={12}>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </Grid>
        </main>
    </div>);
}
