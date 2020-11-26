const mongoose = require('mongoose');

const BudgetGoalsSchema = new mongoose.Schema({
    name: String,
    goal: Number,
    currentState: Number,
    isCompleted: Boolean,
    progress: Number
})

const BudgetGoals = mongoose.model('budgetGoals', BudgetGoalsSchema);

module.exports = BudgetGoals;