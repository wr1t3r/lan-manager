import React from 'react';
import {combineReducers} from 'redux';

import userReducer from "./reducers/user";
import usersReducer from "./reducers/users";
import teamsReducer from "./reducers/teams";
import tournamentReducer from "./reducers/tournament";
import serversReducer from "./reducers/servers";

export const allReducers = combineReducers({
    user: userReducer,
    users: usersReducer,
    teams: teamsReducer,
    tournament: tournamentReducer,
    servers: serversReducer,
});
