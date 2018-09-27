import {
    STEAM_LOGGED_IN,
    STEAM_LOGOUT,
    STEAM_LOAD_FROM_FIREBASE,
    STEAM_LOAD_FROM_FIREBASE_SUCCESS,
    STEAM_LOAD_FROM_FIREBASE_FAIL,
} from "../actions";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export function loggedToSteam(steam_id) {
    return {
        type: STEAM_LOGGED_IN,
        payload: steam_id
    };
}
export function logout() {
    return {
        type: STEAM_LOGOUT
    };
}

export function loadSteamProfileFromFirebase() {
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

        const usersRef = database.ref("users/" + getState().user.steam_id);
        let request = usersRef.once("value");
        return request.then(snap => {
            dispatch(loadSteamProfileFromFirebaseSuccess( snap.val() ));
        }).catch(error => {
            dispatch(loadSteamProfileFromFirebaseFail( error ));
        });
    };
}

export function loadSteamProfileFromFirebaseSuccess(profile) {
    return {
        type: STEAM_LOAD_FROM_FIREBASE_SUCCESS,
        payload: profile
    };
}
export function loadSteamProfileFromFirebaseFail(error) {
    return {
        type: STEAM_LOAD_FROM_FIREBASE_FAIL,
        payload: error
    };
}


export function userLoggedIn(socket) {
    return function (dispatch, getState) {
        socket.emit('addUser',getState().user);
    };
}