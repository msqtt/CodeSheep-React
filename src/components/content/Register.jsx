import * as React from 'react'

import { Component } from 'react';

import { Tooltip, Typography, Card, Box, TextField, Button, Alert, Snackbar } from '@mui/material';
import Password from './Password';

import { POST } from '../utils/request';
import { connect } from 'react-redux';




class Register extends Component {

    state = { 
        values: {
            password: '',
            showPassword: false,
        },
        vaildMsg: '',
        snackBarOpen: false,
        snackBarStatus: 'success',
        emailError: false,
        passwdError: false,
        repasswdError: false,
    }

    handleCheckBox = () => {
        console.log(true);
    }

    setPasswdError = (flag) => {
        this.setState({passwdError: flag});
    }
    setRePasswdError = (flag) => {
        this.setState({repasswdError: flag});
    }

    handleSubmit = async () => {
        let email = this.email.current.value;
        let passwd = this.passwd.current.value;
        let repasswd = this.repasswd.current.value;

        if (email === '' || passwd === '' || repasswd === '' ){
            this.handleSnackMsg(1, '不能留空啦 U￣ｰ￣U');
            return;
        }

       if (this.state.emailError || this.state.passwdError || this.state.repasswdError){
            this.handleSnackMsg(1, '输入格式不正确喔 U￣ｰ￣U');
            return;
        }

        if (passwd !== repasswd) {
            this.handleSnackMsg(1, '两次密码输入不一致捏 U￣ｰ￣U');
            return;
        }

        let data = await POST('/api/user', {
            email: email,
            password: passwd
        }, null)

        if (data !== ''){
            this.handleSnackMsg(data.code, data.msg);

            if (data.code === 200){
                setTimeout(()=>{window.location.href='/Login';
    }, 2000);
            }
        } else {
            this.handleSnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
        }
    }

    handleSnackMsg = (type, msg) => {
        let statusType = '';
        if (type === 0) statusType = 'info';
        if (type === 1 || type === 244) statusType = 'warning';
        if (type === 200) statusType = 'success';
        if (type === 400) statusType = 'error';
        this.setState({snackBarStatus: statusType, vaildMsg: msg, snackBarOpen: true});
    }

    handleSnackClose = () => {
        this.setState({snackBarOpen: false})
    }

    handleEmailChange = () => {
        let email = this.email.current.value;
        let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (email !== '' && !emailReg.test(email)) {
            if (!this.state.emailError)
                this.setState({emailError: true});
        } else {
            if (this.state.emailError)
                this.setState({emailError: false});
        }
    }


    constructor(props){
        super(props);
        this.email = React.createRef();
        this.passwd = React.createRef();
        this.repasswd = React.createRef();
    }


    componentDidMount(){
        console.log(this.props.codeText);
        if (this.props.codeText !== '')
            this.handleSnackMsg(0, "(｀・ω´・ 注册前请注意保存好代码，本操作会导致代码丢失");
    }

    render() { 
        return ( 
            <React.Fragment>
                <header style={{marginTop: `calc(3rem + 4px)`}}></header>
                <Typography sx={{marginBottom: '12px'}} variant="h5" gutterBottom component="div">
                    Register
                </Typography>
                <Card variant="outlined">

                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', marginBottom: '5rem'}}>

                    <Tooltip title='请输入正确的邮箱'>
                        <TextField
                            error={this.state.emailError}
                            type='email'
                            inputRef={this.email}
                            id="outlined-required"
                            label="Email *"
                            onChange={this.handleEmailChange}
                            sx={{marginBottom: '0.5rem'}}
                        />
                    </Tooltip>
                    <Tooltip title='请输入6-16位由数字和字母组成的密码，不接收符号喔'>
                        <Password
                            id='passwd'
                            hold='Passwd *'
                            realref={this.passwd}
                            error={this.state.passwdError}
                            seterror={this.setPasswdError}
                        />
                    </Tooltip>
                    <Tooltip title='请与上栏保持一致'>
                        <Password
                            id='repasswd'
                            hold='Re-passwd *'
                            realref={this.repasswd}
                            error={this.state.repasswdError}
                            seterror={this.setRePasswdError}
                            sx={{marginBottom: '2rem'}}
                        />
                    </Tooltip>

                    <Button sx={{width: '14.5rem'}} onClick={this.handleSubmit} variant='contained' color="secondary" size='large'>Register</Button>
                    </Box>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={this.state.snackBarOpen}
                        onClose={this.handleSnackClose}
                        autoHideDuration={3000}
                    >
                        <Alert onClose={this.handleSnackClose} severity={this.state.snackBarStatus} sx={{ width: '100%' }}>
                            {this.state.vaildMsg}
                        </Alert>
                    </Snackbar>

                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        codeText: state.CodeContent
    }
}
 
export default connect(mapStateToProps, null)( Register );
