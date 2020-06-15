import {
    FETCH_ANSWER_SUCCESS,
    FETCH_ANSWER_FAIL,

} from "../actionTypes";

const initialState = {
    survey_id: null,
    answers: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ANSWER_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                survey_id: [...data.survey_id],
                answers: [...data.answers],
            };
        }

        case FETCH_ANSWER_FAIL:
            return state;

        default:
            return state;
    };
};
