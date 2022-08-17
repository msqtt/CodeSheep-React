import * as React from 'react'

import { Component } from 'react';

import { Tooltip, Typography, Card, Box, TextField, Button, Alert, Snackbar } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';

import { connect } from 'react-redux';

import Password from './Password';
import {POST} from '../utils/request';




class Login extends Component {

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
        rememberMe: false,
    }

    handleCheckBox = () => {
        this.state.rememberMe = !this.state.rememberMe;
    }

    setPasswdError = (flag) => {
        this.setState({passwdError: flag});
    }

    handleSubmit = async () => {
        let email = this.email.current.value;
        let passwd = this.passwd.current.value;
        if (email === '' || passwd === ''){
            this.setState({
                snackBarOpen: true,
                snackBarStatus: 'warning',
                vaildMsg: '不能留空啦 U￣ｰ￣U'
            })
           return;
        }

       if (this.state.emailError || this.state.passwdError){
            this.setState({
                snackBarOpen: true,
                snackBarStatus: 'warning',
                vaildMsg: '输入格式不正确喔 U￣ｰ￣U'
            })
           return;
        }

        let data = await POST('/api/user-login', {
            user: {
                email,
                password: passwd,
            },
            remember: this.state.rememberMe
        }, null);

        if (data !== ''){
            this.handleSnackMsg(data.code, data.msg);

            if (data.code === 200){
                let date = new Date();
                if (this.state.rememberMe) date.setDate(date.getDate()+7)
                else date.setDate(date.getDate()+1);

                localStorage.setItem("email", email);
                localStorage.setItem("time", date);
                if (data.config !== undefined)
                    localStorage.setItem("user-config", data.config);

                setTimeout(()=>{window.location.href='/';}, 1000);
            }
        } else {
            this.handleSnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
        }

    }
    handleSnackMsg = (type, msg) => {
        let statusType = '';
        if (type === 0) statusType = 'info';
        if (type === 200) statusType = 'success';
        if (type === 244 || type === 404) statusType = 'warning';
        if (type === 405) statusType = 'error';
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
    }

    componentDidMount(){
        console.log(this.props.codeText);
        if (this.props.codeText !== '')
            this.handleSnackMsg(0, "(｀・ω´・ 登录前请注意保存好代码，本操作会导致代码丢失");
    }


    render() { 
        return ( 
            <React.Fragment>
                <header style={{marginTop: `calc(3rem + 4px)`}}></header>
                <Typography sx={{marginBottom: '12px'}} variant="h5" gutterBottom component="div">
                    Login
                </Typography>
                <Card variant="outlined">

                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', marginBottom: '5rem'}}>

                    <Tooltip title='请输入正确的邮箱'>
                        <TextField
                            autoComplete='off'
                            error={this.state.emailError}
                            inputRef={this.email}
                            type='email'
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

                    <FormControlLabel
                        label="Remember me a week"
                        control={<Checkbox onChange={this.handleCheckBox} color="secondary" />}
                    />

                    <Button sx={{width: '14.5rem'}} onClick={this.handleSubmit} variant='contained' color="secondary" size='large'>Login</Button>
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
        loginStatus: state.LoginStatus,
        codeText: state.CodeContent
    }
}

 
export default connect(mapStateToProps, null)( Login );
