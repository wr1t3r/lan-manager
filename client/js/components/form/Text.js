import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.text}</label>
                <input type="text" required={this.props.required} className="form-control" disabled={this.props.disabled} id={this.props.id} name={this.props.id} placeholder={this.props.text} onChange={this.props.onChange} value={this.props.property} />
            </div>
        );
    }
}

Text.propTypes = {
    onChange: PropTypes.func,
    icon: PropTypes.string,
    text: PropTypes.string,
};

export default (Text);
