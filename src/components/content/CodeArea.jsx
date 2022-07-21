import * as React from 'react'

import { Component } from 'react';

import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import CodeMirror from '@uiw/react-codemirror';
import {githubLight} from '@uiw/codemirror-theme-github';
import {cpp} from '@codemirror/lang-cpp';
import {java} from '@codemirror/lang-java';
import {python} from '@codemirror/lang-python';
import {javascript} from '@codemirror/lang-javascript';

import {post} from '../../request';


import { connect } from 'react-redux';
import Select from './select';
import ACTIONS from '../redux/aciton.js';
import {Button} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';






const LangFuntion = {
    cpp,
    java,
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
    }

    handleFabClick = async () => {
        let data = await post('/api/code', {
            lang: this.props.lang,
            code: this.state.codeContent,
            input: this.state.inputContent
        }, null)
        this.props.runcode(this.state.codeContent, data.res, data.sta, data.msg);
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <div id='Code'>
                    <div id='headLine'>
                        <Typography sx={{marginBottom: 0}} variant="h5" gutterBottom component="div">
                            Coding 
                        </Typography>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button variant="contained" color='secondary' style={{height: '2.5rem', marginRight: '1rem'}} endIcon={<SaveIcon />}>Save</Button>
                            <Select />
                        </div>
                        
                    </div>
                    <Card id='codeText' variant="outlined">
                        <CodeMirror
                            ref={this.editor}
                            minHeight='500px'
                            height='auto' 
                            theme={githubLight} 
                            extensions={getLangExtend(null, this.props.lang)} 
                            placeholder='(๑・∀・ฅ✧ Code here'
                            onChange={e=>{this.setState({codeContent: e})}}
                        />
                    </Card>
                    <Fab onClick={this.handleFabClick} sx={{position: 'fixed', bottom: '3rem', right: `3rem`}} color="secondary">
                        Go
                    </Fab>

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
                            onChange={(e)=>{this.setState({ inputContent: e })}}
                        />
                    </Card>
                    <Card id='outputText' variant="outlined">
                        <CodeMirror
                            value={this.props.output}
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
        output: state.CodeOutput,
        msg: state.RunMsg,
        runStatus: state.RunStatus,
    }
}

const mapDispatchToProps = {
    runcode: (code, res, sta, msg)=>{
        return {
            type: ACTIONS.RUNCODE,
            code,
            res,
            sta,
            msg
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)( CodeArea );






