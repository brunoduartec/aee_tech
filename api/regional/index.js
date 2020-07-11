const makeDb = require('../db')
const makeRegionalList = require('./regional-list')
const makeRegionalEndpointHandler = require('./regional-endpoint')

const database = makeDb()
const regionalList = makeRegionalList({
    database
})
const contactsEndpointHandler = makeRegionalEndpointHandler({
    regionalList
})

module.exports = contactsEndpointHandler