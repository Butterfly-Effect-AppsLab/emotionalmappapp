import React from 'react';
import { makeStyles } from '@material-ui/core';
import { WHITE, BLACK, RED } from '../utils/colours';
import { ReactComponent as Logo } from '../icons/logo_red_large.svg';
import { ReactComponent as RedName } from '../icons/name_red.svg';
import ButtonTemplate from '../Components/ButtonTemplate';
import history from '../utils/history'

const useStyles = makeStyles({
    layout: {
        height: '100vh',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'block'
    },
    button: {
        position: "absolute",
        left: '10vw',
        right: '10vw',
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
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
});

const LogInPage = () => {
    const classes = useStyles();

    const onButtonClick = () => {
        history.push('/')
    };

    return (
        <div className={classes.layout}>
            <div>
                <Logo className={classes.logo} />
            </div>
            <div>
                <RedName className={classes.name}/>
            </div>
            <div className={classes.button} style={{ bottom: '20vh' }}>
                <ButtonTemplate variant="outlined" background={WHITE} textColor={BLACK} isDisabled={false} text={'Prihlásiť cez Google'} path={'/glogin'} />
            </div>
            <div className={classes.button} style={{ bottom: '10vh' }}>
                <ButtonTemplate variant="text" background={WHITE} textColor={RED} isDisabled={false} text={'Pokračovať bez prihlásenia'} onButtonClick={() => { onButtonClick() }} />
            </div>
        </div>
    )

};

export default LogInPage;