import * as React from 'react'

import { Typography, Card } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Snackbar, Alert} from '@mui/material';

import { useSelector, useDispatch} from 'react-redux';
import ACTIONS from '../redux/aciton';
import { PUT } from '../utils/request';
import { basicConfig, themeList } from '../utils/config';





const Settion = () => {
    const themeProps = useSelector(state=>state.Theme);
    const vimProps = useSelector(state=>state.VimMode);
    const lineNumProps = useSelector(state=>state.IoLineNumber);
    const basicConfigProps = useSelector(state=>state.BasicConfig);
    const loginStatus = useSelector(state=>state.LoginStatus);
    const [ basicSetup, setBasicSetup ] = React.useState(basicConfigProps);
    const [ theme, setTheme ] = React.useState(themeProps);
    const [ vimCheck, setVimCheck ] = React.useState(vimProps);
    const [ lineNum, setLineNum ] = React.useState(lineNumProps);
    const [ snackBarOpen, setSnackBarOpen ] = React.useState(false);
    const [ statusType, setStatusType ] = React.useState('info');
    const [ snackBarMsg, setSnackBarMsg ] = React.useState('');
    let [ clickAble, setClickAble ] = React.useState(true);
    let [ timeOutId, setTimeOutId] = React.useState('');

    const dispatch = useDispatch();

    function beforeunload (e) {
        let confirmationMessage = '你确定离开此页面吗?';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    React.useEffect(()=>{
        window.addEventListener('beforeunload', beforeunload);
        return ()=>{
            window.removeEventListener('beforeunload', beforeunload);
        }
    }, [])

    React.useEffect(()=>{
        setBasicSetup({...basicConfigProps});
        setTheme(themeProps);
        setVimCheck(vimProps);
        setLineNum(lineNumProps);
    }, [basicConfigProps, themeProps, vimProps, lineNumProps]);

    const handleCheckBoxChange = (name) => {
        let tmp = basicSetup;
        Reflect.set(tmp, name, !basicSetup[name]);
        setBasicSetup({...tmp});
    }

    const handleThemeChange = (e) => {
        setTheme(e.target.value);

    }
    
    const handleSaveConfig = async () => {
        if (clickAble){
            setClickAble(false);


            let id = setTimeout(() => {
                setClickAble(true);
            }, 3000);
            setTimeOutId(id);

            dispatch({
                type: ACTIONS.SETEXTENDS,
                vim: vimCheck,
                line: lineNum,
                theme,
            });
            dispatch({
                type: ACTIONS.SETBASIC,
                config: {
                    ...basicSetup
                }
            })
            

            let configClass = {basic: basicSetup, extends: {vim: vimCheck, line: lineNum, theme}};
            let config = JSON.stringify(configClass);
            if (loginStatus){
                localStorage.setItem('user-config', config);

                let data = await PUT('api/user/config', {
                    ...configClass
                }, null);

                if (data !== ''){
                    SnackMsg(data.code, data.msg);
                } else {
                    SnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
                }
            } else {
                SnackMsg(200, '保存成功 Y(･∀･)Y');
                localStorage.setItem('config', config);
            }

        } else {
            if (timeOutId !== '') clearTimeout(timeOutId);
            SnackMsg(0, '操作太频繁啦，请３ｓ后重试！（´(ｪ)｀）');
            let id = setTimeout(() => {
                setClickAble(true);
            }, 3000);
            setTimeOutId(id);

        }
    }

    const handleDefaultConfig = () => {
        setBasicSetup(basicConfig);
        setVimCheck(false);
        setLineNum(true);
        setTheme('githubLight');
    }

    const handleSnackClose = ()=>{
        setSnackBarOpen(false);
    }

    const SnackMsg = (type, msg) => {
        let statusType = '';
        if (type === 0) statusType = 'info';
        if (type === 200) statusType = 'success';
        if (type === 300) statusType = 'warning';
        if (type === 400) statusType = 'error';
        setStatusType(statusType);
        setSnackBarMsg(msg)
        setSnackBarOpen(true);
    }

    return ( 
        <React.Fragment>
            <header style={{marginTop: 'calc(3rem + 4px)'}}></header>
            <Typography sx={{marginBottom: '12px'}} variant="h5" gutterBottom component="div">
                Settion 
            </Typography>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackBarOpen}
                    onClose={handleSnackClose}
                    autoHideDuration={3000}
                >
                    <Alert onClose={handleSnackClose} severity={statusType} sx={{ width: '100%' }}>
                        {snackBarMsg}
                    </Alert>
                </Snackbar>
            <Card variant="outlined" sx={{display: 'flex', flexDirection: 'column', }}>
                <div id='basicSetup' style={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(4, 2rem)',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: '0 1rem'
                }}>
                    {Object.keys(basicSetup).map(( li, idx )=>(
                        <FormControlLabel
                            key={idx}
                            label={li}
                            control={<Checkbox color="secondary" checked={basicSetup[li]} onChange={()=>handleCheckBoxChange(li)} />}
                          />
                    ))}


                </div>
                <div id='extends' style={
                    {
                        display: 'grid',
                        gridTemplateRows: 'repeat(2, 42px)',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        padding: '1rem'
                    }}>
                    <FormControlLabel
                        key='vim'
                        label='Vim-Mode'
                        control={<Checkbox color="secondary" checked={vimCheck} onChange={()=>{setVimCheck(!vimCheck)}}/>}
                      />
                    <FormControlLabel
                        key='iolinenum'
                        label='Input, Output lineNumber'
                        control={<Checkbox color="secondary" checked={lineNum} onChange={()=>{setLineNum(!lineNum)}}/>}
                      />
                <Box sx={{ width: 170, mt: '1rem', gridRow: '1 / span 2', gridColumn: '2 / span 1'}}>
                 <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                        <Select
                          labelid="demo-simple-select-label"
                          id="demo-simple-select"
                          value={theme}
                          label='theme'
                          onChange={handleThemeChange}
                        >
                            {Object.keys(themeList).map((x, idx)=>(
                              <MenuItem key={idx} value={x}>{x}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>                   
                    </Box>
                <div id='btn' style={{gridRow: '1 / span 2', gridColumn: '3 / span 1', display: 'flex', justifyContent: 'start'}}>
                    <Button onClick={handleSaveConfig} sx={{width: '45%', height: '3rem', m: '1rem 1rem 1rem 0'}} variant="contained" color="secondary">
                      save
                    </Button>
                    <Button onClick={handleDefaultConfig} sx={{width: '45%', height: '3rem', m: '1rem 0'}} variant="contained" color="primary">
                      default
                    </Button>
                </div>
                </div>
            </Card>
        </React.Fragment>
    );
}
 
export default Settion;

