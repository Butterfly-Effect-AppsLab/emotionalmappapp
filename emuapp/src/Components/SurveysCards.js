import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonTemplate from '../Components/ButtonTemplate'
import { RED, WHITE, DARKGRAY } from '../utils/colours';
import history from '../utils/history';
import { ReactComponent as SurveyIcon } from '../icons/survey_icon.svg';
import { ReactComponent as SurveyIconClosed } from '../icons/survey_icon_closed.svg';
import { ReactComponent as TimeIcon } from '../icons/time.svg';
import { ReactComponent as FilledCountIcon } from '../icons/filled_count.svg';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
    },
    title: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold'
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold'
    },
    label: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: DARKGRAY,
    },
    button: {
        justifyContent: 'center',
        marginBottom: 10,
    },
    card: {
        borderRadius: 20,
    },
    row: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        marginLeft: 20,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    iconDiv: {
        width: '10vw',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    icon: {
        verticalAlign: 'middle',
    },
    content: {
        paddingBottom: 0,
    },
    thanksTitle: {
        marginTop: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    thanksText: {
        marginTop: 'auto',
        marginTop: 20,
        marginBottom: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: '5vh',
    },
    closedTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    line: {
        borderRadius: 20,
        width: '80vw',
        marginTop: 30,
        height: 0,
    },
});

const SurveysCards = (props) => {
    const { surveys } = props
    const classes = useStyles();
    // const [activeCounter, setActiveCounter] = React.useState(0);
    let activeCounter = 0;
    let closedCounter = 0;

    const onButtonClick = (id) => {
        history.push('/surveys/' + id)
    }

    useEffect(() => {
    }, [activeCounter]);

    const renderActiveCard = (survey, i) => {
        if (!moment().isAfter(survey.active_to)) {
            activeCounter = activeCounter + 1;
            return (
                <div>
                    <Card className={classes.root}
                        variant="outlined"
                        classes={{ root: classes.card }}
                    >
                        <CardContent className={classes.content}>
                            <div className={classes.row}>
                                <div className={classes.iconDiv}>
                                    <SurveyIcon />
                                </div>
                                <div className={classes.column}>
                                    <Typography className={classes.label} variant="body2" component="p">
                                        Prieskum
                                </Typography>
                                    <Typography className={classes.title} variant="h5" component="h2">
                                        {survey.title}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.iconDiv}>
                                    <TimeIcon />
                                </div>
                                <div className={classes.column}>
                                    <Typography className={classes.label} variant="body2" component="p">
                                        Aktívne do
                                </Typography>
                                    <Typography className={classes.text} variant="subtitle2" component="p">
                                        {moment(survey.active_to).format('DD.MM.YYYY, kk:mm')}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.iconDiv}>
                                    <FilledCountIcon />
                                </div>
                                <div className={classes.column}>
                                    <Typography className={classes.label} variant="body2" component="p">
                                        {survey.answer_count} hlasovalo
                                </Typography>
                                </div>
                            </div>
                        </CardContent>
                        <CardActions className={classes.button}>
                            <ButtonTemplate variant="contained"
                                background={RED}
                                textColor={WHITE}
                                isDisabled={0}
                                text={'Vyplniť prieskum'}
                                onButtonClick={() => { onButtonClick(survey.id) }}
                            >
                            </ButtonTemplate>
                        </CardActions>
                    </Card>
                </div>
            )
        }
        else return null
    };

    const renderClosedCard = (survey, i) => {
        if (moment().isAfter(survey.active_to)) {
            closedCounter = closedCounter + 1;
            return (
                <div>
                    <Card className={classes.root}
                        variant="outlined"
                        classes={{ root: classes.card }}
                    >
                        <CardContent className={classes.content}>
                            <div className={classes.row}>
                                <div className={classes.iconDiv}>
                                    <SurveyIconClosed />
                                </div>
                                <div className={classes.column}>
                                    <Typography className={classes.label} variant="body2" component="p">
                                        Prieskum
                                </Typography>
                                    <Typography className={classes.title} variant="h5" component="h2">
                                        {survey.title}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.iconDiv}>
                                    <TimeIcon />
                                </div>
                                <div className={classes.column}>
                                    <Typography className={classes.label} variant="body2" component="p">
                                        Aktívne do
                                </Typography>
                                    <Typography className={classes.text} variant="subtitle2" component="p">
                                        Prieskum je uzavretý
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.iconDiv}>
                                    <FilledCountIcon />
                                </div>
                                <div className={classes.column}>
                                    <Typography className={classes.label} variant="body2" component="p">
                                        {survey.answer_count} hlasovalo
                                </Typography>
                                </div>
                            </div>
                        </CardContent>
                        {/* <CardActions className={classes.button}>
                            <ButtonTemplate variant="contained"
                                background={RED}
                                textColor={WHITE}
                                isDisabled={0}
                                text={'Vyplniť prieskum'}
                                onButtonClick={() => { onButtonClick(survey.id) }}
                            >
                            </ButtonTemplate>
                        </CardActions> */}
                    </Card>
                </div>
            )
        }
        else return null
    };

    const renderThankYouActive = () => {
            return (
                <div className={classes.root}>
                    <Typography className={classes.thanksTitle} variant="h5" component="h2">
                        Ďakujeme za záujem
                    </Typography>
                    <Typography className={classes.thanksText} variant="subtitle2" component="p">
                        Momentálne neprebiehajú žiadne nové prieskumy
                    </Typography>
                </div>
            )
    };

    const renderThankYouClosed = () => {
        return (
            <div className={classes.root}>
                <Typography className={classes.thanksText} variant="subtitle2" component="p">
                    Neevidujeme žiadne uzavreté prieskumy
                </Typography>
            </div>
        )
};

    return (
        <>
            {surveys.map((survey, i) => renderActiveCard(survey, i))}
            {activeCounter === 0 ? renderThankYouActive() : null}
            <hr className={classes.line} />
            <Typography className={classes.closedTitle} variant="h5" component="h2">
                Uzavreté prieskumy
            </Typography>
            {surveys.map((survey, i) => renderClosedCard(survey, i))}
            {closedCounter === 0 ? renderThankYouClosed() : null}
        </>

    );
}

export default SurveysCards;
