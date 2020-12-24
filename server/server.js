const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db.js');

var wsController = require('./controllers/wsController');
var userController = require('./controllers/userController');
var chartController = require('./controllers/chartController');
var firmController = require('./controllers/firmController');
var categoryController = require('./controllers/categoryController');
var mailController = require('./controllers/mailController');

const port = 8000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());

if (!module.parent) {
    app.listen(port,  () => {
        console.log('Listening on port: ' + port);
    })
}

app.ws('/chat', wsController);
app.use('/categories', categoryController);
app.use('/users', userController.router);
app.use('/charts', chartController);
app.use('/firms', firmController);
app.use('/mail', mailController);

module.exports = app;
