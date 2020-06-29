const express = require('express')
const bodyParser = require('body-parser')
const env = require('./env.json')

const swaggerDoc = require('./helpers/swaggerDoc')

const handleCentroRequest = require('./centro')
const adaptRequest = require('./helpers/adapt-request')

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World doidão");
});


app.all('/api/centro', centroController)

app.use('/api/centro/:id', centroController);

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

// const setup = require("./db/setup")

// setup.bootstrap().then(() => {
app.listen(env.port, env.host, () => {
    console.log("Listening at port:" + env.port)
})
// });