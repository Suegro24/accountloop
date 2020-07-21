const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/budgetapp";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log(`Database connected: ${url}`)
})

db.on('error', err => {
    console.error('Connection error: ' + error);
})

module.exports = mongoose;