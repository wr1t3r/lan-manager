import {
    GENERATE_TOURNAMENT,
    DELETE_GENERATE_TOURNAMENT,
    SET_TOURNAMENT,
    UPDATE_TOURNAMENT_LIST, STEAM_LOAD_FROM_FIREBASE,
} from "../actions";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {loadSteamProfileFromFirebaseFail, loadSteamProfileFromFirebaseSuccess, logout} from "./user";

export function generateTournament(socket, type, num_groups, tournament_name) {
    return function (dispatch, getState) {
        dispatch({
            type: GENERATE_TOURNAMENT,
            payload: {
                type: type,
                num_groups: num_groups,
                teams: getState().teams.current_generated_teams,
                tournament_name: tournament_name
            }
        });
        dispatch({
            type: UPDATE_TOURNAMENT_LIST,
            payload: {
                type: type,
                num_groups: num_groups,
                teams: getState().teams.current_generated_teams,
                tournament_name: tournament_name
            }
        });
        socket.emit('generateTournament',JSON.parse( JSON.stringify( getState().tournament.current_generated_tournament ) ));

        const lan_ip = process.env.LOCAL_IP_ADDRESS;
        const API_KEY = process.env.FIREBASE_API_KEY;
        const config = {
            apiKey: API_KEY,
            authDomain: 'http://'+lan_ip,
            databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
            storageBucket: '',
            messagingSenderId: ''
        };

        firebase.initializeApp(config);

        const database = firebase.database();

        const tourRef = database.ref("tournaments");
        tourRef.update({
            [tournament_name]: {
                type: type,
                num_groups: num_groups,
                teams: getState().teams.current_generated_teams,
                tournament_name: tournament_name
            }
        });
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
export function loadTournamentList() {
    return function (dispatch, getState) {

        const lan_ip = process.env.LOCAL_IP_ADDRESS;
        const API_KEY = process.env.FIREBASE_API_KEY;
        const config = {
            apiKey: API_KEY,
            authDomain: 'http://'+lan_ip,
            databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
            storageBucket: '',
            messagingSenderId: ''
        };

        firebase.initializeApp(config);

        const database = firebase.database();

        dispatch({
            type: STEAM_LOAD_FROM_FIREBASE
        });

        const tourRef = database.ref("tournaments");
        /*
        let request = usersRef.once("value");
        return request.then(snap => {
            if(snap.val()) {
                dispatch(loadSteamProfileFromFirebaseSuccess(snap.val(), socket));
            } else {
                dispatch(logout(socket));
            }
        }).catch(error => {
            dispatch(loadSteamProfileFromFirebaseFail( error ));
        });
        */
    };
}
