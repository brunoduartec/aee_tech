const express = require('express')
const bodyParser = require('body-parser');
const Database = require('./helper/Database')
const env = require('./env.json')

const database = new Database(env.mysql).getInstance();

const usuario = require('./routes/usuario');

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World doidão");
});

app.use('/api/usuario', usuario);

app.listen(env.port, env.host, () => {
    console.log("Listening at port:" + env.port)
})