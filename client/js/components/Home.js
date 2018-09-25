import React from 'react';
import PropTypes from 'prop-types';
import Tools from "../data/Tools";

class Home extends React.Component {
    componentDidMount() {
        Tools.unfreezeScrolling();
    }

    render() {
        return (
            <div className="container-fluid">

            </div>
        );
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Home
