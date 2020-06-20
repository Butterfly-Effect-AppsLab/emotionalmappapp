import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SurveyCards from '../Components/SurveyCards';
import DescriptionCard from '../Components/DescriptionCard';
import Loading from '../Components/Loading';
import { fetchSurvey, postAnswer, postNote, postInterimAnswer } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurvey, getInterimAnswers } from '../redux/selectors';
import { LIGHTGRAY, RED, WHITE } from '../utils/colours';
import ProgressBar from '../Components/ProgressBar';
import Button from '@material-ui/core/Button';
import ThankYouCard from '../Components/ThankYouCard';
import { ScrollTo } from 'react-scroll-to';

const useStyles = makeStyles({
    root: {
        minHeight: '100%',
        background: LIGHTGRAY,
        paddingTop: 10,
    },
    buttonParent: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonNext: {
        width: '50vw',
        textAlign: 'right',
        paddingRight: '5vw',
        paddingBottom: '5vw',
        '& > *': {
            borderRadius: 24,
            width: '40vw',
            maxWidth: 120,
            minHeight: 50,
            fontSize: '2vh',
            marginTop: '2vh',
        },
    },
    buttonPrevious: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: '5vw',
        paddingBottom: '5vw',
        '& > *': {
            borderRadius: 24,
            width: '40vw',
            maxWidth: 120,
            minHeight: 50,
            fontSize: '2vh',
            marginTop: '2vh',
        },
    },
});


const SurveyPage = (props) => {
    const { id, survey, fetchSurvey, postAnswer, postNote, postInterimAnswer, retrievedAnswers } = props;
    const classes = useStyles();
    var currQuestions = [];
    var currQuestionsKeys = [];
    const questionsPerPage = 3;
    const [currPage, setCurrPage] = React.useState(1);
    const [isNoteButtonDisabled, setIsNoteButtonDisabled] = React.useState(true);
    const [isNoteSent, setIsNoteSent] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('Ďalej');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = React.useState(true);
    const [answData, setAnswData] = React.useState({
        survey_id: id,
        answers: {},
    });
    const [noteData, setNoteData] = React.useState({
        survey_id: id,
        note: '',
    });
    const [interimData, setInterimData] = React.useState({
        answers: {},
    });

    const getDataToPage = (value, questionId) => {
        if (currPage <= pages) {
            let data = []
            Object.keys(value).forEach((key) => {
                if (value[key]) {
                    if (typeof value[key] === 'object' && value[key] !== null) {
                        Object.keys(value[key]).forEach((otherKey) => {
                            data.push({ question_id: questionId, answer: otherKey })
                        })
                    }
                    else {
                        data.push({ question_id: questionId, answer: key })
                    }
                }
            });
            if (data[0]) {
                setAnswData({ ...answData, answers: { ...answData.answers, [data[0].question_id]: data } })
                // console.log('ANSWDATAANSWDATA', Object.keys(answData.answers))
            }
        }
        setInterimData({ ...interimData, answers: { ...interimData.answers, [questionId]: value } })

        if (currPage > pages) {
            setNoteData({ ...noteData, note: value });
        }
    };

    useEffect(() => {
        fetchSurvey(id);
    }, []);

    useEffect(() => {
        if (noteData.note !== '') {
            setIsNoteButtonDisabled(false);
        }
        else {
            setIsNoteButtonDisabled(true);
        }
    }, [noteData]);

    useEffect(() => {
        if (currPage === pages) {
            if (interimData) {
                    // setIsNextButtonDisabled(false);
                    console.log('PRESIEL SOM PODMIENKOU')
                    postInterimAnswer(interimData);
            }
            setButtonText('Dokončiť')
        }
        else if (currPage < pages && currPage !== 2) {
                // setIsNextButtonDisabled(false);
                console.log('PRESIEL SOM PODMIENKOU')
                postInterimAnswer(interimData);
        }
        else if (currPage > pages) {
            let answers = []
            Object.values(answData.answers).forEach(ans => { ans.forEach(x => { answers.push(x) }) })
            let payload = { 'survey_id': answData.survey_id, 'answers': answers }
            postAnswer(payload)
        }
        else {
            setButtonText('Ďalej')
        }
    }, [currPage]);

    useEffect(() => {
        console.log('currQuestionsKeys', currQuestionsKeys)
    }, [currQuestionsKeys]);

    const onNextButtonClick = () => {
        setCurrPage(currPage + 1);
    };

    const onPreviousButtonClick = () => {
        setCurrPage(currPage - 1);
    };

    const onNoteButtonClick = () => {
        postNote(noteData);
        setIsNoteSent(true);
    };

    const renderCards = (currPage, pages) => {
        if (currPage === 1) {
            return (
                <>
                    <DescriptionCard survey={survey} />
                    <ProgressBar currPage={currPage} numPages={pages} />
                    <div className={classes.buttonNext} style={{ width: '100vw' }}>
                        <Button
                            variant='contained'
                            color='primary'
                            // disabled='0'
                            onClick={(event) => onNextButtonClick()}
                            disableElevation
                        >
                            {buttonText}
                        </Button>
                    </div>
                </>
            )
        }
        else if (currPage > pages) {
            return (
                <ThankYouCard isNoteSent={isNoteSent} isNoteButtonDisabled={isNoteButtonDisabled} sendDataToPage={(value) => { getDataToPage(value, 0) }} onNoteButtonClick={() => { onNoteButtonClick() }} />
            )
        }
        else {
            return (
                <ScrollTo>
                    {({ scroll }) => (
                        <>
                            <SurveyCards retrievedAnswers={retrievedAnswers} id={id} questionsPerPage={questionsPerPage} sendDataToPage={(value, questionId) => { getDataToPage(value, questionId) }} questions={currQuestions} currPage={currPage} />
                            <ProgressBar currPage={currPage} numPages={pages} />
                            <div className={classes.buttonParent}>
                                <div className={classes.buttonPrevious}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={() => { onPreviousButtonClick(); scroll({ y: 0, x: 0 }) }}
                                        disableElevation
                                    >
                                        Späť
                                  </Button>
                                </div>
                                <div className={classes.buttonNext}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        // disabled='0'
                                        onClick={() => { onNextButtonClick(); scroll({ y: 0, x: 0 }) }}
                                        disableElevation
                                    >
                                        {buttonText}
                                    </Button>

                                </div>
                            </div>
                        </>
                    )}
                </ScrollTo>
            )
        }
    };

    if (survey) {
        var pages = Math.ceil((survey.questions.length / questionsPerPage)) + 1;
        currQuestions = [];
        // currQuestionsKeys = [];
        for (var i = 0; i < questionsPerPage; i++) {
            if (survey.questions.length > (currPage - 2) * questionsPerPage + i) {
                currQuestions.push(survey.questions[(currPage - 2) * questionsPerPage + i]);
                if (currQuestions[i]) {
                    currQuestionsKeys.push(currQuestions[i].id);
                }
            }
        }
        return (
            <div className={classes.root}>
                {
                    renderCards(currPage, pages)
                }
            </div>
        )
    }
    else
        return <Loading />
};

const mapStateToProps = (state) => {
    const survey = getSurvey(state);
    const retrievedAnswers = getInterimAnswers(state)
    return { survey, retrievedAnswers };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSurvey: bindActionCreators(fetchSurvey, dispatch),
    postAnswer: bindActionCreators(postAnswer, dispatch),
    postNote: bindActionCreators(postNote, dispatch),
    postInterimAnswer: bindActionCreators(postInterimAnswer, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);