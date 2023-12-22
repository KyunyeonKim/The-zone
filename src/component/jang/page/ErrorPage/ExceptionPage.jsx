import React from 'react';
import {Link} from 'react-router-dom';
import {Box} from "@material-ui/core";

const ExceptionPage = () => {
    const styles = {
        container: {
            backgroundImage:'url(https://douzone-front-server-wonyong92.vercel.app/images/2wave1.webp)',
            backgroundSize:'cover',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        heading: {
            fontSize: '60px',
            marginBottom: '20px',
            fontFamily:'IBM Plex Sans KR',
        },
        message: {
            fontSize: '20px',
            marginBottom: '20px',
            fontFamily:'IBM Plex Sans KR',
        },
        button: {
            marginTop:"50px",
            fontSize: '20px',
            textDecoration: 'underline',
            borderBottom:'1px solid black',
            border:'0px',
            color:"black",
            fontFamily:'IBM Plex Sans KR',
            fontWeight:'bold'
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>에러 발생</h1>
            <Box style={styles.message}>
                현재 서버가 불안정합니다.
            </Box>
            <Box style={styles.message}>
                새로고침, 쿠키 삭제 후 다시 요청을 수행해주세요.
            </Box>


            <Link to="/main" style={styles.button}>
                홈으로
            </Link>
        </div>
    );
};

export default ExceptionPage;

