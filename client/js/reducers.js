import React from 'react';
import {combineReducers} from 'redux';

import userReducer from "./reducers/user";

export const allReducers = combineReducers({
    user: userReducer,
});
