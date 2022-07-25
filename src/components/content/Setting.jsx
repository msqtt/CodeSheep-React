import * as React from 'react'

import { Component } from 'react';

import { Typography, Card } from '@mui/material';

class Settion extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <header style={{marginTop: `calc(3rem + 4px)`}}></header>
                <Typography sx={{marginBottom: '12px'}} variant="h5" gutterBottom component="div">
                    Settion 
                </Typography>
                <Card variant="outlined">

                </Card>
            </React.Fragment>
        );
    }
}
 
export default Settion;
