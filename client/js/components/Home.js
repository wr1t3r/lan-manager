import React from 'react';
import PropTypes from 'prop-types';
import Tools from "../data/Tools";
import {loginToSteam} from "../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as qs from 'query-string';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Tools.unfreezeScrolling();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="align-center">Steam User ID: {this.props.steam_id}</h1>
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginToSteam: loginToSteam,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
