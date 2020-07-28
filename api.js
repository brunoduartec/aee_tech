const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = require('./env.json')[env]

const swaggerDoc = require('./helpers/swaggerDoc')

const handleCentroRequest = require('./centro')
const handleRegionalRequest = require('./regional')


const adaptRequest = require('./helpers/adapt-request')
const app = express();

var corsOptions = {
    origin: config.cors.origin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

app.use(bodyParser.json());

// app.js: register the route. In our case, we don't want authorization for this route
app.use('/api/v1/healthcheck', require('./healthcheck'));

app.get('/', function (req, res) {
    res.send("Hello World doidão");
});


app.all('/api/v1/centros', centroController)
app.use('/api/v1/centros/:id', centroController);

app.all('/api/v1/regionais', regionalController)
app.use('/api/v1/regionais/:id', regionalController);


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



const setup = require("./db/setup")

// setup.bootstrap().then(() => {
module.exports = function () {
    return app;
}
// });