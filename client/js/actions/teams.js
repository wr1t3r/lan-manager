import {
    GENERATE_TEAMS,
    DELETE_GENERATE_TEAMS,
    SET_GENERATED_TEAMS,
} from "../actions";

export function generateTeams(socket, players, num_players) {
    return function (dispatch, getState) {
        dispatch({
            type: GENERATE_TEAMS,
            payload: {
                players: players,
                num_players: num_players,
            }
        });
        socket.emit('generateTeams',JSON.parse( JSON.stringify( getState().teams.current_generated_teams ) ));
    };
}
export function setGeneratedTeams(teams) {
    return {
        type: SET_GENERATED_TEAMS,
        payload: {
            teams: teams
        }
    };
}
export function deleteGeneratedTeams(socket) {
    return function (dispatch) {
        dispatch({
            type: DELETE_GENERATE_TEAMS,
        });
        socket.emit('generateTeams',[]);
    };
}
