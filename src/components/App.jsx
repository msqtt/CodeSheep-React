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
import SignUp from './content/SignUp';


import myTheme from './myTheme.js';
import PersistentDrawerRight from './DrawRight.jsx'

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <ThemeProvider theme={myTheme}>
                <PersistentDrawerRight>
                    <Routes>
                        <Route path='/' element={<CodeArea />} />
                        <Route path='/Coding' element={<Navigate replace to='/'/>}  />
                        <Route path='/Saving' element={<Saving />}  />
                        <Route path='/Setting' element={<Setting />}  />
                        <Route path='/Login' element={<Login />}  />
                        <Route path='/SignUp' element={<SignUp />}  />
                        <Route path='/404' element={<NotFound />}  />
                        <Route path='*' element={<Navigate replace to='/404'/>}  />
                    </Routes>
                </PersistentDrawerRight>
                <Container maxWidth="sm">
                    <footer>Copyright © 2022-present <a href='https://github.com/mosqu1t0'>mosquito</a></footer>
                </Container>
            </ThemeProvider>
        );
    }
}
 
export default App;
