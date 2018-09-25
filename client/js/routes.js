import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Verify from './components/Verify';
import Logout from './components/Logout';

class Router extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/verify' component={Verify}/>
                    <Route path='/logout' component={Logout}/>
                </Switch>
            </div>
        );
    }
}

export default Router
