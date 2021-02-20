const Conversation = require('../models/conversation');
const Message = require('../models/message');
const User = require('../models/user');

const initiateConversation = async (req, res, next ) => {
    const { personOneId, personTwoId } = req.body;

    if (!personOneId || !personTwoId || personTwoId == personOneId){
        return res.json({error : 'Invalid request'});
    }

    const newConv = new Conversation({
        personOneId: personOneId,
        personTwoId: personTwoId,
        lastUpdated: new Date()
    });

    const result = await newConv.save();

    if (!result){
        return res.json({error : 'Invalid request'});
    }

    return res.json({id: result.id, success: true});
}

const sendMessage = async (req, res, next) => {

    const {senderId, conversationId, text } = req.body;

    const time = new Date();

    let conversation = await Conversation.findById(conversationId).exec();

    if (!conversation || !senderId || !conversationId || !text ){
        return res.json({error : 'Invalid request'});
    }

    let message = new Message({
        senderId: senderId,
        conversationId: conversationId,
        text: text,
        timeStamp: time
    });

    conversation.lastUpdated = time;

    const result = await Promise.all([message.save(), conversation.save()]);

    if (!result || result.length != 2 || !result[0] || !result[1]){
        return res.json({error : 'Invalid request'});
    }

    return res.json({ id: message.id , success: true});
}

const getAllConversations = async (req, res, next) => {
    const userId = req.params.uid;

    const conversations = await Conversation.find({$or:[{personOneId : userId},{personTwoId: userId}]}).exec();

    const result = new Array();

    let messages;
    let recipientId;
    let recipient;
    let details;

    for (const conversation of conversations) {
        messages = await Message.find({conversationId: conversation.id}).exec();

        if (userId == conversation.personOneId){
            recipientId = conversation.personTwoId;
        } else {
            recipientId = conversation.personOneId;
        }

        recipient = await User.findById(recipientId).exec();

        details = {
            recipient : recipient.username,
            id : conversation.id,
            recipientId: recipientId,
            lastUpdated: conversation.lastUpdated
        }
        result.push({details: details , messages : messages});
    }

    return res.json({success: true, conversations: result});
}


exports.initiateConversation = initiateConversation;
exports.sendMessage = sendMessage;
exports.getAllConversations = getAllConversations;