import * as React from 'react'

import { Component } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';


import CodeArea from './content/CodeArea';
import NotFound from './content/NotFound';
import Saving from './content/Saving';
import Setting from './content/Setting';

import PersistentDrawerRight from './DrawRight.jsx'
import {ThemeProvider} from '@emotion/react';
import myTheme from './myTheme.js';
import {Container} from '@mui/material'

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
