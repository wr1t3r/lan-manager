import React from 'react';
import PropTypes from 'prop-types';

class TextAddon extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.text}</label>
                <div className="input-group">
                    <div className="input-group-addon"><i className={"fa fa-"+this.props.icon} /></div>
                    <select className="form-control" id={this.props.id} name={this.props.id} onChange={this.props.onChange} value={this.props.property}>
                        {this.props.option_values}
                    </select>
                </div>
            </div>
        );
    }
}

TextAddon.propTypes = {
    onChange: PropTypes.func,
    icon: PropTypes.string,
    text: PropTypes.string,
};

export default (TextAddon);
