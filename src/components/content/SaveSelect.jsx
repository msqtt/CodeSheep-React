import * as React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {LangFuntionMap} from '../utils/config';


function SaveSelect(props) {
const [lang, setLang] = React.useState('');

  const handleChange = (event) => {
    setLang(event.target.value);
    props.setPropsLang(event.target.value)
  };

  return (
      <FormControl variant="standard" sx={{ margin: '4px', minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={lang}
          onChange={handleChange}
          label="Language"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {Object.keys(LangFuntionMap).map(idx => (<MenuItem key={idx} value={idx}>{idx}</MenuItem>))}
        </Select>
      </FormControl>
  );
}

export default SaveSelect;
