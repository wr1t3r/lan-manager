import React from 'react';
import PropTypes from 'prop-types';
import Tournament from '../../data/Tournament';
import TournamentFFA from './TournamentFFA';
import TournamentFull from './TournamentFull';

class TournamentHolder extends React.Component {
    render() {
        return (<div className="tournament">
            { this.props.tournament_type == Tournament.TYPE_FREE_FOR_ALL && (<TournamentFFA matches={this.props.matches}
                                                                                            teams={this.props.teams}
                                                                                            socket={this.props.socket}
                                                                                            score={this.props.score}
                                                                                            changeScore={this.props.changeScore}
                                                                                            hide_controls={this.props.hide_controls} />) }
            { this.props.tournament_type == Tournament.TYPE_FULL && (<TournamentFull matches={this.props.matches}
                                                                                     stage={this.props.stage}
                                                                                     score={this.props.score}
                                                                                     socket={this.props.socket}
                                                                                     changeScore={this.props.changeScore}
                                                                                     hide_controls={this.props.hide_controls} />) }
        </div>)
    }
}

TournamentHolder.contextTypes = {
    matches: PropTypes.array,
};

export default TournamentHolder
