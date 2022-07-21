import ACTIONS from './aciton';

const reducer = (state={
    Language: 'cpp',
    CodeContent: '',
    CodeOutput: '',
    RunStatus: 0,
    RunMsg: '',
}, action) => {
    switch(action.type){
        case ACTIONS.SELECT_LANG: 
            return {
                ...state,
                Language: action.lang,
            }
        case ACTIONS.RUNCODE: 
            return {
                ...state,
                CodeContent: action.code,
                CodeOutput: action.res,
                RunStatus: action.sta,
                RunMsg: action.msg,
            }
        default: 
            return state;
    }
}

export default reducer;
