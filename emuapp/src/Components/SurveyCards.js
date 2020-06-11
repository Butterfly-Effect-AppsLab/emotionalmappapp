import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DARKGRAY } from '../utils/colours';
import RadioButton from './RadioButton'
import CheckBox from './CheckBox';
import TextField from './MultilineTextField';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
    },
    label: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: DARKGRAY,
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold',
    },
    card: {
        borderRadius: 20,
    },
});

const SurveysCards = (props) => {
    const { questions } = props
    const classes = useStyles();

    const renderForm = (type, options) => {
        switch (type) {
            case 'radiovertical':
                return (
                    <RadioButton options={options} />
                );
            case 'checkbox':
                return (
                    <CheckBox options={options} />
                );
            case 'text':
                return (
                    <TextField />
                );
            default:
                break;

        }


    };

    const renderQuestions = (question) => {
        return (
            <div key={question.id}>
                <Card className={classes.root}
                    variant="outlined"
                    classes={{ root: classes.card }}
                >
                    <CardContent>
                        <Typography className={classes.text} variant="subtitle2" component="p">
                            {question.id}. {question.question}
                        </Typography>
                        {renderForm(question.type, question.options)}
                    </CardContent>
                    <CardActions className={classes.button}>
                    </CardActions>
                </Card>
            </div>
        )
    }


    return (
        <div style={{ marginTop: 10 }}>
            {questions.map((question) => renderQuestions(question))}
        </ div>

    );
}

export default SurveysCards;
