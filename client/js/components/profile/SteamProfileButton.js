import React from 'react';
import PropTypes from 'prop-types';

class SteamProfileButton extends React.Component {
    render() {
        return (
            <a href={this.props.link} target="_blank" className="align-center steam-profile-button">
                <img src={this.props.avatar_link} alt="avatar" /> {this.props.username}
            </a>
        );
    }
}

SteamProfileButton.contextTypes = {
    link: PropTypes.string,
    avatar_link: PropTypes.string,
    username: PropTypes.string
};

export default (SteamProfileButton);
