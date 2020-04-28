import {
    FETCH_REGINFO_SUCCESS,
    FETCH_REGINFO_FAIL,
} from './actionTypes';

export const fetchRegInfo = () => async dispatch => {
    try {
        const response = await fetch('http://localhost:5000/api/regInfo');
        const json = await response.json();
        dispatch(fetchRegInfoSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(fetchRegInfoFail());

    }
};

export const fetchRegInfoSuccess = (json) => ({
    type: FETCH_REGINFO_SUCCESS,
    payload: json,
});

export const fetchRegInfoFail = () => ({
    type: FETCH_REGINFO_FAIL,
});
