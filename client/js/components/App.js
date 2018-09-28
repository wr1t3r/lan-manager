import React from 'react';
import { hot } from 'react-hot-loader';
import Router from '../routes';
import '../../css/App.scss';
import '../../css/Checkbox.scss';
import '../../css/Radio.scss';
import io from "socket.io-client"

const socket = io.connect(process.env.LOCAL_IP_ADDRESS);

import NavigationBar from './NavigationBar';

class App extends React.Component {
    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        return (
            <div className="main-holder">
                <NavigationBar socket={socket} />
                <Router onUpdate={() => window.scrollTo(0, 0)} socket={socket} />
            </div>
        );
    }
}

export default hot(module)(App)
