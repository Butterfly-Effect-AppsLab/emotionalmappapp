import {
    POST_INTERIMANSWER_SUCCESS,
    POST_INTERIMANSWER_FAIL,
} from "../actionTypes";

const initialState = {
    answers: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_INTERIMANSWER_SUCCESS: {
            const data = action.payload;
            return {
                answers: data.answers,
            };
        }

        case POST_INTERIMANSWER_FAIL:
            return state;

        default:
            return state;
    };
};
