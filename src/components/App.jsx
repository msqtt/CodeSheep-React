import * as React from 'react'

import { Component } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {ThemeProvider} from '@emotion/react';

import CodeArea from './content/CodeArea';
import Footer from './content/Footer';
import NotFound from './content/NotFound';
import Saving from './content/Saving';
import Setting from './content/Setting';
import Login from './content/Login';
import Register from './content/Register';
import PersistentDrawerLeft from './DrawerLeft.jsx'

import myTheme from './utils/myTheme';

import { connect } from 'react-redux';
import ACTIONS from './redux/aciton';
import { printLOGO } from  './utils/printLogo';

class App extends Component {
    state = { 
    }

    componentDidMount(){

        printLOGO();

        let email = localStorage.getItem('email');
        let time = localStorage.getItem('time');

        if (time !== null && time !== '' && email !== null && email !== ''){
            if (Date.parse(time) < Date.parse(new Date())){
                console.log("overtime");
                localStorage.removeItem('email');
                localStorage.removeItem('time');
                this.props.setLogin(false);
            } else {
                this.props.setLogin(true);

                let userConfigJson = localStorage.getItem('user-config');
                if (userConfigJson !== null && userConfigJson !== ''){
                    let userConfig = JSON.parse(userConfigJson);
                    console.log(userConfigJson.length);
                    this.props.setBasicSetup(userConfig.basic);
                    this.props.setExtends(userConfig.extends);
                }
            }
        } else {
            this.props.setLogin(false);

            let configJson = localStorage.getItem('config');
            if (configJson !== null && configJson !== ''){
                let config = JSON.parse(configJson);
                this.props.setBasicSetup(config.basic);
                this.props.setExtends(config.extends);
            }
        }

    }

    render() { 
        return ( 
            <ThemeProvider theme={myTheme}>
                <PersistentDrawerLeft>
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
                    <Footer />
                </PersistentDrawerLeft>
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
    },
    setExtends: (extend) => {
        return {
            type: ACTIONS.SETEXTENDS,
            vim: extend.vim,
            line: extend.line,
            theme: extend.theme
        }
    },
    setBasicSetup: (config) => {
        return {
            type: ACTIONS.SETBASIC,
            config
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)( App );
