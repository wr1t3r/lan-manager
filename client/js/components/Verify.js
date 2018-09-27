import React from 'react';
import PropTypes from 'prop-types';
import {loggedToSteam, loadSteamProfileFromFirebase, userLoggedIn} from "../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as qs from 'query-string';

let socket;

class Verify extends React.Component {
    componentDidMount() {
        var steam_id = location.href.split('steamid=')[1] ? location.href.split('steamid=')[1] : '';

        if(steam_id && steam_id != "") {
            this.props.loggedToSteam(steam_id);
            this.props.loadSteamProfileFromFirebase();
            this.context.router.history.push("/");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <p className="bg-danger">Failed to login, please try again.</p>
                    </div>
                </div>
            </div>
            );
    }
}

Verify.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        username: state.user.username,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loggedToSteam: loggedToSteam,
        loadSteamProfileFromFirebase: loadSteamProfileFromFirebase,
        userLoggedIn: userLoggedIn,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Verify);
