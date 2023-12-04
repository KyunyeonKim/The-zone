import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {Snackbar} from "@material-ui/core";
import { Alert } from '@material-ui/lab';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          근태 관리 시스템
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:8080/login', {
        loginId: employeeNumber.trim(),
        password: password.trim(),
      },{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});

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
      } else if(response.status === 403){
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="employeeNumberInput"
              label="사번"
              name="employeeNumber"
              autoFocus
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
          />
          <TextField
              variant="outlined"
              margin="normal"
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
          <Snackbar
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
          >
            LogIn
          </Button>
        </form>


      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
