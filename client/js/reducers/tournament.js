import {
    GENERATE_TOURNAMENT,
    DELETE_GENERATE_TOURNAMENT,
    SET_TOURNAMENT,
    UPDATE_TOURNAMENT_LIST,
} from "../actions";
import TournamentGenerator from '../models/TournamentGenerator';

const INITIAL_STATE = {
    current_generated_tournament: {},
    tournament_list: [],
};

const teamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GENERATE_TOURNAMENT:
            let tg = new TournamentGenerator(JSON.parse(JSON.stringify(action.payload.teams)), action.payload.type, action.payload.num_groups);
            let random_tournament = tg.getTournament();
            random_tournament.name = action.payload.tournament_name;

            return {
                ...state,
                current_generated_tournament: random_tournament,
            };
        case DELETE_GENERATE_TOURNAMENT:
            return {
                ...state,
                current_generated_tournament: INITIAL_STATE.current_generated_tournament,
            };
        case UPDATE_TOURNAMENT_LIST:
            let tournament = state.tournament_list;
            tournament[action.payload.tournament_name] = {
                type: action.payload.type,
                num_groups: action.payload.num_groups,
                teams: action.payload.teams,
                tournament_name: action.payload.tournament_name
            };

            return {
                ...state,
                tournament_list: tournament,
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
