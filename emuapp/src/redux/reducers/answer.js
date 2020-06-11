import {
    FETCH_ANSWER_SUCCESS,
    FETCH_ANSWER_FAIL,

} from "../actionTypes";

const initialState = {
    sexes: [],
    streets: [],
    years: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ANSWER_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                sexes: [...data.sexes],
                streets: [...data.streets],
                years: [...data.years],
            };
        }

        case FETCH_ANSWER_FAIL:
            return state;

        default:
            return state;
    };
};
