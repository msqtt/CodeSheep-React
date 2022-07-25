import * as React from 'react'

import { Component } from 'react';

import { Tooltip, Typography, Card, Box, TextField, Button, Alert, Snackbar } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import Password from './Password';




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
    }

    handleCheckBox = () => {
        console.log(true);
    }

    setPasswdError = (flag) => {
        this.setState({passwdError: flag});
    }

    handleSubmit = () => {
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
                            ref={this.passwd}
                            error={this.state.passwdError}
                            seterror={this.setPasswdError}
                        />
                    </Tooltip>

                    <FormControlLabel
                        label="remember me a week"
                        control={<Checkbox defaultChecked onChange={this.handleCheckBox} color="secondary" />}
                    />

                    <Button sx={{width: '14.5rem'}} onClick={this.handleSubmit} variant='contained' color="secondary" size='large'>Login</Button>
                    </Box>

                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
 
export default Login;
