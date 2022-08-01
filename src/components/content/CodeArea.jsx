import * as React from 'react'

import { Component } from 'react';

import { Fab, Card, Button, Typography, CircularProgress, Alert, Snackbar } from '@mui/material/';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import CodeMirror from '@uiw/react-codemirror';
import {githubLight} from '@uiw/codemirror-theme-github';
import {cpp} from '@codemirror/lang-cpp';
import {python} from '@codemirror/lang-python';
import {javascript} from '@codemirror/lang-javascript';

import { connect } from 'react-redux';


import Select from './Select';
import ACTIONS from '../redux/aciton.js';
import ScrollTop from './ScrollTop';
import {POST} from '../utils/request';






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
        statusType: 'success',
        saveWindow: false,
        fileNameError: false,
    }

    constructor(props){
        super(props);
        this.filename = React.createRef();
    }

    handleSnackClose = () => {
        this.setState({snackBarOpen: false});
    }

    handleSnackMsg = (type, msg) => {
        let statusType = '';
        if (type === 0) statusType = 'info';
        if (type === 200) statusType = 'success';
        if (type === 233 || type === 300) statusType = 'warning';
        if (type === 244) statusType = 'warning';
        if (type === 555 || type === 400) statusType = 'error';
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
                let data = await POST('/api/code-run', {
                    language: this.props.lang,
                    code: this.state.codeContent,
                    input: this.state.inputContent
                }, null)
                
                if (data !== ''){
                    this.handleSnackMsg(data.code, data.msg);
                    this.setState({outputContent: data.res, waitCode: false});
                } else {
                    this.handleSnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
                }
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

    handleSave = () => {
        this.setState({saveWindow: true});
    }

    handleFileNameVaild = (e) => {
        let fileName = e.target.value;
        let fileNameReg = /^\w{1,125}$/;

        if(fileName !== '' && !fileNameReg.test(fileName)){
            if (!this.state.fileNameError)
                this.setState({fileNameError: true});
        } else {
            if (this.state.fileNameError)
                this.setState({fileNameError: false});
        }
    }

    handleSaveConfirm = async () => {
        let fileName = this.filename.current.value;

        if (this.state.codeContent === ''){
            this.handleSnackMsg(0, '啥都没写呢，你存啥 U￣ｰ￣U');
            return;
        }

        if (fileName === ''){
            this.handleSnackMsg(0, '文件名不能为空 U￣ｰ￣U');
            return;
        }

        if (this.state.fileNameError){
            this.handleSnackMsg(0, '文件名格式不正确 U￣ｰ￣U');
            return;
        }
        
        let data = await POST('/api/code', {
            language: this.props.lang,
            fileName: fileName,
            code: this.state.codeContent,
        }, null)
        
        if (data !== ''){
            this.handleSnackMsg(data.code, data.msg);

            if (data.code === 200){
                console.log("success");
                this.setState({saveWindow: false});
            }
        } else {
            this.handleSnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
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
                            <Button onClick={this.handleSave} variant="contained" color='secondary' disabled={!this.props.loginStatus} style={{height: '2.5rem', marginRight: '1rem'}} endIcon={<SaveIcon />}>Save</Button>
                            <Select />
                        </div>
                    </div>

                    <Dialog open={this.state.saveWindow}>
                        <DialogTitle>Saving</DialogTitle>
                        <DialogContent>
                        <Tooltip title='文件名只能由数字，字母及 "_" 构成(125个字符以内)'>
                            <TextField inputRef={this.filename} error={this.state.fileNameError} onChange={this.handleFileNameVaild} id="outlined-basic" sx={{marginTop: '6px'}} label="FileName" variant="outlined" />
                        </Tooltip>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                                <Button onClick={this.handleSaveConfirm} sx={{width: '45%', height: '3rem'}} variant="contained" color="secondary">
                                  Save
                                </Button>
                                <Button sx={{width: '45%', height: '3rem'}} onClick={()=>{this.setState({saveWindow: false, fileNameError: false})}} variant="contained" color="primary">
                                  Cancel
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
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
        loginStatus: state.LoginStatus
    }
}

 
export default connect(mapStateToProps, null)( CodeArea );






