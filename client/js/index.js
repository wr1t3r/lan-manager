import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import App from "./components/App";
import {allReducers} from './reducers';
import {loadState, saveState} from "./actions/localStorage";
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(
    allReducers,
    persistedState,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

store.subscribe(throttle(() => {
    saveState({
        user: store.getState().user
    });
}, 1000));

render(
    <Provider store={store} textComponent={React.Fragment}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    ,document.getElementById('app')
);
