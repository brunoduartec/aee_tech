import express from 'express'
import bodyParser from 'body-parser'
import env from './env.json'
import handleCentroRequest from './centro'
import adaptRequest from './helpers/adapt-request'

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World doidão");
});

app.all('/api/centro', centroController)
app.use('/api/centro/:id', centroController);

function centroController(req, res) {
    const httpRequest = adaptRequest(req)
    handleCentroRequest(httpRequest)
        .then(({
                headers,
                statusCode,
                data
            }) =>
            res
            .set(headers)
            .status(statusCode)
            .send(data)
        )
        .catch(e => res.status(500).end())
}

app.listen(env.port, env.host, () => {
    console.log("Listening at port:" + env.port)
})