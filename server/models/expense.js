const mongoose = require('mongoose');
const CategorySchema = require('./category').schema;

const ExpenseSchema = new mongoose.Schema({
    money: Number,
    name: String,
    date: Date,
    category: CategorySchema,
    type: String,
    status: String,
    recipientName: String
})

const Expense = mongoose.model('expense', ExpenseSchema);

module.exports = Expense;