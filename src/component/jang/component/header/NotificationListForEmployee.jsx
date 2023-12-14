import React, {Component} from 'react';
import {Box, Button, IconButton, List, ListItem, ListItemText, Paper, Popover, Typography} from '@material-ui/core';
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
            anchorEl: null, requests: [{id: 1, content: 'dummy'}], totalCount: 0, page: 1
        };
        this.eventSource = new EventSource(`http://localhost:8080/register?employeeNumber=${this.employeeNumber}&userType=${this.userType}`);

        this.messageEventHandler = async function (event) {
            let requests = await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`)
            let id = this.state.requests.length + 1
            alert(`sse recv! ${JSON.stringify({id: JSON.stringify(event.id), content: JSON.stringify(event.data)})}`)
            let getTotalCount = requests.data.totalElement
            let hasNext = requests.data.hasNext
            this.setState({
                anchorEl: this.state.anchorEl, requests: this.state.requests.concat({
                    id: event.id, content: event.data, unread: event.data.readTime == null
                }), totalCount: getTotalCount, hasNext: hasNext

            })
        }.bind(this);

        this.eventSource.onmessage = this.messageEventHandler

        this.eventSource.onerror = this.onErrorHandler.bind(this,this.onErrorHandler.bind(this));

        this.registerAgain = this.registerAgain.bind(this)
        this.handleToggleList = this.handleToggleList.bind(this)
        // this.readMore=this.readMore.bind(this)
    }

    onErrorHandler = async function(callback) {
            alert('employee registerAgain!')
            this.eventSource.close()
            this.eventSource = new EventSource(`http://localhost:8080/register?employeeNumber=${this.employeeNumber}&userType=${this.userType}`) // 화살표 함수로 외부 this를 가져오면 경고가 없어진다
            this.eventSource.onerror=callback.bind(this,callback.bind(this))
            this.eventSource.onmessage = this.messageEventHandler
            let response = await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`)
            alert(`unread msg from server ${JSON.stringify(response.data.data)}`)
            let unreadMsg = response.data.data// dto를 담은 배열
            let mappedUnreadMsg = unreadMsg.map((request) => (({
                id: request.messageId,
                content: request.message,
                unread: request.readTime === null
            })))//dto에서 필요한 message 데이터를 새로운 id를 부여하여 requests에 담기
            alert(`setState ${JSON.stringify(mappedUnreadMsg)}`)
            let getTotalCount = response.data.totalElement
            let hasNext = response.data.hasNext

            this.setState({
                anchorEl: null, requests: mappedUnreadMsg,//state에 담아서 유지
                totalCount: getTotalCount, hasNext: hasNext
            });


    }

    async componentDidMount() {
        let requests = await axios.get(`http://localhost:8080/unread/${this.employeeNumber}?page=${this.state.page}`)
        alert(`unread msg from server ${JSON.stringify(requests.data.data)}`)
        let unreadMsg = requests.data.data// dto를 담은 배열
        let mappedUnreadMsg = unreadMsg.map((request) => (({
                id: request.messageId,
                content: request.message,
                unread: request.readTime === null
            })))//dto에서 필요한 message 데이터를 새로운 id를 부여하여 requests에 담기
        alert(`setState ${JSON.stringify(mappedUnreadMsg)}`)
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
            alert(`sse recv! ${JSON.stringify({id: id, content: JSON.stringify(event.data)})}`)
            let getTotalCount = response.data.totalElement
            let hasNext = response.data.hasNext
            alert(`totalcount : ${getTotalCount}`)
            this.setState({
                anchorEl: this.state.anchorEl,
                requests: this.state.requests,
                totalCount: getTotalCount,
                hasNext: hasNext
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
        alert(`more message! ${JSON.stringify({
            newMessageLength: response.data.data.length, content: JSON.stringify(response.data.data)
        })}`)
        alert(`old message! ${JSON.stringify(this.state.requests.map((saved) => saved.id))}`)

        let unreadMsg = response.data.data// dto를 담은 배열
        let mappedUnreadMsg = unreadMsg.map((request) => (({
                id: request.messageId,
                content: request.message,
                unread: request.readTime === null
            })))//dto에서 필요한 message 데이터를 새로운 id를 부여하여 requests에 담기
        alert(`mappedUnreadNewMsg ${JSON.stringify(mappedUnreadMsg)}`)
        mappedUnreadMsg = mappedUnreadMsg.filter((newPageMessage) => !this.state.requests.map((saved) => saved.id).includes(newPageMessage.id))
        alert(`mappedUnreadNewMsg ${JSON.stringify(mappedUnreadMsg)}`)
        let getTotalCount = response.data.totalElement
        let hasNext = response.data.hasNext
        alert(`totalcount : ${getTotalCount}`)
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
                alert(`read message ${messageId}`)
                let filteredMsg = this.state.requests.filter((entity)=> entity.id !== messageId)
                alert(`${JSON.stringify(filteredMsg)}`)
                this.setState({requests:filteredMsg,totalCount:response.data.totalCount})
            } else {
            }
        } catch (error) {
            alert(`메세지 읽기 실패 `)
            this.registerAgain()
        }
    }.bind(this)

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
                    <Paper elevation={3} style={{padding: '30px', width: '300px'}}>
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

                                    <ListItem key={request.id} spacing={2} style={{padding:"0px", borderBottom: '1px solid #ddd'}}>

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
