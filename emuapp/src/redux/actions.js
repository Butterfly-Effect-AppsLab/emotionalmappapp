import {
    FETCH_REGINFO_SUCCESS,
    FETCH_REGINFO_FAIL,
    POST_REGINFO_SUCCESS,
    POST_REGINFO_FAIL,
    FETCH_SURVEYSLIST_SUCCESS,
    FETCH_SURVEYSLIST_FAIL,
    FETCH_SURVEY_SUCCESS,
    FETCH_SURVEY_FAIL,
    POST_ANSWER_SUCCESS,
    POST_ANSWER_FAIL,
    POST_NOTE_SUCCESS,
    POST_NOTE_FAIL,
    POST_INTERIMANSWER_SUCCESS,
    POST_INTERIMANSWER_FAIL,
} from './actionTypes';
import history from '../utils/history';

export const fetchRegInfo = () => async dispatch => {
    try {
        const response = await fetch('/api/regInfo');
        const json = await response.json();
        dispatch(fetchRegInfoSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(fetchRegInfoFail());

    }
};

export const postRegInfo = (regData) => async dispatch => {
    console.log('register user', regData);
    try {
        const response = await fetch('/api/registerUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(regData)
        });
        const json = await response.json();
        dispatch(postRegInfoSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(postRegInfoFail());

    }
};

export const fetchSurveysList = () => async dispatch => {
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
    try {
        const response = await fetch('/api/surveys/' + id, {redirect: 'manual'});
        console.log(response)
        if(response.ok) {
            const json = await response.json();
            dispatch(fetchSurveySuccess(json));
        }
        else {
            alert('Pre pokračovanie sa musíte prihlásiť');
            history.push('/login')
        }
    } catch (err) {
        console.log(err);
        dispatch(fetchSurveyFail());

    }
};

export const postAnswer = (answData) => async dispatch => {
    try {
        const response = await fetch('/api/sendAnswer', {
            credentials: 'same-origin',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answData)
        });
        const json = await response.json();
        dispatch(postAnswerSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(postAnswerFail());

    }
};

export const postInterimAnswer = (interimData) => async dispatch => {
    try {
        dispatch(postInterimAnswerSuccess(interimData));
    } catch (err) {
        console.log(err);
        dispatch(postInterimAnswerFail());

    }
};

export const postNote = (noteData) => async dispatch => {
    try {
        const response = await fetch('/api/sendNote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });
        const json = await response.json();
        dispatch(postNoteSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(postNoteFail());

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

export const postAnswerSuccess = (json) => ({
    type: POST_ANSWER_SUCCESS,
    payload: json,
});

export const postAnswerFail = () => ({
    type: POST_ANSWER_FAIL,
});

export const postInterimAnswerSuccess = (json) => ({
    type: POST_INTERIMANSWER_SUCCESS,
    payload: json,
});

export const postInterimAnswerFail = () => ({
    type: POST_INTERIMANSWER_FAIL,
});

export const postNoteSuccess = (json) => ({
    type: POST_NOTE_SUCCESS,
    payload: json,
});

export const postNoteFail = () => ({
    type: POST_NOTE_FAIL,
});


