import React, {Component} from 'react';

import Receiver from './receiver';
import ChatService from './chatService';
import Messages from './messages';
import Options from './options';

import './chat.css';

export default class Chat extends Component{

    state = {
        chats : {},
        conversation: null
    }

    chatService = {};

    async componentDidMount(){

        if (!this.props.user || !this.props.user.id){
            this.props.history.replace('/');
            return;
        }

        this.chatService = new ChatService(this.props);
        const chats = await this.chatService.getConversations();

        if (!chats || chats.error || !chats.success){
            return chats;
        }

        this.setState({chats});
    }

    handleLogout = () => {
        this.props.history.replace('/');
    }

    changeConversation = conversation => {
        this.setState({conversation});
    }

    startChat = async username => {
        if (this.props.user.username == username){
            return 'Cannot start a chat with yourself';
        }

        if (this.state.chats.conversations && this.state.chats.conversations.some( conversation => {
           return  conversation.details.recipient === username;
        })) {
            return 'Chat already exist';
        }

        const result = await this.chatService.startChat(username);

        if (!result || result.error || !result.details){
            return result && result.error;
        }

        const chats = {...this.state.chats};
        chats.conversations = [result, ...chats.conversations];
        this.setState({chats});
    }

    sendMessage = async message => {
        
        const result = await this.chatService.sendMessage(message , this.state.conversation.details.id);

        if (!result || result.error || !result.text){
            return;
        }

        const conversation = {...this.state.conversation};
        const chats = {...this.state.chats};

        const convInChat = chats.conversations.find(cov => cov.details.id === conversation.details.id);
        convInChat.messages.push(result);
        convInChat.details.lastUpdated = new Date().toISOString();
        chats.conversations.sort( (a,b) => new Date (b.details.lastUpdated).getTime() -  new Date (a.details.lastUpdated).getTime());

        this.setState({chats, conversation});
    }

    render() {
        return (
            <div className="row chatArea">
                <div className="col-3 rightBorder">
                    <Options onLogout={this.handleLogout} user={this.props.user} onStartChat={u => this.startChat(u)} />
                    <div className="recipients pd-5">
                        {this.state.chats.conversations && this.state.chats.conversations.map(conversation => {
                           return  (
                            <div onClick={() => this.changeConversation(conversation)}>
                                <Receiver name={conversation.details.recipient} />
                            </div>
                           );
                        })}
                    </div>
                </div>
                <div className="col-9">
                    <Messages conversation={this.state.conversation} onSendMessage={this.sendMessage} userId={this.props.user && this.props.user.id} />
                </div>
            </div>
        );
    }
}