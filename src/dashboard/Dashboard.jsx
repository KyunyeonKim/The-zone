import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './LeftMenuBarContainer';
import CalendarContainer from "../jang/CalendarContainer";
import DigitalClock from "../jang/DigitalClock";
import {Card, CardMedia} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TopBarUserInfo from "../header/TopBarUserInfo";
import Copyright from "../jang/misc/Copyright";

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
                    Dashboard
                </Typography>

                <Grid container spacing={3} xs={2} md={2} lg={2}>
                    <Grid item xs={6} md={6} lg={6}>
                        <Grid>
                                <TopBarUserInfo employeeNumber={'12345'} employeeName={'john doe'} profilePicture={'../src/images/logo.png'}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Grid item>
                            logout button
                        </Grid>
                    </Grid>
                </Grid>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
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
            <Divider/>
            <List>{mainListItems}</List>
            <Divider/>
            <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            {/*contents container*/}
            <Container maxWidth="lg" className={classes.container}>
                {/* inernal container*/}
                <Grid container spacing={1} xs={12} md={12} lg={12}>
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
                                                        image='../src/images/logo.png' // 이미지 URL을 여기에 입력하세요
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
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={3} xs={12} md={12} lg={12}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Paper>
                                            <Grid>
                                                chart
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={6} md={6} lg={6}>
                                        <Paper>
                                            <Grid>
                                                request
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>


                    {/* attendanceButtonContainer-isManager container*/}
                    <Grid item xs={6} md={6} lg={6}>
                        <Grid container direction="column" justifyContent="space-around" xs={12} md={12} lg={12}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={3} xs={12} md={12} lg={12}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper>
                                            <Grid container spacing={3} xs={12} md={12} lg={12} direction="row"
                                                  justifyContent="space-evenly"
                                                  alignItems="baseline">
                                                <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
                                                    <Paper>
                                                        <Grid item>
                                                            <Button variant="contained" color="primary">
                                                                출근 입력
                                                            </Button>

                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
                                                    <Paper>
                                                        <Grid item>
                                                            <Button variant="contained" color="secondary">
                                                                퇴근 입력
                                                            </Button>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
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
                                            <Button variant="contained" color="primary">
                                                관리자 모드
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} alignItems="center">
                        <Paper>
                            <CalendarContainer toggleModalShowing={props.toggleModalShowing}></CalendarContainer>
                        </Paper>
                    </Grid>
                </Grid>

                <Box pt={4}>
                    <Copyright/>
                </Box>

            </Container>

        </main>
    </div>);
}
