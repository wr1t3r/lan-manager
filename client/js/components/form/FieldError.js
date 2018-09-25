import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class FieldError extends React.Component {
    renderSelect() {
        return (
            <p>
                {this.props.error} - <FormattedMessage id="fieldselect" defaultMessage="Select at least one." />
            </p>
        );
    }
    renderRequired() {
        return (
            <p>
                {this.props.error} - <FormattedMessage id="fieldrequired" defaultMessage="Field is required." />
            </p>
        );
    }

    render() {
        if(this.props.error_type == 'required') {
            return this.renderRequired();
        }
        else if(this.props.error_type == 'select') {
            return this.renderSelect();
        } else {
            return (<div></div>);
        }
    }
}

FieldError.propTypes = {
    error_type: PropTypes.string,
};

export default (FieldError);
