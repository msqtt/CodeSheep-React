import * as React from 'react'

import { Component } from 'react';

import { Fab, Card, Button, Typography, CircularProgress, Alert, Snackbar } from '@mui/material/';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import CodeMirror from '@uiw/react-codemirror';

import { connect } from 'react-redux';


import Select from './Select';
import ScrollTop from './ScrollTop';

import ACTIONS from '../redux/aciton.js';
import {POST, PUT} from '../utils/request';
import {getExtensions, themeList} from '../utils/config';




class CodeArea extends Component {
    state = {
        codeContent: '',
        inputContent: '',
        outputContent: '',
        timeOutId: '',
        resMsg: '',
        waitCode: false,
        clickAble: true,
        snackBarOpen: false,
        statusType: 'success',
        saveWindow: false,
        fileNameError: false,
        updateWindow: false,
    }

    beforeunload (e) {
        let confirmationMessage = '你确定离开此页面吗?';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload);
    }
    componentWillUnmount () {
        window.removeEventListener('beforeunload', this.beforeunload);
    }
    constructor(props){
        super(props);
        this.filename = React.createRef();
        this.state.codeContent = this.props.codeText;
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

            if(this.props.codeText !== '' ){
                let data = await POST('/api/code-run', {
                    language: this.props.lang,
                    code: this.props.codeText,
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
            if (this.state.timeOutId !== '') clearTimeout(this.state.timeOutId);
            this.handleSnackMsg(0, '操作太频繁啦，请３ｓ后重试！（´(ｪ)｀）');
            this.state.timeOutId = setTimeout(() => {
                this.state.clickAble = true;
            }, 3000);
        }
    }

    handleSave = () => {
        if (this.props.codeText === ''){
            this.handleSnackMsg(0, '啥都没写呢，你存啥 U￣ｰ￣U');
            return;
        }

        let updateCode = this.props.updateCode;

        if (updateCode){
            this.setState({updateWindow: true});
        } else {
            this.setState({saveWindow: true});
        }
    }

    handleFileNameValid = (e) => {
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
            fileName,
            code: this.props.codeText,
        }, null)
        
        if (data !== ''){
            this.handleSnackMsg(data.code, data.msg);

            if (data.code === 200){
                this.props.setOpenCodeStatus(fileName, this.props.lang);
                this.props.setUpdateCode(true);
                this.setState({saveWindow: false});
            }
        } else {
            this.handleSnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
        }

    }

    handleBlur = () => {
        let codeContent = this.state.codeContent;
        this.props.saveCode(codeContent);
    }

    handleUpdateCode = async () => {
        let fileName = this.props.openedCodeName;
        let language = this.props.openedCodeType;
        let selectLanguage = this.props.lang;
        let code = this.props.codeText;

        if (language !== selectLanguage){
            this.handleSnackMsg(0, '你改变了语言喔，请保存为新文件 （´(ｪ)｀）');
            return;
        }

        let data = await PUT('api/code', {
            language,
            fileName,
            code
        }, null);
            
        
        if (data !== ''){
            this.setState({updateWindow: false});
            this.handleSnackMsg(data.code, data.msg);
        }

    }
    
    
    render() { 
        return ( 
            <React.Fragment>
                <div id='Code'>
                    <div className='headLine'>
                        <Typography id='back-to-top-anchor' sx={{marginBottom: 0}} variant="h5" gutterBottom component="div">
                            Coding 
                        </Typography>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button onClick={this.handleSave} variant="contained" color='secondary' disabled={!this.props.loginStatus} style={{height: '2.5rem', marginRight: '1rem'}} endIcon={<SaveIcon />}>Save</Button>
                            <Select />
                        </div>
                    </div>

                    <Dialog open={this.state.updateWindow}>
                        <DialogTitle>Saving</DialogTitle>
                        <DialogContent>
                            <DialogContentText>你已经打开了一个代码喔，要如何保存呢?</DialogContentText>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                                <Button onClick={this.handleUpdateCode} sx={{width: '45%', height: '3rem'}} variant="contained" color="secondary">
                                  保存到原文件
                                </Button>
                                <Button sx={{width: '45%', height: '3rem'}} onClick={()=>{this.setState({updateWindow: false, saveWindow: true})}} variant="contained" color="primary">
                                  另存一个新文件
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={this.state.saveWindow}>
                        <DialogTitle>Saving</DialogTitle>
                        <DialogContent>
                        <Tooltip title='文件名只能由数字，字母及 "_" 构成(125个字符以内)'>
                            <TextField inputRef={this.filename} error={this.state.fileNameError} onChange={this.handleFileNameValid} id="outlined-basic" sx={{marginTop: '6px'}} label="FileName" variant="outlined" />
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
                            theme={themeList[this.props.theme]} 
                            extensions={getExtensions(this.props.vim, this.props.lang)} 
                            placeholder='(๑・∀・ฅ✧ Code here'
                            onChange={v=>{ this.state.codeContent = v ;}}
                            onBlur={this.handleBlur}
                            basicSetup={this.props.basicSetup}
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
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
                            theme={themeList[this.props.theme]} 
                            placeholder='(´-ωก`) Input...'
                            basicSetup={
                                {
                                    highlightActiveLine: false,
                                    highlightActiveLineGutter: false,
                                    foldGutter: false,
                                    bracketMatching: false,
                                    autocompletion: false,
                                    allowMultipleSelections: false,
                                    closeBrackets: false,
                                    lineNumbers: this.props.lineNum
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
                            theme={themeList[this.props.theme]} 
                            placeholder='ฅ ̳͒•ˑ̫• ̳͒ฅ♡ Output!'
                            editable={ false }
                            basicSetup={
                                {
                                    highlightActiveLine: false,
                                    highlightActiveLineGutter: false,
                                    foldGutter: false,
                                    bracketMatching: false,
                                    autocompletion: false,
                                    allowMultipleSelections: false,
                                    closeBrackets: false,
                                    lineNumbers: this.props.lineNum
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
        loginStatus: state.LoginStatus,
        updateCode: state.UpdateCode,
        openedCodeName: state.OpenedCodeName,
        openedCodeType: state.OpenedCodeType,
        theme: state.Theme,
        vim: state.VimMode,
        lineNum: state.IoLineNumber,
        basicSetup: state.BasicConfig
    }
}

const mapDispatchToProps = {
    saveCode: (code) => {
        return {
            type: ACTIONS.SETCODE,
            code
        }
    },
    setUpdateCode: (bool) => {
        return {
            type: ACTIONS.UPDATECODE,
            bool
        }
    },
    setOpenCodeStatus: (name, lang) => {
        return {
            type: ACTIONS.OPENCODE,
            name,
            lang,
        }
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)( CodeArea );

