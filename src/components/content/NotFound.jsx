import * as React from 'react'

import { Component } from 'react';

import Typography from '@mui/material/Typography';


class NotFound extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px'}}>
                    <Typography color='primary' variant="h1" component="div" gutterBottom>
                        404
                    </Typography>
                    <Typography color='primary' variant="h5" component="div" gutterBottom>
                        <em>Oops, 没有更多内容啦！ ∑(￣□￣)</em>
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
}
 
export default NotFound;
