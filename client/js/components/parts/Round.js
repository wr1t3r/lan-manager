import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import Team from './Team';

class Round extends React.Component {
    render() {
        return (<div className="round">
            <div className="col-xs-12"><span className="name">Zápas v kole: {this.props.round+1}</span></div>
            <Team players={this.props.team_1} noplayers={true} />
            <div className="col-sm-3 align-center"><span className="vs"><i className="fa fa-arrow-right" /></span></div>
            <Team players={this.props.team_2} noplayers={true} />
        </div>)
    }
}

Round.contextTypes = {
    team_1: PropTypes.object,
    team_2: PropTypes.object,
};

export default Round
