import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loginByToken} from '../actions/user';

class NavigationBar extends React.Component {
    getMenuItem (name, icon, link) {
        return (
            <Link to={link}><i className={"fa fa-" + icon}></i> {name}</Link>
        );
    }

    render() {
        return (
            <nav className="align-center">
                <div className="row">
                    <div className="col-xs-12">
                        {this.getMenuItem("Home", "home", "/")}
                        {
                            this.props.steam_id == ""
                            ? ( <a href="/authenticate"><i className="fa fa-user"></i> Steam Login</a> )
                            : ( this.getMenuItem("Log Out", "user", "/logout") )

                        }
                    </div>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return {
        steam_id: state.user.steam_id,
    };
}

export default connect(mapStateToProps, null)(NavigationBar);
