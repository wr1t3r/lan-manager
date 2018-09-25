import React from 'react';
import { hot } from 'react-hot-loader';
import Router from '../routes';
import '../../css/App.scss';
import '../../css/Checkbox.scss';
import '../../css/Radio.scss';

import NavigationBar from './NavigationBar';

class App extends React.Component {
    render() {
        return (
            <div className="main-holder">
                <NavigationBar />
                <Router onUpdate={() => window.scrollTo(0, 0)} />
            </div>
        );
    }
}

export default hot(module)(App)
