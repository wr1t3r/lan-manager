import {
    SET_CATEGORY
} from "../actions";
import Ajax from "../data/Ajax";
import { HashRouter } from 'react-router-dom';

export function userLoggedIn(username, token, id_user, sites, machines, userdata, payments, notifications) {
    return {
        type: SET_CATEGORY,
        payload: {
            username: username,
            sites: sites,
            token: token,
            id_user: id_user,
            machines: machines,
            userdata: userdata,
            payments: payments,
            notifications: notifications,
        }
    };
}

export function loginByToken() {
    return function (dispatch, getState) {
        dispatch({
            type: SET_CATEGORY
        });

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : "";

        const request = Ajax.call(
            (Supplier.vars.live_url ? url.live : url.live_dev) + url.api_login,
            {
                action: 'check_token',
                token: token,
                language: getState().inter.language,
                id_suppliers: Supplier.vars.id_suppliers_displayed,
            }
        );

        return request.then(response => {
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
