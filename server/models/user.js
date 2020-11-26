const mongoose = require('mongoose');
const BudgetSchema = require('./budget').schema;
const PositionSchema = require('./position').schema;
const SettingsSchema = require('./settings').schema;
const BudgetGoalsSchema = require('./budgetGoals').schema;

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    password: String,
    email: String,
    phone: String,
    description: String,
    dateOfBirth: Date,
    sex: String,
    budget: BudgetSchema,
    position: PositionSchema,
    firmId: String,
    firmStatus: Number,
    firmBudget: BudgetSchema,
    disabledUser: [],
    awaitingPaymentsToAccept: Number,
    admin: Boolean,
    settings: SettingsSchema,
    isUserBlocked: Boolean,
    budgetGoals: [BudgetGoalsSchema],
    isOnline: Boolean
})

const User = mongoose.model('user', UserSchema);

module.exports = User;