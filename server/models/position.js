const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    name: String,
    earnings: Number,
})

const Position = mongoose.model('position', PositionSchema);

module.exports = Position;