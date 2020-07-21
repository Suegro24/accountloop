// const mongoose = require('mongoose');
// const BudgetSchema = require('./budget').schema;
// const PositionSchema = require('./position').schema;
// const FirmSchema = require('./firm').schema;

// const UserSchema = new mongoose.Schema({
//     name: String,
//     surname: String,
//     password: String,
//     email: String,
//     phone: String,
//     description: String,
//     photo: String,
//     dateOfBirth: Date,
//     sex: String,
//     budget: BudgetSchema,
//     position: PositionSchema,
//     firm: FirmSchema
// })

// const User = mongoose.model('user', UserSchema);

// module.exports = User;

const mongoose = require('mongoose');
const BudgetSchema = require('./budget').schema;
const PositionSchema = require('./position').schema;

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    password: String,
    email: String,
    phone: String,
    description: String,
    photo: String,
    dateOfBirth: Date,
    sex: String,
    budget: BudgetSchema,
    position: PositionSchema,
    firmId: String,
    firmStatus: Number,
    disabledUser: [],
    awaitingPaymentsToAccept: Number
})

const User = mongoose.model('user', UserSchema);

module.exports = User;