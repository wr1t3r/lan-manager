import React from 'react';
import PropTypes from 'prop-types';
import {loginToSteam} from "../../actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UsersPanel from '../parts/UsersPanel';
import map from "lodash/map";
import Team from '../parts/Team';
import TournamentHolder from '../parts/TournamentHolder';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const score = this.props.current_generated_tournament.score;
        const teams = map(this.props.current_generated_tournament.teams, (players, key) =>
            <Team key={key} players={players} score={score} team_index={key} />
        );

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-3">
                        { this.props.servers_text && this.props.servers_text != "" && (
                            <div>
                                <h1>Servery</h1>
                                <p className="servers" dangerouslySetInnerHTML={{__html: this.props.servers_text}}></p>
                            </div>
                        )}
                        <h1>Online</h1>
                        <UsersPanel users_list={this.props.users_list} />
                    </div>
                    <div className="col-xs-9">
                        { this.props.current_generated_tournament.teams && (
                            <div>
                                <h1>Tímy</h1>
                                <div className="row">
                                    { teams }
                                </div>
                                <hr/>
                            </div>
                            )
                        }
                        { this.props.current_generated_tournament.matches && (
                            <div>
                                <h1>Turnaj <strong>{this.props.current_generated_tournament.name}</strong></h1>
                                <div className="row">
                                    <TournamentHolder stage={1}
                                        matches={this.props.current_generated_tournament.matches}
                                        score={this.props.current_generated_tournament.score}
                                        tournament_type={this.props.current_generated_tournament.type}
                                        hide_controls={true} />
                                </div>
                                <hr/>
                            </div>
                            )
                        }
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
        users_list: state.users.list,
        random_teams: state.teams.current_generated_teams,
        current_generated_tournament: state.tournament.current_generated_tournament,
        servers_text: state.servers.text,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginToSteam: loginToSteam,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
