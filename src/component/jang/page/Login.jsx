import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {Snackbar} from "@material-ui/core";
import {Alert} from '@material-ui/lab';


function Copyright() {
    return (<Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                근태 관리 시스템
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>);
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding:'10% 0px 10% 0px' ,display: 'flex', flexDirection: 'column', alignItems: 'center'

    }, avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main,
    }, form: {
        width: '100%', // Fix IE 11 issue.
        margin:"60px 0px 0px 0px"

    }, submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const classes = useStyles();
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [password, setPassword] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const styles = {

        backgroundColor: 'steelblue',
        // backgroundImage: `url(${loginImg})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',

    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post('http://localhost:8080/login', {
                loginId: employeeNumber.trim(), password: password.trim(),
            }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

            if (response.status === 200) {
                const data = response.data;

                if (data.message == null || data.message === '') {
                    // 로그인이 성공하면 응답 데이터를 sessionStorage에 저장
                    console.log(`login data added in session storage ${JSON.stringify(data)}`)
                    sessionStorage.setItem('userData', JSON.stringify(data));

                    // 로그인 성공 후 페이지 이동
                    window.location.href = '/main';
                } else {
                    // 로그인 실패 시 메시지를 알림창으로 표시
                    setAlertMessage(data.message);
                    setOpenAlert(true);
                }
            } else if (response.status === 403) {
                // 서버 응답이 성공하지 않은 경우 처리
                setAlertMessage('ip 변경이 발생하여 로그인에 실패하였습니다.');
                setOpenAlert(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setAlertMessage('login에 실패하였습니다. 아이디와 비밀번호를 확인하세요');
            setOpenAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (

        <div style={styles}>
                <div style={{display:"flex",width:"1000px",height:"660px",justifyContent:'center',alignItems:'center',boxShadow: '0px 4px 8px gray'}}>
                    <Box component={"div"} style={{backgroundImage:'url(https://douzone-front-server-wonyong92.vercel.app/images/building.webp)', backgroundSize:'cover',width:"400px",height:"660px"}}/>

                    <Box component={"div"} style={{backgroundColor:"#F6FAFD",width:"600px",height:"660px",display:"flex",justifyContent:"center"}}>
                            <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon/>
                                    </Avatar>
                                    <Typography component="h1" variant="h4" style={{color:"midnightblue",fontFamily:'IBM Plex Sans KR',fontWeight:"bold"}}>
                                        Login
                                    </Typography>
                                <form className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="employeeNumberInput"
                                        label="사번"
                                        name="employeeNumber"
                                        autoFocus
                                        value={employeeNumber}
                                        onChange={(e) => setEmployeeNumber(e.target.value)}
                                        style={{margin:"0px 0px 30px 0px",border:"1px solid lightgray"}}
                                    />
                                    <TextField
                                        variant="outlined"
                                        style={{margin:"0px 0px 60px 0px",border:"1px solid lightgray"}}
                                        required
                                        fullWidth
                                        name="password"
                                        label="비밀번호"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {/* 알림창 */}
                                    <Snackbar anchorOrigin={{horizontal: 'center',vertical:'top'}} 
                                        open={openAlert}
                                        autoHideDuration={6000}
                                        onClose={handleCloseAlert}
                                    >
                                        <Alert onClose={handleCloseAlert} severity="error">
                                            {alertMessage}
                                        </Alert>
                                    </Snackbar>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleLogin}
                                        style={{height:"60px"}}
                                    >
                                        LogIn
                                    </Button>
                                </form>
                            </div>
                    </Box>
                </div>


                <Box mt={8}>
                    <Copyright/>
                </Box>
        </div>);
}

export default Login;