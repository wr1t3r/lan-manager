import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import Round from './Round';

class TournamentFFA extends React.Component {
    render() {
        const rounds = map(this.props.matches, (match, key) =>
            <Round key={key} round={match.round} team_1={match.team_1} team_2={match.team_2} />
        );

        return (<div className="ffa">
            {rounds}
        </div>)
    }
}

TournamentFFA.contextTypes = {
    matches: PropTypes.array,
};

export default TournamentFFA
