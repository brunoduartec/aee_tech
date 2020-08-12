const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const swaggerDoc = require('./helpers/swaggerDoc')

const handleCentroRequest = require('./centros')
const handleRegionalRequest = require('./regionais')
const handleAtividadeRequest = require('./atividades')


const adaptRequest = require('./helpers/adapt-request')
const app = express();


app.use((req, res, next) => {
    console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(bodyParser.json());

app.use('/api/v1/healthcheck', require('./healthcheck'));

app.get('/', function (req, res) {
    const package = require('./package.json')
    const versionInfo = {
        name: package.name,
        version: package.version,
        description: package.description
    }
    res.json(versionInfo)
});


app.all('/api/v1/centros', centroController)
app.use('/api/v1/centros/:id', centroController);

app.all('/api/v1/regionais', regionalController)
app.use('/api/v1/regionais/:id', regionalController);

app.all('/api/v1/atividades', atividadeController)
app.use('/api/v1/atividades/:id', atividadeController);

swaggerDoc(app);

function centroController(req, res) {
    const httpRequest = adaptRequest(req)
    handleCentroRequest(httpRequest)
        .then(({
            headers,
            statusCode,
            data
        }) => {
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        })
        .catch(e => {
            console.log(e);
            res.status(500).end()
        })
}


function regionalController(req, res) {
    const httpRequest = adaptRequest(req)
    handleRegionalRequest(httpRequest)
        .then(({
            headers,
            statusCode,
            data
        }) => {
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        })
        .catch(e => {
            console.log(e);
            res.status(500).end()
        })
}

function atividadeController(req, res) {
    const httpRequest = adaptRequest(req)
    handleAtividadeRequest(httpRequest)
        .then(({
            headers,
            statusCode,
            data
        }) => {
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        })
        .catch(e => {
            console.log(e);
            res.status(500).end()
        })
}

const setup = require("./db/setup");
const {
    version
} = require('mongoose');

module.exports = function () {
    return app;
}