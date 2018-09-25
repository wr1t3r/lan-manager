import React from 'react';
import PropTypes from 'prop-types';

class CheckboxInline extends React.Component {
    render() {
        return (
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={this.props.id} id={this.props.id} value={this.props.property} onClick={this.props.onClick} />&nbsp;
                <label className="form-check-label" htmlFor={this.props.id}>{this.props.text}</label>
            </div>

        );
    }
}

CheckboxInline.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
};

export default (CheckboxInline);
