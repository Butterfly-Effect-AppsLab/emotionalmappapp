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
    },
    text: {
        fontSize: '2.2vh',
        color: WHITE,
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // justifyContent: 'center',
        // textAlign: 'center',
    },
    logo: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
                <LargeWhiteLogo className={classes.logo} />
                <WhiteName className={classes.name}/>
                <Typography className={classes.text}>
                    Budujeme lepšie mesto
                </Typography>
            </div>
        )
}

export default Loading;