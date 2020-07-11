const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('./env.json')

const swaggerDoc = require('./helpers/swaggerDoc')

const handleCentroRequest = require('./centro')
const handleRegionalRequest = require('./regional')


const adaptRequest = require('./helpers/adapt-request')
const app = express();


var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World doidão");
});


app.all('/api/centro', centroController)
app.use('/api/centro/:id', centroController);

app.all('/api/regional', regionalController)
app.use('/api/regional/:id', regionalController);


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
app.listen(env.port, env.host, () => {
    console.log("Listening at port:" + env.port)
})
// });