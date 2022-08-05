import { createTheme } from "@mui/material/styles";

const myTheme = createTheme({
    status: {
        danger: '#e53e3e',
      },
  palette: {
    primary: {
      light: '#4f5358',
      main: '#24292f',
      dark: '#191c20',
      contrastText: '#fff',
    },
    secondary: {
      light: '#57b671',
      main: '#2da44e',
      dark: '#1f7236',
      contrastText: '#fff',
    },
  },
}) 

export default myTheme;
