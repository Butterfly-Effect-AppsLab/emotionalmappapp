import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DARKGRAY } from '../utils/colours';
import RadioButton from './RadioButton'
import CheckBox from './CheckBox';
import MultilineTextField from './MultilineTextField';


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
    const { questions, currPage, questionsPerPage, sendDataToPage } = props
    const classes = useStyles();

    const getData = (value) => {
        if(value[0])
        {
            sendDataToPage(value)
        }
    };

    const renderForm = (type, options, questionId) => {
        switch (type) {
            case 'radiovertical':
                return (
                    <RadioButton sendData={(value) => { getData(value) }} options={options} questionId={questionId} />
                );
            case 'checkbox':
                return (
                    <CheckBox sendData={(value) => { getData(value) }} options={options} questionId={questionId}/>
                );
            case 'text':
                return (
                    <MultilineTextField sendData={(value) => { getData(value) }} questionId={questionId}/>
                );
            default:
                break;

        }
    };

    const renderQuestions = (question, i) => {
        return (
            <div key={i}>
                <Card className={classes.root}
                    variant="outlined"
                    classes={{ root: classes.card }}
                >
                    <CardContent>
                        <Typography className={classes.text} variant="subtitle2" component="p">
                            {i}. {question.question}
                        </Typography>
                        {renderForm(question.type, question.options, question.id)}
                    </CardContent>
                    <CardActions className={classes.button}>
                    </CardActions>
                </Card>
            </div>
        )
    }


    return (
        <div style={{ marginTop: 10 }}>
            {questions.map((question, i) => renderQuestions(question, ((currPage - 2) * questionsPerPage) + i + 1))}
        </ div>

    );
}

export default SurveysCards;
