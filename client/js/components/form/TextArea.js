import React from 'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
    render() {
        return (
            <div className="form-group">
                <textarea className="form-control"
                          rows="10"
                          name={this.props.id}
                          id={this.props.id}
                          value={this.props.property}
                          placeholder={this.props.text}
                          disabled={this.props.disabled}
                          onChange={this.props.onChange} />
            </div>
        );
    }
}

TextArea.propTypes = {
    onChange: PropTypes.func,
    id: PropTypes.string,
    property: PropTypes.string,
    text: PropTypes.string,
};

export default (TextArea);
