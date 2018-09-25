import {
    STEAM_LOGGED_IN,
    STEAM_LOGOUT,
} from "../actions";

const INITIAL_STATE = {
    steam_id: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STEAM_LOGGED_IN:
            return {
                ...state,
                steam_id: action.payload
            };
        case STEAM_LOGOUT:
            return {
                ...state,
                steam_id: ""
            };
        default:
            return state
    }
};


export default userReducer
