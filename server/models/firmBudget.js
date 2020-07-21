const mongoose = require('mongoose');
const ExpenseSchema = require('./expense').schema;
const IncomeSchema = require('./income').schema;
const ModeratorSchema = require('./moderator').schema;

const FirmBudgetSchema = new mongoose.Schema({
    money: Number,
    moderators: [ModeratorSchema],
    expense: [ExpenseSchema],
    income: [IncomeSchema]
})

const FirmBudget = mongoose.model('firmBudget', FirmBudgetSchema);

module.exports = FirmBudget;