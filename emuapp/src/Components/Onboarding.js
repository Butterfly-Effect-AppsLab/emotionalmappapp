import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { makeStyles, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { DARKGRAY } from '../utils/colours';
import {ReactComponent as SmallLogo} from '../icons/logo_small.svg'



const useStyles = makeStyles({
    root: {
        height: '100vh',
        justifyContent: 'center',
        textAlign: 'center',

    },
    title: {
        fontSize: 28,
        marginTop: '20%',
        marginBottom: '20%'
    },
    swipe: {
        height: '100vh',
        paddingLeft: 70,
        paddingRight: 70,
    },
    text: {
        fontSize: 12,
    }
});

const Onboarding = () => {
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
                    <SmallLogo />
                    <Box fontWeigh={500}>
                        <Typography variant='h5' className={classes.title}>
                            Vitajte v aplikácii BratisLOVE!
                        </Typography>
                    </Box>
                    <Typography variant='subtitle1' className={classes.text}>
                        Pomôžte nám budovať lepšie mesto. Vyjadrite svoj názor v prieskumoch a sledujte dianie vo vašom meste.
                    </Typography>
                </div>
                <div className={classes.swipe}>
                    <Typography variant='h5' className={classes.title}>
                        Personalizované mestské správy
                    </Typography>
                </div>
                <div className={classes.swipe}>
                    <Typography variant='h5' className={classes.title}>
                        Prieskumy a ankety
                    </Typography>
                    {/* <Button component={Link} to="/registration" className={classes.button} variant="outlined" color="primary"> */}
                    {/* Poď do toho! */}
                    {/* </Button> */}
                </div>
            </Swiper>
            {/* <Button component={Link} to="/registration" className={classes.skip}>Preskočiť</Button> */}
        </div>
    )
}

export default Onboarding;