const mongoose = require('mongoose');
const CategorySchema = require('./category').schema;

const IncomeSchema = new mongoose.Schema({
    money: Number,
    name: String,
    date: Date,
    category: CategorySchema,
    type: String,
    status: String,
    message: String,
    senderId: String,
    senderName: String,
    expenseRef: String
})

const Income = mongoose.model('income', IncomeSchema);

module.exports = Income;