import React, {Component} from 'react';
import {
    Popover
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class TopBarUserInfo extends Component {


    constructor(props, context) {
        super(props, context);
        this.handleProfileClick = this.handleProfileClick.bind(this);
    }

    state = {
        anchorEl: null
    };

    handleToggleList = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleCloseList = () => {
        this.setState({anchorEl: null});
    };

    handleDeleteRequest = (id) => {
        // 요청 삭제 로직 구현
        // 예: this.setState({ requests: updatedRequests });
    };

    handleProfileClick = () => {
        if(sessionStorage.getItem('userType')!=='admin'){
            let employeeNumber = `${JSON.stringify(this.props.employeeNumber)}`
            this.props.toggleModalShowing(`profile of ${employeeNumber}`)
            alert(`event handler requested ${employeeNumber}`)
        }
    }
    handleProfileClickBind

    render() {
        const {employeeNumber, employeeName, profilePicture} = this.props;

        const topBarUserInfoStyle = {
            display: 'flex', alignItems: 'center', marginRight: '20px',
        };

        const profilePictureStyle = {
            width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px',
        };

        const {anchorEl, requests} = this.state;
        const isOpen = Boolean(anchorEl);

        return (<div style={topBarUserInfoStyle}>
                <img onClick={this.handleProfileClick} src={profilePicture} alt="Profile" style={profilePictureStyle}/>
                <div>
                    < p onClick={this.handleProfileClick}
                       style={{margin: 0, color: 'blue', backgroundColor: 'white'}}> &nbsp;{`${employeeNumber}`}&nbsp; </p>
                    <p onClick={this.handleProfileClick} style={{margin: 0}}>{employeeName} </p>
                    <Popover
                        open={isOpen}
                        anchorEl={anchorEl}
                        onClose={this.handleCloseList}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                    >
                        <Paper elevation={3} style={{padding: '16px', width: '300px'}}>
                            <Typography variant="body2" color="primary"
                                        style={{textDecoration: 'underline', marginTop: '10px'}}>
                                더 많은 요청 보기
                            </Typography>
                        </Paper>
                    </Popover>
                </div>
            </div>);
    }
}

export default TopBarUserInfo;
