import {
    POST_NOTE_SUCCESS,
    POST_NOTE_FAIL,

} from "../actionTypes";

const initialState = {
    survey_id: null,
    note: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_NOTE_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                survey_id: [...data.survey_id],
                note: [...data.answers],
            };
        }

        case POST_NOTE_FAIL:
            return state;

        default:
            return state;
    };
};
