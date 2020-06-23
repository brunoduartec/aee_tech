const {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} = require('../helpers/errors')
const makeHttpError = require('../helpers/http-error')
const makeCentro = require('./centro')

module.exports = function makeCentroEndpointHandler({
    centroList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postCentro(httpRequest)
                break;
            case 'GET':
                return getCentros(httpRequest)
                break;
            case 'DELETE':
                return removeCentro(httpRequest)
                break;
            case 'PUT':
                return updateCentro(httpRequest)
                break;

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
                break;
        }
    }


    async function getCentros(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {}
        const {
            max
        } = httpRequest.queryParams || {}

        const result = id ? await centroList.findById({
            centroId: id
        }) : await centroList.getItems({
            max
        })

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function postCentro(httpRequest) {
        let centroInfo = httpRequest.body
        if (!centroInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No POST body'
            })
        }

        if (typeof httpRequest.body == 'string') {
            try {
                centroInfo = JSON.parse(centroInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                })
            }
        }

        try {
            const centro = makeCentro(centroInfo)
            const result = await centroList.add(centro)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
            }

        } catch (e) {
            return makeHttpError({
                errorMessage: e.message,
                statusCode: e instanceof UniqueConstraintError ?
                    409 : e instanceof InvalidPropertyError ||
                    e instanceof RequiredParameterError ?
                    400 : 500
            })
        }
    }

    async function removeCentro(httpRequest) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                "TODO": "Adicionar aqui o remove"
            })
        }
    }

    async function updateCentro(httpRequest) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                "TODO": "Adicionar aqui o update"
            })
        }
    }

}