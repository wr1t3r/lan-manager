import React from 'react';
import PropTypes from 'prop-types';
import {loginToSteam} from "../../../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import map from "lodash/map";
import SteamProfileButton from '../../parts/SteamProfileButton';
import {generateTeams, deleteGeneratedTeams} from "../../../actions/teams";
import SelectAddon from '../../form/SelectAddon';
import Team from '../../parts/Team';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_players: {},
            num_players_per_team: 1
        };

        this.clickUser = this.clickUser.bind(this);
        this.generateTeams = this.generateTeams.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteTeams = this.deleteTeams.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    deleteTeams(e) {
        e.preventDefault();
        this.props.deleteGeneratedTeams();
    }

    clickUser(user) {
        let users = this.state.selected_players;

        if(typeof users[user.steam_id] !== 'undefined') {
            delete users[user.steam_id];
        } else {
            users[user.steam_id] = user;
        }

        this.setState({ selected_players: users });
    }

    generateTeams(e) {
        e.preventDefault();

        if(Object.keys(this.state.selected_players).length >= 2) {
            this.props.generateTeams(this.state.selected_players, this.state.num_players_per_team);
        } else {
            alert('Vyber aspoň 2 hráčov.');
        }
    }

    render() {
        const users = map(this.props.users_list, (user, key) =>
            <SteamProfileButton key={key} link={user.link}
                                avatar_link={user.avatar_link}
                                username={user.username}
                                steam_id={user.steam_id}
                                onClick={this.clickUser} />
        );
        const teams = map(this.props.random_teams, (players, key) =>
            <Team key={key} players={players} />
        );
        const nums_players = map([1,2,3,4,5,6,7,8,9,10], (num_player, key) =>
            <option value={num_player} key={key}>Hráčov v teame: {num_player}</option>
        );

        return (
            <div className="container admin">
                <div className="row">
                    <div className="col-sm-8">
                        <h1 className="align-center">Turnaj</h1>
                        <hr />

                        <div className="section">
                            <h2 className="align-center">Generátor Teamov</h2>

                            <br/>
                            <p><strong>Vyber hráčov na turnaj:</strong></p>
                            <div>
                                {users}
                            </div>

                            <br/>
                            <SelectAddon id="num_players_per_team"
                                         text="Počet hráčov"
                                         icon="users"
                                         onChange={this.onChange}
                                         option_values={nums_players}
                            />
                            <a href="#" className="btn btn-success" onClick={this.generateTeams}><i className="fa fa-gear" /> Generuj náhodné teamy</a>&nbsp;&nbsp;&nbsp;
                            <a href="#" className="btn btn-danger" onClick={this.deleteTeams}><i className="fa fa-trash" /> Vymazať generované teamy</a>
                            { this.props.random_teams.length > 0 && (
                                    <div>
                                        <br/>
                                        <h3>Náhodne vygenerované teamy:</h3>
                                        <div className="row">
                                            {teams}
                                        </div>
                                    </div>
                                )
                        }
                        </div>


                        <div className="section">
                            <h2 className="align-center">Turnaj</h2>

                            <br/>
                            <a href="#" className="btn btn-success"><i className="fa fa-save" /> Uložiť turnaj</a>&nbsp;&nbsp;&nbsp;
                            <a href="#" className="btn btn-primary"><i className="fa fa-plus" /> Ukončiť základnú časť</a>&nbsp;&nbsp;&nbsp;
                            <a href="#" className="btn btn-danger"><i className="fa fa-plus" /> Ukončiť turnaj</a>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h1 className="align-center">Turnaje</h1>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

Admin.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        steam_id: state.user.steam_id,
        steam_profile: state.user.profile,
        users_list: state.users.list,
        random_teams: state.teams.current_generated_teams,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginToSteam: loginToSteam,
        generateTeams: generateTeams,
        deleteGeneratedTeams: deleteGeneratedTeams,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Admin);
