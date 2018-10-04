import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import Round from './Round';

class Group extends React.Component {
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
        const rounds = map(this.props.data.matches, (match, key) =>
            <Round key={key} round={match.round} team_1={match.team_1} team_2={match.team_2} />
        );
        const table = map(this.props.data.teams, (players, key) =>
            <li key={key} kluc={key} id={Object.keys(players)[0]}>{Object.values(players)[0].username}
                <span>
                    { !this.props.hide_controls && (
                        <a href="#"
                           onClick={(e) => {this.addScore(e, score && score[key] ? score[key] : 0, key)}}>
                            <i className="fa fa-plus" />
                        </a>
                    )}&nbsp;&nbsp;
                    {score && score[key] ? score[key] : 0}&nbsp;&nbsp;
                    { !this.props.hide_controls && (
                        <a href="#"
                           onClick={(e) => {this.removeScore(e, score && score[key] ? score[key] : 0, key)}}>
                            <i className="fa fa-minus" />
                        </a>
                    )}
                </span>
            </li>
        );

        return (<div className="group">
            <div className="col-xs-12"><span className="name">Skupina: {this.props.data.group}</span></div>
            <div className="col-xs-12">
                <br/>
                Výsledky:<br/><br/>
                <ul className="group-table">
                    {table}
                </ul>
            </div>
            <br/>
            {rounds}
            <hr/>
            <hr/>
        </div>)
    }
}

Group.contextTypes = {
    data: PropTypes.object,
};

export default Group;
