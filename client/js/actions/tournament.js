import {
    GENERATE_TOURNAMENT,
    DELETE_GENERATE_TOURNAMENT,
    SET_TOURNAMENT,
} from "../actions";

export function generateTournament(socket, type) {
    return function (dispatch, getState) {
        dispatch({
            type: GENERATE_TOURNAMENT,
            payload: {
                type: type,
                teams: getState().teams.current_generated_teams
            }
        });
        socket.emit('generateTournament',JSON.parse( JSON.stringify( getState().tournament.current_generated_tournament ) ));
    };
}
export function setTournament(tournament) {
    return {
        type: SET_TOURNAMENT,
        payload: {
            tournament: tournament
        }
    };
}
export function deleteGeneratedTournament(socket) {
    return function (dispatch) {
        dispatch({
            type: DELETE_GENERATE_TOURNAMENT,
        });
        socket.emit('generateTournament',{});
    };
}
