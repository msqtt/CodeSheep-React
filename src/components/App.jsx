import * as React from 'react'

import { Component } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {ThemeProvider} from '@emotion/react';
import {Container} from '@mui/material'

import CodeArea from './content/CodeArea';
import NotFound from './content/NotFound';
import Saving from './content/Saving';
import Setting from './content/Setting';
import Login from './content/Login';
import Register from './content/Register';
import PersistentDrawerRight from './DrawRight.jsx'

import myTheme from './myTheme.js';

import { connect } from 'react-redux';
import ACTIONS from './redux/aciton';

class App extends Component {
    state = {  }

    componentDidMount(){
        let email = localStorage.getItem("email");
        let time = localStorage.getItem("time");

        if (time !== null && time !== '' && email !== null && email !== ''){
            if (Date.parse(time) < Date.parse(new Date())){
                console.log("overtime");
                localStorage.removeItem('email');
                localStorage.removeItem('time');
                this.props.setLogin(false);
            } else {
                this.props.setLogin(true);
            }
        } else {
            this.props.setLogin(false);
        }

    }

    render() { 
        return ( 
            <ThemeProvider theme={myTheme}>
                <PersistentDrawerRight>
                    <Routes>
                        <Route path='/' element={<CodeArea />} />
                        <Route path='/Coding' element={<Navigate replace to='/'/>}  />
                        <Route path='/Saving' element={this.props.loginStatus ? <Saving /> : <Navigate replace to='/' />}  />
                        <Route path='/Setting' element={<Setting />}  />
                        <Route path='/Login' element={!this.props.loginStatus ? <Login /> : <Navigate replace to='/' />}  />
                        <Route path='/Register' element={!this.props.loginStatus ? <Register /> : <Navigate replace to='/' />}  />
                        <Route path='/404' element={<NotFound />}  />
                        <Route path='*' element={<Navigate replace to='/404'/>}  />
                    </Routes>
                </PersistentDrawerRight>
                <Container maxWidth="sm">
                    <footer>No Licensed | Copyright © 2022-present <a href='https://github.com/mosqu1t0'>mosquito</a></footer>
                </Container>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        loginStatus: state.LoginStatus,
    }
}

const mapDispatchToProps = {
    setLogin: (bool) => {
        return {
            type: ACTIONS.SETLOGIN,
            bool, 
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)( App );
