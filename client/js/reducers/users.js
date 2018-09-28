import {
    UPDATE_USERS
} from "../actions";

const INITIAL_STATE = {
    list: {},
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_USERS:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state
    }
};


export default usersReducer
