import {
    SET_CATEGORY,
} from "../actions";

const INITIAL_STATE = {
    username: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                site_machines: action.payload.site_machines
            };
        default:
            return state
    }
};


export default userReducer
