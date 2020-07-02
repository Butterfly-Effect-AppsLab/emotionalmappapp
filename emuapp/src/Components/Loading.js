import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { WHITE, RED } from '../utils/colours';
import { ReactComponent as LargeWhiteLogo } from '../icons/logo_white_large.svg';
import { ReactComponent as WhiteName } from '../icons/name_white.svg';


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
        display: 'block',
    },
    text: {
        fontSize: '2.2vh',
        color: WHITE,
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    logo: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 162,
        maxHeight: 170,
    },
    name: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
});

const Loading = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <LargeWhiteLogo className={classes.logo} />
            </div>
            <div>
                <WhiteName className={classes.name} />
            </div>
            <Typography className={classes.text}>
                Budujeme lepšie mesto
                </Typography>
        </div>
    )
}

export default Loading;