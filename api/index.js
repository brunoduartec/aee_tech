const express = require('express')
const mongoose = require('mongoose');
const user = require('./routes/user');
const bodyParser = require('body-parser');


const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World doidão");
});



app.use('/api/user', user);

mongoose
    .connect('mongodb://db:27017/crud-node-mongo-docker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(PORT, HOST)