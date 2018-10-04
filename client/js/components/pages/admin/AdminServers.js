import React from 'react';
import PropTypes from 'prop-types';
import {setServersText} from "../../../actions/servers";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TextArea from '../../form/TextArea';

class AdminServers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: "",
        };

        this.onChange = this.onChange.bind(this);
        this.saveServers = this.saveServers.bind(this);
    }

    componentDidMount() {
        this.setState({ servers: this.props.text });
    }

    saveServers(e) {
        e.preventDefault();
        this.props.setServersText(this.props.socket, this.state.servers);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container admin">
                <div className="row">
                    <div className="col-sm-8">
                        <h1 className="align-center">Servery Admin</h1>
                        <hr />

                        <div className="section">

                            steam://connect/192.168.1.1:27015<br/><br/>
                            <TextArea id="servers"
                                         text="Text pre servery"
                                         icon="angle-double-right"
                                         property={this.state.servers}
                                         onChange={this.onChange} />
                            <br/>
                            <a href="#" className="btn btn-success" onClick={this.saveServers}><i className="fa fa-gears" /> Uložiť správu</a>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h1 className="align-center">Servery</h1>
                        <hr />
                        <p className="servers" dangerouslySetInnerHTML={{__html: this.props.text}}></p>
                    </div>
                </div>
            </div>
        );
    }
}

AdminServers.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        text: state.servers.text,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setServersText: setServersText,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdminServers);
