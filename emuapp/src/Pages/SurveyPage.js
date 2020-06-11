import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SurveyCards from '../Components/SurveyCards';
import DescriptionCard from '../Components/DescriptionCard';
import Loading from '../Components/Loading';
import { fetchSurvey } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurvey } from '../redux/selectors';
import { LIGHTGRAY, RED, WHITE } from '../utils/colours';
import ProgressBar from '../Components/ProgressBar';
import Button from '@material-ui/core/Button';
import ThankYouCard from '../Components/ThankYouCard'

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        background: LIGHTGRAY
    },
    button: {
        textAlign: 'right',
        marginRight: '5vw',
        marginBottom: '5vw',
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
    const { id, survey, fetchSurvey } = props;
    const classes = useStyles();
    const [currPage, setCurrPage] = React.useState(1);
    var currQuestions = [];
    const questionsPerPage = 3;
    const [buttonText, setButtonText] = React.useState('');

    useEffect(() => {
        fetchSurvey(id);
    }, []);

    useEffect(() => {
        if (currPage === pages) {
            setButtonText('Dokončiť')
        }
        else {
            setButtonText('Ďalej')
        }
    }, [currPage]);

    const onButtonClick = () => {
        setCurrPage(currPage + 1);
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
                <ThankYouCard />
            )
        }
        else {
            return (
                <>
                    <SurveyCards questions={currQuestions} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);