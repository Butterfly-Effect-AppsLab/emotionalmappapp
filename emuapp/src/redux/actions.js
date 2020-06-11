import {
    FETCH_REGINFO_SUCCESS,
    FETCH_REGINFO_FAIL,
    POST_REGINFO_SUCCESS,
    POST_REGINFO_FAIL,
    FETCH_SURVEYSLIST_SUCCESS,
    FETCH_SURVEYSLIST_FAIL,
    FETCH_SURVEY_SUCCESS,
    FETCH_SURVEY_FAIL
} from './actionTypes';

export const fetchRegInfo = () => async dispatch => {
        // console.log('IDcko', id)
    try {
        const response = await fetch('/api/regInfo');
        const json = await response.json();
        dispatch(fetchRegInfoSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(fetchRegInfoFail());

    }
};

export const postRegInfo = (regData, id) => async dispatch => {
    console.log('IDcko', id)
    try {
        const response = await fetch('/api/registerUser/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regData)
        });
        console.log(response.content)
        const json = await response.json();
        // console.log(json);
        dispatch(postRegInfoSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(postRegInfoFail());

    }
};

export const fetchSurveysList = () => async dispatch => {
    // console.log('som v akcii')
    try {
        const response = await fetch('/api/surveys');
        const json = await response.json();
        dispatch(fetchSurveysListSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(fetchSurveysListFail());

    }
};

export const fetchSurvey = (id) => async dispatch => {
    console.log('idcko', id)
    try {
        const response = await fetch('/api/surveys/' + id);
        const json = await response.json();
        dispatch(fetchSurveySuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(fetchSurveyFail());

    }
};

export const fetchRegInfoSuccess = (json) => ({
    type: FETCH_REGINFO_SUCCESS,
    payload: json,
});

export const fetchRegInfoFail = () => ({
    type: FETCH_REGINFO_FAIL,
});

export const postRegInfoSuccess = (json) => ({
    type: POST_REGINFO_SUCCESS,
    payload: json,
});

export const postRegInfoFail = () => ({
    type: POST_REGINFO_FAIL,
});

export const fetchSurveysListSuccess = (json) => ({
    type: FETCH_SURVEYSLIST_SUCCESS,
    payload: json,
});

export const fetchSurveysListFail = () => ({
    type: FETCH_SURVEYSLIST_FAIL,
});

export const fetchSurveySuccess = (json) => ({
    type: FETCH_SURVEY_SUCCESS,
    payload: json,
});

export const fetchSurveyFail = () => ({
    type: FETCH_SURVEY_FAIL,
});


