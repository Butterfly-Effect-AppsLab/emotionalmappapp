import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
    },
    text: {
        marginBottom: 10,
    },

});

const SurveyCards = (props) => {
    const { surveys } = props
    const classes = useStyles();

    const renderCard = (surveys, i) => {
        return (
            <div key={i}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.text} style={{fontWeight: 'bold'}} variant="h5" component="h2">
                            {surveys.title}
                        </Typography>
                        <Typography className={classes.text} variant="body2" component="p">
                            {surveys.description}
                        </Typography>
                        <Typography className={classes.text} variant="body2" component="p">
                            - {surveys.author ? surveys.author : "Unknown"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {surveys.feedback ? <Button variant='contained' color='primary'>Give Feedback</Button> : null}
                    </CardActions>
                </Card>
            </div>
        );
    };

    return (
        <>
            {surveys.map((surveys, i) => renderCard(surveys, i))}
        </>

    );
}

export default SurveyCards;
