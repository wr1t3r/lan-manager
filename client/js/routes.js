import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Verify from './components/pages/Verify';
import Logout from './components/pages/Logout';
import Admin from './components/pages/admin/Admin';

class Router extends React.Component {
    render() {
        const SocketedHome = (props) => {
            return ( <Home socket={this.props.socket} /> );
        };
        const SocketedVerify = (props) => {
            return ( <Verify socket={this.props.socket} /> );
        };
        const SocketedLogout = (props) => {
            return ( <Logout socket={this.props.socket} /> );
        };
        const SocketedAdmin = (props) => {
            return ( <Admin socket={this.props.socket} /> );
        };

        return (
            <div>
                <Switch>
                    <Route exact path='/' component={SocketedHome} />
                    <Route path='/verify' component={SocketedVerify} />
                    <Route exact path='/logout' component={SocketedLogout} />
                    <Route exact path='/admin' component={SocketedAdmin} />
                </Switch>
            </div>
        );
    }
}

export default Router
