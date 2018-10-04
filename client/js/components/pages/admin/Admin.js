import React from 'react';
import PropTypes from 'prop-types';
import {loginToSteam} from "../../../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import map from "lodash/map";
import SteamProfileButton from '../../parts/SteamProfileButton';
import {generateTeams, deleteGeneratedTeams} from "../../../actions/teams";
import {generateTournament, deleteGeneratedTournament, loadTournaments, loadTournament, changeScore} from "../../../actions/tournament";
import SelectAddon from '../../form/SelectAddon';
import TextAddon from '../../form/TextAddon';
import Team from '../../parts/Team';
import Tournament from '../../../data/Tournament';
import TournamentHolder from '../../parts/TournamentHolder';
import Constants from "../../../data/Constants";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_players: {},
            num_players_per_team: 1,
            tournament_type: Tournament.TYPE_FREE_FOR_ALL,
            num_groups: 1,
            num_spider: 4,
            tournament_name: "",
        };

        this.clickUser = this.clickUser.bind(this);
        this.generateTeams = this.generateTeams.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteTeams = this.deleteTeams.bind(this);
        this.deleteTournament = this.deleteTournament.bind(this);
        this.generateTournament = this.generateTournament.bind(this);
        this.loadTournament = this.loadTournament.bind(this);
    }

    componentDidMount() {
        if(this.props.steam_id != Constants.admin_steam_id) {
            this.context.router.history.push("/");
        } else {
            this.props.loadTournaments();
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    loadTournament(e, tournamentIndex) {
        e.preventDefault();
        this.props.loadTournament(this.props.socket, tournamentIndex);
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

    deleteTeams(e) {
        e.preventDefault();
        this.props.deleteGeneratedTeams(this.props.socket);
    }

    generateTeams(e) {
        e.preventDefault();

        if(Object.keys(this.state.selected_players).length >= 2) {
            this.props.generateTeams(this.props.socket, this.state.selected_players, this.state.num_players_per_team);
        } else {
            alert('Vyber aspoň 2 hráčov.');
        }
    }

    deleteTournament(e) {
        e.preventDefault();
        this.props.deleteGeneratedTournament(this.props.socket);
    }

    generateTournament(e) {
        e.preventDefault();

        if(this.props.random_teams.length >= 1) {
            if(this.state.tournament_name != "") {
                this.props.generateTournament(this.props.socket, this.state.tournament_type, this.state.num_groups, this.state.tournament_name);
            } else {
                alert('Meno turnaja?');
            }
        } else {
            alert('Musí byť aspoň jeden tým.');
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
        const num_groups = map([1,2,3,4,5,6,7,8,9,10], (num_group, key) =>
            <option value={num_group} key={key}>Počet skupín: {num_group}</option>
        );
        const num_spider = map([4,8,16], (num_group, key) =>
            <option value={num_group} key={key}>Pavúk: {num_group}</option>
        );
        const tournament_types = map(Tournament.getTournamentTypes(), (tournamentType, key) =>
            <option value={tournamentType.id} key={tournamentType.id}>{tournamentType.name}</option>
        );
        const tournament_list = map(this.props.tournament_list, (tournament, key) =>
            <a key={key} href="#" onClick={ (e) => this.loadTournament(e, key) } className="tournament-list">{Object.keys(tournament)[0]}</a>
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
                            <p><strong>Vyber hráčov na turnaj</strong></p>
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
                            <h2 className="align-center">Generátor Turnaj</h2>
                            <TextAddon id="tournament_name"
                                       text="Meno Turnaja"
                                       icon="angle-double-right"
                                       onChange={this.onChange} />
                            <SelectAddon id="tournament_type"
                                         text="Typ turnaja"
                                         icon="angle-double-right"
                                         property={this.state.tournament_type}
                                         onChange={this.onChange}
                                         option_values={tournament_types} />
                            { this.state.tournament_type == Tournament.TYPE_FULL && (
                                <div>
                                    <SelectAddon id="num_groups"
                                                 text="Počet skupín"
                                                 icon="angle-double-right"
                                                 property={this.state.num_groups}
                                                 onChange={this.onChange}
                                                 option_values={num_groups} />
                                    <SelectAddon id="num_spider"
                                                 text="Začiatočný počet pavúka"
                                                 icon="angle-double-right"
                                                 property={this.state.num_spider}
                                                 onChange={this.onChange}
                                                 option_values={num_spider} />
                                </div>
                            )}
                            <hr />
                            <a href="#" className="btn btn-success" onClick={this.generateTournament}><i className="fa fa-gear" /> Uložiť a zobraziť všetkým</a>&nbsp;&nbsp;&nbsp;
                            <a href="#" className="btn btn-danger" onClick={this.deleteTournament}><i className="fa fa-trash" /> Vymazať Generované</a>&nbsp;&nbsp;&nbsp;

                            <hr/>

                            { this.props.current_generated_tournament && (<TournamentHolder stage={1}
                                                                                            teams={this.props.current_generated_tournament.teams}
                                                                                            score={this.props.current_generated_tournament.score}
                                                                                            matches={this.props.current_generated_tournament.matches}
                                                                                            tournament_type={this.props.current_generated_tournament.type}
                                                                                            socket={this.props.socket}
                                                                                            changeScore={this.props.changeScore}
                                                                                            hide_controls={false} />)}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h1 className="align-center">Turnaje</h1>
                        <hr />
                        {tournament_list}
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
        current_generated_tournament: state.tournament.current_generated_tournament,
        tournament_list: state.tournament.tournament_list,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginToSteam: loginToSteam,
        generateTeams: generateTeams,
        deleteGeneratedTeams: deleteGeneratedTeams,
        generateTournament: generateTournament,
        deleteGeneratedTournament: deleteGeneratedTournament,
        loadTournaments: loadTournaments,
        loadTournament: loadTournament,
        changeScore: changeScore,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Admin);
