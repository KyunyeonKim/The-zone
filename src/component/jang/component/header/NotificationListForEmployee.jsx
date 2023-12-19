import React, {Component} from 'react';
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Popover,
    Typography
} from '@material-ui/core';
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';

class NotificationListForEmployee extends Component {
    employeeNumber
    userType
    requests = [{id: 1, content: 'dummy'}]
    eventSource
    anchorEl
    messageEventHandler

    constructor(props, context) {
        super(props, context);
        console.log('constructor Notification')
        this.userType = sessionStorage.getItem('userType')
        this.employeeNumber = JSON.parse(sessionStorage.getItem('userData')).loginId

        this.state = {
            anchorEl: null, requests: [{id: 1, content: 'dummy'}], totalCount: 0, page: 1,dialogOpen: false
        };
        this.eventSource = new EventSource(`http://localhost:8080/register?employeeNumber=${this.employeeNumber}&userType=${this.userType}`);

        this.messageEventHandler = async function (event) {
            let requests = await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`)
            let id = this.state.requests.length + 1
            let getTotalCount = requests.data.totalElement
            let hasNext = requests.data.hasNext
            alert('message get!');
            this.setState({
                anchorEl: this.state.anchorEl, requests: this.state.requests.concat({
                    id: event.id, content: event.data, unread: event.data.readTime == null
                }), totalCount: getTotalCount, hasNext: hasNext,
                snackbarOpen:true, snackbarMessage : "요청이 처리되었습니다!"

            })
        }.bind(this);

        this.eventSource.onmessage = this.messageEventHandler

        this.eventSource.onerror = this.onErrorHandler.bind(this,this.onErrorHandler.bind(this));
        this.registerAgain = this.registerAgain.bind(this);
        this.handleToggleList = this.handleToggleList.bind(this);
        this.showErrorDialog=this.showErrorDialog.bind(this);
        this.closeDialog=this.closeDialog.bind(this);
        // this.readMore=this.readMore.bind(this)
    }

    onErrorHandler = async function(callback) {
            this.eventSource.close()
            this.eventSource = new EventSource(`http://localhost:8080/register?employeeNumber=${this.employeeNumber}&userType=${this.userType}`) // 화살표 함수로 외부 this를 가져오면 경고가 없어진다
            this.eventSource.onerror=callback.bind(this,callback.bind(this))
            this.eventSource.onmessage = this.messageEventHandler
            let response = await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`)
            let unreadMsg = response.data.data// dto를 담은 배열
            let mappedUnreadMsg = unreadMsg.map((request) => (({
                id: request.messageId,
                content: request.message,
                unread: request.readTime === null
            })))//dto에서 필요한 message 데이터를 새로운 id를 부여하여 requests에 담기
            let getTotalCount = response.data.totalElement
            let hasNext = response.data.hasNext

            this.setState({
                anchorEl: null, requests: mappedUnreadMsg,//state에 담아서 유지
                totalCount: getTotalCount, hasNext: hasNext,
                snackbarOpen:true, snackbarMessage : "요청이 처리되었습니다!"
            });


    }

    async componentDidMount() {
        let requests = await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`)
        let unreadMsg = requests.data.data// dto를 담은 배열
        let mappedUnreadMsg = unreadMsg.map((request) => (({
                id: request.messageId,
                content: request.message,
                unread: request.readTime === null
            })))//dto에서 필요한 message 데이터를 새로운 id를 부여하여 requests에 담기
        let getTotalCount = requests.data.totalElement
        let hasNext = requests.data.hasNext
        this.setState({
            anchorEl: null, requests: mappedUnreadMsg,//state에 담아서 유지
            totalCount: getTotalCount, hasNext: hasNext
        });
    }

    registerAgain = function () {
        this.eventSource.close()
        this.eventSource = new EventSource(`http://localhost:8080/register?employeeNumber=${this.employeeNumber}&userType=${this.userType}`)
        this.eventSource.onerror = this.onErrorHandler.bind(this,this.onErrorHandler.bind(this));

        this.eventSource.onmessage = async function (event) {
            let response = (await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`))
            let id = this.state.requests.length + 1
            let getTotalCount = response.data.totalElement
            let hasNext = response.data.hasNext

            this.setState({
                anchorEl: this.state.anchorEl,
                requests: this.state.requests,
                totalCount: getTotalCount,
                hasNext: hasNext,
                snackbarOpen:true, snackbarMessage : "요청이 처리 되었습니다!"
            })
        } // 새로운 eventSource로 변경 발생하면 다시 onMessage에 대한 처리 등록 필요 -> 다른 코드 없을까?


    }.bind(this);


    handleToggleList = (handleEvent) => {
        console.log(`handleToggleList`)
        this.registerAgain()
        this.anchorEl = handleEvent.currentTarget
        this.setState({anchorEl: this.anchorEl, requests: this.state.requests, totalCount: this.state.totalCount});
    };

    handleCloseList = () => {
        console.log(`handleCloseList`)
        this.registerAgain()
        this.setState({anchorEl: null, requests: this.state.requests, totalCount: this.state.totalCount});
    };


    readMore = async function () {
        let response = (await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.hasNext ? this.state.page + 1 : this.state.page}`))

        let unreadMsg = response.data.data// dto를 담은 배열
        let mappedUnreadMsg = unreadMsg.map((request) => (({
                id: request.messageId,
                content: request.message,
                unread: request.readTime === null
            })))//dto에서 필요한 message 데이터를 새로운 id를 부여하여 requests에 담기
        mappedUnreadMsg = mappedUnreadMsg.filter((newPageMessage) => !this.state.requests.map((saved) => saved.id).includes(newPageMessage.id))

        if(mappedUnreadMsg.length===0){
            this.showErrorDialog();
        }

        let getTotalCount = response.data.totalElement
        let hasNext = response.data.hasNext
        if (mappedUnreadMsg.length > 0) {
            this.setState({
                anchorEl: this.state.anchorEl,
                requests: this.state.requests.concat(mappedUnreadMsg),
                totalCount: getTotalCount,
                hasNext: hasNext,
                page: this.state.hasNext ? this.state.page + 1 : this.state.page
            })
        }
    }.bind(this)

    changeToRead = async function (messageId) {
        try {
            let response = await axios.get(`http://localhost:8080/notification/employee/read/${messageId}`)
            if (response.status === 200) {
                let filteredMsg = this.state.requests.filter((entity)=> entity.id !== messageId)
                this.setState({requests:filteredMsg,totalCount:response.data.totalCount})
            } else {
            }
        } catch (error) {
            alert(`메세지 읽기 실패 `)
            this.registerAgain()
        }
    }.bind(this)

    showErrorDialog = () => {
        this.setState({
            dialogOpen: true,
        });
    };

    // 다이얼로그 닫기 함수
    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return; // 클릭이 아닌 다른 이유로 닫힐 때는 반응하지 않도록 함
        }
        this.setState({ snackbarOpen: false }); // 스낵바 상태를 닫힘으로 설정
    };

    render() {
        const {anchorEl, requests, totalCount} = this.state;
        const isOpen = Boolean(anchorEl);
        console.log(`SSE 실행!!!!! requests ${JSON.stringify(requests)} ${totalCount}`)
        console.log('SSE 실행 끝!!!!!')
        return (<div>
                <Badge badgeContent={totalCount} color="secondary">
                    <NotificationsIcon variant="contained" color="white" onClick={this.handleToggleList}
                                       fontSize={"large"}>
                    </NotificationsIcon>
                </Badge>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">새 메시지 없음</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            새 메시지 없음
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>

                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={this.handleCloseList}
                    anchorOrigin={{
                        vertical:'top', horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top', horizontal: 'left',
                    }}
                >
                    <Paper elevation={3} style={{padding: '30px', width: '400px'}}>
                        <List>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <Typography variant="subtitle1" style={ {color:'#2568ac',fontFamily:'IBM Plex Sans KR',fontSize:'23px',whiteSpace:'nowrap' ,fontWeight: 'bold'}}>
                                    새 메시지
                                </Typography>

                                {requests.map((request) => (

                                    <ListItem key={request.id} spacing={2}
                                              style={{padding:"0px",
                                                  borderBottom: '1px solid #ddd'}}>

                                        <Grid item xs={10} sm={10} md={10}>
                                            <ListItemText primary={request.content} />
                                        </Grid>
                                        <Grid item>
                                            <IconButton edge="end" aria-label="check"
                                                        onClick={() => this.changeToRead(request.id)}>
                                                <CheckBoxRoundedIcon color={request.unread ? "gray" : "secondary"}/>
                                            </IconButton>
                                        </Grid>
                                    </ListItem>))}
                            </Grid>
                        </List>
                        <div>
                            <Box style={{display:"flex",justifyContent:"center"}}>
                                {/*<IconButton edge="end" onClick={this.readMore}>*/}
                                {/*    <MoreHorizIcon*/}
                                {/*                    style={{color:"primary",textDecoration: 'underline', marginTop: '10px'}}/>*/}
                                {/*</IconButton>*/}
                                <Button onClick={this.readMore}  style={{color:"black",fontSize:"20px", marginTop: '10px',fontFamily:'IBM Plex Sans KR',border:'0px'}}>
                                    더보기
                                </Button>

                            </Box>
                            {/*<Typography variant="body2" color="primary" onClick={this.readMore}*/}
                            {/*            style={{textDecoration: 'underline', marginTop: '10px'}}>*/}
                            {/*    더보기*/}
                            {/*</Typography>*/}

                        </div>
                    </Paper>
                </Popover>
            </div>);
    }
}

export default NotificationListForEmployee;
