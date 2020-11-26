const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: String,
    amount: Number,
})

const Match = mongoose.model('match', matchSchema);

module.exports = Match;