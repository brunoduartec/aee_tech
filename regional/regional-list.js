const makeRegional = require('./regional')
const {
    UniqueConstraintError
} = require('../helpers/errors')

module.exports = function makeRegionalList({
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
        regionalId,
        ...regional
    }) {
        return await database.add("Regional", regional)
    }
    async function findById({
        regionalId
    }) {
        const params = ["ID_REGIONAL", "NOME_REGIONAL", "ESTADO", "PAIS"]
        return await database.findById("Regional", params, {
            ID_REGIONAL: regionalId
        })
    }
    async function getItems() {
        const params = ["ID_REGIONAL", "NOME_REGIONAL", "ESTADO", "PAIS"]
        return await database.getItems("Regional", params);
    }
    async function remove({
        regionalId
    }) {
        return await database.remove("Regional", {
            ID_REGIONAL: regionalId
        })
    }
    async function replace({
        regionalId,
        ...regional
    }) {
        return await database.replace("Regional", regional, {
            ID_REGIONAL: regionalId
        })
    }
    async function update({
        regionalId,
        ...regional
    }) {
        return await database.update("Regional", regional, {
            ID_REGIONAL: regionalId
        })
    }

}