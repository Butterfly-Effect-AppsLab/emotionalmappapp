import React, { useEffect } from 'react';
import SurveyCards from '../Components/SurveyCards';
import Loading from '../Components/Loading';
import { fetchSurveysList, fetchSurvey } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurveysList, getSurvey } from '../redux/selectors';

const SurveysPage = (props) => {
    const { surveys, survey } = props;
    const [text, setText] = React.useState()
    

    useEffect(() => {
        console.log('som tu v effecte');
        fetchSurveysList();
        fetchSurvey(1);
        console.log('som tu za effectom');
    }, []);

    // if (surveys) {
        return (
            <div>
                {/* <SurveyCards surveys={surveys} /> */}
                <h1>Surveys</h1>
            </div>
        )
    // }
    // else
    //     return <Loading />
};

const mapStateToProps = (state) => {
    const surveys = getSurveysList(state);
    const survey = getSurvey(state);
    return { surveys, survey };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSurveysList: bindActionCreators(fetchSurveysList, dispatch),
    fetchSurvey: bindActionCreators(fetchSurvey, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveysPage);

