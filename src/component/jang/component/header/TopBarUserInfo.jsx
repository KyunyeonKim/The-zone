import React, {Component} from 'react';
import {Box, Popover} from "@material-ui/core";
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

        }
    }
    handleProfileClickBind

    render() {
        const {employeeNumber, employeeName, profilePicture} = this.props;

        const topBarUserInfoStyle = {
            display: 'flex', flexDirection:'column', alignItems: 'center',
        };

        const profilePictureStyle = {
            width: '140px', height: '140px', borderRadius: '50%', marginTop: '10px', border:'0.5px solid #EFEFEF'
        };

        const {anchorEl, requests} = this.state;
        const isOpen = Boolean(anchorEl);

        return (
            <div style={topBarUserInfoStyle}>
                <img src={profilePicture} alt="Profile" style={profilePictureStyle}/>

                <Box component={"div"} style={{display:"flex", marginTop:'10px'}}>
                    <Box style={{padding:"6px 10px 10px 10px",color:"#3f51b5",fontFamily:'IBM Plex Sans KR', fontWeight:"bold",fontSize:'20px', borderRadius:'8px'}}>
                        사원 번호
                    </Box>
                    < p style={{padding:"6px 10px 10px 10px",margin: 0,fontFamily:'IBM Plex Sans KR',fontSize:'20px',fontWeight:"bold"}}> {employeeNumber}</p>
                </Box>
                <Box component={"div"} style={{display:"flex"}}>
                    <Box style={{padding:"0px 10px 10px 10px",color:"#3f51b5",fontFamily:'IBM Plex Sans KR', fontWeight:"bold",fontSize:'20px',borderRadius:'8px'}}>
                        이름
                    </Box>
                    <p  style={{padding:"0px 10px 10px 10px",margin: 0,fontFamily:'IBM Plex Sans KR',fontSize:'20px',fontWeight:"bold"}}>{employeeName} </p>
                </Box>
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
            </div>);
    }
}

export default TopBarUserInfo;
