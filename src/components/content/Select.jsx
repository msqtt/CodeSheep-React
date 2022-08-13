import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';


import { useSelector, useDispatch } from 'react-redux';

import ACTIONS from '../redux/aciton';


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
          <MenuItem value={'c'}>c</MenuItem>
          <MenuItem value={'cpp'}>
            <em>cpp</em>
          </MenuItem>
          <MenuItem value={'golang'}>golang</MenuItem>
          <MenuItem value={'python'}>python</MenuItem>
          <MenuItem value={'javascript'}>javascript</MenuItem>
        </Select>
      </FormControl>
  );
}
