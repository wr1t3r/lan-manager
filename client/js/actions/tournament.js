import {
    GENERATE_TOURNAMENT,
    DELETE_GENERATE_TOURNAMENT,
    SET_TOURNAMENT,
    UPDATE_TOURNAMENT_LIST,
    LOAD_TOURNAMENT_LIST,
    LOAD_TOURNAMENT_LIST_SUCCESS,
    LOAD_TOURNAMENT_LIST_FAIL,
    LOAD_TOURNAMENT,
    CHANGE_SCORE,
} from "../actions";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import TournamentGenerator from "../models/TournamentGenerator";

export function generateTournament(socket, type, num_groups, tournament_name) {
    return function (dispatch, getState) {
        // Generate tournament
        let tg = new TournamentGenerator(JSON.parse(JSON.stringify(getState().teams.current_generated_teams)), type, num_groups);
        let random_tournament = tg.getTournament();
        random_tournament.name = tournament_name;
        random_tournament.num_groups = num_groups;
        random_tournament.type = type;

        // Dispatch actions
        dispatch({
            type: GENERATE_TOURNAMENT,
            payload: random_tournament
        });
        dispatch({
            type: UPDATE_TOURNAMENT_LIST,
            payload: {
                tournament: {[tournament_name]: random_tournament},
                tournament_name: tournament_name
            }
        });

        // Tell everyone
        socket.emit('generateTournament',JSON.parse( JSON.stringify( random_tournament ) ));

        // Save to DB
        saveTournamentToFirebase(tournament_name, random_tournament);
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



export function loadTournaments() {
    return function (dispatch) {

        const lan_ip = process.env.LOCAL_IP_ADDRESS;
        const API_KEY = process.env.FIREBASE_API_KEY;
        const config = {
            apiKey: API_KEY,
            authDomain: 'http://'+lan_ip,
            databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
            storageBucket: '',
            messagingSenderId: ''
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const database = firebase.database();

        dispatch({
            type: LOAD_TOURNAMENT_LIST
        });

        const usersRef = database.ref("tournaments");
        let request = usersRef.once("value");
        return request.then(snap => {
            if(snap.val()) {
                let tournament_list = [];
                snap.forEach(child => {
                    tournament_list.push({
                        [child.key]: child.val()
                    });
                });
                dispatch(loadTournamentsSuccess(tournament_list));
            } else {
                dispatch(loadTournamentsFail('Failed to load data'));
            }
        }).catch(error => {
            dispatch(loadTournamentsFail( error ));
        });
    };
}
export function loadTournamentsSuccess(snap) {
    return {
        type: LOAD_TOURNAMENT_LIST_SUCCESS,
        payload: snap
    };
}
export function loadTournamentsFail(error) {
    return {
        type: LOAD_TOURNAMENT_LIST_FAIL,
        payload: error
    };
}

export function loadTournament(socket, tournamentIndex) {
    return function (dispatch, getState) {
        let loaded_tournament = Object.values(getState().tournament.tournament_list[tournamentIndex])[0];

        socket.emit('generateTournament', JSON.parse( JSON.stringify( loaded_tournament ) ));

        dispatch({
            type: LOAD_TOURNAMENT,
            payload: loaded_tournament
        });
    };
}


export function changeScore(socket, score, teamIndex) {
    return function (dispatch, getState) {
        let curr_tournament = JSON.parse( JSON.stringify( getState().tournament.current_generated_tournament ) );

        for(let curr_team = 0; curr_team < curr_tournament.teams.length; curr_team++) {
            if(curr_team == teamIndex) {
                if(!curr_tournament.score) {
                    curr_tournament.score = [];
                }
                curr_tournament.score[curr_team] = score;
                break;
            }
        }

        socket.emit('generateTournament', JSON.parse( JSON.stringify( curr_tournament ) ));
        saveTournamentToFirebase(curr_tournament.name, curr_tournament);


        dispatch({
            type: UPDATE_TOURNAMENT_LIST,
            payload: {
                tournament: {[curr_tournament.name]: curr_tournament},
                tournament_name: curr_tournament.name
            }
        });
        dispatch({
            type: CHANGE_SCORE,
            payload: curr_tournament
        });
    };
}

function saveTournamentToFirebase(tournament_name, tournament) {
    // Save to DB
    const lan_ip = process.env.LOCAL_IP_ADDRESS;
    const API_KEY = process.env.FIREBASE_API_KEY;
    const config = {
        apiKey: API_KEY,
        authDomain: 'http://'+lan_ip,
        databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
        storageBucket: '',
        messagingSenderId: ''
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    const database = firebase.database();

    const tourRef = database.ref("tournaments");
    const tour = JSON.parse( JSON.stringify(
        {
            [tournament_name]: tournament
        }
    ) );
    tourRef.update(tour);
}
