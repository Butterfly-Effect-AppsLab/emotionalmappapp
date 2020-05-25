import {
    FETCH_SURVEY_SUCCESS,
    FETCH_SURVEY_FAIL,

} from "../actionTypes";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SURVEY_SUCCESS: {
            const { data } = action.payload;
            return { data };
        }

        case FETCH_SURVEY_FAIL:
            return state;

        default:
            return state;
    };
};
