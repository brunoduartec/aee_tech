import makeDb from '../db'
import makeCentroList from './centro-list'
import makeCentroEndpointHandler from './centro-endpoint'

const database = makeDb()
const centroList = makeCentroList({
    database
})
const contactsEndpointHandler = makeCentroEndpointHandler({
    centroList
})

export default makeCentroEndpointHandler