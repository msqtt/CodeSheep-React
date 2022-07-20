import axios from 'axios';
import ACTIONS from './aciton';

const runCode = async (code, input) => {
    console.log(code, input);
    let resp;
    try {
        resp = await axios.post('/code', {code, input});
    } catch (error) {
        console.error(error);
    }
    return resp;
}


const reducer = (state={
    Language: 'cpp',
    CodeContent: '',
    CodeInput: '',
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
            let data = runCode(action.code, action.input);
            console.log(data);
            return {
                ...state,
                CodeInput: action.input,
                CodeContent: action.code,
                CodeOutput: data.res,
                RunStatus: data.code,
                RunMsg: data.msg,
            }
        default: 
            return state;
    }
}

export default reducer;
