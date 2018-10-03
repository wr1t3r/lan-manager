import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import SteamProfileButton from './SteamProfileButton';

class Team extends React.Component {
    render() {
        const players = map(this.props.players, (user, key) =>
            <SteamProfileButton key={key} link={user.link}
                                avatar_link={user.avatar_link}
                                username={user.username}
                                steam_id={user.steam_id} />
        );

        return (
            <div className="col-sm-4">
                { this.props.players
                    ? (
                        <div className="team">
                            <div className="team-name">Tím: {this.props.players[Object.keys(this.props.players)[0]].username}</div>
                            { !this.props.noplayers && players }
                        </div>
                    )
                    : (
                        <div className="team undefined">
                            <div className="team-name">Odpočinok</div>
                        </div>
                    )
                }
            </div>
        );
    }
}

Team.contextTypes = {
    players: PropTypes.object,
};

export default (Team);
