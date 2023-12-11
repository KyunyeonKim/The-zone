import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        heading: {
            fontSize: '4em',
            marginBottom: '20px',
        },
        message: {
            fontSize: '1.5em',
            marginBottom: '20px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1em',
            textDecoration: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            borderRadius: '5px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 Not Found</h1>
            <p style={styles.message}>페이지를 찾을 수 없습니다.</p>
            <Link to="/main" style={styles.button}>
                메인 화면으로 이동
            </Link>
        </div>
    );
};

export default NotFoundPage;

