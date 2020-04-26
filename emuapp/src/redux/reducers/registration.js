import {
    FETCH_YEARS_SUCCESS,
    FETCH_YEARS_FAIL,
} from "../actionTypes";

const initialState = {
    years: [],
    // byIds: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_YEARS_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                years: [...data.year], //Zmenit na 'years' po zapracovani poziadavky na BE
              };
        }

        case FETCH_YEARS_FAIL:
            return state;

        default:
            return state;
    };
};
