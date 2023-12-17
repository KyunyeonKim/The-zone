import React from 'react';
import {Link} from 'react-router-dom';
import {Box} from "@material-ui/core";

const NotFoundPage = () => {
    const styles = {
        container: {
            backgroundImage:'url(../src/component/jang/component/images/2wave1.webp)',
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
            <h1 style={styles.heading}>404 Not Found</h1>
            <Box style={styles.message}>
                죄송합니다. 페이지를 찾을 수 없습니다.
            </Box>
            <Box style={styles.message}>
                존재하지 않는 주소를 입력하셨거나,
            </Box>
            <Box style={styles.message}>
                요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </Box>


            <Link to="/main" style={styles.button}>
                홈으로
            </Link>
        </div>
    );
};

export default NotFoundPage;

