import React from 'react';
import {logout} from "../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class Logout extends React.Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <p className="bg-success">You are Logged Out</p>
                    </div>
                </div>
            </div>
            );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        logout: logout,
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Logout);
