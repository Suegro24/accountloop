const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({
    senderId: String,
    recipientId: String,
    senderName: String,
    topic: String,
    message: String,
    status: String,
    type: String
})

const Mail = mongoose.model('mail', MailSchema);

module.exports = Mail;