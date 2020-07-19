const makeDb = require('../db')
const makeCentroList = require('./centro-list')
const makeCentroEndpointHandler = require('./centro-endpoint')

const database = makeDb()
const centroList = makeCentroList({
    database
})
const contactsEndpointHandler = makeCentroEndpointHandler({
    centroList
})

module.exports = contactsEndpointHandler