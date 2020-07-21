const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    money: Number,
    name: String,
    date: Date,
    typeName: String,
    type: String,
    status: String,
    message: String,
    senderId: String
})

const Income = mongoose.model('income', IncomeSchema);

module.exports = Income;