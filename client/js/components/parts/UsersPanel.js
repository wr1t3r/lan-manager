import React from 'react';
import PropTypes from 'prop-types';
import map from "lodash/map";
import SteamProfileButton from './SteamProfileButton';

class UsersPanel extends React.Component {
    render() {
        const users = map(this.props.users_list, (user, key) =>
            <SteamProfileButton key={key} link={user.link}
                                avatar_link={user.avatar_link}
                                username={user.username}
                                steam_id={user.steam_id}
            />
        );

        return (<div className="users-panel"> {users} </div>)
    }
}

UsersPanel.contextTypes = {
    users_list: PropTypes.object
};

export default UsersPanel
