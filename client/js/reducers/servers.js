import {
    SET_SERVERS_TEXT,
} from "../actions";

const INITIAL_STATE = {
    text: "",
};

const serversReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SERVERS_TEXT:
            return {
                ...state,
                text: action.payload,
            };
        default:
            return state
    }
};

export default serversReducer;
