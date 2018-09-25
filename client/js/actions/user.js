import {
    STEAM_LOGGED_IN,
    STEAM_LOGOUT
} from "../actions";

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

/*
export function loggedToSteam() {
    return function (dispatch, getState) {
        dispatch({
            type: STEAM_AUTHENTICATE
        });

        const request = Ajax.call(
            "http://localhost:3000/authenticate",
            {
                user: 'writerko',
            }
        );

        return request.then(response => {
            console.log(response);
            if (response.data.success == "1") {
                dispatch(userLoggedIn(
                    response.data.username,
                    response.data.token,
                    response.data.id_user,
                    response.data.sites,
                    response.data.machines,
                    response.data.userdata,
                    response.data.payments,
                    response.data.notifications,
                ));
            } else {
                dispatch(logout());
                if(HashRouter.history.push) {
                    HashRouter.history.push('/sign-in');
                }
            }
        });
    };
}
*/
