import React from 'react';
import PropTypes from 'prop-types';

class SteamProfileButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if(typeof this.props.onClick === 'function') {
            e.preventDefault();
            this.setState({
                selected: !this.state.selected
            }, () => {
                this.props.onClick({
                    link: this.props.link,
                    avatar_link: this.props.avatar_link,
                    username: this.props.username,
                    steam_id: this.props.steam_id,
                });
            });
        }
    }

    render() {
        return (
            <span>
                { this.props.username
                    ? (
                        <a href={this.props.link} target="_blank" className={(this.state.selected ? "selected " : "") + "align-center steam-profile-button"} onClick={this.onClick}>
                            <img src={this.props.avatar_link} alt="avatar" /> {this.props.username}
                        </a>
                    )
                    : (
                        <div />
                    )
                }
            </span>
        );
    }
}

SteamProfileButton.contextTypes = {
    link: PropTypes.string,
    avatar_link: PropTypes.string,
    username: PropTypes.string,
    steam_id: PropTypes.string,
};

export default (SteamProfileButton);
