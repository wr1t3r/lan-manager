import React from 'react';
import {combineReducers} from 'redux';

import userReducer from "./reducers/user";
import usersReducer from "./reducers/users";
import teamsReducer from "./reducers/teams";

export const allReducers = combineReducers({
    user: userReducer,
    users: usersReducer,
    teams: teamsReducer,
});
