const mongoose = require('mongoose');
const UserSchema = require('./user').schema;
const FirmBudget = require('./firmBudget').schema;
const AddressSchema = require('./address').schema;

const FirmSchema = new mongoose.Schema({
    name: String,
    address: AddressSchema,
    users: [UserSchema],
    firmBudget: FirmBudget,
    isDeleted: Boolean
})

const Firm = mongoose.model('firm', FirmSchema);

module.exports = Firm;