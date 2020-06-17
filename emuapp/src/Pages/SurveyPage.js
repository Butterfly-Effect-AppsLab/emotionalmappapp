import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SurveyCards from '../Components/SurveyCards';
import DescriptionCard from '../Components/DescriptionCard';
import Loading from '../Components/Loading';
import { fetchSurvey, postAnswer, postNote } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurvey } from '../redux/selectors';
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
    button: {
        textAlign: 'right',
        paddingRight: '5vw',
        paddingBottom: '5vw',
        '& > *': {
            borderRadius: 24,
            width: '40vw',
            maxWidth: 100,
            minHeight: 50,
            fontSize: '2vh',
            marginTop: '2vh',
        },
    }
});


const SurveyPage = (props) => {
    const { id, survey, fetchSurvey, postAnswer, postNote } = props;
    const classes = useStyles();
    var currQuestions = [];
    const questionsPerPage = 3;
    const [currPage, setCurrPage] = React.useState(1);
    const [isNoteButtonDisabled, setIsNoteButtonDisabled] = React.useState(true);
    const [buttonText, setButtonText] = React.useState('');
    const [answData, setAnswData] = React.useState({
        survey_id: id,
        answers: {},
    });
    const [noteData, setNoteData] = React.useState({
        survey_id: id,
        note: '',
    });

    const getDataToPage = (value) => {
        if (value[0] && currPage <= pages) {
            setAnswData({ ...answData, answers: { ...answData.answers, [value[0].question_id]: value } })
        }
        else if (currPage > pages) {
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
            setButtonText('Dokončiť')
        }
        else if (currPage > pages) {
            let answers = []
            console.log(answData)
            console.log(Object.values(answData))
            Object.values(answData.answers).forEach(ans => { ans.forEach(x => { answers.push(x) }) })
            let payload = { 'survey_id': answData.survey_id, 'answers': answers }
            console.log(payload)
            postAnswer(payload)
        }
        else {
            setButtonText('Ďalej')
        }
    }, [currPage]);

    const onButtonClick = () => {
        setCurrPage(currPage + 1);
    };

    const onNoteButtonClick = () => {
        postNote(noteData);
    };

    const renderCards = (currPage, pages) => {
        if (currPage === 1) {
            return (
                <>
                    <DescriptionCard survey={survey} />
                    <ProgressBar currPage={currPage} numPages={pages} />
                    <div className={classes.button}>
                        <Button
                            variant='contained'
                            color='primary'
                            // disabled='0'
                            onClick={(event) => onButtonClick()}
                            style={{ color: WHITE, background: RED }}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </>
            )
        }
        else if (currPage > pages) {
            return (
                <ThankYouCard isNoteButtonDisabled={isNoteButtonDisabled} sendDataToPage={(value) => { getDataToPage(value) }} onNoteButtonClick={() => { onNoteButtonClick() }} />
            )
        }
        else {
            return (
                <ScrollTo>
                    {({ scroll }) => (
                        <>
                            <SurveyCards sendDataToPage={(value) => { getDataToPage(value) }} id={id} questionsPerPage={questionsPerPage} questions={currQuestions} currPage={currPage} />
                            <ProgressBar currPage={currPage} numPages={pages} />
                            <div className={classes.button}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    // disabled='0'
                                    onClick={() => { onButtonClick(); scroll({ y: 0, x: 0 }) }}
                                    style={{ color: WHITE, background: RED }}
                                >
                                    {buttonText}
                                </Button>
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
        for (var i = 0; i < questionsPerPage; i++) {
            if (survey.questions.length > (currPage - 2) * questionsPerPage + i)
                currQuestions.push(survey.questions[(currPage - 2) * questionsPerPage + i])
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
    return { survey };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSurvey: bindActionCreators(fetchSurvey, dispatch),
    postAnswer: bindActionCreators(postAnswer, dispatch),
    postNote: bindActionCreators(postNote, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);