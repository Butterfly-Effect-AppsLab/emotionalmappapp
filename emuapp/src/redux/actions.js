import {
    FETCH_YEARS_SUCCESS,
    FETCH_YEARS_FAIL,
} from './actionTypes';

export const fetchYears = () => async dispatch => {
    try {
        const response = await fetch('http://localhost:5000/api/age'); //Zmenit na 'api/years' po zapracovani poziadavky na BE
        const json = await response.json();
        // console.log(json);
        dispatch(fetchYearsSuccess(json));
        // console.log(fetchYearsSuccess(json));
    } catch (err) {
        console.log(err);
        dispatch(fetchYearsFail());
    }
};

export const fetchYearsSuccess = (json) => ({
        type: FETCH_YEARS_SUCCESS,
        payload: json,
    });

export const fetchYearsFail = () => ({
    type: FETCH_YEARS_FAIL,
});