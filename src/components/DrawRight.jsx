import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import CodeIcon from '@mui/icons-material/Code';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SaveIcon from '@mui/icons-material/Save';
import LoginIcon from '@mui/icons-material/Login';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';


import ACTIONS from './redux/aciton';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));


export default function PersistentDrawerRight(props) {
  const loginStatus = useSelector(state=>state.LoginStatus);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('time');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    dispatch({type: ACTIONS.SETLOGIN, bool: false});
  }

  const checkLoginText = (text) => {
    if (loginStatus){
        let email = localStorage.getItem('email');
        if (text === 'Login') return email;
        if (text === 'Register') return 'Logout';
    } else {
        return text
    }
  }

  const loginFunction = (text) => {
    if (text === 'Login') return ()=>{navigator('/Setting')};
    else return handleLogout;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }} component="div">
            Ꮚ`ꈊ´Ꮚ&nbsp;Code Sheep
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
            <header style={{marginTop: '2.5rem'}}></header>
          {props.children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Coding', 'Saving', 'Setting'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>{navigator(`/${text}`);}} disabled={text === 'Saving' && !loginStatus}>
                <ListItemIcon>
                    {index === 0 && <CodeIcon/>}
                    {index === 1 && <SaveIcon/>}
                    {index === 2 && <SettingsApplicationsIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Login', 'Register'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={!loginStatus ?  ()=>{navigator(`/${text}`)} : loginFunction(text)}>
                <ListItemIcon>
                    {index === 0 && ( !loginStatus ? <LoginIcon /> : <PersonIcon /> )}
                    {index === 1 && ( !loginStatus ? <ArrowUpwardIcon /> : <LogoutIcon /> )}
                </ListItemIcon>
                <ListItemText primary={checkLoginText(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
