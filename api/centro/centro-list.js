const makeCentro = require('./centro')
const {
    UniqueConstraintError
} = require('../helpers/errors')

module.exports = function makeCentroList({
    database
}) {
    return Object.freeze({
        add,
        findById,
        getItems,
        remove,
        replace,
        update
    })

    async function add({
        centroId,
        ...centro
    }) {
        return await database.add("Centro", centro)
    }
    async function findById({
        centroId
    }) {
        const params = ["Nome", "Regional", "Membros"]
        return await database.findById("Centro", centroId, params)
    }
    async function getItems() {
        const params = ["Nome", "Regional", "Membros"]
        return await database.getItems("Centro", params);
    }
    async function remove({
        centroId
    }) {
        return await database.remove("Centro", centroId)
    }
    async function replace({
        centroId,
        ...centro
    }) {
        return await database.replace("Centro", centroId, centro)
    }
    async function update({
        centroId,
        ...centro
    }) {
        return await database.update("Centro", centroId, centro)
    }

}