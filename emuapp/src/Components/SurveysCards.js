import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonTemplate from '../Components/ButtonTemplate'
import { RED, WHITE } from '../utils/colours';
import history from '../utils/history';
import { ReactComponent as SurveyIcon } from '../icons/prieskum_icon.svg';
import { ReactComponent as PollIcon } from '../icons/anketa_icon.svg';
import { ReactComponent as TimeIcon } from '../icons/time.svg';
import { ReactComponent as FilledCountIcon } from '../icons/filled_count.svg';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
    },
    text: {
        marginBottom: 10,
        marginTop: 0

    },
    label: {
        marginTop: 10,
        marginBottom: 0,
    },
    button: {
        justifyContent: 'center'
    },
    card: {
        borderRadius: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        marginLeft: 20,
    },
    iconDiv: {
        width: '10vw',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'inline-block',
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
            <div key={i}>
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
                                <Typography className={classes.text} style={{ fontWeight: 'bold' }} variant="h5" component="h2">
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
                                    30.5.2020 do 20:00
                                </Typography>
                            </div>
                        </div>
                        <Typography className={classes.text} variant="body2" component="p">
                            2700 hlasovalo
                        </Typography>
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
        <>
            {surveys.map((survey, i) => renderCard(survey, i))}
        </>

    );
}

export default SurveysCards;
