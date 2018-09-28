import React from 'react';

class Loading extends React.Component {
    render() {
        return (<p className="loading bg-warning">{this.props.message ? this.props.message : "Loading..."}</p>)
    }
}

export default Loading
