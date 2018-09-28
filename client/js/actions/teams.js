import {
    GENERATE_TEAMS,
    DELETE_GENERATE_TEAMS,
} from "../actions";

export function generateTeams(players, num_players) {
    return {
        type: GENERATE_TEAMS,
        payload: {
            players: players,
            num_players: num_players,
        }
    };
}
export function deleteGeneratedTeams() {
    return {
        type: DELETE_GENERATE_TEAMS,
    };
}
