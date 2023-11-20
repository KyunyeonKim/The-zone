import React, { Component } from 'react';

class TopBarUserInfo extends Component {
    render() {
        const { employeeNumber, employeeName, profilePicture } = this.props;

        const topBarUserInfoStyle = {
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
        };

        const profilePictureStyle = {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            marginRight: '8px',
        };

        return (
            <div style={topBarUserInfoStyle}>
                <img src={profilePicture} alt="Profile" style={profilePictureStyle} />
                <div>
                    <p style={{ margin: 0, color:'blue', backgroundColor:'white'}}>{employeeNumber}</p>
                    <p style={{ margin: 0 }}>{employeeName}</p>
                </div>
            </div>
        );
    }
}

export default TopBarUserInfo;
