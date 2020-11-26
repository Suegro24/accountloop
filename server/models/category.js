const mongoose = require('mongoose');
const MatchSchema = require('./match').schema;

const categorySchema = new mongoose.Schema({
    name: String,
    icon: String,
    matches: [MatchSchema]
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;