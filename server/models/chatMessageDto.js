const mongoose = require('mongoose');

const chatMessageDtoSchema = new mongoose.Schema({
    user: String,
    message: String
})

const chatMessageDto = mongoose.model('chatMessageDto', chatMessageDtoSchema);

module.exports = chatMessageDto;