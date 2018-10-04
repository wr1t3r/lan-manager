import {
    STEAM_LOAD_FROM_FIREBASE, STEAM_LOAD_FROM_FIREBASE_FAIL, STEAM_LOAD_FROM_FIREBASE_SUCCESS,
    STEAM_LOGGED_IN,
    STEAM_LOGOUT,
    LOAD_TOURNAMENT_LIST,
    LOAD_TOURNAMENT_LIST_SUCCESS,
    LOAD_TOURNAMENT_LIST_FAIL,
    UPDATE_TOURNAMENT_LIST
} from "../actions";

const INITIAL_STATE = {
    steam_id: "",
    profile: {},
    tournament_list: [],
    loading: false,
    firebase_error: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STEAM_LOAD_FROM_FIREBASE:
            return {
                ...state,
                loading: true,
            };
        case STEAM_LOAD_FROM_FIREBASE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload
            };
        case STEAM_LOAD_FROM_FIREBASE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case STEAM_LOGGED_IN:
            return {
                ...state,
                steam_id: action.payload
            };
        case STEAM_LOGOUT:
            return {
                steam_id: INITIAL_STATE.steam_id,
                profile: INITIAL_STATE.profile,
                loading: INITIAL_STATE.loading,
                firebase_error: INITIAL_STATE.firebase_error,
            };
        default:
            return state
    }
};


export default userReducer
