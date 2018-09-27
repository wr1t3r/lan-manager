import React from 'react';
import PropTypes from 'prop-types';
import {loggedToSteam, loadSteamProfileFromFirebase} from "../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as qs from 'query-string';

class Verify extends React.Component {
    componentDidMount() {
        const parsed = qs.parse(location.href);
        console.log(location.href, parsed); // ERROR HERE, NOT PARSING steamid CORRECTLY

        if(parsed['steamid'] && parsed['steamid'] != "") {
            const steam_id = parsed['steamid'].substr(parsed['steamid'].lastIndexOf('/') + 1);
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
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Verify);
