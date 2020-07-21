const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    country: String,
    city: String,
    street: String
})

const Address = mongoose.model('address', AddressSchema);

module.exports = Address;