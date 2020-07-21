const mongoose = require('mongoose');
const UserSchema = require('./user').schema;

const ModeratorSchema = new mongoose.Schema({
    name: String,
    rank: Number,
    users: [UserSchema]
})

const Moderator = mongoose.model('moderator', ModeratorSchema);

module.exports = Moderator;