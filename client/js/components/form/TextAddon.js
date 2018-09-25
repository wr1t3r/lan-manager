import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class TextAddon extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.text}</label>
                <div className="input-group">
                    <div className="input-group-addon"><i className={"fa fa-"+this.props.icon} /></div>
                    <input type={this.props.type ? this.props.type : "text"}
                           required={this.props.required}
                           className={(this.props.error ? "error " : "") + "form-control"}
                           disabled={this.props.disabled}
                           id={this.props.id}
                           name={this.props.id}
                           placeholder={this.props.text}
                           onChange={this.props.onChange}
                           value={this.props.property} />
                </div>
                { this.props.error && (<p className="error-field"><FormattedMessage id="fieldrequired" defaultMessage="Field is required." /></p>)}
                {
                    this.props.hint && (
                        <p className="hint">{this.props.hint}</p>
                    )
                }
            </div>
        );
    }
}

TextAddon.propTypes = {
    onChange: PropTypes.func,
    icon: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    hint: PropTypes.string,
};

export default (TextAddon);
