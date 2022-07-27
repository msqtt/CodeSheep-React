import * as React from 'react'

import { Component } from 'react';

import { Fab, Card, Button, Typography, CircularProgress, Alert, Snackbar } from '@mui/material/';


import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import CodeMirror from '@uiw/react-codemirror';
import {githubLight} from '@uiw/codemirror-theme-github';
import {cpp} from '@codemirror/lang-cpp';
import {python} from '@codemirror/lang-python';
import {javascript} from '@codemirror/lang-javascript';

import { connect } from 'react-redux';


import Select from './Select';
import ACTIONS from '../redux/aciton.js';
import ScrollTop from './ScrollTop';
import {post} from '../../request';






const LangFuntion = {
    cpp,
    python,
    javascript,
}

const getLangExtend = (extend, lang)=>{
    if (extend === null)
        return [
            Reflect.apply(LangFuntion[lang], null, []),
        ]
    else 
        return [
            ...extend,
            Reflect.apply(LangFuntion[lang], null, []),
        ]
}

class CodeArea extends Component {
    state = {
        inputContent: '',
        codeContent: '',
        outputContent: '',
        timeOutId: '',
        resMsg: '',
        waitCode: false,
        clickAble: true,
        snackBarOpen: false,
        statusType: 'success'
    }

    handleSnackClose = () => {
        this.setState({snackBarOpen: false});
    }

    handleSnackMsg = (type, msg) => {
        let statusType = '';
        if (type === 0) statusType = 'info';
        if (type === 200) statusType = 'success';
        if (type === 233) statusType = 'warning';
        if (type === 244) statusType = 'warning';
        if (type === 555) statusType = 'error';
        this.setState({statusType, resMsg: msg, snackBarOpen: true});
    }


    handleFabClick = async () => {
        if (this.state.snackBarOpen) this.handleSnackClose();

        if (this.state.clickAble){

            this.state.clickAble = false;
            this.setState({waitCode: true});

            this.state.timeOutId = setTimeout(() => {
                this.state.clickAble = true;
            }, 3000);

            if(this.state.codeContent !== '' ){
                let data = await post('/api/code-run', {
                    lang: this.props.lang,
                    code: this.state.codeContent,
                    input: this.state.inputContent
                }, null)
                
                console.log(data.code);
                this.handleSnackMsg(data.code, data.msg);
                this.setState({outputContent: data.res, waitCode: false});
            } else {
                this.handleSnackMsg(0, '啥都没写呢，你跑啥 （´(ｪ)｀）');
                this.setState({waitCode: false});
            }

        } else {
            clearTimeout(this.state.timeOutId);
            this.handleSnackMsg(0, '操作太频繁啦，请３ｓ后重试！（´(ｪ)｀）');
            this.state.timeOutId = setTimeout(() => {
                this.state.clickAble = true;
            }, 3000);
        }
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <div id='Code'>
                    <div id='headLine'>


                        <Typography id='back-to-top-anchor' sx={{marginBottom: 0}} variant="h5" gutterBottom component="div">
                            Coding 
                        </Typography>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button variant="contained" color='secondary' style={{height: '2.5rem', marginRight: '1rem'}} endIcon={<SaveIcon />}>Save</Button>
                            <Select />
                        </div>
                    </div>


                    <Card id='codeText' variant="outlined">
                        <CodeMirror
                            value={this.props.codeText}
                            minHeight='400px'
                            height='auto' 
                            theme={githubLight} 
                            extensions={getLangExtend(null, this.props.lang)} 
                            placeholder='(๑・∀・ฅ✧ Code here'
                            onChange={e=>{this.state.codeContent = e}}
                        />
                    </Card>

                    <ScrollTop sx={{position: 'fixed', right: '1.5rem', bottom: '5rem'}}>
                        <Fab size="small" aria-label="scroll back to top" color='secondary'>
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>

                    <Fab onClick={this.handleFabClick} sx={{position: 'fixed', bottom: '1rem', right: '1rem'}} color="secondary">
                        {!this.state.waitCode ? 'Go' : <CircularProgress color="inherit" />}
                    </Fab>

                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={this.state.snackBarOpen}
                        onClose={this.handleSnackClose}
                        autoHideDuration={3000}
                    >
                        <Alert onClose={this.handleSnackClose} severity={this.state.statusType} sx={{ width: '100%' }}>
                            {this.state.resMsg}
                        </Alert>
                    </Snackbar>
                </div>
                <div id='inOut'>
                    <Card id='inputText' variant="outlined">
                        <CodeMirror
                            minHeight='100px' 
                            height='auto'
                            theme={githubLight} 
                            placeholder='(´-ωก`) Input...'
                            basicSetup={
                                {
                                    highlightActiveLine: false,
                                    highlightActiveLineGutter: false,
                                }
                            }
                            onChange={(e)=>{this.state.inputContent = e;}}
                        />
                    </Card>
                    <Card id='outputText' variant="outlined">
                        <CodeMirror
                            value={this.state.outputContent}
                            minHeight='100px' 
                            height='auto'
                            theme={githubLight} 
                            placeholder='ฅ ̳͒•ˑ̫• ̳͒ฅ♡ Output!'
                            editable={ false }
                            basicSetup={
                                {
                                    highlightActiveLine: false,
                                    highlightActiveLineGutter: false,
                                }
                            }
                        />
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.Language,
        codeText: state.CodeContent,
    }
}

 
export default connect(mapStateToProps, null)( CodeArea );






