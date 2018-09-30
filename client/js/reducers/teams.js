import {
    GENERATE_TEAMS,
    DELETE_GENERATE_TEAMS,
    SET_GENERATED_TEAMS
} from "../actions";
import TeamGenerator from '../models/TeamGenerator';

const INITIAL_STATE = {
    current_generated_teams: [],
};

const teamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GENERATE_TEAMS:
            let tg = new TeamGenerator(action.payload.players, action.payload.num_players);
            let random_teams = tg.getRandomTeams();

            return {
                ...state,
                current_generated_teams: random_teams,
            };
        case DELETE_GENERATE_TEAMS:
            return {
                ...state,
                current_generated_teams: INITIAL_STATE.current_generated_teams,
            };
        case SET_GENERATED_TEAMS:
            return {
                ...state,
                current_generated_teams: action.payload.teams,
            };
        default:
            return state
    }
};

export default teamsReducer;
