import {cpp} from '@codemirror/lang-cpp';
import {python} from '@codemirror/lang-python';
import {javascript} from '@codemirror/lang-javascript';
import { vim } from "@replit/codemirror-vim";

import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { duotoneLight, duotoneDark } from '@uiw/codemirror-theme-duotone';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import {githubLight, githubDark} from '@uiw/codemirror-theme-github';
import { xcodeLight, xcodeDark} from '@uiw/codemirror-theme-xcode';
import { sakura } from './sakura';



const LangFuntionMap = {
    cpp,
    python,
    javascript,
}

export const basicConfig = {
        lineNumbers: true,  
        foldGutter: true, //代码折叠
        drawSelection: true, //绘制选区
        allowMultipleSelections: false, //允许多光标
        bracketMatching: true, //括号匹配显示
        closeBrackets: true, //括号补全
        autocompletion: true, //自动补全
        syntaxHighlighting: true,   //语法高亮
        highlightActiveLineGutter: true, //高亮数字区被选中区
        highlightActiveLine: true, //高亮选中行
        highlightSelectionMatches: true, //高亮选中相同字符串
}


export const themeList = { 
    abcdef,
    atomone,
    androidstudio,
    dracula,
    duotoneLight,
    duotoneDark,
    eclipse,
    githubLight,
    githubDark,
    sakura,
    xcodeLight,
    xcodeDark,
}

export const getExtensions = (vimCheck, lang)=>{
    if (vimCheck){
        return [
            Reflect.apply(LangFuntionMap[lang], null, []),
            Reflect.apply(vim, null, []),
        ]
    } else {
        return [
            Reflect.apply(LangFuntionMap[lang], null, []),
        ]
    }
}

