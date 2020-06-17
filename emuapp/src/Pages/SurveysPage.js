import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SurveysCards from '../Components/SurveysCards';
import Loading from '../Components/Loading';
import { fetchSurveysList } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSurveysList } from '../redux/selectors';
import { LIGHTGRAY } from '../utils/colours';

const useStyles = makeStyles({
    root: {
        minHeight: '100%',
        background: LIGHTGRAY,
        paddingTop: 10,
        paddingBottom: 10,

    }
});

const SurveysPage = (props) => {
    const { surveys, fetchSurveysList } = props;
    const classes = useStyles();

    useEffect(() => {
        fetchSurveysList();
    }, []);

    if (surveys) {
        return (
            <div className={classes.root}>
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

