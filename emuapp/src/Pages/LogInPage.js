import React from 'react';
import { makeStyles } from '@material-ui/core';
import { WHITE, BLACK, DARKBLUE, RED } from '../utils/colours';
import { ReactComponent as LargeLogo } from '../icons/logo_large.svg';
import ButtonTemplate from '../Components/ButtonTemplate';

const useStyles = makeStyles({
    layout: {
        height: '100vh',
        paddingLeft: '10vw',
        paddingRight: '10vw',
        paddingTop: '10vh',
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        position: "absolute",
        left: '10vw',
        right: '10vw',
    }
});

const LogInPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <LargeLogo className={classes.logo} />
            <div className={classes.button} style={{bottom: '30vh'}}>
                <ButtonTemplate variant="outlined" background={WHITE} textColor={BLACK} isDisabled={false} text={'Prihlásiť cez Google'} path={'/registration'} />
            </div>
            <div className={classes.button} style={{bottom: '20vh'}}>
                <ButtonTemplate variant="outlined" background={DARKBLUE} textColor={WHITE} isDisabled={false} text={'Prihlásiť cez Facebook'} path={'/registration'} />
            </div>
            <div className={classes.button} style={{bottom: '10vh'}}>
                <ButtonTemplate variant="text" background={WHITE} textColor={RED} isDisabled={false} text={'Pokračovať bez prihlásenia'} path={'/'} />
            </div>
        </div>
    )

};

export default LogInPage;