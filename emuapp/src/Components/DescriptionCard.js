import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { RED, WHITE, DARKGRAY } from '../utils/colours';
import { ReactComponent as SurveyIcon } from '../icons/prieskum_icon.svg';
import { ReactComponent as PollIcon } from '../icons/anketa_icon.svg';
import { ReactComponent as TimeIcon } from '../icons/time.svg';
import { ReactComponent as FilledCountIcon } from '../icons/filled_count.svg';
import { ReactComponent as LocationIcon } from '../icons/location.svg';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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
    description: {
        marginTop: '3vh',
        marginBottom: 'auto',
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
    const { survey } = props
    const classes = useStyles();

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
                                Hlasovalo
                                        </Typography>
                            <Typography className={classes.text} variant="subtitle2" component="p">
                                {survey.answer_count} obyvateľov
                                        </Typography>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.iconDiv}>
                            <LocationIcon />
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.label} variant="body2" component="p">
                                Lokalita
                                        </Typography>
                            <Typography className={classes.text} variant="subtitle2" component="p">
                                {survey.residence_region, survey.work_region} PLACEHOLDERS
                                        </Typography>
                        </div>
                    </div>
                    <Typography className={classes.description} variant="subtitle2" component="p">
                        {survey.description} 
                                </Typography>
                </CardContent>
                <CardActions className={classes.button}>
                </CardActions>
            </Card>
        </div>

    );
}

export default SurveysCards;
