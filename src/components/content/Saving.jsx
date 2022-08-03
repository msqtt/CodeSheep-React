import * as React from 'react'

import { Component } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Button, Typography } from '@mui/material';
import { Box, Skeleton, Pagination, Snackbar, Alert } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

import { connect } from 'react-redux';

import ACTIONS from '../redux/aciton';
import { GET, DELETE } from '../utils/request';
import {Navigate} from 'react-router-dom';

const createData = (fileName, language, time, code, input) => {
  return { fileName, language, time, code, input};
}



class Saving extends Component {


    state = { 
        loadCode: false,
        pageNum: 1,
        pageSize: 1,
        deleteWindow: false,
        openWindow: false,
        seleteCodeType: '',
        seleteCodeName: '',
        resMsg: '',
        snackBarOpen: false,
        statusType: 'success',
        navigate: false,

        rows: [
          createData('ready1', '???', 0, null, null),
          createData('ready2', '???', 0, null, null),
          createData('ready3', '???', 0, null, null), createData('ready4', '???', 0, null, null),
          createData('ready5', '???', 0, null, null),
          createData('ready6', '???', 0, null, null),
        ]
    }


    componentDidMount = async () => {
        let pageNum = this.state.pageNum;
        let data = await GET(`/api/codes/5/${pageNum}`, null, null)

        if (data !== null){
            let rows = data.list.map(code =>{
                code.time = code.time.replace('T', ' ');
                return code;
            });

            this.setState({pageSize: data.pages, rows, loadCode: true});
            if (data.pages === 0){
                this.handleSnackMsg(0, "(｀・ω´・ 你还没有保存的代码，快去试试");
            }
        }

    }

    handleChangePage = async (event, value) => {
        let data = await GET(`/api/codes/5/${value}`, null, null)

        if (data !== null){

            let rows = data.list.map(code =>{
                code.time = code.time.replace('T', ' ');
                return code;
            });

            this.setState({pageSize: data.pages, rows, pageNum: value});
        }
    }

    handleSnackClose = () => {
        this.setState({snackBarOpen: false});
    }

    handleSnackMsg = (type, msg) => {
        let statusType = '';
        if (type === 0) statusType = 'info';
        if (type === 200) statusType = 'success';
        if (type ===  300) statusType = 'warning';
        if (type === 400) statusType = 'error';
        this.setState({statusType, resMsg: msg, snackBarOpen: true});
    }

    handleDeleteBtn = (row) => {
        this.setState({deleteWindow: true, seleteCodeType: row.language, seleteCodeName: row.fileName});
    }

    handleDeletConfirmBtn = async () => {
        let fileName = this.state.seleteCodeName;
        let language = this.state.seleteCodeType;

        let fileNameP = this.props.fileName;
        let languageP = this.props.language;
        if (this.props.updateCode && languageP === language && fileNameP === fileName){
            this.props.setUpdateCode(false);
            this.props.setOpenCodeStatus('');
        }
        this.setState({deleteWindow: false});
        let data = await DELETE(`/api/code/${language}/${fileName}`, null, null);

        if (data !== ''){
            this.handleChangePage(null, this.state.pageNum);
            this.handleSnackMsg(data.code, data.msg);
        } else {
            this.handleSnackMsg(400, '出现了很奇怪的错误，没返回数据嗷 （´(ｪ)｀）');
        }
    }

    handleOpenBtn = async (row) => {
        if (this.props.updateCode || this.props.codeText !== ''){
            if (this.props.updateCode && this.props.language === row.language && this.props.fileName === row.fileName){
                this.handleSnackMsg(0, '该代码已经打开了喔 (´･д･｀)');
                return;
            }
            this.setState({openWindow: true, seleteCodeType: row.language, seleteCodeName: row.fileName});
        } else {
            let language = row.language;
            let fileName = row.fileName;

            let data = await GET(`/api/code/${language}/${fileName}`, null, null);

            if (data !== ''){
                this.handleSnackMsg(data.code, data.msg);

                if (data.code === 200){
                    this.props.openCode(data.content);
                    this.props.selectLanguage(language);
                    this.props.setUpdateCode(true);
                    this.props.setOpenCodeStatus(row.fileName);
                    this.setState({navigate: true});
                }
            }
        }
    }

    handleOpenConfirmBtn = async () => {
        let language = this.state.seleteCodeType;
        let fileName = this.state.seleteCodeName;

        let data = await GET(`/api/code/${language}/${fileName}`, null, null);

        if (data !== ''){
            this.handleSnackMsg(data.code, data.msg);

            if (data.code === 200){
                this.props.openCode(data.content);
                this.props.selectLanguage(language);
                this.props.setUpdateCode(true);
                this.props.setOpenCodeStatus(fileName);
                this.setState({navigate: true});
            } else {
                this.setState({openWindow: false});
            }
        }
    }

    render() { 
        return ( 
            <React.Fragment>
            {this.state.navigate && <Navigate to='/'></Navigate>}
            <header style={{marginTop: `calc(3rem + 4px)`}}></header>
            <Typography sx={{marginBottom: '12px'}} variant="h5" gutterBottom component="div">
                Saving 
            </Typography>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={this.state.snackBarOpen}
                onClose={this.handleSnackClose}
                autoHideDuration={3000}
            >
                <Alert onClose={this.handleSnackClose} severity={this.state.statusType} sx={{ width: '100%' }}>
                    {this.state.resMsg}
                </Alert>
            </Snackbar>
            <Dialog open={this.state.deleteWindow}>
                <DialogTitle>Delete Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        确定要删除代码: {`${ this.state.seleteCodeName } (${this.state.seleteCodeType})`} 吗?
                    </DialogContentText>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                        <Button onClick={this.handleDeletConfirmBtn} sx={{width: '45%', height: '3rem'}} variant="contained" color="secondary">
                          Delete
                        </Button>
                        <Button sx={{width: '45%', height: '3rem'}} onClick={()=>{this.setState({deleteWindow: false})}} variant="contained" color="primary">
                          Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={this.state.openWindow}>
                <DialogTitle>Open Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        还有代码正在编辑呢，如果打开它会被覆盖掉喔，确认要打开吗？
                    </DialogContentText>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                        <Button onClick={this.handleOpenConfirmBtn} sx={{width: '45%', height: '3rem'}} variant="contained" color="secondary">
                          Open
                        </Button>
                        <Button sx={{width: '45%', height: '3rem'}} onClick={()=>{this.setState({openWindow: false})}} variant="contained" color="primary">
                          Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Card variant="outlined">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>FileName</TableCell>
                        <TableCell align="left">Language</TableCell>
                        <TableCell align="left">Time</TableCell>
                        <TableCell align="right">Action&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rows.map((row) => (
                        <TableRow
                          key={row.fileName + '' + row.language}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {this.state.loadCode ? row.fileName : (<Skeleton variant="text"  height={32} />) }
                          </TableCell>
                          <TableCell align="left">{this.state.loadCode ? row.language : (<Skeleton variant="text"  height={32}/>)}</TableCell>
                          <TableCell align="left">{this.state.loadCode ? row.time : (<Skeleton variant="text"  height={32}/>)}</TableCell>

                          <TableCell align="right">
                          {this.state.loadCode ? <div><Button variant="contained" color="secondary" onClick={()=>this.handleOpenBtn(row)}>打开</Button>
                              &emsp;
                              <Button variant="contained" color="error" onClick={()=>{this.handleDeleteBtn(row)}}>删除</Button></div> : <Skeleton variant="rectangular"  height={32} />}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Card>
            <Box sx={{display: 'flex', justifyContent: 'center', margin: '2rem 0'}}>
              <Pagination count={this.state.pageSize} color="secondary" size='large' onChange={this.handleChangePage}/>
            </Box>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        updateCode: state.UpdateCode,
        codeText: state.CodeContent,
        language: state.Language,
        fileName: state.OpenedCodeName
    }
}

const mapDispatchToProps = {
    openCode: (code) => {
        return {
            type: ACTIONS.SETCODE,
            code
        }
    },
    selectLanguage: (lang)=>{
        return {
            type: ACTIONS.SELECT_LANG,
            lang
        }
    },
    setUpdateCode: (bool) => {
        return {
            type: ACTIONS.UPDATECODE,
            bool
        }
    },
    setOpenCodeStatus: (name) => {
        return {
            type: ACTIONS.OPENCODE,
            name,
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)( Saving );
