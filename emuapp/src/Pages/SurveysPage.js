import React, { useEffect } from 'react';
import SurveysCards from '../Components/SurveysCards';
import Loading from '../Components/Loading';
import { fetchSurveysList, fetchSurvey } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurveysList, getSurvey } from '../redux/selectors';

const SurveysPage = (props) => {
    const { surveys, fetchSurveysList } = props;

    useEffect(() => {
        fetchSurveysList();
    }, []);

    if (surveys) {
        return (
            <div>
                <h1><center>Surveys</center></h1>
                <SurveysCards surveys={surveys} />
            </div>
        )
    }
    else
        return <Loading />
};

const mapStateToProps = (state) => {
    const surveys = getSurveysList(state);
    return { surveys };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSurveysList: bindActionCreators(fetchSurveysList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveysPage);

