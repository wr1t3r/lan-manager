import {
    SET_SERVERS_TEXT,
} from "../actions";

export function setServersText(socket, text) {
    return function (dispatch) {
        dispatch({
            type: SET_SERVERS_TEXT,
            payload: text
        });
        socket.emit('setServersText',text);
    };
}
export function setServersTextLocal(text) {
    return {
        type: SET_SERVERS_TEXT,
        payload: text
    };
}
