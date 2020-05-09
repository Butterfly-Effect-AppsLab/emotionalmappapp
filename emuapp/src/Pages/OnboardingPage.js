import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { DARKGRAY, WHITE, BLACK, DARKBLUE } from '../utils/colours';
import { ReactComponent as SmallLogo } from '../icons/logo_small.svg';
import { ReactComponent as LargeLogo } from '../icons/logo_large.svg';
import ButtonTemplate from '../Components/ButtonTemplate';

const useStyles = makeStyles({
    root: {
        height: '100vh',
        justifyContent: 'center',
        textAlign: 'center',

    },
    title: {
        fontSize: 28,
        marginBottom: 50,
        fontWeight: 500,
    },
    swipe: {
        height: '100vh',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 150,
        paddingBottom: 150
    },
    text: {
        fontSize: 12,
    },
    logo: {
        marginBottom: 50,
    },
});

const OnboardingPage = () => {
    const classes = useStyles();
    const params = {
        pagination: {
            el: '.swiper-pagination',
            renderBullet: () => {
                return '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" style="background-color:' + DARKGRAY + '; border-color:' + DARKGRAY + '; border-radius: 50%; border-style: solid; border-width: 1px; width: 8px; height: 8px; display: inline-block; margin: 10px;"></span>';
            }
        },
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
                </div>
                <div className={classes.swipe}>
                    <SmallLogo className={classes.logo} />
                    <Typography variant='h5' className={classes.title}>
                        Personalizované mestské správy
                    </Typography>
                    <Typography variant='subtitle1' className={classes.text}>
                        Zostaňte v obraze vďaka mestským správam na mieru. Vyberte si vaše záujmy a sledujte to, čo vás skutočne zaujíma.
                    </Typography>
                </div>
                <div className={classes.swipe}>
                    <SmallLogo className={classes.logo} />
                    <Typography variant='h5' className={classes.title}>
                        Prieskumy a ankety
                    </Typography>
                    <Typography variant='subtitle1' className={classes.text}>
                        Zapojte sa do prieskumov a ankiet a ovplyvnite tak priamo dianie vo vašom meste. Vyjadrite svoj názor, chceme ho počuť.
                    </Typography>
                </div>
                <div className={classes.swipe}>
                    <LargeLogo className={classes.logo} />
                    <div style={{marginTop: 100, marginBottom: 15}}>
                        <ButtonTemplate  background={WHITE} textColor={BLACK} isDisabled={false} text={'Prihlásiť cez Google'} path={'/registration'}/>
                    </div>
                    <div style={{marginBottom: 30}}> 
                        <ButtonTemplate  background={DARKBLUE} textColor={WHITE} isDisabled={false} text={'Prihlásiť cez Facebook'} path={'/registration'}/>
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default OnboardingPage;