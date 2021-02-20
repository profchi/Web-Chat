import React, {Component} from 'react';

export default class Messages extends Component{
    state= {
        message: ''
    }

    handleChange = e => {
        this.setState({message: e.currentTarget.value});
    }

    handleSend = message => {
        this.props.onSendMessage(this.state.message);
        this.setState({message: ''});
    }

    render() {
        if (!this.props.conversation){
            return <div></div>;
        }

        const { details, messages } = this.props.conversation;

        return (
            <div>
                <div className="row bottomBorder header">
                    <h1 className="col-12">{details.recipient}</h1>
                </div>

                <div className="messagesArea mb-5">
                    {messages.map(message => {
                        const divClass = 'row my-3 pr-3' + (this.props.userId === message.senderId ? ' d-flex justify-content-end' : '' );
                        return ( 
                            <div className={divClass}>
                                <div className="col-5 text">
                                    <span>{message.text}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="row sendMessage">
                    <div className="col-10">
                        <input value={this.state.message} onChange={this.handleChange} className="inheritWidth"/>
                    </div>
                    <div className="col-2">
                        <button onClick={() => this.handleSend(this.state.message)} className="sendButton btn-primary">Send</button>
                    </div>
                </div>
            </div>
        );
    }
}