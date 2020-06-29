import React from 'react';
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
        fontSize: 12,
        color: DARKGRAY,
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold',
        display: 'flex',
    },
    card: {
        borderRadius: 20,
    },
    index: {
        display: 'flex',
        marginBottom: 0,
    }
});

const SurveyCards = (props) => {
    const { questions, currPage, questionsPerPage, sendDataToPage, retrievedAnswers } = props
    const classes = useStyles();

    const getData = (value, question_id) => {
        sendDataToPage(value, question_id)
    };

    const renderForm = (type, options, questionId) => {
        switch (type) {
            case 'radiovertical':
                return (
                    <RadioButton retrievedAnswers={retrievedAnswers} sendData={(value, question_id) => { getData(value, question_id) }} options={options} questionId={questionId} />
                );
            case 'checkbox':
                return (
                    <CheckBox retrievedAnswers={retrievedAnswers} sendData={(value, question_id) => { getData(value, question_id) }} options={options} questionId={questionId} />
                );
            case 'text':
                return (
                    <MultilineTextField retrievedAnswers={retrievedAnswers} sendData={(value, question_id) => { getData(value, question_id) }} questionId={questionId} />
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
                            <br/>
                        </Typography>
                        {
                            !question.required ? 
                            <Typography className={classes.label} color="textSecondary" gutterBottom>
                                Nepovinná otázka
                            </Typography>
                            : null
                        }
                        {renderForm(question.type, question.options, question.id)}
                    </CardContent>
                    <CardActions className={classes.button}>
                    </CardActions>
                </Card>
            </div>
        )
    }


    return (
        <>
            {questions.map((question, i) => renderQuestions(question, ((currPage - 2) * questionsPerPage) + i + 1))}
        </>

    );
}

export default SurveyCards;
