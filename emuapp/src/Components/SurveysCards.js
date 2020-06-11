import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonTemplate from '../Components/ButtonTemplate'
import { RED, WHITE, DARKGRAY } from '../utils/colours';
import history from '../utils/history';
import { ReactComponent as SurveyIcon } from '../icons/prieskum_icon.svg';
import { ReactComponent as PollIcon } from '../icons/anketa_icon.svg';
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
        justifyContent: 'center'
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
    }

});

const SurveysCards = (props) => {
    const { surveys } = props
    const classes = useStyles();

    const onButtonClick = (id) => {
        history.push('/surveys/' + id)
    }

    const renderCard = (survey, i) => {
        return (
            <div>
                <Card className={classes.root}
                    variant="outlined"
                    classes={{ root: classes.card }}
                >
                    <CardContent>
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
                        {<ButtonTemplate variant="contained"
                            background={RED}
                            textColor={WHITE}
                            isDisabled={0}
                            text={'Vyplniť prieskum'}
                            onButtonClick={() => { onButtonClick(survey.id) }}
                        >
                        </ButtonTemplate>}
                    </CardActions>
                </Card>
            </div>
        );
    };

    return (
        <div style={{marginTop: 10}}>
            {surveys.map((survey, i) => renderCard(survey, i))}
        </div>

    );
}

export default SurveysCards;
