const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db.js');

var userController = require('./controllers/userController');
var chartController = require('./controllers/chartController');
var firmController = require('./controllers/firmController');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());

app.listen(port,  () => {
    console.log('Listening on port: ' + port);
})

app.use('/users', userController);
app.use('/charts', chartController);
app.use('/firms', firmController);