const mongoose = require('mongoose');
const ExpenseSchema = require('./expense').schema;
const IncomeSchema = require('./income').schema;

const budgetSchema = new mongoose.Schema({
    money: Number,
    expense: [ExpenseSchema],
    income: [IncomeSchema]
})

const Budget = mongoose.model('budget', budgetSchema);

module.exports = Budget;