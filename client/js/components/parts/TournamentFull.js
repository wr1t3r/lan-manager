import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import Group from './Group';

class TournamentFull extends React.Component {
    render() {
        const groups = map(this.props.matches, (group, key) =>
            <Group key={key} data={group} />
        );

        return (<div className="full">
            {groups}
        </div>)
    }
}

TournamentFull.contextTypes = {
    matches: PropTypes.array,
};

export default TournamentFull
