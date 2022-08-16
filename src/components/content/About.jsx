import * as React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Snackbar, Alert} from '@mui/material'

function About() {
    const [time, setTime] = React.useState(1);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState('');

    function handleClick() {
        if ( time < 10 ) {
            setTime(time + 1);
        } else {
            setTime(1);
            let yep = localStorage.getItem('yep');
            if (yep === null || yep === undefined) {
                localStorage.setItem('yep', 'yep');
                setSnackMsg('咩~ 这是啥? ᏊᵋꈊᵋᏊ')
                setSnackBarOpen(true);
            } else {
                localStorage.removeItem('yep');
                setSnackMsg('咩~')
                setSnackBarOpen(true);
            }
        }
    }
    return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackBarOpen}
                    onClose={()=>{setSnackBarOpen(false)}}
                    autoHideDuration={3000}
                >
                    <Alert onClose={()=>{setSnackBarOpen(false)}} severity='info' sx={{ width: '100%' }}>
                        {snackMsg}
                    </Alert>
                </Snackbar>
        <Card onClick={handleClick} sx={{ maxWidth: 400, margin: '12% auto 0 auto' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://avatars.githubusercontent.com/u/94043894"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                (๑•̀ㅁ•́ฅ✧ 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hi, 我是开发者 <a className='perfectA' href='https://github.com/mosqu1t0'>mosquito</a>: <br/>&emsp;本站是个十分轻量的在线ide，基本上只是为了我个人方便使用而存在的，当然十分欢迎你的光临！但是由于个人的技术和财力不足(说不定明天就关闭了)，网站还存在许多许多许多不足，希望你能海涵，善待本站，多谢了。(・∀・)
                <br/>&emsp;<b>为了你的数据安全，还请不要把重要或敏感的信息以任何方式存储在本站，倘若丢失后果自负喔。</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </React.Fragment>
      );
}

export default About;
