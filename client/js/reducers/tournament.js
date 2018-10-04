import {
    GENERATE_TOURNAMENT,
    DELETE_GENERATE_TOURNAMENT,
    SET_TOURNAMENT,
    UPDATE_TOURNAMENT_LIST,
    LOAD_TOURNAMENT_LIST,
    LOAD_TOURNAMENT_LIST_SUCCESS,
    LOAD_TOURNAMENT_LIST_FAIL,
    LOAD_TOURNAMENT, CHANGE_SCORE
} from "../actions";

const INITIAL_STATE = {
    current_generated_tournament: {},
    tournament_list: [],
};

const teamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_SCORE:
            return {
                ...state,
                current_generated_tournament: action.payload,
            };
        case LOAD_TOURNAMENT_LIST:
            return {
                ...state,
                loading: true,
                firebase_error: "",
            };
        case LOAD_TOURNAMENT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                tournament_list: action.payload,
                firebase_error: "",
            };
        case LOAD_TOURNAMENT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                firebase_error: action.payload,
                tournament_list: INITIAL_STATE.tournament_list
            };
        case GENERATE_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: action.payload,
            };
        case DELETE_GENERATE_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: INITIAL_STATE.current_generated_tournament,
            };
        case UPDATE_TOURNAMENT_LIST:
            let tournaments = state.tournament_list;
            let tournament_name = action.payload.tournament_name;
            let tournament_exists = false;

            for(let i = 0; i < tournaments.length; i++) {
                if(Object.keys(tournaments[i])[0] == tournament_name) {
                    tournaments[i] = action.payload.tournament;
                    tournament_exists = true;
                }
            }

            if(!tournament_exists) {
                tournaments.push(action.payload.tournament);
            }

            return {
                ...state,
                tournament_list: tournaments,
            };
        case SET_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: action.payload.tournament,
            };
        case LOAD_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: action.payload.tournament,
            };
        default:
            return state
    }
};

export default teamsReducer;
