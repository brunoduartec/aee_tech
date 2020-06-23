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
        const params = ["Nome", "Regional", "Membros"]
        return await database.add("Centro", params, centro)
    }
    async function findById(id) {
        const params = ["Nome", "Regional", "Membros"]
        return await database.findById("Centro", id, )
    }
    async function getItems() {
        const params = ["Nome", "Regional", "Membros"]
        return await database.getItems("Centro", params);
    }
    async function remove() {}
    async function replace() {}
    async function update() {}

}