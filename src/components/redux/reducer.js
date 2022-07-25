import ACTIONS from './aciton';

const reducer = (state={
    Language: 'cpp',
    CodeContent: '',
}, action) => {
    switch(action.type){
        case ACTIONS.SELECT_LANG: 
            return {
                ...state,
                Language: action.lang,
            }
        default: 
            return state;
    }
}

export default reducer;
