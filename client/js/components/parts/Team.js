import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import SteamProfileButton from './SteamProfileButton';

class Team extends React.Component {
    constructor(props) {
        super(props);

        this.addScore = this.addScore.bind(this);
        this.removeScore = this.removeScore.bind(this);
    }

    addScore(e, curr_score, teamIndex) {
        e.preventDefault();

        curr_score = (parseInt(curr_score) + 1);

        this.props.changeScore(this.props.socket, curr_score, teamIndex);
    }

    removeScore(e, curr_score, teamIndex) {
        e.preventDefault();

        curr_score = (parseInt(curr_score) - 1);

        if(curr_score < 0) {
            curr_score = 0;
        }

        this.props.changeScore(this.props.socket, curr_score, teamIndex);
    }

    render() {
        const score = this.props.score;
        const players = map(this.props.players, (user, key) =>
            <SteamProfileButton key={key} link={user.link}
                                avatar_link={user.avatar_link}
                                username={user.username}
                                steam_id={user.steam_id} />
        );

        console.log(this.props.team_index);

        return (
            <div className="col-sm-4">
                { this.props.players
                    ? (
                        <div className="team">
                            <div className="team-name">Tím: {this.props.players[Object.keys(this.props.players)[0]].username}</div>
                            { score && (
                                <div className="team-score">Skóre:
                                    <span>
                                    { this.props.hide_controls === false && (
                                        <a href="#"
                                           className="control"
                                           onClick={(e) => {this.addScore(e, score && score[this.props.team_index] ? score[this.props.team_index] : 0, this.props.team_index)}}>
                                            <i className="fa fa-plus" />
                                        </a>
                                    )}&nbsp;&nbsp;
                                    {score && score[this.props.team_index] ? score[this.props.team_index] : 0}&nbsp;&nbsp;
                                    { this.props.hide_controls  === false && (
                                        <a href="#"
                                           className="control"
                                           onClick={(e) => {this.removeScore(e, score && score[this.props.team_index] ? score[this.props.team_index] : 0, this.props.team_index)}}>
                                            <i className="fa fa-minus" />
                                        </a>
                                    )}
                                    </span>
                                </div>
                            )}
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
