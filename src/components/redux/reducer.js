import ACTIONS from './aciton';

const reducer = (state={
    Language: 'cpp',
    CodeContent: '',
    LoginStatus: false,
    UpdateCode: false,
    OpenedCodeName: '',
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
            }
        case ACTIONS.SETLOGIN: 
            return {
                ...state,
                LoginStatus: action.bool,
            }
        default: 
            return state;
    }
}

export default reducer;
