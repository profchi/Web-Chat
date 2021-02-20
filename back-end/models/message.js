const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {type: String, required: true},
    conversationId: {type: String, require: true},
    text: {type: String, required: true},
    timeStamp: {type: Date, required: true}
})

module.exports = mongoose.model('Message', messageSchema);