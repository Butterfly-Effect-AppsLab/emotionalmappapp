import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { DARKGRAY, WHITE, RED } from '../utils/colours';
import { ReactComponent as SmallLogo } from '../icons/logo_small.svg';
import ButtonTemplate from '../Components/ButtonTemplate';
import history from '../utils/history'

const useStyles = makeStyles({
    root: {
        height: '100vh',
        justifyContent: 'center',
        textAlign: 'center',
    },
    swipe: {
        height: '100vh',
        paddingLeft: '10vw',
        paddingRight: '10vw',
        paddingTop: '10vh',
    },
    logo: {
        marginBottom: "10vh"
    },
    title: {
        fontSize: 28,
        marginBottom: "5vh",
        fontWeight: 500,
    },
    text: {
        fontSize: 12,
        marginBottom: "40vh"
    },
    button: {
        position: "absolute",
        bottom: '10vh',
        left: '10vw',
        right: '10vw',
    }
});

const OnboardingPage = () => {
    const classes = useStyles();
    const params = {
        pagination: {
            el: '.swiper-pagination',
            renderBullet: () => {
                return '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" style="background-color:' + DARKGRAY + '; border-color:' + DARKGRAY + '; border-radius: 50%; border-style: solid; border-width: 1px; width: 8px; height: 8px; display: inline-block; margin: 10px;"></span>';
            },
            clickable: true,
        },
        clickable: true,
    };

    const onButtonClick = () => {
        history.push('/login')
    };


    return (
        <div className={classes.root}>
            <Swiper {...params}>
                <div className={classes.swipe}>
                    <SmallLogo className={classes.logo} />
                    <Typography variant='h5' className={classes.title}>
                        Vitajte v aplikácii BratisLOVE!
                    </Typography>
                    <Typography variant='subtitle1' className={classes.text}>
                        Pomôžte nám budovať lepšie mesto. Vyjadrite svoj názor v prieskumoch a sledujte dianie vo vašom meste.
                    </Typography>
                    <div className={classes.button}>
                        <ButtonTemplate variant="text" background='transparent' textColor={RED} isDisabled={false} text={'Preskočiť'} onButtonClick={() => { onButtonClick() }} />
                    </div>
                </div>
                <div className={classes.swipe}>
                    <SmallLogo className={classes.logo} />
                    <Typography variant='h5' className={classes.title}>
                        Personalizované mestské správy
                    </Typography>
                    <Typography variant='subtitle1' className={classes.text}>
                        Zostaňte v obraze vďaka mestským správam na mieru. Vyberte si vaše záujmy a sledujte to, čo vás skutočne zaujíma.
                    </Typography>
                    <div className={classes.button}>
                        <ButtonTemplate variant="text" background={WHITE} textColor={RED} isDisabled={false} text={'Preskočiť'} onButtonClick={() => { onButtonClick() }} />
                    </div>
                </div>
                <div className={classes.swipe}>
                    <SmallLogo className={classes.logo} />
                    <Typography variant='h5' className={classes.title}>
                        Prieskumy a ankety
                    </Typography>
                    <Typography variant='subtitle1' className={classes.text}>
                        Zapojte sa do prieskumov a ankiet a ovplyvnite tak priamo dianie vo vašom meste. Vyjadrite svoj názor, chceme ho počuť.
                    </Typography>
                    <div className={classes.button}>
                        <ButtonTemplate variant="outlined" background={WHITE} textColor={RED} isDisabled={false} text={'Začnite'} primary={true} onButtonClick={() => { onButtonClick() }} />
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default OnboardingPage;