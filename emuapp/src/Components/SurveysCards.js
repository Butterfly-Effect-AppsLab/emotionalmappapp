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

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
    },
    text: {
        marginBottom: 10,
    },
    button: {
        justifyContent: 'center'
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
                <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.text} style={{ fontWeight: 'bold' }} variant="h5" component="h2">
                                {survey.title}
                            </Typography>
                            <Typography className={classes.text} variant="body2" component="p">
                                {survey.description}
                            </Typography>
                            <Typography className={classes.text} variant="body2" component="p">
                                - {surveys.author ? survey.author : "Unknown"}
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
