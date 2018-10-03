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
        const teams = map(this.props.random_teams, (players, key) =>
            <Team key={key} players={players} />
        );

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-3">
                        <h1>Online</h1>
                        <UsersPanel users_list={this.props.users_list} />
                    </div>
                    <div className="col-xs-9">
                        { this.props.random_teams.length > 0 && (
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
                                        tournament_type={this.props.current_generated_tournament.type} />
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        loginToSteam: loginToSteam,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
