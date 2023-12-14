import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx'
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import CalendarContainer from "./CalendarContainer";
import DigitalClock from "./DigitalClock";
import {SvgIcon} from "@material-ui/core";
import TopBarUserInfo from "../../component/header/TopBarUserInfo";
import Copyright from "./Copyright";
import NotificationListForEmployee from "../../component/header/NotificationListForEmployee";
import LogoutButton from "../../component/header/LogoutButton";
import LeftMenuBar from "./LeftMenuBar";
import ChartContainer from "./ChartContainer";
import NotificationListForManager from "../../component/header/NotificationListForManager";
import AttendanceInfoButtonContainer from "./AttendanceInfoButtonContainer";
import ProcessAppealRequest from "./admin/AdminTablePartContainer";
import AccessTimeIcon from '@material-ui/icons/AccessTime';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "@material-ui/core/Button";

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


export default function Dashboard(props) {
    let drawerWidth = sessionStorage.getItem('userType') === 'manager' ? 340 : 0;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        }, toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
            background: '#5984CE',
            height:'50px'
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
            flexGrow:"1",
            display:"flex",
            height:"100%",
            alignItems:"center",
            fontFamily:'IBM Plex Sans KR',
            fontSize:'25px',
            fontWeight:'bold'
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
            flexGrow: 1, height: '100%'
        }, container: {
            paddingTop: "15px", paddingBottom: theme.spacing(4),justifyContent:"center"
        }, paper: {
            padding: theme.spacing(2), display: 'flex', overflow: 'auto', flexDirection: 'column',
        }, fixedHeight: {
            height: 240,
        },
        paperTitle:{
            fontFamily:'IBM Plex Sans KR',
            fontSize:'20px',
            color:"white",
            paddingLeft:'15px',
            backgroundColor:'#5984CE',
            marginBottom:'10px',
            borderTopLeftRadius:'10px',
            borderTopRightRadius:'10px',
            paddingTop:'8px',
            paddingBottom:'8px',
            fontWeight:'bold'
        },infoBox:{
            borderTopLeftRadius:'10px',
            borderTopRightRadius:'10px',
            backgroundColor:'#5984CE',
        },
        info:{
            fontFamily:'IBM Plex Sans KR',
            fontSize:'20px',
            color:"white",
            paddingLeft:'15px',
            marginBottom:'10px',
            paddingTop:'8px',
            fontWeight:'bold'
        },
        slickSlider: {
            position: 'relative',
            marginTop: '10px',
            marginBottom: '-20px',
            width: '100%',
            height:'100px',
            padding:'0px 8px',
            '& .slick-list': { //.slickSlider 클래스에 속한 하위 요소를 지칭하기 위해 &. 사용
                position: 'absolute',
                width: '100%',
                height: '100px',
                overflow: 'hidden',
                borderRadius:"10px"
            },
            '& .slick-slider': {
                display: 'flex',
            },
            '& .slick-track': {
                display: 'flex',
                height: '100px',
            },
            '& .slick-arrow': {
                padding: '4px 6px',
                transform: 'translate(30px, 150px)',
                backgroundColor: 'transparent',
                color: 'white',
                borderRadius: '3px',
                cursor: 'pointer',
            },
            '& .slick-prev': {
                position: 'absolute',
                top: '-20px',
                right: '-800px',
                cursor: 'pointer',
                zIndex: 100,
            },
            '& .slick-next': {
                position: 'absolute',
                top: '-20px',
                left: '810px',
                cursor: 'pointer',
            },
            '& .slick-initialized':{
                height:"100px"
            },
            '& .slick-dots':{
                position:'absolute',
                bottom:'0px'
            }
        },
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, //화살표 (양옆 버튼) 구현할 것인지
        autoplay: true, //자동 재생 할 것인지
    };

    return (<div className={classes.root}>
        <CssBaseline/>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                {sessionStorage.getItem('userType') === 'manager' ?
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    : <></>}
                    <Box style={{display:"flex",height:"100%",alignItems:"center"}}>
                        <SvgIcon component={AccessTimeIcon} inheritViewBox style={{marginLeft:"10px",marginRight:"10px",fontSize:"25px"}}/>
                    </Box>

                    <Typography color="inherit" noWrap className={classes.title}>
                        근태 관리 시스템
                    </Typography>

                <Box style={{display:"flex",flexDirection:"row"}}>
                    <Box style={{height:"24px"}}>
                        {sessionStorage.getItem('userType') === 'admin' ?
                            <SupervisorAccountIcon style={{marginLeft:"10px",marginRight:"10px"}}/>
                            : <></>}
                    </Box>
                    <Box>
                        {sessionStorage.getItem('userType') === 'admin' ?
                            <Typography  noWrap style={{fontFamily:'IBM Plex Sans KR'}} >
                                Admin 계정 &nbsp;
                            </Typography>:<></>}
                    </Box>
                </Box>

                <Box style={{display:"flex",flexDirection:"row"}}>
                    <Box>
                        {sessionStorage.getItem('userType') !== 'admin' ? (
                            <IconButton color="inherit">
                                <NotificationListForEmployee />
                            </IconButton>
                        ) : null}
                    </Box>
                    <Box style={{marginLeft:"10px"}}>
                        {sessionStorage.getItem('userType') === 'manager' ? (
                            <IconButton color="inherit">
                                <NotificationListForManager />
                            </IconButton>
                        ) : null}
                    </Box>
                    <Box style={{marginLeft:"10px"}}>
                        <IconButton color="inherit">
                            <LogoutButton onLogout={() => alert('logout success')} />
                        </IconButton>
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>
        <div style={{display : sessionStorage.getItem('userType')==='manager'?'block':'none'}}>
            <LeftMenuBar handleDrawerClose={handleDrawerClose} setOpen={setOpen} open={open}
                         toggleModalShowing={props.toggleModalShowing} userType={props.userType}/>
        </div>
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            {/*contents container*/}
            <Grid container>
                   {/*style={{backgroundImage:'url(../src/component/jang/component/images/4wave1.png)',backgroundSize:'cover' }}>*/}
                <Grid item style={{ width: '1200px', margin: '0 auto'}}>
                    <Grid container  className={classes.container} >
                        {/* inernal container*/}
                        {sessionStorage.getItem('userType') !== 'admin' ?
                            <Grid container xs={12} md={12} lg={12}>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Paper style={{padding:'20px 10px 5px 20px',backgroundImage:'url(../src/component/jang/component/images/wave11.png)',backgroundSize:'cover'}}>
                                        <ChartContainer/>
                                    </Paper>

                                </Grid>
                            </Grid>:<></>}


                        <Grid container xs={12} md={12} lg={12} style={{flexDirection:'row', marginTop:'10px'}}>
                            {sessionStorage.getItem('userType') !== 'admin' ?
                                <Grid item xs={3} md={3} lg={3}>
                                    <Grid container  spacing={2} xs={12} md={12} lg={12} style={{flexDirection:'column'}}>
                                        {sessionStorage.getItem('userType') !== 'admin' ?
                                            // <Grid container xs={12} md={12} lg={12}>
                                            //     <Grid item xs={12} md={12} lg={12} style={{margin:"10px 0px 0px 0px",padding:"8px",display:"flex",justifyContent:"center"}}>
                                            //         <Button variant="contained" style={{backgroundColor:"#FFCA6E",width:'100%',height:'60px',fontFamily:'IBM Plex Sans KR',fontSize:'17px',borderRadius:'10px',fontWeight:'bold', marginRight:"10px"}} onClick={() => props.toggleModalShowing('EmployeeDashboard',JSON.parse(sessionStorage.getItem('userData')).loginId)}>
                                            //             버튼 1
                                            //         </Button>
                                            //     </Grid>
                                            // </Grid>
                                            <Box style={{margin:"8px 8px 0px 8px"}}>
                                                <Button variant="contained" style={{color:"white",backgroundColor:"#5984CE",width:'100%',height:'60px',fontFamily:'IBM Plex Sans KR',fontSize:'20px',borderRadius:'15px',fontWeight:'bold', marginRight:"10px"}} onClick={() => props.toggleModalShowing('EmployeeDashboard',JSON.parse(sessionStorage.getItem('userData')).loginId)}>
                                                    종합 정보 보기
                                                </Button>

                                            </Box>
                                            :<></>}
                                        <Grid item  xs={12} md={12} lg={12} >
                                            {/*<Paper style={{height:"300px"}}>*/}
                                            <Paper>
                                                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.paperTitle}>
                                                    출근 정보
                                                </Typography>

                                                <Grid container xs={12} me={12}  lg={12} justifyContent={"center"} >
                                                    <Box style={{ borderRadius: '50%', width: '150px', height: '150px',border:"1px solid #EFEFEF" }}>
                                                        <DigitalClock/>
                                                    </Box>
                                                </Grid>
                                                {sessionStorage.getItem('userType') !== 'admin' ?
                                                    <AttendanceInfoButtonContainer/>: <></>}
                                            </Paper>
                                        </Grid>
                                        {/*<Grid item   xs={12} md={12} lg={12}>*/}
                                        {/*    <Paper style={{marginTop:"8px"}}>*/}
                                        {/*        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.paperTitle}>*/}
                                        {/*            사용자 정보*/}
                                        {/*        </Typography>*/}
                                        {/*        <TopBarUserInfo employeeNumber={JSON.parse(sessionStorage.getItem('userData')).loginId}*/}
                                        {/*                        employeeName={JSON.parse(sessionStorage.getItem('userData')).employeeName}*/}
                                        {/*                        profilePicture={sessionStorage.getItem('userType') === 'admin' ? '../src/component/jang/images/logo.png' : 'http://localhost:8080/admin/download/' + JSON.parse(sessionStorage.getItem('userData')).loginId}*/}
                                        {/*                        toggleModalShowing={props.toggleModalShowing}/>*/}
                                        {/*    </Paper>*/}
                                        {/*</Grid>*/}

                                        <Grid item   xs={12} md={12} lg={12} style={{padding:"0px 8px 0px 8px"}}>
                                            <Paper>
                                                <Box className={classes.infoBox}>
                                                    <Grid container>
                                                        <Grid item xs={7} md={7} lg={7}>
                                                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.info} >
                                                                사용자 정보
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item xs={5} md={5} lg={5} style={{display:"flex",alignItems:"center"}}>
                                                            <Button variant="contained" onClick={() => props.toggleModalShowing('EmployeeMine')}  style={{color:"black",backgroundColor:"#FFCA6E",width:'100px',height:'30px',fontFamily:'IBM Plex Sans KR',fontSize:'15px',borderRadius:'20px',fontWeight:'bold'}}>
                                                                보기/수정
                                                            </Button>

                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <TopBarUserInfo employeeNumber={JSON.parse(sessionStorage.getItem('userData')).loginId}
                                                                employeeName={JSON.parse(sessionStorage.getItem('userData')).employeeName}
                                                                profilePicture={sessionStorage.getItem('userType') === 'admin' ? '../src/component/jang/images/logo.png' : 'http://localhost:8080/admin/download/' + JSON.parse(sessionStorage.getItem('userData')).loginId}
                                                                toggleModalShowing={props.toggleModalShowing}/>
                                            </Paper>
                                        </Grid>

                                        <Box component={'div'} className={classes.slickSlider}>
                                            <Slider  {...settings}>
                                                <Box component={'div'}>
                                                    <img src={"../src/component/jang/component/images/logo.png"} alt="logo" style={{width: '100%', height: '100px',}}/>
                                                </Box>
                                                <Box component={'div'}>
                                                    <img src={"../src/component/jang/component/images/Amaranth10.png"}alt="logo" style={{width: '100%', height: '100px',}}/>
                                                </Box>
                                                <Box component={'div'}>
                                                    <img src={"../src/component/jang/component/images/Amaranth101.png"} alt="logo" style={{width: '100%', height: '100px',  }}/>
                                                </Box>
                                            </Slider>
                                        </Box>

                                    </Grid>
                                </Grid>:<></>}
                            <Grid item xs={9} md={9} lg={9}>
                                <Grid container  xs={12} md={12} lg={12}>
                                    {sessionStorage.getItem('userType') !== 'admin' ?
                                        <Grid item xs={12} md={12} lg={12} >
                                            <Paper>
                                                <CalendarContainer toggleModalShowing={props.toggleModalShowing}></CalendarContainer>
                                            </Paper>
                                        </Grid> :<></>}
                                </Grid>
                            </Grid>
                            {sessionStorage.getItem('userType') === 'admin' ?
                                <Grid item xs={12} md={12} lg={12}>
                                    {/*<CalendarContainer toggleModalShowing={props.toggleModalShowing}></CalendarContainer>*/}
                                    {/*<EmployeeSettingTableContainer  toggleModalShowing={props.toggleModalShowing}></EmployeeSettingTableContainer>*/}
                                    <ProcessAppealRequest toggleModalShowing={props.toggleModalShowing}></ProcessAppealRequest>
                                </Grid>:<></>}
                            {/*</Grid>*/}

                        </Grid>
                        <Box pt={4} style={{justifyContent:"center"}}>
                            <Copyright/>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    </div>);
}
