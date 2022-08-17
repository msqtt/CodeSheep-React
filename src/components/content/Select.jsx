import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';


import { useSelector, useDispatch } from 'react-redux';

import ACTIONS from '../redux/aciton';
import {LangFuntionMap} from '../utils/config';


export default function SelectAutoWidth() {
    const lang = useSelector(state => state.Language);
    const dispatch = useDispatch();


  return (
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">lang</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={lang}
          onChange={(e) => dispatch({ type: ACTIONS.SELECT_LANG, lang: e.target.value})}
          autoWidth
          label="lang"
          sx={{height: '2.5rem'}}
        > 
          {Object.keys(LangFuntionMap).map(idx => (<MenuItem key={idx} value={idx}>{idx === 'cpp' ? <em>cpp</em> : idx}</MenuItem>))}
        </Select>
      </FormControl>
  );
}
