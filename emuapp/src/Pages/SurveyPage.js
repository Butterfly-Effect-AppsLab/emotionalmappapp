import React, { useEffect } from 'react';
import Loading from '../Components/Loading';
import { fetchSurvey } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurvey } from '../redux/selectors';

const SurveyPage = (props) => {
    const { id, survey, fetchSurvey } = props;

    useEffect(() => {
        fetchSurvey(id);
    }, []);

    if (survey) {
        return (
            <div>
                <center><h1>Survey Propeler {id}</h1></center>
                {/* <NewsCards news={news} /> */}
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