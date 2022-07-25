import * as React from 'react';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function ScrollTop(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
          '#back-to-top-anchor',
        );
        if (anchor) {
          anchor.scrollIntoView({
            block: 'center',
          });
        }
  };

    return (
        <Fade {...props} in={trigger} onClick={handleClick}>
                {children}
        </Fade>
    );


}
