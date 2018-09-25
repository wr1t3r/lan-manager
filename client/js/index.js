import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import App from "./components/App";
import {allReducers} from './reducers';

const store = createStore(
    allReducers,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

render(
    <Provider store={store} textComponent={React.Fragment}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    ,document.getElementById('app')
);
