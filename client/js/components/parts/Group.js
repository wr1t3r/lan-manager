import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import Team from './Team';
import Round from './Round';

class Group extends React.Component {
    render() {
        const rounds = map(this.props.data.matches, (match, key) =>
            <Round key={key} round={match.round} team_1={match.team_1} team_2={match.team_2} />
        );
        const teams = map(this.props.data.teams, (players, key) =>
            <Team key={key} players={players} />
        );

        return (<div className="group">
            <div className="col-xs-12"><span className="name">Skupina: {this.props.data.group}</span></div>
            {teams}<br/>
            {rounds}
            <hr/>
            <hr/>
        </div>)
    }
}

Group.contextTypes = {
    data: PropTypes.object,
};

export default Group
