import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {loginByToken} from '../actions/user';

class NavigationBar extends React.Component {
    getMenuItem (name, icon, link) {
        return (
            <Link to={link}><i className={"fa fa-" + icon}></i> {name}</Link>
        );
    }

    render() {
        return (
            <nav className="container align-center">
                <div className="row">
                    <div className="col-xs-12">
                        {this.getMenuItem("Home", "home", "/")}
                        {this.getMenuItem("Home", "home", "/")}
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        username: state.user.username,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginByToken: loginByToken,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar);
