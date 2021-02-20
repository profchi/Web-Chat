import React, {Component} from 'react';

class Options extends Component{

    state = {
        username : '',
        error : ''
    }


    handleChange = e => {
        this.setState({username: e.currentTarget.value, error: ''});
    }

    startChat = async () => {
        const username = this.state.username;

        this.setState({username: ''});

        if (username.length == 0)
            return;

        const error = await this.props.onStartChat(username);
        console.log(error);

        this.setState({error});
    }

    render() {
        return (
            <div className="bottomBorder manage">
                <div className="row pt-3 ">
                    <div className="col-6">
                        <span className="pl-3">{this.props.user && this.props.user.username}</span>
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                        <button className="btn-primary pr-3" onClick={this.props.onLogout}>logout</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-7 ml-3">
                        <input className="inheritWidth" value={this.state.username} onChange={this.handleChange} placeholder="Search User"/>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                        <button className="btn-primary pr-3" onClick={this.startChat}>Chat</button>
                    </div>
                </div>
                <p className="pl-3">{this.state.error}</p>
            </div>
        );
    }
}

export default Options;