const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    money: Number,
    name: String,
    date: Date,
    typeName: String,
    type: String,
    status: String
})

const Expense = mongoose.model('expense', ExpenseSchema);

module.exports = Expense;