import axios from 'axios';

export default class ChatService{

    componentProps;

    searchUrl = 'http://localhost:5000/user/search';
    initiateChatUrl = 'http://localhost:5000/conversation/initiate';
    sendMessageUrl = 'http://localhost:5000/conversation/message';

    constructor(props){
        this.componentProps = props;
    }

    getConversations = async () => {
        const conversationsUrl = 'http://localhost:5000/conversation/getConversations/' + this.componentProps.user.id;
        const {data:chats} = await axios.get(conversationsUrl);

        if (!chats || chats.error || !chats.success){
            return chats;
        }

        chats.conversations.sort( (a,b) => new Date (b.details.lastUpdated).getTime() -  new Date (a.details.lastUpdated).getTime());
        chats.conversations.forEach(conversation => conversation.messages.sort( (a, b) => {
            return new Date (a.timeStamp).getTime() -  new Date (b.timeStamp).getTime()
        }));

        return chats;
    }

    startChat = async username => {
        const {data: searchUser} = await axios.post (this.searchUrl, {
            username : username
        });

        if (!searchUser || !searchUser.success){
            return searchUser && searchUser.error;
        }

        const {data: chat } = await axios.post (this.initiateChatUrl, {
            personOneId: this.componentProps.user.id,
            personTwoId: searchUser.id
        });

        if (!chat.id){
            return chat && chat.error;
        }

        const newConversation = {
            details: {
                id: chat.id,
                lastUpdated: new Date().toISOString(),
                recipient: username,
                recipientId: searchUser.id
            },
            messages: []
        }

        return newConversation;
    }

    sendMessage = async ( message, conversationId ) => {
        const mes = message.trim();

        if (mes.length === 0){
            return null;
        }

        const {data : result} = await axios.post(this.sendMessageUrl, {
            senderId: this.componentProps.user.id,
            conversationId: conversationId,
            text: mes
        });

        if (!result || !result.success){
            return result && result.error;
        }

        const newMessage = {
            _id: result.id,
            conversationId: conversationId,
            senderId: this.componentProps.user.id,
            text: mes,
            timeStamp: new Date().toISOString()
        }

        return newMessage;
    }
}