import {
    FETCH_SURVEYSLIST_SUCCESS,
    FETCH_SURVEYSLIST_FAIL,

} from "../actionTypes";

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SURVEYSLIST_SUCCESS: {
            const { data } = action.payload;
            return [
                ...state,
                {
                    age_group_bottom: data.age_group_bottom,
                    age_group_top: data.age_group_top,
                    estimated_time: data.estimated_time,
                    id: data.id,
                    title: data.title
                }
            ];
        }

        case FETCH_SURVEYSLIST_FAIL:
            return state;

        default:
            return state;
    };
};
