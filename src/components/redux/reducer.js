import ACTIONS from './aciton';
import { basicConfig } from '../utils/config';

const reducer = (state={
    Language: 'cpp',
    CodeContent: '',
    LoginStatus: false,
    UpdateCode: false,
    OpenedCodeName: '',
    OpenedCodeType: '',
    VimMode: false,
    IoLineNumber: true,
    Theme: 'githubLight',
    BasicConfig: {
        ...basicConfig
    }
}, action) => {
    switch(action.type){
        case ACTIONS.SELECT_LANG: 
            return {
                ...state,
                Language: action.lang,
            }
        case ACTIONS.SETCODE: 
            return {
                ...state,
                CodeContent: action.code,
            }
        case ACTIONS.UPDATECODE: 
            return {
                ...state,
                UpdateCode: action.bool
            }
        case ACTIONS.OPENCODE: 
            return {
                ...state,
                OpenedCodeName: action.name,
                OpenedCodeType: action.lang,
            }
        case ACTIONS.SETLOGIN: 
            return {
                ...state,
                LoginStatus: action.bool,
            }
        case ACTIONS.SETEXTENDS: 
            return {
                ...state,
                VimMode: action.vim,
                IoLineNumber: action.line,
                Theme: action.theme
            }
        case ACTIONS.SETBASIC: 
            return {
                ...state,
                BasicConfig: action.config
            }
        default: 
            return state;
    }
}

export default reducer;
