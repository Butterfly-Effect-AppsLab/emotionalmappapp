import {
    POST_REGINFO_SUCCESS,
    POST_REGINFO_FAIL,

} from "../actionTypes";

const initialState = {
    // id: ,
    sex: null,
    // interests: [],
    residence_location: null,
    work_location: null,
    birthyear: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_REGINFO_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                sex: data.sex,
                residence_location: data.residence_location,
                work_location: data.work_location,
                birthyear: data.birthyear,
            };
        }

        case POST_REGINFO_FAIL:
            return state;

        default:
            return state;
    };
};
