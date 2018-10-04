import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loginByToken, userLoggedIn} from '../actions/user';
import {setGeneratedTeams} from '../actions/teams';
import {setTournament} from '../actions/tournament';
import {updateUsers} from "../actions/users";
import {setServersTextLocal} from "../actions/servers";
import Constants from "../data/Constants";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.userLoggedIn(this.props.socket);

        this.props.socket.on('connectedUsers',(data)=>{
            this.props.updateUsers(data.connected_users);
        });

        this.props.socket.on('generateTeams',(data)=>{
            this.props.setGeneratedTeams(data.teams);
        });

        this.props.socket.on('generateTournament',(data)=>{
            this.props.setTournament(data.tournament);
        });

        this.props.socket.on('setServersText',(data)=>{
            this.props.setServersTextLocal(data.server_text);
        });
    }

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
                        {this.getMenuItem("Domov", "home", "/")}
                        {
                            this.props.steam_id == ""
                            ? ( <a href="/authenticate"><i className="fa fa-user"></i> Steam Prihlásenie</a> )
                            : ( this.getMenuItem("Odhlásiť", "user", "/logout") )

                        }
                        {
                            this.props.steam_id != "" &&
                                ( <a href={this.props.steam_profile.profile} target="_blank" className="steam-logged-btn"><i className="fa fa-steam"></i> Môj steam profil</a> )

                        }
                        {
                            this.props.steam_id == Constants.admin_steam_id &&
                                ( this.getMenuItem("Turnaj", "gears", "/admin") )

                        }
                        {
                            this.props.steam_id == Constants.admin_steam_id &&
                                ( this.getMenuItem("Severy", "gears", "/adminservers") )

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
        steam_profile: state.user.profile,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        userLoggedIn: userLoggedIn,
        updateUsers: updateUsers,
        setGeneratedTeams: setGeneratedTeams,
        setTournament: setTournament,
        setServersTextLocal: setServersTextLocal,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar);
