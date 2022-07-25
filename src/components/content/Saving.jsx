import * as React from 'react'

import { Component } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Button, Typography } from '@mui/material';


const createData = (name, language, time) => {
  return { name, language, time};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
]
class Saving extends Component {


    state = {  }

    render() { 
        return ( 
            <React.Fragment>
            <header style={{marginTop: `calc(3rem + 4px)`}}></header>
            <Typography sx={{marginBottom: '12px'}} variant="h5" gutterBottom component="div">
                Saving 
            </Typography>

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
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.language}</TableCell>
                          <TableCell align="left">{row.time}</TableCell>

                          <TableCell align="right">
                          <Button variant="contained" color="secondary">打开</Button>
                          &emsp;
                          <Button variant="contained" color="error">删除</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Card>
            </React.Fragment>
        );
    }
}
 
export default Saving;
