import {
    FETCH_REGINFO_SUCCESS,
    FETCH_REGINFO_FAIL,
} from "../actionTypes";

const initialState = {
    sexes: [],
    streets: [],
    years: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_REGINFO_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                sexes: [...data.sexes],
                streets: [...data.streets],
                years: [...data.years],
            };
        }

        case FETCH_REGINFO_FAIL:
            return state;

        default:
            return state;
    };
};
