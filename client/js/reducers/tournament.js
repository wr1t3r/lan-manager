import {
    GENERATE_TOURNAMENT,
    DELETE_GENERATE_TOURNAMENT,
    SET_TOURNAMENT,
} from "../actions";
import TournamentGenerator from '../models/TournamentGenerator';

const INITIAL_STATE = {
    current_generated_tournament: {},
};

const teamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GENERATE_TOURNAMENT:
            let tg = new TournamentGenerator(JSON.parse(JSON.stringify(action.payload.teams)), action.payload.type, action.payload.num_groups);
            let random_tournament = tg.getTournament();

            return {
                ...state,
                current_generated_tournament: random_tournament,
            };
        case DELETE_GENERATE_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: INITIAL_STATE.current_generated_tournament,
            };
        case SET_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: action.payload.tournament,
            };
        default:
            return state
    }
};

export default teamsReducer;
