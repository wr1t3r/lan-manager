import React from 'react';
import PropTypes from 'prop-types';
import {loggedToSteam, loadSteamProfileFromFirebase, userLoggedIn} from "../../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class Verify extends React.Component {
    componentDidMount() {
        let steam_id = location.href.split('steamid=')[1] ? location.href.split('steamid=')[1] : '';

        if(steam_id && steam_id != "") {
            this.props.loggedToSteam(steam_id);
            this.props.loadSteamProfileFromFirebase(this.props.socket);
            this.context.router.history.push("/");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <p className="bg-danger">Nepodarilo sa prihlásiť, skús znova.</p>
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
