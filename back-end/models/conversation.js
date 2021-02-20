const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    personOneId: {type: String, required: true},
    personTwoId: {type: String, required: true},
    lastUpdated: {type: Date, required: true}
});

module.exports = mongoose.model('Conversation', conversationSchema);