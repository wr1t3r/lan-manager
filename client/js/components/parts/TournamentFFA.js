import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import Round from './Round';
import Team from './Team';

class TournamentFFA extends React.Component {
    render() {
        const react = this;
        const rounds = map(this.props.matches, (match, key) =>
            <Round key={key}
                   round={match.round}
                   team_1={match.team_1}
                   team_2={match.team_2}
                   teamIndex={key} />
        );
        const teams = map(this.props.teams, (players, key) =>
            <Team key={key}
                  players={players}
                  team_index={key}
                  score={react.props.score}
                  socket={react.props.socket}
                  changeScore={react.props.changeScore}
                  hide_controls={react.props.hide_controls} />
        );

        return (<div className="ffa">
            { teams.length > 0 && (
                <div>
                    <h1>Tímy</h1>
                    <div className="row">
                        { teams }
                    </div>
                    <hr/>
                </div>
            )}

            {rounds}
        </div>)
    }
}

TournamentFFA.contextTypes = {
    matches: PropTypes.array,
};

export default TournamentFFA
