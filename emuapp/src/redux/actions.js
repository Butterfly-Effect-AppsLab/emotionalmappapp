import {
    FETCH_REGINFO_SUCCESS,
    FETCH_REGINFO_FAIL,
    POST_REGINFO_SUCCESS,
    POST_REGINFO_FAIL,
} from './actionTypes';

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
    // console.log('som v akcii', regData)
    try {
        const response = await fetch('/api/registerUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regData)
        });
        const json = await response.json();
        // console.log(json);
        dispatch(postRegInfoSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(postRegInfoFail());

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

