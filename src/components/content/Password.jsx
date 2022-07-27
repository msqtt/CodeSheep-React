import * as React from 'react'

import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = React.forwardRef((props, ref) => {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    
    let passwd = event.target.value;
    let passwdReg = /^\w{6,16}$/;

    if (passwd !== '' && !passwdReg.test(passwd)){
        if (!props.error)
            props.seterror(true);
    } else {
        if (props.error)
            props.seterror(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return ( 
          <FormControl sx={{ m: 1, width: '14.5rem' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{props.hold}</InputLabel>
          <OutlinedInput
            {...props}
            seterror=''
            ref={ref}
            realref=''
            inputRef={props.realref}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    );
});
 

export default Password;
