import {
    UPDATE_USERS,
} from "../actions";

export function updateUsers(users) {
    return {
        type: UPDATE_USERS,
        payload: users
    };
}
