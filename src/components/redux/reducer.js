import ACTIONS from './aciton';

const reducer = (state={
    Language: 'cpp',
    CodeContent: '',
    LoginStatus: false,
}, action) => {
    switch(action.type){
        case ACTIONS.SELECT_LANG: 
            return {
                ...state,
                Language: action.lang,
            }
        case ACTIONS.SAVECODE: 
            return {
                ...state,
                CodeContent: action.code,
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
