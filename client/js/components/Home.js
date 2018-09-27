import React from 'react';
import PropTypes from 'prop-types';
import {loginToSteam} from "../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as qs from 'query-string';
import SteamProfileButton from './profile/SteamProfileButton';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-3">
                        { typeof this.props.steam_profile.profile != "undefined" && (
                            <SteamProfileButton link={this.props.steam_profile.profile}
                                                avatar_link={this.props.steam_profile.avatar.small}
                                                username={this.props.steam_profile.username}
                                />
                        ) }
                    </div>
                    <div className="col-xs-9">

                    </div>
                </div>
            </div>
        );
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        steam_id: state.user.steam_id,
        steam_profile: state.user.profile,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginToSteam: loginToSteam,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
