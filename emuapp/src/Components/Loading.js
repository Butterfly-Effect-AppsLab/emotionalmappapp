import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { WHITE, RED } from '../utils/colours';
import { ReactComponent as LargeWhiteLogo } from '../icons/logo_large_white.svg';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        background: RED,
        position: 'absolute',
        top: 0,
        zIndex: 1100,
    },
    text: {
        fontSize: 18,
        color: WHITE,
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // justifyContent: 'center',
        // textAlign: 'center',
    },
    logo: {
        // marginBottom: 50,
        // position: 'absolute',
        // bottom: 30,
    },
});

const Loading = () => {
    const classes = useStyles();

        return (
            <div className={classes.root}>
                <LargeWhiteLogo className={classes.logo} />
                <Typography className={classes.text}>
                    Budujeme lepšie mesto
            </Typography>
            </div>
        )
}

export default Loading;