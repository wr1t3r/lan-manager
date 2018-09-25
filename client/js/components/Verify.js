import React from 'react';
import PropTypes from 'prop-types';
import {loggedToSteam} from "../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as qs from 'query-string';

class Verify extends React.Component {
    componentDidMount() {
        const parsed = qs.parse(location.href);

        if(parsed['openid.identity'] && parsed['openid.identity'] != "") {
            const steam_id = parsed['openid.identity'].substr(parsed['openid.identity'].lastIndexOf('/') + 1);
            this.props.loggedToSteam(steam_id);
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
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Verify);
