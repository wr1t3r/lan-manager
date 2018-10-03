import React from 'react';
import PropTypes from 'prop-types';
import Tournament from '../../data/Tournament';
import TournamentFFA from './TournamentFFA';
import TournamentFull from './TournamentFull';

class TournamentHolder extends React.Component {
    render() {
        return (<div className="tournament">
            { this.props.tournament_type == Tournament.TYPE_FREE_FOR_ALL && (<TournamentFFA matches={this.props.matches} />) }
            { this.props.tournament_type == Tournament.TYPE_FULL && (<TournamentFull matches={this.props.matches} stage={this.props.stage} />) }
        </div>)
    }
}

TournamentHolder.contextTypes = {
    matches: PropTypes.array,
};

export default TournamentHolder
